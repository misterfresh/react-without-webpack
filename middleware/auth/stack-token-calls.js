let fetch = require('isomorphic-fetch')
let conf = require('conf/conf')
let Promise = require('bluebird')

let agent = require('./agent')
let functionsByIp = {}

function stackTokenCalls(req, ip) {
  let token = req.token
  return callTokenForIp(token, ip)

  let callToken
  if (typeof functionsByIp[ip] === 'undefined') {
    callToken = callDebounce(token, ip)
    functionsByIp[ip] = callToken
  } else {
    callToken = functionsByIp[ip]
  }
  return callToken()
}

function callDebounce(token, ip) {
  return debounce(() => callTokenForIp(token, ip), 350)
}

function callTokenForIp(token, ip) {
  return Promise.resolve(
    fetch(conf.api + 'api/user/get_session', {
      agent,
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Request-Id': uuid(),
        Cookie: !!token ? `${conf.name}_token=${token}` : false
      },
      body: JSON.stringify({
        token: !!token ? token : false,
        ip: !!ip ? ip : false
      })
    })
  ).then(response =>
    Promise.all([
      response.json(),
      response.headers.get('set-cookie')
        ? response.headers
            .get('set-cookie')
            .split('=')[1]
            .split(';')[0]
        : ''
    ])
  )
}

function debounce(fn, wait = 0, options = {}) {
  let lastCallAt
  let deferred
  let timer
  let pendingArgs = []
  return function debounced(...args) {
    const currentWait = getWait(wait)
    const currentTime = new Date().getTime()

    const isCold = !lastCallAt || currentTime - lastCallAt > currentWait

    lastCallAt = currentTime

    if (isCold && options.leading) {
      return options.accumulate
        ? fn.call(this, [args]).then(result => result[0])
        : fn.call(this, ...args)
    }

    if (deferred) {
      clearTimeout(timer)
    } else {
      deferred = defer()
    }

    pendingArgs.push(args)
    timer = setTimeout(flush.bind(this), currentWait)

    if (options.accumulate) {
      const argsIndex = pendingArgs.length - 1
      return deferred.promise.then(results => results[argsIndex])
    }

    return deferred.promise
  }

  function flush() {
    const thisDeferred = deferred
    clearTimeout(timer)
    if (options.accumulate) {
      fn
        .call(this, pendingArgs)
        .then(res => thisDeferred.resolve(res), err => thisDeferred.reject(err))
    } else {
      fn
        .apply(this, pendingArgs[pendingArgs.length - 1])
        .then(res => thisDeferred.resolve(res), err => thisDeferred.reject(err))
    }

    pendingArgs = []
    deferred = null
  }
}

function getWait(wait) {
  return typeof wait === 'function' ? wait() : wait
}

function defer() {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

let lut = []
for (let i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16)
}

function uuid() {
  let d0 = (Math.random() * 0xffffffff) | 0
  let d1 = (Math.random() * 0xffffffff) | 0
  let d2 = (Math.random() * 0xffffffff) | 0
  let d3 = (Math.random() * 0xffffffff) | 0
  return (
    lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff] +
    '-' +
    lut[d1 & 0xff] +
    lut[(d1 >> 8) & 0xff] +
    '-' +
    lut[((d1 >> 16) & 0x0f) | 0x40] +
    lut[(d1 >> 24) & 0xff] +
    '-' +
    lut[(d2 & 0x3f) | 0x80] +
    lut[(d2 >> 8) & 0xff] +
    '-' +
    lut[(d2 >> 16) & 0xff] +
    lut[(d2 >> 24) & 0xff] +
    lut[d3 & 0xff] +
    lut[(d3 >> 8) & 0xff] +
    lut[(d3 >> 16) & 0xff] +
    lut[(d3 >> 24) & 0xff]
  )
}

module.exports = stackTokenCalls
