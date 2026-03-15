import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(express.urlencoded())
app.use(express.json())

app.engine('hbs', engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "resources", "views"))

app.use('/', (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


