/* eslint-disable camelcase */
import Joi from 'joi'

/**
 * @description Get name validation schema
 *
 * @param {string} label the text to use instead of field name in the error message;

 * @returns {string} Instance of JOI validation schema
 * @method getNameSchema
 */

const rating = Joi.number()
  .integer()
  .min(1)
  .label('rating')

const review = Joi.string()
  .required()
  .trim()
  .min(1)
  .label('review')
const product_id = Joi.number()
  .integer()
  .min(1)
  .label('product_id')

export const productReviewSchema = Joi.object().keys({
  review,
  rating,
  product_id
})
