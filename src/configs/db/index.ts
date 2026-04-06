import { Pool, QueryResultRow, Result } from "pg"
import "dotenv/config"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    
    ssl: { rejectUnauthorized: false }
});

function testConnection() {
    return pool.query('SELECT NOW()')
        .then(res => {
            console.log('[Database]: Connected successfully at', res.rows[0].now)
        })
        .catch(err => console.error(err))
}

function query<Type extends QueryResultRow>(text: string, params?: any[]): Promise<Type[]> {
    return pool.query<Type>(text, params)
        .then(res => res.rows)
}

export default { testConnection, query }

