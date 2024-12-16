document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.querySelector('.cart-list');
    const subtotalElement = document.getElementById('subtotal-value');
    const totalElement = document.getElementById('total-value');

    // Fetch the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
    } else {
        updateCart();
    }

    function updateCart() {
        let subtotal = 0;

        // Create the table rows dynamically for each cart item
        cartList.innerHTML = `
            <table width="100%">
                <thead>
                    <tr>
                        <td>Remove</td>
                        <td>Image</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Subtotal</td>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return `
                            <tr>
                                <td><a href="#" class="remove-item" data-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
                                <td><img src="${item.image}" alt="${item.name}"></td>
                                <td>${item.name}</td>
                                <td>$${item.price}</td>
                                <td><input type="number" value="${item.quantity}" data-id="${item.id}" class="update-quantity" min="1"></td>
                                <td>$${itemTotal.toFixed(2)}</td>
                            </tr>
                        `;
        }).join('')}
                </tbody>
            </table>
        `;

        // Update the totals
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;  // Assuming free shipping

        // Add event listeners for removing items
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                const productId = event.target.closest('a').getAttribute('data-id');
                removeFromCart(productId);
            });
        });

        // Add event listeners for updating quantity
        document.querySelectorAll('.update-quantity').forEach(input => {
            input.addEventListener('input', (event) => {
                const productId = event.target.getAttribute('data-id');
                const newQuantity = parseInt(event.target.value);
                if (newQuantity >= 1) {
                    updateQuantity(productId, newQuantity);
                } else {
                    // Prevent invalid input (less than 1)
                    event.target.value = 1;
                }
            });
        });
    }

    function removeFromCart(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateCart();  // Update the cart view and totals
    }

    function updateQuantity(productId, newQuantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();  // Update the cart view and totals
        }
    }

    function applyCoupon() {
        const couponInput = document.getElementById('coupon-input').value;
        if (couponInput === 'DISCOUNT10') {
            alert('Coupon applied: 10% off');
            const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
            const discount = subtotal * 0.10;
            const newTotal = subtotal - discount;
            totalElement.textContent = `$${newTotal.toFixed(2)}`;
        } else {
            alert('Invalid coupon');
        }
    }

    // Attach the applyCoupon function to the button click
    document.querySelector('#coupon .normal').addEventListener('click', applyCoupon);

    // Clear cart function
    function clearCart() {
        localStorage.removeItem('cart');
        updateCart();  // Update the cart view and totals
    }

    // Attach the clearCart function to the Clear Cart button
    document.getElementById('clear-cart').addEventListener('click', clearCart);
});