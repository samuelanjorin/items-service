/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import service from '../services/product'
import paginate, { getAllAvailableProducts, manualPaginate,
  filterProductsCategories } from '../utils/products'
import constants from '../constants/index'
import cache from '../utils/cache'

let field = 'product_id'
function findAllProducts () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { numberOfPage, pageLimit, descriptionLength } = globalFunc.getPageParams(req.query)

    const allProducts = await service.findAllProducts(paginate({
      numberOfPage, pageLimit
    }))
    const allCount = await service.size()
    const allAvailableProducts =
                        getAllAvailableProducts(allProducts, descriptionLength)
    const result = {
      count: allCount,
      rows: allAvailableProducts
    }
    cache.addToCache(req.originalUrl, result, constants.CACHE_TYPES.hour)
    return res.json(result).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}

function findOneProduct () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { id } = req.params
    if (globalFunc.isValueValid(id).valid) {
      const product = await service.findOneProduct(id)
      if (!isEmpty(product)) {
        cache.addToCache(req.originalUrl, product, constants.CACHE_TYPES.hour)
        return res.json(product).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_02),
        message: constants.ERROR_CODES.PRD_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_01),
      message: constants.ERROR_CODES.PRD_01,
      field
    })
  })
}

function findProductsByCategory () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { category_id } = req.params
    const { numberOfPage, pageLimit, descriptionLength } = globalFunc.getPageParams(req.query)

    if (globalFunc.isValueValid(category_id).valid) {
      const allProducts =
                        await service
                          .findCategories(category_id,
                            { ...paginate({ numberOfPage, pageLimit }) })
     
      if (!isEmpty(allProducts)) {
        const allAvailableProducts =
                    getAllAvailableProducts(allProducts, descriptionLength, false)
        let products = allAvailableProducts[0].products
        let productArray = []
        let i = 0
        for (i = 0; i < products.length; i++) {
          productArray.push({
            product_id: products[i].product_id,
            name: products[i].name,
            description: products[i].description,
            price: products[i].price,
            thumbnail: products[i].thumbnail
          })
        }
        const result = {
          count: products.length,
          rows: productArray
        }

        cache.addToCache(req.originalUrl, result, constants.CACHE_TYPES.hour)
        return res.json(result).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_02),
        message: constants.ERROR_CODES.PRD_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_01),
      message: constants.ERROR_CODES.PRD_01,
      field
    })
  })
}

function findProductsByDepartment () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { department_id } = req.params
    const { numberOfPage, pageLimit, descriptionLength } = globalFunc.getPageParams(req.query)
    if (globalFunc.isValueValid(department_id).valid) {
      const allProducts = await service.findDepartments(department_id)
      if (!isEmpty(allProducts)) {
        const allAvailableProducts =
                        getAllAvailableProducts(allProducts, descriptionLength, null)
        const params = paginate({ numberOfPage, pageLimit })
        const result =
                        manualPaginate(allAvailableProducts, params)
        cache.addToCache(req.originalUrl, result, constants.CACHE_TYPES.hour)
        return res.json(result).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_02),
        message: constants.ERROR_CODES.PRD_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_01),
      message: constants.ERROR_CODES.CAT_01,
      field
    })
  })
}

function findProductsLocation () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { id } = req.params
    if (globalFunc.isValueValid(id).valid) {
      const productCategories = await
      service.findLocations(id)
      if (!isEmpty(productCategories)) {
        cache.addToCache(req.originalUrl, filterProductsCategories(productCategories), constants.CACHE_TYPES.hour)
        return res.json(filterProductsCategories(productCategories)).status(constants.NETWORK_CODES.HTTP_SUCCESS)
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

function findProductsReviews () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { product_id } = req.params
    if (globalFunc.isValueValid(product_id)) {
      const productReviews = await
      service.findReviews(product_id)
      if (!isEmpty(productReviews)) {
        cache.addToCache(req.originalUrl, productReviews, constants.CACHE_TYPES.hour)
        return res.json(productReviews).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_02),
        message: constants.ERROR_CODES.PRD_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_01),
      message: constants.ERROR_CODES.PRD_01,
      field
    })
  })
}
function searchProducts () {
  return asyncF(async (req, res) => {
    const { query_string } = req.query
    if (query_string) {
      const { descriptionLength, pageLimit, numberOfPage } = globalFunc.getPageParams(req.query)
      const queryString = new RegExp(`${query_string}`, 'gi')
      const allProducts = await service.findAllProducts()
      const allAvailableProducts = allProducts.filter(
        product => product.description.match(queryString) ||
                    product.name.match(queryString))

      const filteredProducts =
                        getAllAvailableProducts(allAvailableProducts, descriptionLength)
      const count = filteredProducts.length
      const params = paginate({ numberOfPage, pageLimit })
      const resultJSON = manualPaginate(filteredProducts, params)
      return res.json({ count, rows: resultJSON }).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.QR_01),
      message: constants.ERROR_CODES.QR_01,
      field: 'query_string'
    })
  })
}

function addProductsReviews () {
  return asyncF(async (req, res) => {
    const { product_id } = req.params
    const { customer_id } = req.user
    const { review, rating } = req.body
    if (globalFunc.isValueValid(product_id).valid) {
      await service.createReview({
        review,
        rating,
        customer_id,
        product_id,
        created_on: new Date()
      })

      return res.json([]).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }

    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.PRD_01),
      message: constants.ERROR_CODES.PRD_01,
      field
    })
  })
}
export default {
  findAllProducts,
  findOneProduct,
  findProductsByCategory,
  findProductsByDepartment,
  findProductsLocation,
  findProductsReviews,
  addProductsReviews,
  searchProducts

}
