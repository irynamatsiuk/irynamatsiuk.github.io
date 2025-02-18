
import { Ship } from "./ship.js";
import { Game } from "./game.js";
import { renderBoardComputer, renderBoardHuman } from "./dom.js"


const start = document.querySelector(".start-btn");
const boardHuman = document.querySelector(".board-human");
const boardComputer = document.querySelector(".board-computer");

const shipsLengths = [5, 4, 3, 2, 1]

start.addEventListener("click", () => {
    boardHuman.innerHTML = "";
    boardComputer.innerHTML = "";
    let game = new Game();
    let gameboardHuman = game.human.gameboard;
    let gameboardComputer = game.computer.gameboard;

    // add 5 random ships to boards  
    gameboardHuman.addRandomShips(shipsLengths);
    gameboardComputer.addRandomShips(shipsLengths);

    renderBoardHuman(game, Ship);
    renderBoardComputer(game, Ship);
})





