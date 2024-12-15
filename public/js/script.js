document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.querySelector('.product-list');
    const searchInput = document.getElementById('search-input');
    const filterCriteria = document.getElementById('filter-criteria');

    if (productList) {
        try {
            console.log('Fetching products...');
            const response = await fetch('/products');
            const products = await response.json();
            console.log('Fetched products:', products);

            // Function to display products
            const displayProducts = (filteredProducts) => {
                productList.innerHTML = ''; // Clear current products
                filteredProducts.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');
                    productItem.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>$${parseFloat(product.price).toFixed(2)}</p>
                        <img src="${product.image}" alt="${product.name}" class="product-image" />
                        <a href="sproduct.html?id=${product.id}" class="btn">View Product</a>
                    `;
                    productList.appendChild(productItem);
                });
            };

            // Initial display of all products
            displayProducts(products);

            // Add event listener for search
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const criteria = filterCriteria.value;

                // Filter products based on the search criteria
                const filteredProducts = products.filter(product => {
                    if (criteria === 'all') {
                        return (
                            product.name.toLowerCase().includes(query) ||
                            product.genres.some(genre => genre.toLowerCase().includes(query)) ||
                            product.authors.some(author => author.toLowerCase().includes(query)) ||
                            product.price.toString().includes(query)
                        );
                    }
                    if (criteria === 'name') {
                        return product.name.toLowerCase().includes(query);
                    }
                    if (criteria === 'genre') {
                        return product.genres.some(genre => genre.toLowerCase().includes(query));
                    }
                    if (criteria === 'author') {
                        return product.authors.some(author => author.toLowerCase().includes(query));
                    }
                    if (criteria === 'price') {
                        return product.price.toString().includes(query);
                    }
                    return false;
                });

                // Update displayed products
                displayProducts(filteredProducts);
            });

        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    } else {
        console.error('.product-list container not found in the HTML.');
    }
});
