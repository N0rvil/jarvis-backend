const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Event = sequelize.define('event', {
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
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventName: {
      type: Sequelize.STRING,
      allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  from: {
      type: Sequelize.STRING,
      allowNull: false
  },
  to: {
    type: Sequelize.STRING,
    allowNull: false
  },
  repeat: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Event;