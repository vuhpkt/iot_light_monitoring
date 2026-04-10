import express from 'express'
import SiteController from "../app/controllers/SiteController.js"

const router = express.Router()

router.get('/devices', SiteController.devices)
router.get('/history', SiteController.history)
router.get('/', SiteController.index)

export default router
