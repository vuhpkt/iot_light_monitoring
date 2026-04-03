import db from '../../services/db/index.js'

async function findByDeviceId(deviceId) {
    const sql = "SELECT * FROM sensor_data WHERE device_id = $1"
    const res = await db.query(sql, deviceId)
    return res
}

async function findAll() {
    const sql = "SELECT * FROM sensor_data"
    const res = await db.query(sql)
    return res
}

async function findLatest(deviceId) {
    const sql = "SELECT * FROM sensor_data WHERE device_id = $1 ORDER BY id DESC LIMIT 1"
    const res = await db.query(sql, [deviceId])
    return res[0]
}

async function create(deviceId, value) {
    const sql = "INSERT INTO sensor_data(device_id, value) VALUES ($1, $2) RETURNING *"
    const res = await db.query(sql, [deviceId, value])    
    return res[0]
}

export default { findByDeviceId, findAll, findLatest, create }
