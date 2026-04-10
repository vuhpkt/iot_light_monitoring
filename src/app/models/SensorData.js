import db from '../../configs/db/index.js'

function findByDeviceId(deviceId) {
    const sql = "SELECT * FROM sensor_data WHERE device_id = $1"
    return db.query(sql, [deviceId])
}

function findAll() {
    const sql = "SELECT * FROM sensor_data"
    return db.query(sql)
}

function findLatest(deviceId) {
    const sql = "SELECT * FROM sensor_data WHERE device_id = $1 ORDER BY id DESC LIMIT 1"
    return db.query(sql, [deviceId]).then(res => res[0])
}

function create(deviceId, value) {
    const sql = "INSERT INTO sensor_data(device_id, value) VALUES ($1, $2) RETURNING *"
    return db.query(sql, [deviceId, value]).then(res => res[0])
}

export default { findByDeviceId, findAll, findLatest, create }
