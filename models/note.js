const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Note = sequelize.define('note', {
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
  noteHeader: {
    type: Sequelize.STRING,
    allowNull: false
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false
  },
});


module.exports = Note;