import { Gameboard } from './gameboard';

export class Player {
  constructor(name) {
    this.name = this.capitalize(name);
    this.isComputer = this.isAi(name);
    this.gameboard = new Gameboard(10);
  }

  isAi(name) {
    if (name === 'computer') {
      return true;
    }
    return false;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  attack(gameboard, row, col) {
    do {
      row = Math.floor(Math.random() * gameboard.size);
      col = Math.floor(Math.random() * gameboard.size);
    } while (
      gameboard.prevAttacks.some(
        (attack) => attack.row === row && attack.col === col,
      )
    );

    return { result: gameboard.receiveAttack(row, col), row, col };
  }
}
