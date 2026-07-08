// ================================
// 7DS Gem Optimizer
// Version 1
// ================================

let gems = [];

// -------------------------------
// Navigation
// -------------------------------

const navButtons = document.querySelectorAll(".navButton");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        navButtons.forEach(b => b.classList.remove("active"));
        pages.forEach(p => p.classList.remove("active"));

        button.classList.add("active");

        const page = document.getElementById(button.dataset.page);

        if(page){
            page.classList.add("active");
        }

    });

});

// -------------------------------
// Local Storage
// -------------------------------

function loadGems(){

    const data = localStorage.getItem("gems");

    if(data){

        gems = JSON.parse(data);

    }else{

        gems = [];

    }

    renderInventory();

}

function saveGems(){

    localStorage.setItem("gems",JSON.stringify(gems));

}

// -------------------------------
// ID Generator
// -------------------------------

function createID(){

    return "G" + Date.now();

}

// -------------------------------
// Combat Class Weights
// -------------------------------

const WEIGHTS={

    "Crit Chance":748.3,
    "Crit Damage":179.473684,
    "Accuracy":154.259259,
    "Crit Resistance":76.785714,
    "Attack":64.375,
    "Crit Defense":16.764706,
    "Evasion":15.947368,
    "Defense":7.358491,
    "HP":0.047619

};

// -------------------------------
// Calculate Combat Class
// -------------------------------

function calculateCC(gem){

    let cc=0;

    gem.baseStats.forEach(stat=>{

        if(WEIGHTS[stat.stat]){

            cc += stat.value * WEIGHTS[stat.stat];

        }

    });

    return cc.toFixed(2);

}

// -------------------------------
// Render Inventory
// -------------------------------

function renderInventory(){

    const list=document.getElementById("inventoryList");

    const count=document.getElementById("gemCount");

    list.innerHTML="";

    count.textContent=gems.length;

    gems.forEach(gem=>{

        const card=document.createElement("div");

        card.className="gemCard";

        card.innerHTML=`

            <h3>${gem.color} ${gem.rarity}</h3>

            <p>ID: ${gem.id}</p>

            <p>Combat Class: ${calculateCC(gem)}</p>

            <button onclick="deleteGem('${gem.id}')">

                Delete

            </button>

        `;

        list.appendChild(card);

    });

}

// -------------------------------
// Delete Gem
// -------------------------------

function deleteGem(id){

    gems=gems.filter(g=>g.id!==id);

    saveGems();

    renderInventory();

}

// -------------------------------
// Add Gem
// -------------------------------

document.getElementById("gemForm").addEventListener("submit",function(e){

    e.preventDefault();

    const color=document.getElementById("gemColor").value;

    const rarity=document.getElementById("gemRarity").value;

    const gem={

        id:createID(),

        color,

        rarity,

        baseStats:[],

        bonuses:[]

    };

    gems.push(gem);

    saveGems();

    renderInventory();

    alert("Gem Saved!");

});

// -------------------------------
// Search
// -------------------------------

document.getElementById("search").addEventListener("input",function(){

    const value=this.value.toLowerCase();

    const cards=document.querySelectorAll(".gemCard");

    cards.forEach(card=>{

        card.style.display=card.innerText.toLowerCase().includes(value)
            ? "block"
            : "none";

    });

});

// -------------------------------
// Initialize
// -------------------------------

loadGems();
