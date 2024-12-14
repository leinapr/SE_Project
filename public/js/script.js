document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.querySelector('.product-list');
    if (productList) {
        try {
            const response = await fetch('/products');
            const products = await response.json();

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price.toFixed(2)}</p>
                    <a href="sproduct.html?id=${product.id}" class="btn">View Product</a>
                `;
                productList.appendChild(productItem);
            });
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }
});