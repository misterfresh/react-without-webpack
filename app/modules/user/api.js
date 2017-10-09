import Entity from 'api/entity'

class User extends Entity {
  constructor() {
    super()

    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.logout = this.logout.bind(this)
  }

  login(email, password) {
    return this.post(this.uri + '/login', {
      headers: {
        Authorization:
          'Basic ' + window.btoa(encodeURIComponent(`${email}:${password}`))
      }
    })
  }

  register(email, password, name) {
    return this.post(this.uri + '/register', {
      headers: {
        Authorization:
          'Basic ' + window.btoa(encodeURIComponent(`${email}:${password}`))
      },
      body: JSON.stringify({
        name
      })
    })
  }

  logout() {
    return this.post(this.uri + '/logout')
  }
}

export default new User()
