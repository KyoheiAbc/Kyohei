export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(puyoManager) {
        const puyos = puyoManager.puyos;
        const puyo = puyoManager.currentPuyo;

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = `hsl(${puyo.color * 60}, 50%, 50%)`;
        this.ctx.beginPath();
        this.ctx.arc(puyo.x, puyo.y, 8, 0, Math.PI * 2);
        this.ctx.fill();

        for (let i = 0; i < puyos.length; i++) {
            if (puyos[i] === puyo) {
                continue;
            }
            if (puyos[i].color === -1) {
                this.ctx.fillStyle = "hsl(0, 0%, 40%)";
            } else {
                this.ctx.fillStyle = `hsl(${puyos[i].color * 60}, 50%, 50%)`;
            }
            this.ctx.fillRect(puyos[i].x - 8, puyos[i].y - 8, 16, 16);
        }
    }
}
