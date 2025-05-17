export class InputHandler {

    constructor() {
        const canvas = document.getElementById('canvas');

        this.inputQueue = [];

        window.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log(`Mouse clicked at: ${x}, ${y}`);
            this.inputQueue.push({
                x: x,
                y: y
            });
        });
    }


} 