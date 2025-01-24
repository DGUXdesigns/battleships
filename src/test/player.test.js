import { beforeEach, describe, it, expect } from '@jest/globals';
import { Player } from '../gameLogic/player';

describe('Player Class', () => {
  let player;
  let computer;

  beforeEach(() => {
    player = new Player('dave');
    computer = new Player('computer');
  });

  it('Should be an object', () => {
    expect(player).toBeInstanceOf(Object);
  });

  it('Should have a name property', () => {
    expect(player).toHaveProperty('name');
    expect(player.name).toEqual('Dave');
  });

  it("Should have it's own gameboard", () => {
    expect(player).toHaveProperty('gameboard');
  });

  it('Should differentiate between human and AI', () => {
    expect(player.isComputer).toBe(false);
    expect(computer.isComputer).toBe(true);
  });
});
