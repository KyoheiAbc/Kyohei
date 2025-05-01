export class ConsoleManager {
    constructor() {
        this.consoleElement = document.getElementById('console-output');
        this.messages = [];
        this.maxMessages = 300;

        // Intercept console.log
        this.originalConsoleLog = console.log;
        console.log = (...args) => {
            this.log(...args);
            this.originalConsoleLog.apply(console, args);
        };

        // Intercept console.error
        this.originalConsoleError = console.error;
        console.error = (...args) => {
            this.error(...args);
            this.originalConsoleError.apply(console, args);
        };

        // Intercept console.warn
        this.originalConsoleWarn = console.warn;
        console.warn = (...args) => {
            this.warn(...args);
            this.originalConsoleWarn.apply(console, args);
        };
    }

    log(...args) {
        this.addMessage(args.join(' '), 'log');
    }

    error(...args) {
        this.addMessage(args.join(' '), 'error');
    }

    warn(...args) {
        this.addMessage(args.join(' '), 'warn');
    }

    addMessage(message, type) {
        const timestamp = new Date().toLocaleTimeString();
        const formattedMessage = `[${timestamp}] ${message}`;

        this.messages.push({
            text: formattedMessage,
            type
        });

        // Limit the number of messages
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }

        this.updateDisplay();
    }

    updateDisplay() {
        this.consoleElement.innerHTML = '';

        this.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message.text;

            if (message.type === 'error') {
                messageElement.style.color = '#ff5555';
            } else if (message.type === 'warn') {
                messageElement.style.color = '#ffff55';
            }

            this.consoleElement.appendChild(messageElement);
        });

        // Auto-scroll to bottom
        this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
    }

    clear() {
        this.messages = [];
        this.updateDisplay();
    }
}
