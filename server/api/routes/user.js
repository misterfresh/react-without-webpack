let Promise = require('bluebird')
let Entity = require('./entity')
let Response = require('response')
let Pass = require('api/utils/pass')

class User extends Entity {
  constructor() {
    super()

    this.router.post('/get_session', this.getSession.bind(this))
    this.router.post('/login', this.login.bind(this))
    this.router.post('/register', this.register.bind(this))
    this.router.post('/logout', this.logout.bind(this))

    this.decodeCredentials = this.decodeCredentials.bind(this)

    this.setDefaultRoutes(['delete'])
    return this.router
  }

  getSession(req, res) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (req.token) {
      return this.model
        .verify(req.token)
        .then(verifiedToken =>
          this.model.registered(verifiedToken.body).then(registered => {
            req.user = registered
            return Response.success(req, res, registered)
          })
        )
        .catch(error => {
          if (error && error.userMessage === 'Jwt is expired') {
            return this.model
              .anonymous(ip)
              .then(anonymous => {
                req.user = anonymous
                return Response.success(req, res, anonymous)
              })
              .catch(error => Response.error(req, res, error))
          }
          return Response.error(req, res, error)
        })
    } else {
      return this.model
        .anonymous(ip)
        .then(anonymous => {
          req.user = anonymous
          return Response.success(req, res, anonymous)
        })
        .catch(error => Response.error(req, res, error))
    }
  }

  decodeCredentials(req) {
    let credentials = decodeURIComponent(
      new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString()
    ).split(':')
    let email = credentials.shift()
    let password
    if (credentials.length < 1) {
      password = ''
    } else if (credentials.length > 1) {
      password = credentials.join(':')
    } else {
      password = credentials[0]
    }
    return { email, password }
  }

  login(req, res) {
    let { email, password } = this.decodeCredentials(req)
    console.log(email, password)
    if (!email) {
      return Response.error(req, res, { message: 'missing email' })
    }
    if (!password) {
      return Response.error(req, res, { message: 'missing password' })
    }

    let user = this.model.getUserByEmail(email)
    if (!user) {
      return Response.error(req, res, { message: 'User not found.' })
    }
    console.log(user)
    let { salt, pass: passwordHash } = user

    let verificationHash = Pass.sha512(password, salt).passwordHash
    if (verificationHash !== passwordHash) {
      return Response.error(req, res, { message: 'Invalid password.' })
    }

    let logged = user

    req.user = logged
    return Response.success(req, res, logged)
  }

  register(req, res) {
    let { email, password } = this.decodeCredentials(req)
    console.log(email, password)
    if (!email) {
      return Response.error(req, res, { message: 'missing email' })
    }
    if (!password) {
      return Response.error(req, res, { message: 'missing password' })
    }
    let name = req.body.name
    if (!name) {
      name = email.split('@')[0]
    }

    let user = this.model.getUserByEmail(email)
    if (user) {
      return Response.error(req, res, {
        message: 'Email already registered.'
      })
    }
    let { salt, passwordHash } = Pass.saltHashPassword(password)

    let registeredUser = {
      id: req.user.id,
      salt,
      pass: passwordHash,
      email,
      name
    }
    console.log({registeredUser})
    return this.model.update(req.user.id, registeredUser).then(updated => {
      let result = Object.assign({}, updated)

      req.user = result
      return Response.success(req, res, result)
    })
  }

  logout(req, res) {
    let ip = req.ip
    return this.model
      .anonymous(ip)
      .then(anonymous => {
        req.user = anonymous
        return Response.success(req, res, anonymous)
      })
      .catch(error => Response.error(req, res, error))
  }
}

module.exports = new User()
