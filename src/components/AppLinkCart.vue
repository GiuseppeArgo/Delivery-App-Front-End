<script>
export default {
    props: {
        quantity: Number,
        scrollThreshold: {
            type: Number,
            default: 0 // Imposta il valore predefinito per la soglia di scroll
        }
    },
    data() {
        return {
            cart: '',
            slug: '',
            isScrolled: false, // Aggiunta variabile per tracciare lo stato dello scroll
        }
    },
    created() {
        this.slug = localStorage.getItem('slug');
        this.cart = JSON.parse(localStorage.getItem('cart'));
        window.addEventListener('scroll', this.handleScroll); // Aggiungi listener per lo scroll
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll); // Rimuovi listener per evitare memory leak
    },
    methods: {
        handleScroll() {
            // Imposta la variabile isScrolled a true quando l'utente ha scrollato più della soglia definita
            this.isScrolled = window.scrollY > this.scrollThreshold;
        }
    }
}
</script>

<template>
    <router-link :to="{ name: 'cartshopping', params: { slug: slug } }">
        <div class="cart-container d-flex flex-column justify-content-center align-items-center position-fixed end-0 btn"
            :class="isScrolled ? 'btn-outline-primary' : 'btn-primary'"
            >
            <!-- inserisci la quantità nel carrello -->
            <div class="md_circle">
                <span>
                    {{ quantity }}
                </span>
            </div>
            <!-- /inserisci la quantità nel carrello -->
            <div class="cart d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </div>
    </router-link>
</template>

<style scoped lang="scss">
.cart-container {
    width: 50px;
    border-radius: 50%;
    top: 130px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
    transition: background-color 0.3s ease;
    /* Per aggiungere una transizione fluida */
}

.cart {
    font-size: 22px;
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
