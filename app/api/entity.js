import Api from 'api/api'

class Entity extends Api {
  constructor() {
    super()

    this.name = this.constructor.name.toLowerCase()
    this.uri = this.apiUrl + this.name
    this.defaultSortColumn = 'title'

    this.add = this.add.bind(this)
    this.getById = this.getById.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  getById(id) {
    return this.get(this.uri + '/' + id)
  }

  add(entity) {
    return this.post(this.uri, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [this.name]: entity
      })
    })
  }

  remove(id) {
    return this.delete(this.uri + '/' + id)
  }

  update(entity) {
    return this.put(this.uri, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [this.name]: entity
      })
    })
  }


}

export default Entity
