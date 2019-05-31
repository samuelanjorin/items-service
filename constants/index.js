const ERROR_CODES = Object.freeze({

  USR_09: 'The Shipping Region ID is not number.',
  AUT_01: 'Authorization code is empty.',
  AUT_02: 'Access Unauthorized.',
  NOAUTH: 'NoAuth',
  ATT_01: 'attribute with this ID does not exist',
  ATT_02: 'attribute with this ID does not exist',
  CAT_02: 'No category exist with this ID',
  CAT_01: 'No category ID is not a number',
  DEP_02: 'No department exist with this ID',
  DEP_01: 'No department ID is not a number',
  PRD_02: 'No product exist with this ID',
  PRD_01: 'No product ID is not a number',
  QUR_01: 'The query string cannot be blank'

})
const NETWORK_CODES = Object.freeze({
  HTTP_SUCCESS: 200,
  HTTP_CREATED: 201,
  HTTP_BAD_REQUEST: 400,
  HTTP_UN_AUTHORISED: 401,
  HTTP_NOT_FOUND: 404,
  HTPP_INTERNAL_SERVER: 500

})

const CACHE_TYPES = Object.freeze({
  hour: 'hour',
  day: 'day'

})
const CACHE_HOUR = Object.freeze({
  one: 3600,
  twenty_hour: 86400

})
export default Object.assign({}, { ERROR_CODES, NETWORK_CODES, CACHE_TYPES, CACHE_HOUR })
