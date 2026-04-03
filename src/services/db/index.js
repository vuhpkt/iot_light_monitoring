import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('[Database]: Connected successfully at', res.rows[0].now);
    } catch (err) {
        console.error('[Database]: Startup connection failed!', err.message);
    }
}

async function query(text, params) {
    try {
        const res = await pool.query(text, params)
        return res.rows
    } catch(err) {
        console.error('[Database]: ', err.message)
    }
}

export default { testConnection, query }

