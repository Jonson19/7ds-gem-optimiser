let gems = [];

const navButtons = document.querySelectorAll(".navButton");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        navButtons.forEach(b => b.classList.remove("active"));
        pages.forEach(p => p.classList.remove("active"));

        button.classList.add("active");

        const page = document.getElementById(button.dataset.page);
        if (page) page.classList.add("active");
    });
});

function loadGems() {
    const data = localStorage.getItem("gems");

    if (data) {
        gems = JSON.parse(data);
    } else {
        gems = [];
    }

    renderInventory();
}

function saveGems() {
    localStorage.setItem("gems", JSON.stringify(gems));
}

function renderInventory() {

    const list = document.getElementById("inventoryList");
    const count = document.getElementById("gemCount");

    if (!list || !count) return;

    list.innerHTML = "";
    count.textContent = gems.length;

    gems.forEach(gem => {

        const card = document.createElement("div");
        card.className = "gemCard";

        card.innerHTML = `
            <h3>${gem.color} ${gem.rarity}</h3>
            <p>ID: ${gem.id}</p>
        `;

        list.appendChild(card);

    });

}

const form = document.getElementById("gemForm");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        gems.push({
            id: Date.now(),
            color: document.getElementById("gemColor").value,
            rarity: document.getElementById("gemRarity").value
        });

        saveGems();
        renderInventory();

        alert("Gem saved!");

    });

}

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".gemCard").forEach(card => {

            card.style.display = card.innerText.toLowerCase().includes(value)
                ? ""
                :
