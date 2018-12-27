const axios = require('axios'),
  util = require('./util')({
    cryptoSecret: process.env.SECRET || 'test'
  })

const VERSION = '0.1',
  TIMEOUT     = 5000

/**
 * Bincentive Trader Client
 */
class BincentiveClient {
  /**
   * bincentive Trader Client
   * @param {string} email 
   * @param {string} password 
   * @param {boolean} sandbox 
   */
  constructor(email, password, sandbox=true) {
    if (!email || !password) throw new Error('Missing credentials')
    this.email = email
    this.password = password
    this.sandbox = sandbox
    this.timeout = TIMEOUT
    this.version = VERSION
    this._accessToken = null

    this.TRADER_ENTRY = (this.sandbox) ? 'https://qdapps-sitapi.bincentive.com/api' : 'https://qdapps-api.bincentive.com/api'
    this.LOGIN_ENTRY = (this.sandbox) ? 'https://fs-sitapi.bincentive.com/member/api' : 'https://fs-api.bincentive.com/member/api'
  }

  /**
   * set client default timeout
   * @param {number} ms 
   */
  timeout(ms) {
    this.timeout = ms
    return this
  }

  async _sendRequest(url, method, headers, timeout, data = {}) {
    headers['User-Agent'] = 'Bincentive NodeJS API Client'
    headers['accept-language'] = 'en-us'

    const config = { url, method, headers, timeout }

    Object.assign(config, { data })

    const response = await axios(config)

    if (response.data.status !== 0) {
      throw new Error(response.message)
    }

    return response.data
  }

  async _sendAuthRequest(url, method, headers, timeout, data = {}) {
    if (!this._accessToken) {
      await this._auth(this.email, this.password)
    }
    headers['Authorization'] = 'Bearer ' + this._accessToken
    return this._sendRequest(url, method, headers, timeout, data)
  }

  async _auth(email, password) {
    var source = 1
    var grant_type = "password"
    return this._sendRequest(
      this.LOGIN_ENTRY + '/member/login',
      'POST',
      {},
      this.timeout,
      { email, password, grant_type, source }
    ).then(result => {
      if(result.status !== 0) {
        throw new Error(result.message)
      }
      this._accessToken = result.data.token
      this.crypto = util.encrypt(result.data.publicKey)
      return Promise.resolve(result.data.token)
    })
  }

  /**
   * add market order to specify strategy id
   * @param {number} strategyId 
   * @param {number} exchangeId
   * @param {string} baseCurrency 
   * @param {string} quoteCurrency
   * @param {string} orderType
   * @param {string} orderSide
   * @param {number} unit 
   * @param {number} limitPrice
   */
  addOrder(strategyId, exchangeId, baseCurrency, quoteCurrency, orderType, orderSide, unit, limitPrice) {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + '/order/addOrder',
      'POST',
      {},
      this.timeout,
      { strategyId, exchangeId, baseCurrency, quoteCurrency, orderType, orderSide, unit, limitPrice}
    )
  }

  /**
   * get order history
   */
  getHistoryList() {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + '/order/getHistoryList',
      'POST',
      {},
      this.timeout
    )
  }

  /**
   * get order detail info
   * @param {number} orderId
   */
  getOrderInfo(orderId) {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + '/order/getOrderInfo',
      'POST',
      {},
      this.timeout,
      { orderId }
    )
  }

  /**
   * get supported exchanges
   */
  getAvailableExchanges() {
    return this._sendRequest(
      QUOTATION_BASE_URL + '/exchanges',
      'GET',
      {},
      this.timeout
    )
  }

  /**
   * get exhange supported symbols
   * @param {string} exchange_name 
   */
  getAvailableSymbols(exchange_name) {
    return this._sendRequest(
      QUOTATION_BASE_URL + `/exchanges/${exchange_name}/symbols`,
      'GET',
      {},
      this.timeout
    )
  }

  /**
   * get symbol current price
   * @param {string} exchange_name
   * @param {string} symbol_name
   */
  getCurrentPrice(exchange_name, symbol_name) {
    return this._sendRequest(
      QUOTATION_BASE_URL + `/exchanges/${exchange_name}/symbols/${symbol_name}/trade`,
      'GET',
      {},
      this.timeout
    )
  }

  /**
   * get strategy list
   */
  getStrategyList() {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + `/trader/getStrategyList`,
      'POST', {},
      this.timeout
    )
  }

  /**
   * get approved stragtegy list
   */
  getApprovedStrategyList() {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + `/trader/getApprovedStrategyList`,
      'POST',
      {},
      this.timeout
    )
  }

  /**
   * get exchange list
   */
  getExchangeList() {
    return this._sendRequest(
      this.TRADER_ENTRY + `/common/getExchangeList`,
      'POST', {},
      this.timeout
    )
  }

  /**
   * add exchange api key
   * @param {string} apiKey 
   * @param {string} secretKey 
   * @param {number} exchangeId 
   * @param {string} apiNickname 
   * @param {boolean} fixApiAssign 
   */
  async addApiKey(apiKey, secretKey, exchangeId, apiNickname, fixApiAssign) {
    apiKey    = await this.crypto(apiKey)
    secretKey = await this.crypto(secretKey)
    return this._sendAuthRequest(
      this.TRADER_ENTRY + `/member/addApiKey`,
      'POST', 
      {},
      this.timeout,
      { apiKey, secretKey, exchangeId, apiNickname, fixApiAssign }
    )
  }

  /**
   * delete exchange api key by id
   * @param {number} exchangeId 
   */
  deleteApiKey(exchangeId) {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + `/member/deleteApiKey`,
      'POST', 
      {},
      this.timeout,
      { exchangeId }
    )
  }

  /**
   * get exchange api key list
   */
  getApiKeyList() {
    return this._sendAuthRequest(
      this.TRADER_ENTRY + `/member/getApiKeyList`,
      'POST',
      {},
      this.timeout
    )
  }
}

module.exports = BincentiveClient