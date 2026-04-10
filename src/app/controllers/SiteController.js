import SensorData from "../models/SensorData.js"
import Device from "../models/Device.js"

class SiteController {
    //[GET] /
    index(req, res, next) {
        return Device.findAllWithLatestData()
            .then(devices => {
                res.render('home', { devices })
            })
    }

    //[GET] /devices
    devices(req, res, next) {
        res.render('devices')
    }

    //[GET] /history
    history(req, res, next) {
        return SensorData.findAll()
            .then(sensorData => {
                res.render('history', { sensorData })
            })
    }
}

export default new SiteController
