import SensorData from '../models/SensorData.js'

const clients = []

class ApiController {

    // [GET] /light-levels
    async show(req, res, next) {
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
    async create(req, res, next) {
        try {
            const deviceId = req.body.device_id
            const value = req.body.value
            const data = await SensorData.create(deviceId, value)
            clients.forEach(client => {
                client.write(`data: ${JSON.stringify(data)}\n\n`);
            });
            res.send('OK')
        } catch (err) {
            next(err)
        }
    }
}

export default new ApiController
