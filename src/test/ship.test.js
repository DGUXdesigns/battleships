import { expect, describe, it } from '@jest/globals';
import { Ship } from '../gameLogic/ship';

describe('Ship Class', () => {
  const ship = new Ship();

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
});
