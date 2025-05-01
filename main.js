import { GameManager } from './GameManager.js';
import { ConsoleManager } from './ConsoleManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas");
    const consoleManager = new ConsoleManager();
    const game = new GameManager(canvas);

    console.log("Game initialized");
    game.start();
});
