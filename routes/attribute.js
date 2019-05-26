import { Router } from 'express'
import controller from '../controllers/attribute'

const router = Router()

router.get('/', controller.findAllAttributes())
router.get('/:id', controller.findOneAttribute())

router.get('/values/:value_id', controller.findOneAttributeValue())

router.get('/inProduct/:product_id', controller.findAllProductAttributes())

export default router
