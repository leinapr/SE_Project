document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.querySelector('.product-list');
    const searchInput = document.getElementById('search-input');
    const filterCriteria = document.getElementById('filter-criteria');
    const filterGenre = document.getElementById('filter-genre');
    const filterCategory = document.getElementById('filter-category');
    const filterType = document.getElementById('filter-type');
    const sortBy = document.getElementById('sort-by');
    const response = await fetch('/products');  // Fetch request to /products route

    if (productList) {
        try {
            console.log('Fetching products...');
            //const response = await fetch('http://localhost:3003/products');
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }
            const products = await response.json();
            console.log('Fetched products:', products);

            const displayProducts = (filteredProducts) => {
                productList.innerHTML = '';
                if (filteredProducts.length === 0) {
                    productList.innerHTML = '<p>No products found.</p>';
                } else {
                    filteredProducts.forEach(product => {
                        const productItem = document.createElement('div');
                        productItem.classList.add('product-item');
                        productItem.innerHTML = `
                            <h2>${product.name}</h2>
                            <p>$${parseFloat(product.price).toFixed(2)}</p>
                            <p>Score: ${product.score || "not scored yet"}</p>
                            <img src="${product.image}" alt="${product.name}" class="product-image" />
                            <a href="sproduct.html?id=${product.id}" class="btn">View Product</a>
                        `;
                        productList.appendChild(productItem);
                    });
                }
            };

            const filterProducts = (query, criteria, genre, category, type) => {
                return products.filter(product => {
                    let isMatch = true;
                    if (criteria === 'all') {
                        isMatch = (
                            product.name.toLowerCase().includes(query) ||
                            (product.authors && product.authors.some(author => author.toLowerCase().includes(query))) ||
                            (product.genres && product.genres.some(g => g.toLowerCase().includes(query))) ||
                            product.price.toString().includes(query)
                        );
                    } else if (criteria === 'name') {
                        isMatch = product.name.toLowerCase().includes(query);
                    } else if (criteria === 'author') {
                        isMatch = product.authors && product.authors.some(author => author.toLowerCase().includes(query));
                    } else if (criteria === 'price') {
                        isMatch = product.price.toString().includes(query);
                    }

                    if (genre && genre !== 'all') {
                        isMatch = isMatch && product?.genres?.some(g => g.toLowerCase() === genre.toLowerCase());
                    }
                    if (category && category !== 'all') {
                        isMatch = isMatch && product?.category?.toLowerCase() === category.toLowerCase();
                    }
                    if (type && type !== 'all') {
                        isMatch = isMatch && product?.type?.toLowerCase() === type.toLowerCase();
                    }

                    return isMatch;
                });
            };

            const sortProducts = (filteredProducts, criteria) => {
                let sortedProducts = [...filteredProducts];
                switch (criteria) {
                    case 'name':
                        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'price-asc':
                        sortedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        sortedProducts.sort((a, b) => b.price - a.price);
                        break;
                    case 'score':
                        sortedProducts.sort((a, b) => (b.score || 0) - (a.score || 0));
                        break;
                    case 'default':
                        break;
                    default:
                        break;
                }
                return sortedProducts;
            };

            const updateProductsDisplay = () => {
                const query = searchInput.value.toLowerCase();
                const criteria = filterCriteria.value;
                const genre = filterGenre.value;
                const category = filterCategory.value;
                const type = filterType.value;
                const sortCriteria = sortBy.value;

                let filteredProducts = filterProducts(query, criteria, genre, category, type);
                filteredProducts = sortProducts(filteredProducts, sortCriteria);
                displayProducts(filteredProducts);
            };

            searchInput.addEventListener('input', updateProductsDisplay);
            filterGenre.addEventListener('change', updateProductsDisplay);
            filterCategory.addEventListener('change', updateProductsDisplay);
            filterType.addEventListener('change', updateProductsDisplay);
            sortBy.addEventListener('change', updateProductsDisplay);

            displayProducts(products);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    } else {
        console.error('.product-list container not found in the HTML.');
    }
});
