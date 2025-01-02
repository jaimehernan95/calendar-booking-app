"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Serve static files (index.html, app.js, styles.css, etc.)
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
// Set up a route for the index page
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
app.listen(8080, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:8080');
});
