import express from 'express'
import ApiController from '../app/controllers/ApiController.js'

const router = express.Router()

router.post('/light-levels', ApiController.create)

export default router