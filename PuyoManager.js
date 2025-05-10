import { Puyo } from "./Puyo.js";
import { PuyoPair } from "./Puyo.js";
import { Utils } from "./Utils.js";

export class PuyoManager {
    constructor() {
        this.puyos = [];
        this.PuyoPair = new PuyoPair(
            this.addPuyo(4 * 16 + 8, 2 * 16 + 8, Utils.randomColor()),
            this.addPuyo(4 * 16 + 8, 1 * 16 + 8, Utils.randomColor())
        );

        // this.currentPuyo = this.addPuyo(4 * 16 + 8, 1 * 16 + 8, Utils.randomColor());
    }

    addPuyo(x, y, color) {
        this.puyos.push(new Puyo(x, y, color));
        console.log(`New puyo created at (${x},${y}) with color ${color}`);
        return this.puyos[this.puyos.length - 1];
    }

    update() {
        // if (this.currentPuyo !== null) {
        //     this.currentPuyo.fall(this.puyos);
        // }


        // for (let i = 0; i < this.puyos.length; i++) {
        //     if (this.puyos[i].color === -1) {
        //         continue;
        //     }
        //     if (this.puyos[i] === this.currentPuyo) {
        //         continue;
        //     }
        //     this.puyos[i].update(this.puyos);
        // }


    }
    allPuyosFrozen() {
        for (const puyo of this.puyos) {
            if (puyo.color === -1) {
                continue;
            }
            if (puyo === this.currentPuyo) {
                continue;
            }
            if (puyo.frozenCount < 20) {
                return false;
            }
        }
        return true;
    }

    removePuyo(puyo) {
        const index = this.puyos.indexOf(puyo);
        if (index > -1) {
            this.puyos.splice(index, 1);
            console.log(`Puyo removed at (${puyo.x},${puyo.y})`);
        }
    }



}