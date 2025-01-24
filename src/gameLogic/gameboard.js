export class Gameboard {
  constructor(size) {
    this.size = size;
    this.gameboard = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, row, col, horizontal = true) {
    for (let i = 0; i < ship.length; i++) {
      const currentRow = horizontal ? row : row + i;
      const currentCol = horizontal ? col + i : col;

      // Ensure placement is within bounds
      if (
        currentRow >= this.size ||
        currentCol >= this.size ||
        this.gameboard[currentRow][currentCol] !== null
      ) {
        throw new Error('Invalid ship placement');
      }

      this.gameboard[currentRow][currentCol] = ship.name;
      ship.location.push({ row: currentRow, col: currentCol });
    }

    this.ships.push(ship);
  }

  receiveAttack(row, col) {
    // Check if location was already attacked
    if (
      this.missedAttacks.some(
        (attack) => attack.row === row && attack.col === col,
      )
    ) {
      throw new Error("Can't attack the same place twice");
    }

    // Check if nothing was hit
    if (this.gameboard[row][col] === null) {
      this.gameboard[row][col] = 'miss';
      this.missedAttacks.push({ row, col });
      return false;
    }

    // Check if ship was hit
    const ship = this.ships.find(
      (ship) => ship.name === this.gameboard[row][col],
    );
    const hitLocation = ship.location.find(
      (loc) => loc.row === row && loc.col === col,
    );

    if (ship && hitLocation) {
      ship.hit();
      this.gameboard[row][col] = 'hit';
      return true;
    }
  }

  gameOver() {
    if (this.ships.every((ship) => ship.sunk)) {
      return true;
    } else {
      return false;
    }
  }
}
