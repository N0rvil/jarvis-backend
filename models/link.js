const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Link = sequelize.define('link', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false
  } ,
  linkName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
});


module.exports = Link;