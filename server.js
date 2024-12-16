const express = require('express');
const sequelize = require('./models');
// const productRoutes = require('./routes/products');
const Product = require('./models/Product');

const app = express();
const port = 3003;
const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/products', async (req, res) => {
    const { author } = req.query;
    let query = {};

    if (author) {
        query.authors = { $in: [author] };
    }

    try {
        const products = await Product.findAll(); // Fetch all products from the database
        res.json(products);  // Send the list of products as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

app.get('/api/product/:id', async (req, res) => {
    console.log(`Fetching product with ID: ${req.params.id}`); // Log the requested product ID
    const productId = req.params.id;

    try {
        // Fetch the product by ID
        const product = await Product.findByPk(productId);

        if (!product) {
            // If product does not exist
            return res.status(404).json({ message: 'Product not found' });
        }

        // If product found, return product data
        res.json(product);
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ message: 'Error fetching product details' });
    }
});


// Sync models with the database
sequelize.sync({ alter: true }) // Use alter to update the schema without dropping tables
    .then(() => {
        console.log('Database & tables synced!');
    });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});