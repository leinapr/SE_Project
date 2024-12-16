document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productAuthors = document.querySelector('.product-authors');

    try {
        // Fetch product details from the API
        const response = await fetch(`/api/product/${productId}`);
        const product = await response.json();

        if (product) {
            // Set the product name, price, description, and image
            document.querySelector('.product-name').textContent = product.name;
            // document.querySelector('.product-authors').textContent = `by ${product.authors.join(', ')}`;
            document.querySelector('.product-genres').textContent = product.genres;
            document.querySelector('.product-price').textContent = `$${parseFloat(product.price).toFixed(2)}`;  // Ensure price is formatted properly
            document.querySelector('.product-description').textContent = product.description;

            // Dynamically add authors to the 'by' section
            if (product.authors && product.authors.length > 0) {
                const authorsLinks = product.authors.map(author => {
                    return `<a href="author.html?name=${encodeURIComponent(author)}" class="author-link">${author}</a>`;
                }).join(', ');  // Join authors with commas
                productAuthors.innerHTML = `by ${authorsLinks}`;
            } else {
                productAuthors.textContent = 'Author information not available';
            }

            // Ensure the image source is correctly set
            const imageElement = document.querySelector('.product-image img');
            if (imageElement) {
                imageElement.src = product.image || 'default-image.jpg';  // Fallback if no image is provided
                imageElement.alt = product.name;   // Set alt text to product name
            }
        } else {
            console.error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
});

