<script>
import axios from 'axios';
import { store } from "../store";
import AppLinkCart from '../components/AppLinkCart.vue';
import AppTop from '../components/AppTop.vue';
import { clearCart } from '../function.js';

export default {
    components: {
        AppLinkCart,
        AppTop,
    },
    data() {
        return {
            modalMessage: '',
            dishToUpdate: null,
            valueToUpdate: null,
            store,
            restaurant: [],
            baseSrc: "http://127.0.0.1:8000/storage",
            id: "",
            cart: {
                items: {},
            },
            isLoadingCart: true,
            slug: '',
            curSlug: '',
        };
    },
    created() {
        window.scrollTo(0, 0);
        // Try to retrieve the cart from localStorage and convert it into a JavaScript object
        let cartString = localStorage.getItem('cart');
        if (cartString) {
            try {
                this.cart = JSON.parse(cartString);
            } catch (error) {
                console.error("Errore durante la lettura del carrello:", error);
                // In case of an error, set the cart to a default empty value
                this.cart = {};
            }
        } else {
            // If no cart exists, initialize a new empty object
            this.cart = {};
        }

        this.fetchRestaurant();
    },

    methods: {
        fetchRestaurant() {
            this.curSlug = this.$route.params.slug;
            this.slug = this.$route.params.slug;
            console.log(typeof this.store.slug, this.store.slug);
            axios.get(`${store.apiMainUrl}/api/restaurants/${this.slug}`)
                .then(response => {
                    this.restaurant = response.data.result;
                    console.log(this.restaurant);
                    if (this.restaurant == null) {
                        this.$router.push({ name: 'paginanontrovata' }); // redirect not found page 
                    }
                })
                .catch(error => {
                    console.error('Errore durante la chiamata API:', error.message || JSON.stringify(error));
                    this.$router.push({ name: 'paginanontrovata' }); // redirect not found page
                });
        },
        openModal(dish, value) {
            this.dishToUpdate = dish;
            this.valueToUpdate = value;
            console.log(dish, value);
            this.modalMessage = "Stai cambiando ristorante. Vuoi svuotare il carrello?";
            $(this.$refs.confirmModal).modal('show');
        },
        hideModal() {
            $(this.$refs.confirmModal).modal('hide');
        },
        handleConfirm() {
            if (this.dishToUpdate && this.valueToUpdate !== null) {
                this.refresh(this.dishToUpdate, this.valueToUpdate);
            }
            clearCart(this.cart);
            this.hideModal();

        },
        handleCancel() {
            console.log('Utente ha deciso di non svuotare il carrello.');
            this.hideModal();
        },
        refresh(dish, value) {
            console.log("qui entro");
            localStorage.setItem('slug', this.$route.params.slug);
            this.slug = localStorage.getItem('slug');
            let quantity = value === 1 ? 1 : -1;
            const dish_id = parseInt(dish.id);
            const dish_name = dish.name;
            const restaurant_id = dish.restaurant_id;
            const price = parseFloat(dish.price);

            console.log(quantity, dish_id, dish_name, restaurant_id, price);

            const savedCart = localStorage.getItem('cart');
            if (savedCart && savedCart !== 'undefined') {
                this.cart = JSON.parse(savedCart);
            }

            let savedRestaurantId = localStorage.getItem('restaurant_id');
            if (savedRestaurantId && savedRestaurantId !== 'undefined') {
                const parsedSavedRestaurantId = JSON.parse(savedRestaurantId);
                if (parsedSavedRestaurantId === restaurant_id) {
                    console.log('Aggiungendo elemento al carrello poiché gli ID dei ristoranti corrispondono.');
                    this.addToCart(dish_id, dish_name, quantity, price);
                } else {
                    console.log('Differente ID di ristorante rilevato.');
                    this.openModal(dish_id, quantity);
                    this.modalMessage = "Stai cambiando ristorante. Vuoi svuotare il carrello?";
                    $(this.$refs.confirmModal).modal('show');
                }
            } else {
                console.log('Nessun restaurant_id salvato trovato in localStorage.');
                localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
                this.addToCart(dish_id, dish_name, quantity, price);
            }

            console.log(this.cart);
        },
        addToCart(dish_id, dish_name, quantity, price) {
            // assegno slug
            localStorage.setItem('slug', this.curSlug);
            this.slug = localStorage.getItem('slug');
            console.log(this.slug);
            // Check if `cart` and `cart.items` are defined
            if (!this.cart) {
                console.error('Cart is not defined');
                this.cart = {
                    items: {},
                    totalQuantity: 0,
                    totalPrice: 0
                };
            }

            if (!this.cart.items) {
                this.cart.items = {};
            }

            // Update total price
            if (quantity === 1) {
                this.cart.totalPrice += price;
                this.cart.totalQuantity += quantity;
                console.log(this.cart.totalPrice);
            } else if (this.cart.items[dish_id].quantity) {
                this.cart.totalQuantity += quantity;
                this.cart.totalPrice -= price;
                console.log(this.cart.totalPrice);
            }
            // /Update total price

            // Add/remove quantity in the cart or remove item
            if (!this.cart.items[dish_id] && quantity === 1) {
                this.cart.items[dish_id] = {
                    dish_id: dish_id,
                    name: dish_name,
                    quantity: quantity,
                    price: price
                };
            } else {
                if (this.cart.items[dish_id]) {
                    this.cart.items[dish_id].quantity += quantity;

                    if (this.cart.items[dish_id].quantity <= 0) {
                        delete this.cart.items[dish_id];
                        if (Object.keys(this.cart.items).length === 0) {
                            clearCart(this.cart);
                        }
                    }
                }
            }
            // / Add/remove quantity in the cart or remove item


            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },



        calculateTotalPrice() {
            // Calculate the total price of the cart
            this.cart.totalPrice = Object.values(this.cart.items).reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

        },
        getCartItemsLength() {
            return this.cart && this.cart.items ? Object.keys(this.cart.items).length : 0;
        },
        dynamicImage: function (curImg) {
            console.log(curImg);
            const lowerCaseImg = curImg.toLowerCase();
            return new URL(`../assets/img/bandiera/${lowerCaseImg}.png`, import.meta.url).href;
        }
    }
}
</script>

<template>

    <!-- top page -->
    <AppTop />
    <!-- /top page -->

    <!-- container-show-restaurant -->
    <div class="container-show-restaurant">

        <!-- cart-container -->
        <div v-if="getCartItemsLength() > 0">
            <AppLinkCart :quantity="cart.totalQuantity" />
        </div>
        <!-- /cart-container -->

        <!-- title -->
        <h1 class="text-center">{{ restaurant.name }}</h1>
        <!-- title -->

        <!-- restaurant details -->
        <div class="container mt-3 py-2" v-if="restaurant">

            <!-- row -->
            <div class="row justify-content-center align-items-center justify-content-sm-center">
                <!-- restaurant image -->
                <div
                    class="md_cont-img col-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-sm-center justify-content-md-end">
                    <img :src="`${baseSrc}/${restaurant.image}`" class="md_img" alt="Restaurant image">
                    <!-- <img :src="dynamicImage()" alt="Logo"> -->
                </div>
                <!-- /restaurant image -->

                <!-- restaurant description -->
                <div class="col-7 col-sm-6 col-md-6 col-lg-6 py-3">

                    <!-- cont-restaurant-description -->
                    <div class="d-flex flex-column">
                        <dt>
                            Descrizione
                        </dt>
                        <dd>
                            {{ restaurant.description }}
                        </dd>

                        <dt>
                            Indirizzo
                        </dt>
                        <dd>
                            {{ restaurant.address }}
                        </dd>
                        <dt>
                            Cucina:
                        </dt>
                        <dd class="d-flex gap-1">
                            <div v-for="(type, index) in restaurant.types" :key="index">
                                <img :src="dynamicImage(type.name)" alt="Logo" class="container-types-list">
                            </div>
                        </dd>

                    </div>
                    <!-- /cont-restaurant-description -->

                </div>
                <!-- /restaurant description -->

            </div>
            <!-- /row -->
        </div>
        <!-- restaurant details -->

        <!-- dishes container -->
        <div class="container-fluid mt-5 ">

            <!-- title menu -->
            <div class="border-bottom w-75 m-auto">
                <h2 class="font-title fs-1 text-center text-danger">
                    Menù
                </h2>
            </div>
            <!-- /title menu -->

            <!-- dish card -->
            <div v-for="curDish in restaurant.dishes">

                <!-- container-dish-card -->
                <div v-if="restaurant.dishes.length > 0" class="container d-flex justify-content-center">

                    <!-- row-dish-card -->
                    <div v-if="curDish.visibility" class="row border-bottom align-items-center w-75">

                        <!-- image -->
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 py-1">
                            <img :src="`${baseSrc}/${curDish.image}`" class="w-75 rounded-circle md_img-dish"
                                alt="immagine piatto">
                        </div>
                        <!-- /image -->

                        <!-- description -->
                        <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 py-1 text-center">
                            <!-- name -->
                            <div class="fs-3 text-center">
                                <span>
                                    {{ curDish.name }}
                                </span>
                            </div>
                            <!-- /name -->

                            <!-- description -->
                            <div class="mb-4">
                                <span>
                                    {{ curDish.description }}
                                </span>
                            </div>
                            <!-- /description -->

                            <!-- price and btn shop -->
                            <div class="d-flex justify-content-between align-items-center">

                                <!-- price -->
                                <div>
                                    <dt>Prezzo</dt>
                                    <dd>{{ curDish.price }} &euro;</dd>
                                </div>
                                <!-- /price -->

                                <div class="d-flex justify-content-center align-items-center text-center">
                                    <!-- btn less -->
                                    <div @click.prevent="refresh(curDish, -1)"
                                        class="ms-btn btn-left p-2 btn btn-outline-secondary d-flex justify-content-center align-items-center">
                                        <i class="fa-solid fa-minus"></i>
                                    </div>
                                    <!-- /btn less -->

                                    <!-- quantity in cart -->
                                    <div class="ms-btn btn-count" v-if="cart?.items">
                                        <span v-if="cart?.items[curDish.id]">{{ cart?.items[curDish.id].quantity
                                            }}</span>
                                        <span v-else>0</span>
                                    </div>
                                    <!-- /quantity -->

                                    <!-- btn add -->
                                    <div @click.prevent="refresh(curDish, 1)"
                                        class="ms-btn btn-right p-2 btn btn-outline-secondary ro d-flex justify-content-center align-items-center">
                                        <i class="fa-solid fa-plus"></i>
                                    </div>
                                    <!-- /btn add -->
                                </div>

                            </div>
                            <!-- /price and btn shop -->


                        </div>
                        <!-- /description -->

                    </div>
                    <!-- /row-dish-card -->

                </div>
                <!-- /container-dish-card -->

            </div>
            <!-- /dish card -->
        </div>
        <!-- /dishes container -->
    </div>
    <!-- /container-show-restaurant -->

    <!-- Modal -->
    <div class="modal fade" ref="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog text-center" role="document">
            <div class="modal-content">
                <div class="modal-body d-flex flex-column gap-4">
                    <span class="modal-title text-danger fw-bold fs-3" id="exampleModalLabel"> ATTENZIONE!</span>
                    <span class="fs-4">Stai cambiando ristorante. <br>Vuoi svuotare il carrello?</span>
                </div>
                <div class="modal-footer d-flex justify-content-around">
                    <button type="button" class="btn btn-danger w-25" @click="handleCancel">Annulla</button>
                    <button type="button" class="btn btn-primary w-25" @click="handleConfirm">Svuota</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END OF CART EMPTY MODAL -->


</template>


<style lang="scss" scoped>
@use "../sass/colorpalette.scss" as *;

//CART CONTAINER
.cart-container {
    background-color: $blue;
    width: 50px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
}

.cart-container a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 560px) {
    .cart-container {
        top: 300px;
        /* Sposta il div più in basso */
    }
}

//******************* */
//CONTAINER SHOW RESTAURANT
.container-show-restaurant {
    position: relative;
    // min-height: 100vh;
    margin-top: 100px;
    margin-bottom: 50px;
}

// COUNTER
.counter {
    margin: 0;
    padding: 0;
    // width: 20px;
    aspect-ratio: 1;

}

//BUTTON




//CUSTOM IMG RESTAURANT
.md_img-dish {
    // width: 20.5vw; /* Existing width */
    aspect-ratio: 1;
    /* Added height to maintain square aspect ratio */
    object-fit: cover;
    /* Ensures the image covers the area without stretching */
    display: block;
    /* Centers the image */
    margin: auto;
    /* Centers the image horizontally */
}


.md_img {
    width: 60%;
    /* Existing width */
    aspect-ratio: 1;
    /* Added height to maintain square aspect ratio */
    object-fit: cover;
    /* Ensures the image covers the area without stretching */
    display: block;
    /* Centers the image */
    margin: auto;
    /* Centers the image horizontally */
}

//CUSTOM IMG CONTAINER

//CUSTOM FONT
// .md_circle {
//     width: 25px;
//     height: 25px;
//     line-height: 25px;
//     text-align: center;
//     border-radius: 50%;
//     position: absolute;
//     bottom: 35px;
//     right: 35px;
//     font-size: 1rem;
//     background-color: orange;
//     color: $white;
// }

dd,
dt {
    font-size: clamp(12px, 2vw, 20px);
}
</style>
