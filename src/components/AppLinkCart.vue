<script>
export default {
    props: {
        quantity: Number,
        scrollThreshold: {
            type: Number,
            default: 0 // Default value scroll 0
        }
    },
    data() {
        return {
            cart: '',
            slug: '',
            isScrolled: false, // flag scroll to change color
        }
    },
    created() {
        this.slug = localStorage.getItem('slug');
        this.cart = JSON.parse(localStorage.getItem('cart'));
        window.addEventListener('scroll', this.handleScroll); // add listener scroll
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll); // remove listener scroll
    },
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > this.scrollThreshold;
        }
    }
}
</script>

<template>
    <router-link :to="{ name: 'cartshopping', params: { slug: slug } }">
        <div class="cart-container btn"
            :class="isScrolled ? 'btn-outline-primary' : 'btn-primary'"
            >
            <!-- pop up quantity -->
            <div class="md_circle">
                <span>
                    {{ quantity }}
                </span>
            </div>
            <!-- pop up quantity -->

           <!-- pop up cart -->
            <div class="cart ">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
           <!-- pop up cart -->

        </div>
    </router-link>
</template>

<style scoped lang="scss">

.cart-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 0;
    width: 50px;
    border-radius: 50%;
    top: 130px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
    transition: background-color 0.3s ease;
}

.cart {
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 576px) {
    .cart-container {
        top: 300px;
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

@media (max-width: 430px) {
    .cart-container {
        width: 40px;
        aspect-ratio: 1;

        span {
            font-size: 10px;
        }

        .cart {
            font-size: 14px;
        }
    }

    .md_circle {
        width: 20px;
        height: 20px;
        line-height: 20px;
        bottom: 25px;
        right: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
