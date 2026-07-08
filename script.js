// ==========================================
// 7DS Idle Adventure Gem Optimizer
// Version 2.0
// ==========================================

// -------------------------------
// Global Data
// -------------------------------

let gems = [];

const WEIGHTS = {
    "Crit Chance": 748.3,
    "Crit Damage": 179.473684,
    "Accuracy": 154.259259,
    "Crit Resistance": 76.785714,
    "Attack": 64.375,
    "Crit Defense": 16.764706,
    "Evasion": 15.947368,
    "Defense": 7.358491,
    "HP": 0.047619
};

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

        const target = document.getElementById(button.dataset.page);

        if (target) {
            target.classList.add("active");
        }

    });

});

// -------------------------------
// Local Storage
// -------------------------------

function loadGems() {

    const saved = localStorage.getItem("gems");

    if (saved) {

        gems = JSON.parse(saved);

    } else {

        gems = [];

    }

}

function saveGems() {

    localStorage.setItem(
        "gems",
        JSON.stringify(gems)
    );

}

// -------------------------------
// Combat Class Calculation
// -------------------------------

function calculateGemCC(gem) {

    let total = 0;

    gem.baseStats.forEach(stat => {

        if (!WEIGHTS[stat.stat]) return;

        total += Number(stat.value) * WEIGHTS[stat.stat];

    });

    return Math.round(total);

}

// -------------------------------
// Inventory
// -------------------------------

function renderInventory() {

    const list = document.getElementById("inventoryList");
    const counter = document.getElementById("gemCount");

    if (!list) return;

    list.innerHTML = "";

    counter.textContent = gems
// -------------------------------
// Delete Gem
// -------------------------------

function deleteGem(id) {

    gems = gems.filter(gem => gem.id != id);

    saveGems();

    renderInventory();

}

// -------------------------------
// Add Gem
// -------------------------------

const form = document.getElementById("gemForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const baseStats = [];

        for (let i = 1; i <= 3; i++) {

            const stat = document.getElementById("stat" + i).value;
            const value = document.getElementById("value" + i).value;

            if (
                stat !== "None" &&
                value !== ""
            ) {

                baseStats.push({

                    stat,
                    value: Number(value)

                });

            }

        }

        const gem = {

            id: Date.now(),

            color: document.getElementById("gemColor").value,

            rarity: document.getElementById("gemRarity").value,

            baseStats: baseStats,

            bonuses: []

        };

        gems.push(gem);

        saveGems();

        renderInventory();

        form.reset();

        alert("Gem saved!");

    });

}

// -------------------------------
// Search
// -------------------------------

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".gemCard").forEach(card => {

            if (
                card.innerText
                    .toLowerCase()
                    .includes(value)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}
        // -------------------------------
// Bonus Builder (placeholder)
// -------------------------------

const addBonusButton = document.getElementById("addBonus");

if (addBonusButton) {

    addBonusButton.addEventListener("click", () => {

        const container = document.getElementById("bonusContainer");

        const row = document.createElement("div");

        row.className = "bonusRow";

        row.innerHTML = `

            <select class="bonusStat">

                <option>Attack</option>
                <option>Defense</option>
                <option>HP</option>
                <option>Accuracy</option>
                <option>Crit Chance</option>
                <option>Crit Damage</option>
                <option>Crit Resistance</option>
                <option>Crit Defense</option>
                <option>Evasion</option>

            </select>

            <input
                class="bonusValue"
                type="number"
                step="0.01"
                placeholder="%">

            <button
                type="button"
                class="removeBonus">

                Remove

            </button>

        `;

        container.appendChild(row);

        row.querySelector(".removeBonus")
            .addEventListener("click", () => {

                row.remove();

            });

    });

}

// -------------------------------
// Optimizer Placeholder
// -------------------------------

const optimizeButton = document.getElementById("optimizeButton");

if (optimizeButton) {

    optimizeButton.addEventListener("click", () => {

        const output =
            document.getElementById("optimizationResults");

        output.innerHTML = `

            <h3>Optimizer</h3>

            <p>

                Optimizer coming soon.

            </p>

            <p>

                Current inventory:
                <strong>${gems.length}</strong> gems.

            </p>

        `;

    });

}

// ----------------
