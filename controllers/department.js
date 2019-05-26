import isEmpty from 'lodash.isempty'
import service from '../services/department'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'
import cache from '../utils/cache'
let field = 'department_id'
function findAllDepartments () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const allDepartments = await service.findAllDepartments()
    cache.addToCache(req.originalUrl, allDepartments, constants.CACHE_TYPES.hour)
    return res.json(allDepartments).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}

function findOneDepartment () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if (value !== null) {
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { id } = req.params
    const parsedId = parseInt(id, 10)
    if (!isNaN(parsedId)) {
      const oneDepartment = await service.findDepartment(id)
      if (!isEmpty(oneDepartment)) {
        cache.addToCache(req.originalUrl, oneDepartment, constants.CACHE_TYPES.hour)
        return res.json(oneDepartment).status(constants.NETWORK_CODES.HTTP_SUCCESS)
      }
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.DEP_02),
        message: constants.ERROR_CODES.DEP_02,
        field
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.DEP_01),
      message: constants.ERROR_CODES.DEP_01,
      field
    })
  })
}

export default {
  findAllDepartments,
  findOneDepartment
}
