const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Session = sequelize.define('session', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  } ,
  time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Session;