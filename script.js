/*
TODO: Quando quambi il colore al color-picker
fai cambiare anche il colore della classe .atcive, o
direttamente della variabile black nel root css

FIXME: non dimenticare che appena parte la pagina deve
  essere settata una grid di 16 x 16 
*/

/*TODO:
  1 - Iniziamo col creare i div;
  


*/

// COMPONENT
const colorChoose = document.querySelector("#color-picker");
const btnColorMode = document.querySelector("#color-mode");
const btnRainbowMode = document.querySelector("#rainbow-mode");
const btnDelete = document.querySelector("#delete");
const btnClear = document.querySelector("#clear");
const sizeValue = document.querySelector("#size-value");
const sizeGrid = document.querySelector("#size-grid");

const grid = document.querySelector("#grid");

// Prendiamo il valore del sizeGrid e lo facciamo comparire a schermo
sizeGrid.addEventListener("input", change_sizeValue);
sizeGrid.addEventListener("click", createGrid);

function change_sizeValue() {
  sizeValue.innerText = `${this.value} x ${this.value}`;
}

// Creazione della griglia
function createGrid() {
  // Rimuovi ogni volta tutti i child
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Aggiungi div rispetto al value di sizeGrid
  for (let i = 1; i <= sizeGrid.value; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

createGrid();
createGrid();
