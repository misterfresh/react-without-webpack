let express = require('express')
let Response = require('response')

class Entity {
  constructor() {
    this.router = express.Router()
    this.name = this.constructor.name.toLowerCase()

    this.model = require(`./../models/${this.name}.js`)

    this.getById = this.getById.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.setDefaultRoutes = this.setDefaultRoutes.bind(this)
  }

  getById(req, res, next) {
    let id = !!req.params && !!req.params.id ? req.params.id : false
    if (!id) {
      return next()
    }

    return this.model
      .getById(id)
      .then(fetched => Response.success(req, res, fetched))
      .catch(error => Response.error(req, res, error))
  }

  add(req, res, next) {
    let entity =
      !!req.body &&
      typeof req.body[this.name] !== 'undefined' &&
      !!req.body[this.name]
        ? req.body[this.name]
        : false
    if (!entity) {
      return Response.error(req, res, { message: `No ${this.name} provided.` })
    }
    entity.authorId = req.user.id
    entity.organizations = req.user.organizations
    console.log('adding entity', entity)
    return this.model
      .add(entity)
      .then(inserted => Response.success(req, res, inserted))
      .catch(error => Response.error(req, res, error))
  }

  remove(req, res) {
    let id = !!req.params && !!req.params.id ? req.params.id : false
    if (!id) {
      return Response.error(req, res, { message: `No ID provided.` })
    }
    return this.model
      .remove(id)
      .then(removed => Response.empty(req, res))
      .catch(error => Response.error(req, res, error))
  }

  setDefaultRoutes(actions = []) {
    if (!actions.length) {
      this.router.get('/:id/:field', this.getField)
      this.router.get('/:id', this.getById)
      this.router.get('', this.list)
      this.router.post('', this.add)
      this.router.put('/:id', this.replace)
      this.router.patch('/:id', this.patch)
      this.router.delete('/:id', this.remove)
    } else {
      if (actions.includes('delete')) {
        this.router.delete('/:id', this.remove)
      }
    }
  }
}

module.exports = Entity
