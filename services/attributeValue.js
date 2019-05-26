/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import models from '../models'

const { attribute_value } = models

async function findAllAttributeValues (id) {
  return await attribute_value.findAll({ where: {
    attribute_id: id
  } })
}
export default { findAllAttributeValues }
