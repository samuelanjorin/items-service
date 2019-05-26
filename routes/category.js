import { Router } from 'express'
import controller from '../controllers/category'

const router = Router()

router.get('/', controller.findAllCategories())
router.get('/:id', controller.findOneCategory())
router.get('/inProduct/:product_id', controller.findCategoryByProduct())
router.get('/inDepartment/:department_id', controller.findCategoryByDepartment())

export default router
