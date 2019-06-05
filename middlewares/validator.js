/* eslint-disable no-return-assign */
import Joi from '@hapi/joi'
import constants from '../constants/index'
import globalfunc from '../utils/globalfunc'

const schema = Joi.object().keys({
  review: Joi.string().required('').trim().strict().label('review'),
  rating: Joi.number().integer().required().label('rating')

})
export default (req, res, next) => {
  const { error } = Joi.validate(req.body, schema)
  const productId = req.params.product_id
  if (error && !globalfunc.isValueValid(productId)) {
    let message = error.details[0].message
    message = message.replace(/"/g, '')
    res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: constants.NETWORK_CODES.HTTP_BAD_REQUEST,
      message,
      field: message.split(' ')[0].replace(/"/g, '')
    })
  }
  next()
}
