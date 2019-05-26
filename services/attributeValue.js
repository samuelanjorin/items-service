/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import models from '../models'

const { attribute_value } = models

export default async function getAllAttributeValues (id) {
  return await attribute_value.findAll({ where: {
    attribute_id: id
  } })
}
