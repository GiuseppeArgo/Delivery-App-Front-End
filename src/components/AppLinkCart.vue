<script>
export default {
    props: {
        quantity: Number,
    },
    data() {
        return {
            cart: '',
            slug: '',
        }
    },
    created() {
        this.slug = localStorage.getItem('slug');
        this.cart = JSON.parse(localStorage.getItem('cart'));
    },
    methods: {

    }
}
</script>

<template>
    <router-link :to="{ name: 'cartshopping', params: { slug: slug } }">
        <div class="cart-container d-flex flex-column justify-content-center align-items-center position-fixed end-0 ">
            <!-- insert quantity cart-shop -->
            <div class="md_circle">
                <span>
                    {{ quantity }}
                </span>
            </div>
            <!-- /insert quantity cart-shop -->
            <div class="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-cart-shopping text-white"></i>
            </div>
        </div>
    </router-link>
</template>

<style scoped lang="scss">
// div {
//     width: 50px;
//     height: 50px;
// }

/* cart */
.cart-container {
    background-color: #0072E5;
    width: 50px;
    border-radius: 50%;
    top: 130px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
}

@media (max-width: 576px) {
    .cart-container {
        top: 300px;
        /* Sposta il div più in basso */
    }
}

.md_circle {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    bottom: 35px;
    right: 35px;
    font-size: 16px;
    background-color: orange;
    color: white;
}

/* cart */

/* cart */
.carrello {
    width: 100px;
    /* Width of the cart element */
    height: 100px;
    /* Height of the cart element */
    margin-top: 100px;
    /* Top margin to position the cart element */
}

/* cart */


@media (max-width: 430px) {
    .cart-container {
        width: 40px;
        aspect-ratio: 1;

        span,
        i {
            font-size: 10px
        }
    }

    .md_circle {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        bottom: 25px;
        right: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>