/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import asyncF from '../middlewares/async'
import service from '../services/category'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'
import cache from '../utils/cache'

let field = 'category_id'
function findCategoryByDepartment () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { department_id } = req.params
    const parsedId = parseInt(department_id, 10)
    if (!isNaN(parsedId)) {
      const allCategories = await service.findAllCategories({
        where: {
          department_id: parsedId
        }
      })
      if (!isEmpty(allCategories)) {
        cache.addToCache(req.originalUrl, allCategories, constants.CACHE_TYPES.hour)
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
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { id } = req.params
    const parsedId = parseInt(id, 10)
    if (!isNaN(parsedId)) {
      const oneCategory = await service.findCategory(id)
      if (!isEmpty(oneCategory)) {
        cache.addToCache(req.originalUrl, oneCategory, constants.CACHE_TYPES.hour)
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
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { product_id } = req.params
    const parsedId = parseInt(product_id, 10)
    if (!isNaN(parsedId)) {
      const allProducts = await service.findProducts(product_id)
      if (!isEmpty(allProducts)) {
        const productCategory = []
        allProducts.forEach((category) => {
          productCategory.push(category.category)
        })
        cache.addToCache(req.originalUrl, productCategory, constants.CACHE_TYPES.hour)
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
function findAllCategories () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
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
    cache.addToCache(req.originalUrl, result, constants.CACHE_TYPES.hour)
    return res.json(result).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}
export default {
  findAllCategories,
  findCategoryByDepartment,
  findCategoryByProduct,
  findOneCategory
}
