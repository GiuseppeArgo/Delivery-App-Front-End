<script>
export default {
    data() {
        return {
            cartOpen: false,
            cartItems: [
                { id: 1, name: 'Il Mare', price: 8.70, quantity: 1, image: 'https://via.placeholder.com/50' },
                { id: 2, name: 'La Raffinata', price: 8.50, quantity: 1, image: 'https://via.placeholder.com/50' }
            ]
        }
    },
    computed: {

        // Calculate the total price of items in the cart
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        }
    },
    methods: {
        // Open the cart
        openCart() {
            this.cartOpen = true;
        },

        // Close the cart
        closeCart() {
            this.cartOpen = false;
        },

        // Increase the quantity of a cart item
        increaseQuantity(item) {
            item.quantity++;
        },

        // Decrease the quantity of a cart item, ensuring it doesn't go below 1
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
            }
        },

        // Remove an item from the cart
        removeItem(item) {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        },

        // Empty the cart
        emptyCart() {
            this.cartItems = [];
        }
    }
}
</script>

<template>

    <div>

        <!-- Button to open the cart -->
        <button class="btn ms_btn" @click="openCart"><i class="fa-solid fa-cart-shopping fs-2"></i></button>

        <!-- Cart component -->
        <div class="cart" :class="{ active: cartOpen }">
            <div class="cart-header">
                <h5>Il tuo ordine</h5>
                <button class="btn-close" @click="closeCart"></button>
            </div>
            <div class="cart-body">
                <div class="cart-item" v-for="item in cartItems" :key="item.id">
                    <img :src="item.image" alt="Product" class="img-fluid">
                    <div class="cart-item-info">
                        <p>{{ item.name }}</p>
                        <p>{{ item.price }} €</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn btn-sm btn-outline-secondary" @click="decreaseQuantity(item)">-</button>
                        <span>{{ item.quantity }}</span>
                        <button class="btn btn-sm btn-outline-secondary" @click="increaseQuantity(item)">+</button>
                        <button class="btn btn-sm btn-danger" @click="removeItem(item)">Rimuovi</button>
                    </div>
                </div>
            </div>

            <!-- Display the total price -->
            <div class="cart-footer">
                <p>Totale: {{ totalPrice }} €</p>
                <button class="btn btn-success w-100 mb-2">Procedi all'ordine</button>
                
                <!-- Button to empty the cart -->
                <button class="btn btn-danger w-100" @click="emptyCart">Svuota Carrello</button>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use "../sass/colorpalette.scss" as *;
.ms_btn {
    color: $white;
}

.cart {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: $white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1040; /* Bootstrap modal z-index is 1040 */
}

.cart.active {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid $gray;
}

.cart-body {
  padding: 1rem;
  overflow-y: auto;
  height: calc(100% - 130px);
}

.cart-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  border-top: 1px solid $gray;
  background: $white;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid $gray;
}

.cart-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.cart-item-info {
  flex-grow: 1;
  margin-left: 1rem;
}

.cart-item-actions {
  display: flex;
  align-items: center;
}

.cart-item-actions button {
  margin: 0 0.2rem;
}

</style>