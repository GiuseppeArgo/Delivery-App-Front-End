export function clearCart(cart) {
    // Empty all items from the cart
    cart.items = {};
    // Reset the total quantity
    cart.totalQuantity = 0;
    // Reset the total price
    cart.totalPrice = 0;

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('restaurant_id');
    localStorage.removeItem('slug');
    console.log('Carrello svuotato.');
}