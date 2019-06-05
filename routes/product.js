import { Router } from 'express'
import controller from '../controllers/product'
import validate from '../middlewares/validator'
import authenticate from '../middlewares/authenticate'

const router = Router()

router.get('/', controller.findAllProducts())
router.get('/search', controller.searchProducts())
router.get('/:id', controller.findOneProduct())

router.get('/inCategory/:category_id', controller.findProductsByCategory())
router.get('/inDepartment/:department_id',
  controller.findProductsByDepartment())

router.get('/:id/details', controller.findOneProduct())

router.get('/:id/locations',
  controller.findProductsLocation())

router.route('/:product_id/reviews')
  .get(controller.findProductsReviews())
  .post(validate, authenticate.verifyUser, controller.addProductsReviews())

export default router
