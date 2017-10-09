import conf from 'conf/conf'
import uuid from 'utils/uuid'

class Api {
  constructor() {
    this.apiUrl = conf.api + 'api/'
    this.cache = {}
    this.fetching = {}

    this.call = this.call.bind(this)
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.put = this.put.bind(this)
    this.patch = this.patch.bind(this)
    this.delete = this.delete.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.buildResponse = this.buildResponse.bind(this)
    this.cacheResponse = this.cacheResponse.bind(this)
    this.manageError = this.manageError.bind(this)
  }

  call(
    url,
    options = {
      method: 'GET',
      credentials: 'include',
      headers: {}
    }
  ) {
    let { method, credentials, headers } = options

    if (!credentials) {
      options = Object.assign({}, options, {
        credentials: 'include'
      })
    }

    headers = Object.assign({}, headers, {
      'X-Request-Id': uuid(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
    if (
      typeof require !== 'undefined' &&
      typeof this.token !== 'undefined' &&
      !!this.token
    ) {
      let cookieConf = require('conf/conf')
      Object.assign(headers, {
        Cookie: !!this.token
          ? `tellnspread_token=${this
              .token}; Max-Age=${cookieConf.maxAge}; Domain=${cookieConf.domain}; Path=${cookieConf.path};${cookieConf.httpOnly
              ? ' httpOnly;'
              : ''}${cookieConf ? 'Secure;' : ''}`
          : false
      })
    }
    options = Object.assign({}, options, {
      headers
    })
    if (typeof require !== 'undefined') {
      Object.assign(options, { agent: require('middleware/auth/agent') })
    }

    return fetch(url, options)
      .then(this.checkStatus)
      .then(this.buildResponse.bind(this, url))
      .catch(this.manageError)
  }

  get(
    url,
    options = {
      method: 'GET',
      credentials: 'include'
    }
  ) {
    return this.call(
      url,
      Object.assign({}, options, {
        method: 'GET'
      })
    )
  }

  post(
    url,
    options = {
      method: 'POST',
      credentials: 'include'
    }
  ) {
    return this.call(
      url,
      Object.assign({}, options, {
        method: 'POST'
      })
    )
  }

  put(
    url,
    options = {
      method: 'PUT',
      credentials: 'include'
    }
  ) {
    return this.call(
      url,
      Object.assign({}, options, {
        method: 'PUT'
      })
    )
  }

  patch(
    url,
    options = {
      method: 'PATCH',
      credentials: 'include'
    }
  ) {
    return this.call(
      url,
      Object.assign({}, options, {
        method: 'PATCH'
      })
    )
  }

  delete(
    url,
    options = {
      method: 'DELETE',
      credentials: 'include'
    }
  ) {
    return this.call(
      url,
      Object.assign({}, options, {
        method: 'DELETE'
      })
    )
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  buildResponse(url, response) {
    if (typeof this.fetching[url] !== 'undefined') {
      delete this.fetching[url]
    }
    if (response.status === 204) {
      return null
    }
    return response.json()
  }

  cacheResponse(cacheKey, response) {
    if (!response) {
      return false
    }

    this.cache[cacheKey] = response
    return response
  }

  manageError(error) {
    if (
      error.response &&
      error.response.status &&
      error.response.status == 204
    ) {
      return error.response
    }
    /*
		notifyManager.displayMessages({
			"error": ["An error occurred"]
		});
		*/
    throw error
  }
}

export default Api
