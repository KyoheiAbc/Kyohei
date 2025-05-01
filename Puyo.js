import { Utils } from "./Utils.js";

export class Puyo {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.frozenCount = 0;
    }

    move(direction, puyos) {


        const startPosition = { x: this.x, y: this.y };

        this.x += direction.x * 16;
        this.y += direction.y * 16;

        let collision = Utils.isColliding(this, puyos);
        if (collision == null) {
            return;
        }

        if (direction.y !== 0) {
            this.y = collision.y - (direction.y > 0 ? 16 : -16);
            return;
        }

        const diffY = this.y - collision.y;

        this.y = collision.y + (diffY > 0 ? 16 : -16);

        collision = Utils.isColliding(this, puyos);
        if (collision == null) {
            return;
        }

        this.x = startPosition.x;
        this.y = startPosition.y;

    }

    hardDrop(puyos) {
        for (let i = 0; i < 16; i++) {
            this.move({ x: 0, y: 1 }, puyos);
        }
        this.frozenCount = 20;
    }

    update(puyos) {
        this.y += 1;
        if (Utils.isColliding(this, puyos)) {
            this.y -= 1;
            this.frozenCount++;
        } else {
            this.frozenCount = 0;
        }
    }

}