export class Gameboard {
  constructor(size) {
    this.size = size;
    this.gameboard = Array(size).fill(null);
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, row, col, horizontal = true) {
    let currentRow;
    let currentCol;

    for (let i = 0; i < ship.length; i++) {
      horizontal
        ? (currentRow = row) && (currentCol = col + i)
        : (currentRow = row + i) && (currentCol = col);

      this.gameboard[currentRow][currentCol] = ship.name;
      ship.location.push({ row: currentRow, col: currentCol });
    }

    this.ships.push(ship);
  }

  receiveAttack;
}
