export class InputHandler {
    constructor() {
        this.touchPosition = null;
        this.inputQueue = [];
        this.movementThreshold = 32;
        this.moved = false;

        this.setupEventListeners();
    }

    setupEventListeners() {
        addEventListener("touchstart", (e) => {
            thris.moved = false;
            e.preventDefault();
            this.touchPosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        });

        addEventListener("touchend", (e) => {
            e.preventDefault();
            this.touchPosition = null;
            if (!this.moved) {
                this.inputQueue.push(5);
            }

        });

        addEventListener("touchmove", (e) => {
            e.preventDefault();
            if (this.touchPosition) {
                const delta = {
                    x: e.touches[0].clientX - this.touchPosition.x,
                    y: e.touches[0].clientY - this.touchPosition.y
                };
                this.handleMovement(delta);
            }
        }, { passive: false });

        addEventListener("mousedown", (e) => {
            this.moved = false;

            this.touchPosition = {
                x: e.clientX,
                y: e.clientY
            };
        });

        addEventListener("mouseup", () => {
            this.touchPosition = null;
            if (!this.moved) {
                this.inputQueue.push(5);
            }

        });

        addEventListener("mousemove", (e) => {
            if (this.touchPosition) {
                const delta = {
                    x: e.clientX - this.touchPosition.x,
                    y: e.clientY - this.touchPosition.y
                };
                this.handleMovement(delta);
            }
        });

        const button = document.getElementById("button");
        button.addEventListener("click", () => {
            this.inputQueue.push(11);
        });
        button.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.inputQueue.push(11);
        });
    }

    handleMovement(delta) {
        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            if (delta.x > this.movementThreshold) {
                this.touchPosition.x += this.movementThreshold;
                this.inputQueue.push(6);
                this.moved = true;
            } else if (delta.x < -this.movementThreshold) {
                this.touchPosition.x -= this.movementThreshold;
                this.inputQueue.push(4);
                this.moved = true;

            }
        } else {
            if (delta.y > this.movementThreshold) {
                this.touchPosition.y += this.movementThreshold;
                this.inputQueue.push(2);
                this.moved = true;

            } else if (delta.y < -this.movementThreshold) {
                this.touchPosition.y -= this.movementThreshold;
                this.inputQueue.push(8);
                this.moved = true;

            }
        }

        if (this.inputQueue.length > 5) {
            this.inputQueue.pop();
        }
    }

    getNextDirection() {
        return this.inputQueue.length > 0 ? this.inputQueue.shift() : null;
    }
}
