const express = require('express');
const sequelize = require('./models');
const productRoutes = require('./routes/products');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Sync models with the database
sequelize.sync({ alter: true }) // Use alter to update the schema without dropping tables
    .then(() => {
        console.log('Database & tables synced!');
    });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});