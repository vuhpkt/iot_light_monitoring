import db from "../../configs/db/index.js";

function findAll() {
    const sql = "SELECT * FROM devices"
    return db.query(sql)
}

function findAllWithLatestData() {
    const sql = "SELECT d.*, sd.measured_at AS \"latestMeasurement\", sd.value AS \"latestValue\" " +
        "FROM devices d LEFT JOIN ( SELECT DISTINCT ON (device_id) device_id, value," +
        "measured_at, id FROM sensor_data ORDER BY device_id, id DESC) sd ON sd.device_id =  d.id"
    return db.query(sql)
}

function create(id, name = "Unknown device", location = "Unknown location", measurement_interval = 60) {
    const sql = "INSERT INTO devices (id, name, location, measurement_interval) VALUES ($1, $2, $3, $4) ON CONFLICT(id) DO NOTHING RETURNING *"
    return db.query(sql, [id, name, location, measurement_interval])
}

export default { findAll, findAllWithLatestData, create }
