/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import models from '../models'

const { product_attribute, attribute_value, attribute } = models

async function findAllAttributeValues (id) {
  return await product_attribute.findAll({ where: {
    product_id: id
  },
  include: [{
    model: attribute_value,
    include: [{
      model: attribute
    }]
  }]
  })
}
export default { findAllAttributeValues }
