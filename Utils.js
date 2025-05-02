export class Utils {
    static isColliding(puyo, puyos) {
        for (const otherPuyo of puyos) {
            if (puyo === otherPuyo) continue; // Skip the same puyo

            const dx = puyo.x - otherPuyo.x;
            const dy = puyo.y - otherPuyo.y;
            const length = dx * dx + dy * dy;
            if (length < 16 * 16) {
                // console.log(`Collision detected between puyo at (${puyo.x}, ${puyo.y}) and (${otherPuyo.x}, ${otherPuyo.y})`);
                return otherPuyo; // Collision detected
            }
        }
        return null; // No collision
    }
    static randomColor() {
        return Math.floor(Math.random() * 3);
    }
}