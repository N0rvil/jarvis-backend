const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_f136652fadf6d5b', 'bef411da8e2743', '', { 
    dialect: 'mysql',
    host: 'eu-cdbr-west-03.cleardb.net',
    password: 'bf7fd48f'
});

module.exports = sequelize;