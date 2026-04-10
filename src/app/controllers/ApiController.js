import SensorData from '../models/SensorData.js'
import Device from '../models/Device.js'

let clients = []

class ApiController {

    // [GET] /light-levels
    show(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        })
        clients.push(res)
        req.on('close', () => {
            clients = clients.filter(client => client !== res)
        })
    }

    // [POST] /light-levels
    createData(req, res, next) {
        const deviceId = req.body.device_id
        const value = req.body.value
        return SensorData.create(deviceId, value)
            .then(data => {
                clients.forEach(client => {
                    client.write(`data: ${JSON.stringify(data)}\n\n`)
                })
                res.send('OK')
            })
    }

    // [POST] /devices
    createDevice(req, res, next) {
        const { id, name, location, measurement_interval } = req.body
        return Device.create(id, name, location, measurement_interval)
            .then(data => {
                res.send('OK')
                console.log(data)
            })
    }
}

export default new ApiController
