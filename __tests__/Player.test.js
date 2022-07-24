const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

console.log(new Potion());
test('creates a player object', () => {
    const player = new Player('Ryan');

    expect(player.name).toBe('Ryan');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('gets player stats as an object', () => {
    const player = new Player('Ryan');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets Inventory from player or returns false', () => {
    const player = new Player('Ryan');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test('gets players health values', () => {
    const player = new Player('Ryan');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('check if player is alive or not', () => {
    const player = new Player('Ryan');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test('subtracts health from player health', () => {
    const player = new Player('Ryan');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

