import { Puyo } from "./Puyo.js";
import { Renderer } from "./Renderer.js";
import { InputHandler } from "./InputHandler.js";


const puyo = new Puyo(32, 64, 1);
const renderer = new Renderer();
const inputHandler = new InputHandler();

function inputToDirection(input) {
    switch (input) {
        case 2:
            return { x: 0, y: 1 };
        case 4:
            return { x: -1, y: 0 };
        case 6:
            return { x: 1, y: 0 };
        case 8:
            return { x: 0, y: -1 };
        default:
            return { x: 0, y: 0 };
    }
}


function loop() {

    const input = inputHandler.getNextDirection();
    if (input) {
        const direction = inputToDirection(input);
        puyo.x += 16 * direction.x;
        puyo.y += 16 * direction.y;
    }
    renderer.renderPuyo(puyo);



    setTimeout(loop, 1000 / 30);
}

loop();