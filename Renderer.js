export class Renderer {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
    }

    getColorStyle(colorCode) {
        if (colorCode === -1) {
            return "hsl(0, 0%, 40%)";
        }
        return `hsl(${colorCode * 60}, 50%, 50%)`;
    }

    renderPuyo(puyo) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.getColorStyle(puyo.color);
        this.ctx.beginPath();
        this.ctx.arc(puyo.x, puyo.y, 8, 0, Math.PI * 2);
        this.ctx.fill();

    }

}
