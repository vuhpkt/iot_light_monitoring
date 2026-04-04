import { Request, Response, NextFunction } from "express"
import SensorData, { ISensorData } from "../models/SensorData.js"
import Device, { IDevice, IDeviceWithLatestData } from "../models/Device.js"

class SiteController {
    //[GET] /
    index(req: Request, res: Response, next: NextFunction) {
        return Device.findAllWithLatestData()
            .then(devices => {
                res.render('home', { devices })
            })
    }

    //[GET] /devices
    devices(req: Request, res: Response, next: NextFunction) {
        res.render('devices')
    }

    //[GET] /history
    history(req: Request, res: Response, next: NextFunction) {
        return SensorData.findAll()
            .then(sensorData => {
                res.render('history', { sensorData })
            })
    }
}

export default new SiteController
