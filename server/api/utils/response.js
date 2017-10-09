let conf = require('conf/api.js')
let User = require('models/user')

class Response {
  constructor() {
    this.options = Object.assign(
      {},
      {
        maxAge: conf.maxAge,
        path: conf.path
      },
      conf.domain && {
        domain: conf.domain
      },
      conf.secure && {
        secure: conf.secure
      },
      conf.httpOnly && {
        httpOnly: conf.httpOnly
      }
    )

    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this.forbidden = this.forbidden.bind(this)
    this.empty = this.empty.bind(this)
    this.setCookie = this.setCookie.bind(this)
    this.regenerate = this.regenerate.bind(this)
  }

  success(req, res, result) {
    this.regenerate(req, res)

    if (!result) {
      return this.empty(req, res)
    }

    return res.status(200).json({
      status: 'success',
      data: result
    })
  }

  error(req, res, error) {
    return res.status(500).json({
      status: 'error',
      error: error
    })
  }

  forbidden(req, res, error) {
    return res.status(403).json({
      status: 'error',
      error: error
    })
  }

  empty(req, res) {
    return res.status(204).json()
  }

  setCookie(req, res, token) {
    //console.log('options', this.options)
    res.cookie(`${conf.name}_token`, token, this.options)
  }

  regenerate(req, res) {
    if (req.user) {
      //console.log('user', req.user)
      this.setCookie(req, res, User.createToken(req.user))
    }
  }
}

module.exports = new Response()
