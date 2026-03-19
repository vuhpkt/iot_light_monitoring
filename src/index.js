import express from 'express';
import http from 'http'
import { Server } from 'socket.io'
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import route from './routes/index.js'
import db from './config/db/index.js'

const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Connect to DB
db.testConnection()

// Use static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(express.json())

// Template engine
app.engine('hbs', engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Routes init
route(app)

app.use((err, req, res, next) => {
    console.error(`[SERVER]: ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server error",
    });
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('hello', 'world');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

export default io
