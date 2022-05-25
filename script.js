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

btnColorMode.addEventListener("click", setMode);
btnRainbowMode.addEventListener("click", setMode);
btnDelete.addEventListener("click", setMode);
btnClear.addEventListener("click", setMode);

sizeGrid.addEventListener("input", change_sizeValue);
sizeGrid.addEventListener("change", createGrid);

// || FUNCTIONS ||

let currentMode = "color";
let colorValue = "#2e2e2e";

// Passa il valore del color picker
function change_colorValue(e) {
  colorValue = e.target.value;

  let root = document.querySelector(":root");
  root.style.setProperty("--change-value", `${colorValue}`);
}

// Fa succedere cose ai btn
function setMode(e) {
  if (e.target.id === "color-mode") {
    btnRainbowMode.classList.remove("active-rainbow");
    btnDelete.classList.remove("active-delete");

    e.target.classList.add("active-color");
    return (currentMode = "color");
  }

  if (e.target.id === "rainbow-mode") {
    btnColorMode.classList.remove("active-color");
    btnDelete.classList.remove("active-delete");

    e.target.classList.add("active-rainbow");

    return (currentMode = "rainbow");
  }

  if (e.target.id === "delete") {
    btnColorMode.classList.remove("active-color");
    btnRainbowMode.classList.remove("active-rainbow");

    e.target.classList.add("active-delete");

    return (currentMode = "delete");
  }

  if (e.target.id === "clear") {
    createGrid();
  }
}

// Prendiamo il valore del sizeGrid e lo facciamo comparire a schermo
function change_sizeValue(e) {
  sizeValue.innerText = `${e.target.value} x ${e.target.value}`;
  // Poteva anche essere sostituito da:
  //`${this.value} x ${this.value}`;
}

// Creazione della griglia
function createGrid() {
  let maxValue = sizeGrid.value ** 2;

  // Setta lo stile per renderlo una grid
  grid.style.gridTemplateColumns = `repeat(${sizeGrid.value}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${sizeGrid.value}, 1fr)`;

  // Rimuovi ogni volta tutto
  grid.innerHTML = "";

  // Aggiungi div rispetto al value ** 2 di sizeGrid
  for (let i = 0; i < maxValue; i++) {
    let div = document.createElement("div");
    div.addEventListener("mouseover", changeColor);
    div.addEventListener("mousedown", changeColor);
    grid.appendChild(div);
  }
}

// Questo servirà per fare sia click che mousehover
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Cosa succede al click dei div
function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  if (currentMode === "color") {
    e.target.style = `background-color: ${colorValue};`;
  } else if (currentMode === "rainbow") {
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);

    e.target.style = `background-color: rgb(${randomR}, ${randomG}, ${randomB});`;
  } else if (currentMode === "delete") {
    e.target.style = `background-color: #fff;`;
  }
}

// La funzione viene inizializzata appena si carica la pagina
createGrid();
