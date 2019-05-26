/* eslint-disable no-return-await */
import models from '../models'

const { attribute } = models

async function findAttribute (id) {
  return await attribute.findOne({
    where: {
      attribute_id: id
    }
  }
  )
}

async function findAllAttributes () {
  return await attribute.findAll()
}

export default {
  findAttribute,
  findAllAttributes
}
