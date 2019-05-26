/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import asyncF from '../middlewares/async'
import service from '../services/category'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'

let field = 'cat_id'
function findCategoryByDepartment () {
  return asyncF(async (req, res) => {
    const { department_id } = req.params
    const parsedId = parseInt(department_id, 10)
    if (!isNaN(parsedId)) {
      const allCategories = await service.findAllCategories({
        where: {
          department_id: parsedId
        }
      })
      if (!isEmpty(allCategories)) {
        return res.json(allCategories).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CAT_02),
        message: constants.ERROR_CODES.CAT_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CAT_01),
      message: constants.ERROR_CODES.CAT_01,
      field
    })
  })
}
function findOneCategory () {
  return asyncF(async (req, res) => {
    const { id } = req.params
    const parsedId = parseInt(id, 10)
    if (!isNaN(parsedId)) {
      const oneCategory = await service.findCategory(id)
      if (!isEmpty(oneCategory)) {
        return res.json(oneCategory.dataValues).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CAT_02),
        message: constants.ERROR_CODES.CAT_02,
        field
      })
    }
  })
}

function findCategoryByProduct () {
  return asyncF(async (req, res) => {
    const { product_id } = req.params
    const parsedId = parseInt(product_id, 10)
    if (!isNaN(parsedId)) {
      const allProducts = await service.findProducts(product_id)
      if (!isEmpty(allProducts)) {
        const productCategory = []
        allProducts.forEach((category) => {
          productCategory.push(category.Category)
        })
        return res.json(productCategory).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CAT_02),
        message: constants.ERROR_CODES.CAT_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CAT_01),
      message: constants.ERROR_CODES.CAT_01,
      field
    })
  })
}
function findAllCategories (req, res) {
  return asyncF(async (req, res) => {
    const { page, limit } = req.query
    const numberOfPage = parseInt(page, 10) || 1
    const pageLimit = parseInt(limit, 10) || 20

    const allCategories = await
    service.findAllCategories(globalFunc.getPageParams({ numberOfPage, pageLimit }))
    const allTogether = await service.countCategory()
    const result = {
      count: allTogether,
      rows: allCategories
    }
    return res.json(result).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}
export default {
  findAllCategories,
  findCategoryByDepartment,
  findCategoryByProduct,
  findOneCategory
}
