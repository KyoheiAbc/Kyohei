export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        // スプライト画像を一度だけ読み込む
        this.sprite = new Image();
        this.sprite.src = 'sprite.png';
    }

    // 色のHSL値を計算するヘルパーメソッド
    getColorStyle(colorCode) {
        if (colorCode === -1) {
            return "hsl(0, 0%, 40%)";
        }
        return `hsl(${colorCode * 60}, 50%, 50%)`;
    }

    // 個別のぷよを描画するメソッド
    renderPuyo(puyo, isCurrentPuyo = false) {
        this.ctx.fillStyle = this.getColorStyle(puyo.color);

        if (isCurrentPuyo) {
            this.ctx.beginPath();
            // スプライトが読み込まれている場合のみ描画
            if (this.sprite.complete) {
                this.ctx.fillRect(puyo.x - 8, puyo.y - 8, 16, 16);

                this.ctx.globalCompositeOperation = 'multiply';
                this.ctx.drawImage(this.sprite, puyo.x - 8, puyo.y - 8, 16, 16);
                this.ctx.globalCompositeOperation = 'source-over'; // デフォルトに戻す
            } else {
                // スプライトが読み込まれていない場合は通常の四角形を描画
                this.ctx.fillRect(puyo.x - 8, puyo.y - 8, 16, 16);
            }
            this.ctx.fill();
        } else {
            this.ctx.fillRect(puyo.x - 8, puyo.y - 8, 16, 16);
        }
    }

    render(puyoManager) {
        const puyos = puyoManager.puyos;
        const puyo = puyoManager.currentPuyo;

        // 画面をクリア
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // 現在のぷよを描画
        if (puyo != null) {
            this.renderPuyo(puyo, true);
        }

        // 他のすべてのぷよを描画
        for (let i = 0; i < puyos.length; i++) {
            if (puyos[i] !== puyo) {
                this.renderPuyo(puyos[i]);
            }
        }
    }
}
