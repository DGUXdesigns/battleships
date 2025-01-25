import './style.css';
import { Ship } from './gameLogic/ship';
import { Player } from './gameLogic/player';
import { RenderGame } from './DisplayLogic/DOMcontroller';

const form = document.getElementById('start-form');
const name = document.getElementById('name');

const carrier = new Ship('Carrier', 5);
const battleship = new Ship('Battleship', 4);
const cruiser = new Ship('Cruiser', 4);
const submarine = new Ship('Submarine', 3);
const destroyer = new Ship('Destroyer', 3);

const ships = [carrier, battleship, cruiser, submarine, destroyer];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const player = new Player(name.value);
  const computer = new Player('computer');

  ships.forEach((ship) => player.gameboard.randomPlaceShip(ship));
  ships.forEach((ship) => computer.gameboard.randomPlaceShip(ship));

  const game = new RenderGame('main', player, computer);
  game.initGame();

  name.value = '';

  // Attach event listener directly after initializing the game
  const message = document.querySelector('.message');
  const enemyBoard = document.getElementById('computer-board');

  enemyBoard.addEventListener('click', (event) => {
    try {
      if (game.currentPlayer === game.playerOne) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);
        const result = game.playerTwo.gameboard.receiveAttack(row, col);

        message.innerText = game.updateCell(cell, result);

        // Check if Player One wins
        if (game.playerTwo.gameboard.gameOver()) {
          message.innerText = 'You win! You sunk all their battleships!';
          game.endGame();
          return;
        }

        // Delay before turn switch
        setTimeout(() => {
          game.toggleTurn();
          game.updateDisplay();
        }, 800);

        // Simulate computer thinking
        setTimeout(() => {
          game.computerTurn();
        }, 1600);
      }
    } catch (error) {
      message.innerText = error.message;
    }
  });
});
