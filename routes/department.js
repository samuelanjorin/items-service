import { Router } from 'express'
import controller from '../controllers/department'

const router = Router()

router.get('/', controller.findAllDepartments())

router.get('/:id', controller.findOneDepartment())

export default router
