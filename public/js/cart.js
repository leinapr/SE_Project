document.addEventListener('DOMContentLoaded', async () => {
    const cartContainer = document.querySelector('.cart-items');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    const cartList = document.querySelector('.cart-list');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        cartList.innerHTML = ''; // Clear existing cart items
        let cartSubtotal = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            const itemSubtotal = item.price * item.quantity;
            cartSubtotal += itemSubtotal;

            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" />
                    <p>${item.name}</p>
                </div>
                <p>$${item.price.toFixed(2)}</p>
                <input type="number" min="1" value="${item.quantity}" class="cart-quantity" data-index="${index}" />
                <p class="item-subtotal">$${itemSubtotal.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}"><i class="far fa-times-circle"></i></button>
            `;
            cartList.appendChild(cartItem);
        });

        // Update cart totals
        cartSubtotalElement.textContent = `$${cartSubtotal.toFixed(2)}`;
        cartTotalElement.textContent = `$${cartSubtotal.toFixed(2)}`;
    }

    cartList.addEventListener('input', (e) => {
        if (e.target.classList.contains('cart-quantity')) {
            const index = e.target.dataset.index;
            cartItems[index].quantity = parseInt(e.target.value, 10);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart(); // Re-render the cart
        }
    });

    // Event listener for removing items
    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const index = e.target.closest('.remove-item').dataset.index;
            cartItems.splice(index, 1); // Remove item from the cart
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart(); // Re-render the cart
        }
    });

    // Proceed to checkout button
    function proceedToCheckout() {
        window.location.href = 'checkout.html'; // Navigate to checkout page
    }
});