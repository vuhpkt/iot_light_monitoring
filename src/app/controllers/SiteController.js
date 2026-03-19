import SensorData from "../models/SensorData.js"
import Device from "../models/Device.js"

class SiteController {
    //[GET] /
    async index (req, res, next) {
        const devices = await Device.findAll()
        await Promise.all(devices.map(async device => {
            const { value, measured_at} = await SensorData.findLatest(device.id)
            device.latestValue = value
            device.latestMeasurement = measured_at
        }))
        res.render('home', { devices })
    }

    //[GET] /devices
    async devices(req, res, next) {
        try {
            res.render('devices')
        } catch(err) {
            next(err)
        }
    }

    //[GET] /history
    async history(req, res, next) {
        try {
            const sensorData = await SensorData.findAll()
            res.render('history', {sensorData})
        } catch(err) {
            next(err)
        }
    }

}

export default new SiteController
