import db from "../../configs/db/index.js";

export interface IDevice {
    name: string,
    location: string,
    measurement_interval: number,
    id: string,
}

export interface IDeviceWithLatestData extends IDevice {
    latestValue: number,
    latestMeasurement: Date
}

function findAll() {
    const sql = "SELECT * FROM devices"
    return db.query<IDevice>(sql)
}

function findAllWithLatestData() {
    const sql = "SELECT d.*, sd.measured_at AS \"latestMeasurement\", sd.value AS \"latestValue\" " +
        "FROM devices d LEFT JOIN ( SELECT DISTINCT ON (device_id) device_id, value," +
        "measured_at, id FROM sensor_data ORDER BY device_id, id DESC) sd ON sd.device_id =  d.id"
    return db.query<IDeviceWithLatestData>(sql)
}

function create(id: string, name: string = "Unknown device", location: string = "Unknown location", measurement_interval: number = 60) {
    const sql = "INSERT INTO devices (id, name, location, measurement_interval) VALUES ($1, $2, $3, $4) ON CONFLICT(id) DO NOTHING RETURNING *"
    return db.query(sql, [id, name, location, measurement_interval])
}


export default { findAll, findAllWithLatestData, create }
