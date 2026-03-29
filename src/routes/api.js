import express from 'express'
import ApiController from '../app/controllers/ApiController.js'

const router = express.Router()

router.get('/light-levels', ApiController.show)
router.post('/light-levels', ApiController.create)

export default router