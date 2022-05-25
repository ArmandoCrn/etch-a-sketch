/*TODO:
  - Creare una queryselectorall di tutti i div presenti in grid

  - forEach aggiungere un event listener

  - onclick aggiungere background color de colore scelto

  FIXME: 
  - Bisogna aggiungere la modalità rainbow

  - Bisogna aggiungere la modalità per cancellare signolarmente i colori
  (rimuovendo il bg-color)

  - Bisogna aggiungere il clear all

  - AD OGNI AGGIUNTA BISOGNA SEMPRE AGGIUNGERE PARTI ALLE FUNZIONI GIà PRESENTI
  PER ESEMPIO A QUELLA CHE CAMBIACOLORE, DOVRà SETTARE IL COLORE ANCHE L BG DE DIV
  POI QUANDO USIAMO IL RAINBOW DOVREMO FARE UN CASINO PAZZESCO
  E STESSA COSA PER IL CLEAR SINGOLARMENTE
*/

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

sizeGrid.addEventListener("input", change_sizeValue);
sizeGrid.addEventListener("click", createGrid);

// || FUNCTIONS ||

// Passa il valore del color picker
function change_colorValue() {
  let colorValue = this.value;

  let root = document.querySelector(":root");
  root.style.setProperty("--change-value", `${colorValue}`);
}

// Cambia il colore del btn
function add_removeClass() {
  function remove(element) {
    element.classList.remove("active");
  }

  remove(btnColorMode);
  remove(btnRainbowMode);
  remove(btnDelete);

  this.classList.add("active");
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
    grid.appendChild(div);
  }

  // Setta lo stile per renderlo una grid
  grid.style = `grid-template-columns: repeat(${sizeGrid.value}, 1fr); grid-template-rows: repeat(${sizeGrid.value}, 1fr);`;

  const divs = grid.querySelectorAll("div");
  divs.forEach((div) => div.addEventListener("mousedown", clickMe));
  //FIXME: Non è il click, ne il mouse down, capire che tipo di evento è
}

// La funzione viene inizializzata appena si carica la pagina
createGrid();

// Cosa succede al click dei div
function clickMe() {
  let value = "#000";
  this.style = `background-color: ${value};`;
  // FIXME: PASSA IL COLORE DINAMICAMENTE;
}

function colorDiv() {}
