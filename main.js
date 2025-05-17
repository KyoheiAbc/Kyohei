import { InputHandler } from "./InputHandler.js";
import { Puyo } from "./Puyo.js";

const FPS = 20;
const FRAME_DURATION = 1000 / FPS;

let lastTime = performance.now();


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const inputHandler = new InputHandler();

let puyos = [];

function gameLoop(now) {
    const delta = now - lastTime;
    if (delta >= FRAME_DURATION) {
        update();
        lastTime = now;
    }
    requestAnimationFrame(gameLoop);
}


function update() {

    if (inputHandler.inputQueue.length > 0) {
        const input = inputHandler.inputQueue.shift();
        const newPuyo = new Puyo(input.x, input.y, Math.floor(Math.random() * 4));
        puyos.push(newPuyo);

    }

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    puyos.forEach(puyo => {
        const canvasX = puyo.x * 128 / 200;
        const canvasY = puyo.y * 256 / 400;
        ctx.fillStyle = `hsl(${puyo.color * 60}, 50%, 50%)`;
        ctx.fillRect(canvasX - 8, canvasY - 8, 16, 16);
    });

}


requestAnimationFrame(gameLoop);