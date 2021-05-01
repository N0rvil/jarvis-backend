const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isValid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  banned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  registerHash: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = User;