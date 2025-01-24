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
}
