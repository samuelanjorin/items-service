/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import models from '../models'

const { category, product_category } = models

async function findCategory (id) {
  return await category.findOne({ where: { category_id: id } })
}
async function countCategory () {
  return await category.count()
}

async function findAllCategories (option) {
  return await category.findAll(option)
}

async function findProducts (id) {
  return product_category.findAll({
    where: {
      product_id: id
    },
    include: [{
      model: category,
      attributes: ['category_id', 'name', 'department_id']
    }]
  })
}
export default {
  countCategory,
  findCategory,
  findAllCategories,
  findProducts

}
