const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
