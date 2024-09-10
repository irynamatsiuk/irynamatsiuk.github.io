const allowedChoices = [
    "Rock",
    "Paper",
    "Scissors"
]

// Create div for round result
const resultDiv = document.createElement("div");
document.querySelector(".container").appendChild(resultDiv);

let userScore = 0;
let computerScore = 0; 

// Create  div for user\computer score
const userScoreDiv = document.createElement("div");
document.querySelector(".container").appendChild(userScoreDiv);

const computerScoreDiv = document.createElement("div");
document.querySelector(".container").appendChild(computerScoreDiv);

// Winner of the game
const winner = document.createElement("p");
document.querySelector(".container").appendChild(winner);

const rock = document.querySelector("#rock")
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

// Set score to zero on page load
resetScore();

// Get random computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * allowedChoices.length);
    return allowedChoices[randomIndex];
}


// EventListeners for buttons (user's choise)
rock.addEventListener("click", function() {
    resetScore();
    const computer = getComputerChoice();
    const user = "Rock";
    playRound(user, computer);
    console.log(user,computer);
    showGameResult();
});

paper.addEventListener("click", function() {
    resetScore();
    const computer = getComputerChoice();
    const user = "Paper";
    playRound(user, computer);
    console.log(user,computer);
    showGameResult();
});

scissors.addEventListener("click", function() {
    resetScore();
    const computer = getComputerChoice();
    const user = "Scissors";
    playRound(user, computer);
    console.log(user,computer);
    showGameResult();
});

// Shows round result in a div
function out(element, text) {
    element.textContent = text;
}

// Round result and scores update
function winMessage(winner, loser) {
    out(resultDiv, `You Won! ${winner} beats ${loser}`);
    userScore += 1;
    out(userScoreDiv, userScore);
}

function loseMessage(loser, winner) {
    out(resultDiv, `You Lost! ${winner} beats ${loser}`);
    computerScore += 1;
    out(computerScoreDiv, computerScore)
}
function tieMessage() {
    out(resultDiv, `Tie!`);
}


function playRound(playerSelection, computerSelection) {
    if (playerSelection === "Rock" && computerSelection === "Paper") {
        return loseMessage(playerSelection, computerSelection);
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") {
        return winMessage(playerSelection, computerSelection);
    } else if (playerSelection === "Paper" && computerSelection === "Scissors") {
        return loseMessage(playerSelection, computerSelection);
    } else if (playerSelection === "Paper" && computerSelection === "Rock") {
        return winMessage(playerSelection, computerSelection);
    } else if (playerSelection === "Scissors" && computerSelection === "Rock") {
        return loseMessage(playerSelection, computerSelection);
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
        return winMessage(playerSelection, computerSelection);
    } else {
    return tieMessage()   
    }
};



function showGameResult() {
    if (userScore == 5) {
        out(winner, "Player won the game!");  
    } else if (computerScore == 5) {
        out(winner, "Computer won the game!");
    }
}

function resetScore() {
    if (computerScore == 5 || userScore == 5) {
    userScore = 0;
    computerScore = 0;
    }
    out(userScoreDiv, userScore);
    out(computerScoreDiv, computerScore);
    out(winner, "");
}