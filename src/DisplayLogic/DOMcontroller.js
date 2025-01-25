export class RenderGame {
  constructor(container, playerOne, playerTwo) {
    this.container = document.querySelector(container);
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = this.playerOne;
  }

  initGame() {
    this.container.innerHTML = '';

    const turnDisplay = this.creatTurnDisplay();

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');

    const playerBoard = this.createBoard(this.playerOne);
    playerBoard.id = 'player-board';

    const computerBoard = this.createBoard(this.playerTwo);
    computerBoard.id = 'computer-board';

    boardContainer.append(playerBoard, computerBoard);
    this.container.append(turnDisplay, boardContainer);
  }

  createBoard(player) {
    const container = document.createElement('div');
    container.classList.add('board-wrapper');

    const boardName = document.createElement('h2');
    boardName.innerText = `${player.name}'s waters`;

    const board = document.createElement('div');
    board.classList.add('game-board');

    for (let row = 0; row < player.gameboard.size; row++) {
      for (let col = 0; col < player.gameboard.size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        board.appendChild(cell);

        if (
          player.gameboard.gameboard[row][col] === 'ship' &&
          !player.isComputer
        ) {
          cell.classList.add('ship');
        }
      }
    }

    container.append(board, boardName);

    return container;
  }

  creatTurnDisplay() {
    const container = document.createElement('div');
    container.classList.add('turn-display');

    const message = document.createElement('h2');
    message.classList.add('message');

    container.append(message);

    return container;
  }

  updateDisplay() {
    const message = document.querySelector('.message');
    message.innerText = `${this.currentPlayer.name}'s turn`;
  }

  computerTurn() {
    const { result, row, col } = this.playerTwo.attack(
      this.playerOne.gameboard,
    );

    const message = document.querySelector('.message');
    const playerBoard = document.getElementById('player-board');
    const cell = playerBoard.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`,
    );

    // Display attack result
    message.innerText = result
      ? 'The enemy hit your ship!'
      : 'The enemy missed!';
    this.updateCell(cell, result);

    // Check if computer wins
    if (this.playerOne.gameboard.gameOver()) {
      message.innerText = 'Oh no! The enemy sunk all your battleships';
    }

    // Change back to player turn after delay
    setTimeout(() => {
      this.toggleTurn();
      this.updateDisplay();
    }, 1000);
  }

  updateCell(cell, result) {
    if (result === true) {
      cell.classList.add('hit');
      return 'You hit an enemy ship!';
    } else if (result === false) {
      cell.classList.add('miss');
      return 'You missed...';
    }
  }

  toggleTurn() {
    this.currentPlayer === this.playerOne
      ? (this.currentPlayer = this.playerTwo)
      : (this.currentPlayer = this.playerOne);
  }
}
