document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productAuthors = document.querySelector('.product-authors');
    const addToCartButtons = document.querySelectorAll('.add-to-cart'); // Select all add-to-cart buttons
    const buyNowButtons = document.querySelectorAll('.buy-now'); // Select all buy-now buttons

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

            // Add event listeners to "Add to Cart" buttons
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Logic to add product to cart
                    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve current cart or initialize as empty array
                    const productInCart = cart.find(item => item.id === product.id); // Check if product is already in cart

                    if (!productInCart) {
                        cart.push({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1 // Default to 1 quantity
                        });
                    } else {
                        productInCart.quantity += 1; // Increment quantity if product is already in cart
                    }

                    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart in localStorage
                    console.log('Product added to cart:', product.name);
                });
            });

            // Add event listeners to "Buy Now" buttons
            buyNowButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Logic to immediately buy the product (e.g., redirect to checkout page)
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const productInCart = cart.find(item => item.id === product.id);

                    if (!productInCart) {
                        cart.push({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                        });
                    } else {
                        productInCart.quantity += 1;
                    }

                    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
                    console.log('Product added to cart for immediate purchase:', product.name);

                    // Redirect to cart page for checkout
                    window.location.href = 'cart.html';
                });
            });

        } else {
            console.error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
});
