import { InputHandler } from './InputHandler.js';
import { Renderer } from './Renderer.js';
import { PuyoManager } from './PuyoManager.js';
import { Utils } from './Utils.js';

export class GameManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.inputHandler = new InputHandler();
        this.renderer = new Renderer(this.ctx);


        this.puyoManager = new PuyoManager();


        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 16; y++) {
                if (x == 0 || x == 7 || y == 0 || y == 15) {
                    this.puyoManager.addPuyo(x * 16 + 8, y * 16 + 8, -1);
                }
            }
        }

        this.puyoManager.addPuyo(1 * 16 + 8, 6 * 16 + 8, -1);
        this.puyoManager.addPuyo(3 * 16 + 8, 6 * 16 + 8, -1);
        this.puyoManager.addPuyo(3 * 16 + 8, 8 * 16 + 8, -1);

        this.puyoManager.addPuyo(4 * 16 + 8, 6 * 16 + 8, Utils.randomColor());
        this.puyoManager.addPuyo(6 * 16 + 8, 6 * 16 + 8, Utils.randomColor());
        this.puyoManager.addPuyo(6 * 16 + 8, 8 * 16 + 8, Utils.randomColor());



    }

    start() {
        console.log("Game started");
        setInterval(() => this.update(), 1000 / 20);
    }

    update() {
        const direction = this.inputHandler.getNextDirection();
        if (direction) {

            if (direction === 11) {
                this.puyoManager.currentPuyo.hardDrop(this.puyoManager.puyos);
                console.log("Hard drop executed");
            }

            const moves = {
                2: { x: 0, y: 1 },
                8: { x: 0, y: -1 },
                4: { x: -1, y: 0 },
                6: { x: 1, y: 0 }
            };

            const move = moves[direction];
            if (move) {
                this.puyoManager.currentPuyo.move(move, this.puyoManager.puyos);
                console.log(`Moved puyo: ${direction}`);
            }
        }

        this.puyoManager.update();





        this.renderer.render(this.puyoManager);
    }
}
