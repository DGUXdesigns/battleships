import { expect, describe, it, test } from '@jest/globals';
import { Ship } from '../gameLogic/ship';

describe('Ship Class', () => {
  const ship = new Ship('BattleShip', 3);

  it('Should be an object', () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it('Should have the ship name', () => {
    expect(ship).toHaveProperty('name');
  });

  it('Should include ship length', () => {
    expect(ship).toHaveProperty('length');
  });

  it('Should contain number of "hits"', () => {
    expect(ship).toHaveProperty('hits');
  });

  it('Should tell you if a ship has sunk', () => {
    expect(ship).toHaveProperty('sunk');
  });

  describe('hit', () => {
    test('Hit should increment hits count', () => {
      expect(ship.hits).toBe(0);

      ship.hit();
      expect(ship.hits).toBe(1);

      ship.hit();
      expect(ship.hits).toBe(2);

      ship.hit();
      expect(ship.hits).toBe(3);
      expect(ship.sunk).toBe(true);
    });
  });
});
