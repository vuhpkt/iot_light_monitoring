import db from "../../config/db/index.js";

async function findAll() {
    const sql = "SELECT * FROM devices"
    const res = await db.query(sql)
    return res
}

export default { findAll }
