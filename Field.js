

export class Field {
    constructor(puyos) {
        this.grid = Array.from({ length: 16 }, () => Array(8).fill(null));

        for (const puyo of puyos) {
            const x = Math.floor(puyo.x / 16);
            const y = Math.floor(puyo.y / 16);
            this.grid[y][x] = puyo;
        }

    }

    removeConnectedPuyos() {

        let shouldRemove = [];
        const visited = Array.from({ length: 16 }, () => Array(8).fill(false));
        const directions = [
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: -1, dy: 0 }
        ];

        const isValid = (x, y) => x >= 1 && x < 7 && y >= 1 && y < 15;

        const dfs = (x, y, color, connected) => {
            visited[y][x] = true;
            connected.push({ x, y });

            for (const { dx, dy } of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (isValid(nx, ny) && !visited[ny][nx] && this.grid[ny][nx] && this.grid[ny][nx].color === color) {
                    dfs(nx, ny, color, connected);
                }
            }
        };

        for (let y = 1; y < 15; y++) {
            for (let x = 1; x < 7; x++) {
                if (this.grid[y][x] && !visited[y][x]) {
                    const connected = [];
                    dfs(x, y, this.grid[y][x].color, connected);

                    if (connected.length >= 3) {
                        for (const { x: cx, y: cy } of connected) {
                            shouldRemove.push(this.grid[cy][cx]);
                            this.grid[cy][cx] = null;
                        }
                    }
                }
            }
        }
        return shouldRemove;
    }



}