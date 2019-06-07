/* eslint-disable camelcase */
import attributeService from '../services/attributes'
import attributeValueService from '../services/attributeValue'
import productattributeService from '../services/productAttribute'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'
import cache from '../utils/cache'

let field = 'attribute_id'
function findAllAttributes () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const allAttributs = await attributeService.findAllAttributes()
    cache.addToCache(req.originalUrl, allAttributs, constants.CACHE_TYPES.hour)
    return res.json(allAttributs).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}

function findOneAttribute () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { id } = req.params
    const parsedId = parseInt(id, 10)
    if (!isNaN(parsedId)) {
      const oneAttribute = await attributeService.findAttribute(id)
      if (oneAttribute !== null) {
        cache.addToCache(req.originalUrl, oneAttribute, constants.CACHE_TYPES.hour)
        return res.json(oneAttribute.dataValues).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ATT_02),
        message: constants.ERROR_CODES.ATT_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ATT_01),
      message: constants.ERROR_CODES.ATT_01,
      field
    })
  })
}

function findOneAttributeValue () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { value_id } = req.params
    const parsedId = parseInt(value_id, 10)
    if (!isNaN(parsedId)) {
      const oneAttibuteValue = await attributeValueService.findAllAttributeValues(value_id)
      if (oneAttibuteValue !== null) {
        cache.addToCache(req.originalUrl, oneAttibuteValue, constants.CACHE_TYPES.hour)
        return res.json(oneAttibuteValue).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ATT_02),
        message: constants.ERROR_CODES.ATT_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ATT_01),
      message: constants.ERROR_CODES.ATT_01,
      field
    })
  })
}

function findAllProductAttributes () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)  
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { product_id } = req.params
    const allProductAttributes = await productattributeService.findAllAttributeValues(product_id)
    if (allProductAttributes !== null) {
      const allProducts = []
      allProductAttributes.forEach((attribute) => {
        allProducts.push({ attribute_value_id:
                            attribute.attribute_value.attribute_value_id,
        attribute_value: attribute.attribute_value.value,
        attribute_name: attribute.attribute_value.attribute.name
        })
      })
      cache.addToCache(req.originalUrl, allProducts, constants.CACHE_TYPES.hour)
      return res.json(allProducts).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ATT_02),
      message: constants.ERROR_CODES.ATT_02,
      field
    })
  })
}

export default {
  findAllProductAttributes,
  findOneAttribute,
  findOneAttributeValue,
  findAllAttributes
}
