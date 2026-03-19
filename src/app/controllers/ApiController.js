import io from '../../index.js'
import SensorData from '../models/SensorData.js'

class ApiController {
    // [POST] /light-levels
    async create(req, res, err) {
        try {
            const deviceId = req.body.device_id
            const value = req.body.value
            const data = await SensorData.create(deviceId, value)
            io.emit('send-sensor-data', data)
            res.send('OK')
        } catch (err) {
            next(err)
        }
    }
}

export default new ApiController
