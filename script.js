// || COMPONENT ||

const colorChoose = document.querySelector("#color-picker");
const btnColorMode = document.querySelector("#color-mode");
const btnRainbowMode = document.querySelector("#rainbow-mode");
const btnDelete = document.querySelector("#delete");
const btnClear = document.querySelector("#clear");
const sizeValue = document.querySelector("#size-value");
const sizeGrid = document.querySelector("#size-grid");

const grid = document.querySelector("#grid");

// || EVENT LISTENER ||

colorChoose.addEventListener("input", change_colorValue);

btnColorMode.addEventListener("click", add_removeClass);
btnRainbowMode.addEventListener("click", add_removeClass);
btnDelete.addEventListener("click", add_removeClass);
btnClear.addEventListener("click", add_removeClass);

sizeGrid.addEventListener("input", change_sizeValue);
sizeGrid.addEventListener("change", createGrid);

// || FUNCTIONS ||

let currentMode = "color";
let colorValue = "#2e2e2e";

// Passa il valore del color picker
function change_colorValue() {
  colorValue = this.value;

  let root = document.querySelector(":root");
  root.style.setProperty("--change-value", `${colorValue}`);
  return colorValue;
}

// Fa succedere cose ai btn
function add_removeClass(e) {
  if (e.target.id === "color-mode") {
    btnRainbowMode.classList.remove("active-rainbow");
    btnDelete.classList.remove("active-delete");

    this.classList.add("active-color");
    return (currentMode = "color");
  }

  if (e.target.id === "rainbow-mode") {
    btnColorMode.classList.remove("active-color");
    btnDelete.classList.remove("active-delete");

    this.classList.add("active-rainbow");

    return (currentMode = "rainbow");
  }

  if (e.target.id === "delete") {
    btnColorMode.classList.remove("active-color");
    btnRainbowMode.classList.remove("active-rainbow");

    this.classList.add("active-delete");

    return (currentMode = "delete");
  }

  if (e.target.id === "clear") {
    createGrid();
  }
}

// Prendiamo il valore del sizeGrid e lo facciamo comparire a schermo
function change_sizeValue() {
  sizeValue.innerText = `${this.value} x ${this.value}`;
}

// Creazione della griglia
function createGrid() {
  let maxValue = sizeGrid.value ** 2;

  // Rimuovi ogni volta tutti i child
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Aggiungi div rispetto al value ** 2 di sizeGrid
  for (let i = 1; i <= maxValue; i++) {
    let div = document.createElement("div");
    div.addEventListener("mouseover", colorDiv);
    div.addEventListener("mousedown", colorDiv);
    grid.appendChild(div);
  }

  // Setta lo stile per renderlo una grid
  grid.style = `grid-template-columns: repeat(${sizeGrid.value}, 1fr);
  grid-template-rows: repeat(${sizeGrid.value}, 1fr);`;
}

// Questo servirà per fare sia click che mousehover
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Cosa succede al click dei div
function colorDiv(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  if (currentMode === "color") {
    this.style = `background-color: ${colorValue};`;
  }

  if (currentMode === "rainbow") {
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);

    let colorValueRainbow = `rgb(${randomR}, ${randomG}, ${randomB})`;

    this.style = `background-color: ${colorValueRainbow};`;
  }

  if (currentMode === "delete") {
    this.style = `background-color: #fff;`;
  }
}

// La funzione viene inizializzata appena si carica la pagina
createGrid();
