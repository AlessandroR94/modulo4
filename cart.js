document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById('cartItems');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} €</td>
                <td>${product.quantity}</td>
                <td><button class="btn btn-danger btn-sm remove-from-cart" data-product-id="${product.id}">Rimuovi</button></td>`;
            cartItemsContainer.appendChild(productRow);
        });

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-product-id');
                removeFromCart(productId);
            });
        });
    }

    renderCartItems();
});
