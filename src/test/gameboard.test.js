import { describe, test, it, beforeEach, expect } from '@jest/globals';
import { Gameboard } from '../gameLogic/gameboard';
import { Ship } from '../gameLogic/ship';

describe('Gameboard Class', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard(10);
    ship = new Ship('Carrier', 5);
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.placeShip(ship, 3, 3, false);
  });

  it('Should be an object', () => {
    expect(gameboard).toBeInstanceOf(Object);
  });

  it('should keep track of missed attacks', () => {
    expect(gameboard).toHaveProperty('missedAttacks');
    expect(gameboard.missedAttacks).toEqual([]);
  });

  it("should keep track of all it's ships", () => {
    expect(gameboard).toHaveProperty('ships');
  });

  it('should have a gameboard of 10x10', () => {
    expect(gameboard.gameboard).toBeInstanceOf(Array);
    expect(gameboard.gameboard.length).toBe(10);
  });

  describe('placeShip', () => {
    test('Should place ship horizontally', () => {
      expect(gameboard.gameboard[1][1]).toBe('Carrier');
      expect(gameboard.gameboard[1][2]).toBe('Carrier');
      expect(gameboard.gameboard[1][3]).toBe('Carrier');
      expect(gameboard.gameboard[1][4]).toBe('Carrier');
      expect(gameboard.gameboard[1][5]).toBe('Carrier');
    });

    test('Should place ship vertically', () => {
      expect(gameboard.gameboard[3][3]).toBe('Carrier');
      expect(gameboard.gameboard[4][3]).toBe('Carrier');
      expect(gameboard.gameboard[5][3]).toBe('Carrier');
      expect(gameboard.gameboard[6][3]).toBe('Carrier');
      expect(gameboard.gameboard[7][3]).toBe('Carrier');
    });
  });

  describe('receiveAttack', () => {
    test("Shouldn't attack the same location twice", () => {
      gameboard.receiveAttack(2, 2);

      expect(() => {
        gameboard.receiveAttack(2, 2);
      }).toThrowError("Can't attack the same place twice");
    });

    test('Should mark missed shots', () => {
      gameboard.receiveAttack(2, 2);
      expect(gameboard.gameboard[2][2]).toBe('miss');
    });

    test('Should mark succesful attacks on ships', () => {
      gameboard.receiveAttack(5, 3);
      expect(gameboard.gameboard[5][3]).toBe('hit');
    });
  });

  describe('gameOver', () => {
    test('Game should end once all ships are Sunk', () => {
      gameboard.receiveAttack(1, 1);
      gameboard.receiveAttack(1, 2);
      gameboard.receiveAttack(1, 3);
      gameboard.receiveAttack(1, 4);
      gameboard.receiveAttack(1, 5);

      gameboard.receiveAttack(3, 3);
      gameboard.receiveAttack(4, 3);
      gameboard.receiveAttack(5, 3);
      gameboard.receiveAttack(6, 3);
      gameboard.receiveAttack(7, 3);

      expect(gameboard.gameOver()).toBe(true);
    });
  });
});
