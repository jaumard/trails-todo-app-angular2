'use strict'

const Model = require('trails-model')

/**
 * @module Todo
 * @description TODO document Model
 */
module.exports = class Todo extends Model {

  static config () {
  }

  static schema (Sequelize) {
    return {
      title: { type: Sequelize.STRING, allowNull: false },
      completed: { type: Sequelize.BOOLEAN }
    }
  }
}
