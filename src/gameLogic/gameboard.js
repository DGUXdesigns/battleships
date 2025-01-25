export class Gameboard {
  constructor(size) {
    this.size = size;
    this.gameboard = Array.from({ length: size }, () => Array(size).fill(null));
    this.prevAttacks = [];
    this.ships = [];
  }

  isShipAdjacent(row, col, ship) {
    const buffer = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    // Check all adjacent cells around the (row, col)
    for (const [dr, dc] of buffer) {
      const adjacentRow = row + dr;
      const adjacentCol = col + dc;

      if (
        adjacentRow >= 0 &&
        adjacentRow < this.size &&
        adjacentCol >= 0 &&
        adjacentCol < this.size &&
        this.gameboard[adjacentRow][adjacentCol] !== null &&
        !(
          this.gameboard[adjacentRow][adjacentCol] === 'ship' &&
          ship &&
          ship.location.some(
            (loc) => loc.row === adjacentRow && loc.col === adjacentCol,
          )
        )
      ) {
        return false; // Return false if adjacent cell has a ship that is not the ship being placed
      }
    }

    return true;
  }

  placeShip(ship, row, col, horizontal = true) {
    ship.location = [];

    for (let i = 0; i < ship.length; i++) {
      const currentRow = horizontal ? row : row + i;
      const currentCol = horizontal ? col + i : col;

      // Ensure placement is within bounds
      if (
        currentRow >= this.size ||
        currentCol >= this.size ||
        this.gameboard[currentRow][currentCol] !== null ||
        !this.isShipAdjacent(currentRow, currentCol, ship)
      ) {
        ship.location.forEach(({ row, col }) => {
          this.gameboard[row][col] = null;
        });
        throw new Error('Invalid ship placement');
      }

      this.gameboard[currentRow][currentCol] = 'ship';
      ship.location.push({ row: currentRow, col: currentCol });
    }

    this.ships.push(ship);
  }

  randomPlaceShip(ship) {
    let placed = false;

    while (!placed) {
      const horizontal = Math.random() < 0.5; // Randomly decide orientation (horizontal/vertical)
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);

      try {
        this.placeShip(ship, row, col, horizontal);
        placed = true;
      } catch (error) {
        continue;
      }
    }
  }

  receiveAttack(row, col) {
    const target = this.gameboard[row][col];

    // Check if location was already attacked
    if (
      this.prevAttacks.some(
        (attack) => attack.row === row && attack.col === col,
      )
    ) {
      throw new Error("Can't attack the same location twice");
    }

    this.prevAttacks.push({ row, col });

    // Check if nothing was hit
    if (target === null) {
      this.gameboard[row][col] = 'miss';
      return false;
    }

    // Check if ship was hit
    if (target === 'ship') {
      for (let ship of this.ships) {
        for (let i = 0; i < ship.location.length; i++) {
          if (ship.location[i].row === row && ship.location[i].col === col) {
            ship.hit();
            this.gameboard[row][col] = 'hit';
            return true;
          }
        }
      }
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
