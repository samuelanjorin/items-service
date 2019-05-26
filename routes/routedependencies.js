import bodyParser from 'body-parser'
import rateLimiter from '../middlewares/rateLimit'
import category from './category'
import department from './department'
import attribute from './attribute'
import product from './product'

export default (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(rateLimiter)
  app.use('/v1/api/categories', category)
  app.use('/v1/api/departments', department)
  app.use('/v1/api/attributes', attribute)
  app.use('/v1/api/products', product)
}
