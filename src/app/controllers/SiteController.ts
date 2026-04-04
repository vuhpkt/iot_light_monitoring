import { Request, Response, NextFunction } from "express"
import SensorData, { ISensorData } from "../models/SensorData.js"
import Device, { IDevice, IDeviceWithLatestData } from "../models/Device.js"

class SiteController {
    //[GET] /
    index(req: Request, res: Response, next: NextFunction) {
        Device.findAllWithLatestData()
            .then(devices => {
                res.render('home', { devices })
            })
            .catch(err => next(err))
    }

    //[GET] /devices
    devices(req: Request, res: Response, next: NextFunction) {
        res.render('devices')
    }

    //[GET] /history
    history(req: Request, res: Response, next: NextFunction) {
        SensorData.findAll()
            .then(sensorData => {
                res.render('history', { sensorData })
            })
            .catch(err => next(err))
    }
}

export default new SiteController
