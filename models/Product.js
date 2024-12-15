const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
    },
    score: {
        type: DataTypes.DECIMAL(10, 2),
    },
    status:{
        type: DataTypes.STRING,
    },
    volumes:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Specify the array of strings
    },
    demographics: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Specify the array of strings
    },
    authors: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Specify the array of strings
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'products', // Specify the existing table name
    timestamps: false      // Disable timestamps
});

module.exports = Product;