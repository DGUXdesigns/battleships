import { describe, test, it, beforeEach, expect } from '@jest/globals';
import { Gameboard } from '../gameLogic/gameboard';

describe('Gameboard Class', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
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
});
