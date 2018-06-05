
const fetch = require('node-fetch');
const request = require('request');
const NodeCache = require( "node-cache" );

const cache = new NodeCache();

function cachingFetch(url, age) {
    var cached = cache.get(url)
    console.log("fetching url: " + url)
    if (cached) {
        return new Promise(resolve => resolve(cached))
    } else {
        return fetch(url).then(response => response.json()).then(response => {
            // disable caching till the timed cache works.
            //cache.set(url, response, age)
            console.log("Got: " + JSON.stringify(response))
            return response
        })
    }
}

function safeParseFloat(value) {
    value = value || "0"
    return parseFloat(value)
}

module.exports.historical = function(instrument, callback) {
    const refresh_seconds = 5 * 60
    return cachingFetch(`https://api.robinhood.com/quotes/historicals/${instrument}/?interval=5minute`, refresh_seconds)
}

module.exports.tags = function(sector, callback) {
    const refresh_seconds = 12 * 60 * 60
    return cachingFetch(`https://api.robinhood.com/midlands/tags/tag/${sector}/`, refresh_seconds)
}

module.exports.instrument = function(instrument, callback) {
    const refresh_seconds = 12 * 60 * 60
    return cachingFetch(`https://api.robinhood.com/instruments/${instrument}/`, refresh_seconds)
}

module.exports.fundamentals = function(instrument, callback) {
    const refresh_seconds = 12 * 60 * 60
    return cachingFetch(`https://api.robinhood.com/fundamentals/${instrument}/`, refresh_seconds)
}

module.exports.quote = function(instrument, callback) {
    const refresh_seconds = 60
    param = instrument.includes("-") ? instrument : instrument.toUpperCase()
    return cachingFetch(`https://api.robinhood.com/quotes/${param}/`, refresh_seconds)
}
