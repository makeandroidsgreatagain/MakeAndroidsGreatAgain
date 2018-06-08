const robinhood = require('./robinhood.js')
const format = require('string-format')

function safeParseFloat(value) {
  value = value || "0"
  return parseFloat(value).toFixed(2)
}

// !exthrs AMZN => Price : 1,623.21 Change : -1.68 (-0.10%)
module.exports.exthrs = function(instrument) {
  return robinhood.quote(instrument, (response) => response).then((response) => {
    var exthrsPrice = safeParseFloat(response.last_extended_hours_trade_price)
    var nonExtPrice = safeParseFloat(response.last_trade_price)

    if (response.last_extended_hours_trade_price == null) {
      exthrsPrice = nonExtPrice
    }
    
    var change = (exthrsPrice - nonExtPrice).toFixed(2)
    var pct_increase = ((change / nonExtPrice) * 100).toFixed(2)

    return format('Price : {0} Change : {1} ({2}%)', exthrsPrice, change, pct_increase)
  })
}

module.exports.cd = function(symbol) {
  return format('https://finviz.com/chart.ashx?t={0}&ty=c&ta=1&p=d&s=l', symbol)
}

module.exports.cw = function(symbol) {
  return format('https://finviz.com/chart.ashx?t={0}&ty=c&ta=0&p=w&s=l', symbol)
}

module.exports.es = function() {
  return 'https://finviz.com/fut_chart.ashx?t=ES&p=m5&maga'
}
