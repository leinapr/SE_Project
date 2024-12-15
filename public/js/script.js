document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.querySelector('.product-list');
    if (productList) {
        try {
            console.log('Fetching products...');
            const response = await fetch('/products');
            const products = await response.json();
            console.log('Fetched products:', products);

            products.forEach(product => {
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
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    } else {
        console.error('.product-list container not found in the HTML.');
    }
});