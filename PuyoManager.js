import { Puyo } from "./Puyo.js";
import { Utils } from "./Utils.js";
export class PuyoManager {
    constructor() {
        this.puyos = [];

        this.currentPuyo = this.addPuyo(4 * 16 + 8, 1 * 16 + 8, Utils.randomColor());
    }

    addPuyo(x, y, color) {
        this.puyos.push(new Puyo(x, y, color));
        console.log(`New puyo created at (${x},${y}) with color ${color}`);
        return this.puyos[this.puyos.length - 1];
    }

    update() {
        this.currentPuyo.update(this.puyos);


        for (let i = 0; i < this.puyos.length; i++) {
            if (this.puyos[i].color === -1) {
                continue;
            }
            if (this.puyos[i] === this.currentPuyo) {
                continue;
            }
            this.puyos[i].update(this.puyos);
        }


    }


    removePuyo(puyo) {
        const index = this.puyos.indexOf(puyo);
        if (index > -1) {
            this.puyos.splice(index, 1);
            console.log(`Puyo removed at (${puyo.x},${puyo.y})`);
        }
    }



}