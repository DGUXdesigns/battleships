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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const player = new Player(name.value);
  const computer = new Player('computer');

  player.gameboard.placeShip(carrier, 0, 0, false);
  player.gameboard.placeShip(battleship, 2, 5, true);
  player.gameboard.placeShip(cruiser, 6, 2, false);
  player.gameboard.placeShip(submarine, 4, 7, true);
  player.gameboard.placeShip(destroyer, 8, 5, true);

  computer.gameboard.placeShip(carrier, 0, 0, false);
  computer.gameboard.placeShip(battleship, 2, 5, true);
  computer.gameboard.placeShip(cruiser, 6, 2, false);
  computer.gameboard.placeShip(submarine, 4, 7, true);
  computer.gameboard.placeShip(destroyer, 8, 5, true);

  name.value = '';
  const game = new RenderGame('main', player, computer);
  game.initGame();

  // Attach event listener directly after initializing the game
  const message = document.querySelector('.message');
  const enemyBoard = document.getElementById('computer-board');
  message.innerText = game.updateDisplay();

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
          return;
        }

        game.toggleTurn();

        // Simulate computer thinking
        setTimeout(() => {
          game.updateDisplay();
          game.computerTurn();
        }, 1000);
      }
    } catch (error) {
      message.innerText = error.message;
    }
  });
});
