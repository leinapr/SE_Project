const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(500),
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
    image: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING(500)
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'products', // Specify the existing table name
    timestamps: false      // Disable timestamps
});

// Find product by ID
Product.findById = async function(id) {
    try {
        return await Product.findByPk(id); // find by primary key (id)
    } catch (err) {
        throw new Error('Product not found');
    }
};

module.exports = Product;
