let boardHuman = document.querySelector(".board-human");
let boardComputer = document.querySelector(".board-computer");

export function renderBoardHuman(game, Ship) {
  let board = game.human.gameboard.board;
  for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < [board[row].length]; col++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          if (board[row][col] instanceof Ship) {
            cell.classList.add("ship");
          }
          if (board[row][col] === "hit" ) {
            cell.classList.add("hit");
          }
          if (board[row][col] === "missed" || board[row][col] === "hit" ) {
            cell.classList.add("attacked");
          }
      boardHuman.appendChild(cell);
    }
  }
}

export function renderBoardComputer(game, Ship) {
  let board = game.computer.gameboard.board;
  for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < [board[row].length]; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (board[row][col] instanceof Ship) {
          cell.classList.add("hidden");
        }
        cell.addEventListener("click", () => {
          if(game.gameOver) {
            return
          }
          handleClick(cell, game, row, col)
          if(game.gameOver) {
            return
          }
          computerTurn(game, Ship);
        })
      boardComputer.appendChild(cell);
    }
  }
}

function handleClick(cell, game, row, col) {
  cell.classList.add("attacked");
  game.human.attack(game.computer.gameboard, [row], [col]);
  game.checkGameOver();
  showMessage(game);
  game.switchPlayer();
}

function computerTurn(game, Ship) {
  game.computer.computerAttack(game.human.gameboard);
  game.checkGameOver();
  showMessage(game);
  boardHuman.innerHTML = "";
  renderBoardHuman(game, Ship);
}

function showMessage(game) {
  if (game.gameOver) {
    let message;
    const player = game.currentPlayer;
    if (player == game.human) 
        message = "Congratulations! You win!" 
      else
        message = "Sorry, Computer wins!";
      document.querySelector("p").textContent = message;
    }
  }
