import { GameManager } from './GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas");
    const game = new GameManager(canvas);
    game.start();
});
