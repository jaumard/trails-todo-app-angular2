'use strict'

const Model = require('trails-model')
const Sequelize = require('sequelize')

/**
 * @module Todo
 * @description TODO document Model
 */
module.exports = class Todo extends Model {

  static config () {
  }

  static schema () {
    return {
      title: { type: Sequelize.STRING, allowNull: false },
      completed: { type: Sequelize.BOOLEAN }
    }
  }
}
