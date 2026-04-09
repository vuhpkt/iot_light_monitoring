import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import route from './routes/index.js'
import db from './configs/db/index.js'
// import mqttService from './configs/mqtt/index.js'

const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

interface AppError extends Error {
    statusCode: number
}

// Connect to DB
db.testConnection()
// mqttService.connect()

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

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(`[SERVER]: ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server error",
    });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

