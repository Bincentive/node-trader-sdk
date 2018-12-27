<a name="BincentiveClient"></a>

## BincentiveClient
Bincentive Trader Client

**Kind**: global class  

* [BincentiveClient](#BincentiveClient)
    * [new BincentiveClient(email, password, sandbox)](#new_BincentiveClient_new)
    * [.timeout(ms)](#BincentiveClient+timeout)
    * [.addOrder(strategyId, exchangeId, baseCurrency, quoteCurrency, orderType, orderSide, unit, limitPrice)](#BincentiveClient+addOrder)
    * [.getHistoryList()](#BincentiveClient+getHistoryList)
    * [.getOrderInfo(orderId)](#BincentiveClient+getOrderInfo)
    * [.getAvailableExchanges()](#BincentiveClient+getAvailableExchanges)
    * [.getAvailableSymbols(exchange_name)](#BincentiveClient+getAvailableSymbols)
    * [.getCurrentPrice(exchange_name, symbol_name)](#BincentiveClient+getCurrentPrice)
    * [.getStrategyList()](#BincentiveClient+getStrategyList)
    * [.getApprovedStrategyList()](#BincentiveClient+getApprovedStrategyList)
    * [.getExchangeList()](#BincentiveClient+getExchangeList)
    * [.addApiKey(apiKey, secretKey, exchangeId, apiNickname, fixApiAssign)](#BincentiveClient+addApiKey)
    * [.deleteApiKey(exchangeId)](#BincentiveClient+deleteApiKey)
    * [.getApiKeyList()](#BincentiveClient+getApiKeyList)

<a name="new_BincentiveClient_new"></a>

### new BincentiveClient(email, password, sandbox)
bincentive Trader Client


| Param | Type | Default |
| --- | --- | --- |
| email | <code>string</code> |  | 
| password | <code>string</code> |  | 
| sandbox | <code>boolean</code> | <code>true</code> | 

<a name="BincentiveClient+timeout"></a>

### bincentiveClient.timeout(ms)
set client default timeout

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| ms | <code>number</code> | 

<a name="BincentiveClient+addOrder"></a>

### bincentiveClient.addOrder(strategyId, exchangeId, baseCurrency, quoteCurrency, orderType, orderSide, unit, limitPrice)
add market order to specify strategy id

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| strategyId | <code>number</code> | 
| exchangeId | <code>number</code> | 
| baseCurrency | <code>string</code> | 
| quoteCurrency | <code>string</code> | 
| orderType | <code>string</code> | 
| orderSide | <code>string</code> | 
| unit | <code>number</code> | 
| limitPrice | <code>number</code> | 

<a name="BincentiveClient+getHistoryList"></a>

### bincentiveClient.getHistoryList()
get order history

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  
<a name="BincentiveClient+getOrderInfo"></a>

### bincentiveClient.getOrderInfo(orderId)
get order detail info

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| orderId | <code>number</code> | 

<a name="BincentiveClient+getAvailableExchanges"></a>

### bincentiveClient.getAvailableExchanges()
get supported exchanges

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  
<a name="BincentiveClient+getAvailableSymbols"></a>

### bincentiveClient.getAvailableSymbols(exchange_name)
get exhange supported symbols

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| exchange_name | <code>string</code> | 

<a name="BincentiveClient+getCurrentPrice"></a>

### bincentiveClient.getCurrentPrice(exchange_name, symbol_name)
get symbol current price

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| exchange_name | <code>string</code> | 
| symbol_name | <code>string</code> | 

<a name="BincentiveClient+getStrategyList"></a>

### bincentiveClient.getStrategyList()
get strategy list

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  
<a name="BincentiveClient+getApprovedStrategyList"></a>

### bincentiveClient.getApprovedStrategyList()
get approved stragtegy list

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  
<a name="BincentiveClient+getExchangeList"></a>

### bincentiveClient.getExchangeList()
get exchange list

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  
<a name="BincentiveClient+addApiKey"></a>

### bincentiveClient.addApiKey(apiKey, secretKey, exchangeId, apiNickname, fixApiAssign)
add exchange api key

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| apiKey | <code>string</code> | 
| secretKey | <code>string</code> | 
| exchangeId | <code>number</code> | 
| apiNickname | <code>string</code> | 
| fixApiAssign | <code>boolean</code> | 

<a name="BincentiveClient+deleteApiKey"></a>

### bincentiveClient.deleteApiKey(exchangeId)
delete exchange api key by id

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  

| Param | Type |
| --- | --- |
| exchangeId | <code>number</code> | 

<a name="BincentiveClient+getApiKeyList"></a>

### bincentiveClient.getApiKeyList()
get exchange api key list

**Kind**: instance method of [<code>BincentiveClient</code>](#BincentiveClient)  
