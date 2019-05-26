/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import models from '../models'

const { product, product_category, category, department, review } = models

async function findOneProduct (id) {
  return await product.findOne({ where: { product_id: id } })
}

async function findAllProducts (option) {
  return await product.findAll(option)
}

async function size () {
  return await product.count()
}

async function findCategories (id, paginationOption) {
  const option = { where: {
    category_id: id
  },
  ...paginationOption,
  include: [{ model: product }] }
  return category.findAll(option)
}

async function countAllCategories (id) {
  return category.count({ where: {
    category_id: id
  } })
}

async function findDepartments (id) {
  return department.findAll({
    where: {
      department_id: id
    },
    include: [{
      model: product

    }]
  })
}

async function findLocations (id) {
  return product_category.findOne(
    { where: {
      product_id: id },
    include: [{
      model: category,
      include: [{
        model: department
      }]
    }] }
  )
}

async function findReviews (id) {
  return review.findAll({ where: {
    product_id: id
  } })
}

async function createReview (payload) {
  return review.create(payload)
}

export default {
  findAllProducts,
  findCategories,
  findDepartments,
  size,
  countAllCategories,
  findOneProduct,
  findReviews,
  findLocations,
  createReview
}
