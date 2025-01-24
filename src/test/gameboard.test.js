import { describe, test, it, beforeEach, expect, jest } from '@jest/globals';
import { Gameboard } from '../gameLogic/gameboard';

describe('Gameboard Class', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard(10);
    ship = {
      name: 'Carrier',
      length: 5,
      hit: jest.fn(),
      sunk: false,
      location: [],
    };
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
});
