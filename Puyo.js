import { Utils } from "./Utils.js";

export class PuyoPair {
    constructor(parentPuyo, childPuyo) {
        this.parentPuyo = parentPuyo;
        this.childPuyo = childPuyo;
        this.relativePosition = { x: 0, y: -16 };
    }

    move(direction, puyos) {

        const startPosition = { x: this.parentPuyo.x, y: this.parentPuyo.y };

        if (direction.x === this.relativePosition.x && direction.y === this.relativePosition.y) {
            this.childPuyo.move(direction, puyos);
            this.synchronize(this.childPuyo);
            return;
        }
        this.parentPuyo.move(direction, puyos);
        this.synchronize(this.parentPuyo);
        if (Utils.isColliding(this.childPuyo, puyos) == null) {
            return;
        }

        this.parentPuyo.x = startPosition.x;
        this.parentPuyo.y = startPosition.y;
        this.synchronize(this.parentPuyo);

        this.childPuyo.move(direction, puyos);
        this.synchronize(this.childPuyo);
        if (Utils.isColliding(this.parentPuyo, puyos) == null) {
            return;
        }

        this.parentPuyo.x = startPosition.x;
        this.parentPuyo.y = startPosition.y;
        this.synchronize(this.parentPuyo);

    }

    rotate(puyos) {

        const startPosition = { x: this.parentPuyo.x, y: this.parentPuyo.y };
        puyos.splice(puyos.indexOf(this.parentPuyo), 1);
        this.childPuyo.x = this.parentPuyo.x;
        this.childPuyo.y = this.parentPuyo.y;

        if (this.relativePosition.x === 0 && this.relativePosition.y === -16) {
            this.childPuyo.move({ x: 16, y: 0 }, puyos);
            this.relativePosition = { x: 16, y: 0 };
        } else if (this.relativePosition.x === -16 && this.relativePosition.y === 0) {
            this.childPuyo.move({ x: 0, y: -16 }, puyos);
            this.relativePosition = { x: 0, y: -16 };
        }
        else if (this.relativePosition.x === 0 && this.relativePosition.y === 16) {
            this.childPuyo.move({ x: -16, y: 0 }, puyos);
            this.relativePosition = { x: -16, y: 0 };
        } else if (this.relativePosition.x === 16 && this.relativePosition.y === 0) {
            this.childPuyo.move({ x: 0, y: 16 }, puyos);
            this.relativePosition = { x: 0, y: 16 };
        }
        this.synchronize(this.childPuyo);

        if (Utils.isColliding(this.parentPuyo, puyos) !== null) {
            console.error("Collision detected, reverting rotation");
            this.childPuyo.x = startPosition.x;
            this.childPuyo.y = startPosition.y;
            if (this.relativePosition.x === 0 && this.relativePosition.y === -16) {
                this.relativePosition = { x: 16, y: 0 };
            }
            else if (this.relativePosition.x === -16 && this.relativePosition.y === 0) {
                this.relativePosition = { x: 0, y: 16 };
            }
            else if (this.relativePosition.x === 0 && this.relativePosition.y === 16) {
                this.relativePosition = { x: -16, y: 0 };
            } else if (this.relativePosition.x === 16 && this.relativePosition.y === 0) {
                this.relativePosition = { x: 0, y: -16 };
            }
            this.synchronize(this.childPuyo);

        }




        puyos.push(this.parentPuyo);

    }

    synchronize(puyo) {
        if (puyo === this.parentPuyo) {
            this.childPuyo.x = this.parentPuyo.x + this.relativePosition.x;
            this.childPuyo.y = this.parentPuyo.y + this.relativePosition.y;
        } else if (puyo === this.childPuyo) {
            this.parentPuyo.x = this.childPuyo.x - this.relativePosition.x;
            this.parentPuyo.y = this.childPuyo.y - this.relativePosition.y;
        }

    }




}

export class Puyo {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.frozenCount = 0;
    }

    move(direction, puyos) {


        const startPosition = { x: this.x, y: this.y };

        this.x += direction.x;
        this.y += direction.y;

        let collision = Utils.isColliding(this, puyos);
        if (collision == null) {
            return;
        }

        if (direction.y !== 0) {
            this.y = collision.y - (direction.y > 0 ? 16 : -16);
            return;
        }

        const diffY = this.y - collision.y;
        if (Math.abs(diffY) < 8) {
            this.x = startPosition.x;
            this.y = startPosition.y;
            return;
        }

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
            this.move({ x: 0, y: 16 }, puyos);
        }
        this.frozenCount = 20;
    }
    fall(puyos) {
        const startY = this.y;
        this.move({ x: 0, y: 1 }, puyos);
        if (this.y === startY) {
            this.frozenCount++;
        } else {
            this.frozenCount = 0;
        }
    }

    update(puyos) {
        const startY = this.y;
        this.move({ x: 0, y: 16 }, puyos);
        if (this.y === startY) {
            this.frozenCount++;
        } else {
            this.frozenCount = 0;
        }
    }

}