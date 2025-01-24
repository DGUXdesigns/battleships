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

    return board;
  }

  updateCell(cell, result) {
    if (result === true) {
      cell.classList.add('hit');
      return 'Enemy ship hit!';
    } else if (result === false) {
      cell.classList.add('miss');
      return 'You missed...';
    }
  }

  creatTurnDisplay() {
    const container = document.createElement('div');
    container.classList.add('turn-display');

    const message = document.createElement('h2');
    message.classList.add('message');

    container.append(message);

    return container;
  }
}
