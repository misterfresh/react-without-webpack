let crypto = require('crypto')

class Pass {
  constructor() {
    this.genRandomString = this.genRandomString.bind(this)
    this.sha512 = this.sha512.bind(this)
    this.saltHashPassword = this.saltHashPassword.bind(this)
  }

  genRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length)
  }

  sha512(password, salt) {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  }

  saltHashPassword(userpassword) {
    let salt = this.genRandomString(16)
    return this.sha512(userpassword, salt)
  }
}

module.exports = new Pass()
