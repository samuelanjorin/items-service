/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import attributeService from '../services/attributes'
import attributeValueService from '../services/attributeValue'
import productattributeService from '../services/productAttribute'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'

let field = 'att_id'
function findAllAttributes () {
  return asyncF(async (req, res) => {
    const allAttributs = await attributeService.findAllAttributes()
    return res.json(allAttributs).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}

function findOneAttribute () {
  return asyncF(async (req, res) => {
    const { id } = req.params
    const parsedId = parseInt(id, 10)
    if (!isNaN(parsedId)) {
      const oneAttribute = await attributeService.findAttribute(id)
      if (!isEmpty(oneAttribute)) {
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
    const { value_id } = req.params
    const parsedId = parseInt(value_id, 10)
    if (!isNaN(parsedId)) {
      const oneAttibuteValue = await attributeValueService.findAllAttributeValues(value_id)
      if (!isEmpty(oneAttibuteValue)) {
        return res.json(oneAttibuteValue.dataValues).status(constants.NETWORK_CODES.HTTP_SUCCESS)
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
    const { product_id } = req.params
    const allProductAttributes = await productattributeService.findAllAttributeValues(product_id)
    if (!isEmpty(allProductAttributes)) {
      const allProducts = []
      allProductAttributes.forEach((attribute) => {
        allProducts.push({ attribute_value_id:
                            attribute.Attribute_Value.attribute_value_id,
        attribute_value: attribute.Attribute_Value.value,
        attribute_name: attribute.Attribute_Value.Attribute.name
        })
      })
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
