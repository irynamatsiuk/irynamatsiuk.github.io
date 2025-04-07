# Project: Battleship

## Course: The Odin Project, Full Stack JavaScript path

### Chapter: "Testing JavaScript"

#### Description:

Battleship game project.  
Button "Start New Game" fills both grids with 5 ships in 5 sizes: from 1 to 5 cells. Missed attacks are marked with light-blue color, succeed attacks are marked with dark red. Once all ships on one of the boards are sunk, a message with game result will be shown.
Live version: [Battleship game](https://irynamatsiuk.github.io/live/battleship_live/template.html)

#### Assignment:

> 1. Create a **Ship** class/factory.
>    ‘Ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
>    Ships should have a **hit()** function that increases the number of ‘hits’ in the ship.
>    **isSunk()** is a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.
> 2. Create a **Gameboard** class/factory.
>    You should know our code is coming together by running the tests.
>    Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
>    Gameboards should have a **receiveAttack** function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
>    Gameboards should keep track of missed attacks so they can display them properly.
>    Gameboards should be able to report whether or not all of their ships have been sunk.
> 3. Create a Player class/factory.
>    There will be two types of players in the game, ‘real’ players and ‘computer’ players.
>    Each player object should contain its own gameboard.
> 4. Import your classes/factories into another file, and drive the game using event listeners to interact with your objects.
>    Create a module that helps you manage actions that should happen in the DOM.
> 5. Finish it up by implementing a system that allows players to place their ships.
>    For example, you can let them type coordinates for each ship or have a button to cycle through random placements.
