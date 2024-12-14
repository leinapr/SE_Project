const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'postgres', '12082001sad', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;