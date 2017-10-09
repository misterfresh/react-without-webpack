let Promise = require('bluebird')
let fs = require('fs')
let path = require('path')
let data = require('./data.json')
let dataPath = path.join(process.cwd(), 'server/api/db/data.json')

class fakeDb {
  constructor() {
    this.insert = this.insert.bind(this)
    this.get = this.get.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.data = data
    this.saveToFile = this.saveToFile.bind(this)
  }

  saveToFile(){
    fs.writeFile(dataPath, JSON.stringify(this.data), function(err) {
      if (err) return console.log(err)
    })
  }

  insert(id, data) {
    return new Promise((resolve, reject) => {
      if(typeof this.data[id] !== 'undefined'){
        return reject('already exists')
      }
      this.data[id] = data
      this.saveToFile()
      return resolve(data)
    })
  }

  get(id) {
    return new Promise((resolve, reject) => {
      console.log('id', id)
      if(typeof this.data[id] === 'undefined'){
        return reject('not found')
      }
      return resolve(this.data[id])
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      delete this.data[id]
      this.saveToFile()
      return resolve('done')
    })
  }

  update(id, newData) {
    return this.get(id).then(
      originalData => {
        this.data[id] = Object.assign({}, originalData, newData)
        this.saveToFile()
        return this.data[id]
      })
  }
}

module.exports = fakeDb
