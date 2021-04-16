const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const blockedEvent = sequelize.define('blockedEvent', {
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
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false
  } ,
  date: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = blockedEvent;