import { Request, Response, NextFunction } from 'express'
import SensorData from '../models/SensorData.js'
import Device from '../models/Device.js'

let clients: Array<Response> = []

class ApiController {

    // [GET] /light-levels
    show(req: Request, res: Response, next: NextFunction) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        })
        clients.push(res)
        req.on('close', () => {
            clients.filter(client => client !== res)
        })
    }

    // [POST] /light-levels
    createData(req: Request, res: Response, next: NextFunction) {
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
    createDevice(req: Request, res: Response, next: NextFunction) {
        const { id, name, location, measurement_interval } = req.body
        return Device.create(id, name, location, measurement_interval)
            .then(data => {
                res.send('OK')
                console.log(data)
            })
            .catch(err => next(err))
    }
}

export default new ApiController
