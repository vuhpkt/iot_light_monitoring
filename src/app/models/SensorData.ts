import { QueryResultRow } from 'pg'
import db from '../../services/db/index.js'

export interface ISensorData {
    id: number,
    device_id: string,
    value: number,
    measured_at: Date
}

function findByDeviceId(deviceId: string) {
    const sql = "SELECT * FROM sensor_data WHERE device_id = $1"
    return db.query<ISensorData>(sql, [deviceId])
}

function findAll() {
    const sql = "SELECT * FROM sensor_data"
    return db.query<ISensorData>(sql)
}

function findLatest(deviceId: string) {
    const sql = "SELECT * FROM sensor_data WHERE device_id = $1 ORDER BY id DESC LIMIT 1"
    return db.query<ISensorData>(sql, [deviceId]).then(res => res[0])
}

function create(deviceId: string, value: number) {
    const sql = "INSERT INTO sensor_data(device_id, value) VALUES ($1, $2) RETURNING *"
    return db.query<ISensorData>(sql, [deviceId, value]).then(res => res[0])
}

export default { findByDeviceId, findAll, findLatest, create }
