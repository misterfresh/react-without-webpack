let Promise = require('bluebird')
let njwt = require('njwt')

let uuid = require('api/utils/uuid')
let conf = require('conf/api')
let db = require('db')
let secretKey = conf.secret

class User extends db {
  constructor() {
    super()
    this.anonymous = this.anonymous.bind(this)
    this.registered = this.registered.bind(this)
    this.verify = this.verify.bind(this)
    this.createToken = this.createToken.bind(this)
    this.getUserByEmail = this.getUserByEmail.bind(this)
  }

  anonymous(ip) {
    let userId = uuid()
    let anonymousUser = {
      id: userId,
      authorId: userId,
      email: '',
      name: 'Guest',
      pass: '',
      salt: '',
      emailVerified: false,
      ip
    }
    return this.insert(userId, anonymousUser).then(user => {

      return user
    })
  }

  registered(user) {
    return this.get(user.id).then(user => {

      return user
    })
  }

  createToken(user) {
    return njwt
      .create(
        {
          iss: conf.domain,
          sub: user.id,
          name: user.name,
          email: user.email,
          organizations: user.organizations,
          id: user.id,
          date: Date.now()
        },
        secretKey
      )
      .compact()
  }

  verify(token) {
    return new Promise((resolve, reject) => {
      njwt.verify(token, secretKey, function(err, decodedToken) {
        if (err) {
          return reject(err)
        }
        return resolve(decodedToken)
      })
    })
  }

  getUserByEmail(email) {
    return Object.values(this.data).find( user => user.email === email )
  }
}

module.exports = new User()
