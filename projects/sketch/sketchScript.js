// Grid's consts
let rows = 16;
let columns = 16;
let flexBasis = 6.25;
const body = document.querySelector("body");
// Const that create new elements in DOM
const menu = createElement("div", "menu", body, "");
const grid = createElement("div", "container", body, "");
const buttonNewGrid = createElement("button", "newGrid", menu, "New Grid")
const buttonRandomColor = createElement("button", "randomColor", menu, "Random Color");
const buttonShade = createElement("button", "grayScale", menu, "Grayscale");

// Create element
function createElement(element, id, place, name) {
    const el = document.createElement(element);
    el.id = id;
    el.appendChild(document.createTextNode(name));
    return place.appendChild(el);
}

// Create grid
function createGrid(rows, columns, flexBasis) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.flexBasis = flexBasis + "%"; 
            grid.appendChild(cell);

            cell.addEventListener("mouseover", function() {
                cell.style.backgroundColor = "#D8ECC8";
            })
            randomColor.addEventListener("click", function() {
                cell.addEventListener("mouseover", function() {
                    const r = Math.floor(Math.random() * 256); 
                    const g = Math.floor(Math.random() * 256); 
                    const b = Math.floor(Math.random() * 256); 
                    cell.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                    cell.style.opacity = "0.5";
                })
            })
            grayScale.addEventListener("click", function() {
                cell.addEventListener("mouseover", function(){
                    cell.style.backgroundColor = "black";
                    cell.style.opacity = Number(cell.style.opacity) + 0.1;
                    // cell.style.border = "1px solid #000";
                })
            })
        }
    }
}

// Create a new grid based on user input 
newGrid.addEventListener("click", function() {
    let rows = prompt("Please enter new amount of rows (1-100)");
    let columns = prompt("Please enter new amount of columns (1-100)");
    let flexBasis = 100 / rows; 
    if (rows > 100 || rows <= 0 || columns > 100 || columns <= 0) {
        alert ("Invalid input. Please enter a number between 1 - 100"); 
    }
    else {
        grid.replaceChildren();
        createGrid(rows, columns,flexBasis);
    }
})


createGrid(rows, columns, flexBasis);