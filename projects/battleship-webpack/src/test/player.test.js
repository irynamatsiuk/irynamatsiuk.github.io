import { Player, ComputerPlayer } from "../player";

let player = new Player;
let computer = new ComputerPlayer;

player.gameboard.placeShip(3, 4, 5);
computer.gameboard.placeShip(2, 8, 3);


test("player's missed attack", () => {
    player.attack(computer.gameboard, 5, 6);
    const target = computer.gameboard.board[5][6];
    expect(target).toEqual("missed");
})

test("player's succeed attack", () => {
    player.attack(computer.gameboard, 8, 3);
    const target = computer.gameboard.board[8][3];
    expect(target).toEqual("hit");
})

test("computer attacks", () => {
    computer.computerAttack(player.gameboard, 5, 6);
    const target = computer.gameboard.board[5][6];
    expect(["hit", "missed"]).toContain(target);
})


