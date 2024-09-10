<script>
import axios from 'axios';
import { store } from "../store";
import { RouterLink } from 'vue-router';
import AppTop from '../components/AppTop.vue';

export default {
    components: {
        AppTop
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: '',
            cardNumber: '',
            expirationDate: '',
            cartPrice: 0,
            cart: '',
            store,
            order_id: 0,
            errors: {},
            paymentDetails: {
                card_number: '',
                card_expire_date: '',
                payment_method_nonce: 'fake-valid-nonce',
            },
            isSuccess: false,
            isLoading: false,
            isError: false,
        };
    },

    created() {
        window.scrollTo(0, 0);

        // Store the navigation history count
        this.$root.historyCount = window.history.length;
        this.cartPrice = JSON.parse(localStorage.getItem('cart'));
        console.log(this.cartPrice.totalPrice);
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },

        async getToken() {
            this.isLoading = true;
            try {
                // First call to get the token
                await axios.get(`${store.apiMainUrl}/api/generatetoken`).then((resp) => {
                    const token = resp.data.result;
                })

                // Second call to make the payment
                await axios.post(`${store.apiMainUrl}/api/makepayment`,
                    {
                        ...this.paymentDetails,
                        amount: this.cart.totalPrice // Our cart price value
                    },
                    { headers: { 'Content-type': 'multipart/form-data' } }).
                    then(response => {
                        this.saveOrder();
                    })
                    .catch(({ error, response }) => {
                        this.isLoading = false;
                        this.isError = true;
                        console.error(error);
                    })
            } catch (error) {
                this.isLoading = false;
                this.isError = true;
                console.error('Si è verificato un errore nelle chiamate axios.post():', error);
            }
        },

        saveOrder() {
            // Remove all spaces from fields before saving
            const cleanedFirstName = this.firstName.replace(/\s+/g, '');
            const cleanedLastName = this.lastName.replace(/\s+/g, '');
            const cleanedAddress = this.address.replace(/\s+/g, '');
            const cleanedPhone = this.phone.replace(/\s+/g, '');

            // Build the 'order' object with 'total_price' from 'cart'
            const order = {
                name: cleanedFirstName,
                lastname: cleanedLastName,
                phone_number: cleanedPhone,
                email: this.email,
                address: this.address,
                total_price: this.cart.totalPrice,
            };

            // Execute API call to send the order
            axios.post(`${store.apiMainUrl}/api/orders`, order, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.order_id = response.data.result;
                    // Send cart details along with the order ID
                    const params = {
                        order_id: this.order_id,
                        dishes: this.cart  // Assuming 'items' is what you want to send
                    };



                    // Execute API call to send the dish details
                    axios.post(`${store.apiMainUrl}/api/dishorders`, params, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            console.log(response);
                            this.isLoading = false;
                            this.clearCart();
                        })
                        .catch(error => {
                            this.isLoading = false;
                            this.isError = true;
                            console.error('Errore nella chiamata API dishorders:', error);
                        });

                })
                .catch(error => {
                    this.isLoading = false;
                    this.isError = true;
                    console.error('Errore nella chiamata API orders:', error);
                });

        },

        validateForm() {
            this.errors = {};
            // Function to get the actual alphanumeric character count
            const getAlphanumericLength = (str) => {
                return str.replace(/\s+/g, '').length; // Removes all spaces and calculates the length
            };
            // Check that the first name field is not empty and has at least 3 alphanumeric characters
            const firstNameAlphanumericLength = getAlphanumericLength(this.firstName);
            if (firstNameAlphanumericLength === 0) {
                this.errors.firstName = 'Il nome è obbligatorio.';
            } else if (firstNameAlphanumericLength < 3) {
                this.errors.firstName = 'Il nome deve contenere almeno 3 caratteri.';
            }
            // Check that the last name field is not empty and has at least 3 alphanumeric characters
            const lastNameAlphanumericLength = getAlphanumericLength(this.lastName);
            if (lastNameAlphanumericLength === 0) {
                this.errors.lastName = 'Il cognome è obbligatorio.';
            } else if (lastNameAlphanumericLength < 3) {
                this.errors.lastName = 'Il cognome deve contenere almeno 3 caratteri.';
            }
            // Check that the address field is not empty and has at least 5 alphanumeric characters
            const addressAlphanumericLength = getAlphanumericLength(this.address);
            if (addressAlphanumericLength === 0) {
                this.errors.address = 'L\'indirizzo è obbligatorio.';
            } else if (addressAlphanumericLength < 5) {
                this.errors.address = 'L\'indirizzo deve contenere almeno 5 caratteri.';
            }
            // Check that the phone number field is not empty and follows the format
            if (!this.phone) {
                this.errors.phone = 'Il numero di telefono è obbligatorio.';
            } else {
                // Remove all spaces from the phone number
                const cleanedPhone = this.phone.replace(/\s+/g, '');
                // Check that the phone number contains exactly 10 digits
                if (!/^\d{10}$/.test(cleanedPhone)) {
                    this.errors.phone = 'Il numero di telefono deve essere di 10 cifre.';
                }
            }
            // Check that the email field is not empty and follows the format
            if (!this.email) {
                this.errors.email = 'L\'email è obbligatoria.';
            } else if (!this.validEmail(this.email)) {
                this.errors.email = 'L\'email non è valida.';
            }
            // Check that the card number field is not empty and follows the format
            if (!this.paymentDetails.card_number) {
                this.errors.card_number = 'Il numero della carta è obbligatorio.';
            } else if (!this.validCardNumber(this.paymentDetails.card_number)) {
                this.errors.card_number = 'Il numero della carta non è valido.';
            }
            // Check that the card expiration date field is not empty and follows the format
            if (!this.paymentDetails.card_expire_date) {
                this.errors.card_expire_date = 'La data di scadenza è obbligatoria.';
            } else if (!this.validExpirationDate(this.paymentDetails.card_expire_date)) {
                this.errors.card_expire_date = 'La tua carta è scaduta.';
            }
            // If there are no errors, proceed with form submission
            if (Object.keys(this.errors).length === 0) {
                // Retrieve 'cart' from localStorage
                const cartString = localStorage.getItem('cart');
                // Check if 'cart' is present in localStorage
                if (!cartString) {
                    console.error('Nessun carrello trovato nel localStorage');
                    return;
                }
                // Check if 'cart' is present in localStorage
                this.cart = JSON.parse(cartString);
                // Check that 'totalPrice' is present in 'cart''
                if (!this.cart || !this.cart.totalPrice) {
                    console.error('totalPrice non trovato nel carrello:', this.cart);
                    return;
                }
                // if there are no validation errors, proceed with payment
                this.getToken();
            }
        },

        // Function to validate email
        validEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Function to validate credit card number (accepts spaces and dashes)
        validCardNumber(cardNumber) {
            const cleaned = cardNumber.replace(/\s+/g, '').replace(/-/g, ''); // Removes all spaces and dashes
            const re = /^\d{16}$/;
            return re.test(cleaned);
        },

        // Function to validate credit card expiration date (MM/YY)
        validExpirationDate(expirationDate) {
            // Check that the format is correct (MM/YY)
            const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!re.test(expirationDate)) {
                return false;
            }

            // Extract month and year from expiration date
            const [month, year] = expirationDate.split('/').map(Number);

            // Calculate the full year (e.g., '23' becomes 2023)
            const fullYear = 2000 + year;

            // Get the current month and year
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // Months in JavaScript are zero-indexed
            const currentYear = now.getFullYear();

            // Check that the expiration date has not passed
            if (fullYear < currentYear || (fullYear === currentYear && month < currentMonth)) {
                return false;
            }

            return true;
        },

        clearCart() {
            // Empty all items from the cart
            this.cart.items = {};
            // Reset the total quantity
            this.cart.totalQuantity = 0;
            // Reset the total price
            this.cart.totalPrice = 0;

            // Save the updated cart in localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            localStorage.removeItem('restaurant_id');
            localStorage.removeItem('slug');
            this.isSuccess = true;
            window.scrollTo(0, 0);
            setTimeout(() => {
                this.$router.push('/');
            }, 5000); //
        },
    },
};
</script>

<template>
    <AppTop :scrollThreshold="200" :scrollToPosition="200" />
    <div v-if="isSuccess === false" class="container ms_container">
        <div v-if="isError === true" class="alert alert-danger text-center">Ops, qualcosa è andato storto!</div>
        <div class="section-title">
            <span @click="goBack()" class="btn btn-outline-primary rounded-5 d-block d-sm-none">
                <i class="fa-solid fa-arrow-left"></i>
            </span>
            <span @click="goBack()" class="btn btn-outline-primary rounded-5 btn-title btn-pos-left d-none d-sm-block">
                <i class="fa-solid fa-arrow-left"></i>
            </span>
            <h2 class="text-center p-0 m-0">Procedi al checkout</h2>
        </div>

        <form>
            <!-- User Details -->
            <div class="form-group">
                <h3>Dettagli utente</h3>
            </div>
            <div class="form-row">

                <!-- Name -->
                <div class="form-group col-md-6">
                    <label for="firstName">Nome <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="firstName" v-model="firstName"
                        placeholder="Inserisci il nome" required minlength="3">
                    <div v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</div>
                </div>
                <!-- /Name -->

                <!-- Lastname -->
                <div class="form-group col-md-6">
                    <label for="lastName">Cognome <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="lastName" v-model="lastName"
                        placeholder="Inserisci il cognome" required minlength="3">
                    <div v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</div>
                </div>
                <!-- /Lastname -->

            </div>
            <div class="form-row">

                <!-- Address -->
                <div class="form-group col-md-6">
                    <label for="address">Indirizzo <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="address" v-model="address"
                        placeholder="Inserisci l'indirizzo" required minlength="5">
                    <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
                </div>
                <!-- /Address -->

                <!-- Phone Number -->
                <div class="form-group col-md-6">
                    <label for="phone">Numero di Telefono <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="phone" v-model="phone"
                        placeholder="Inserisci il numero di telefono" required>
                    <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
                </div>
                <!-- /Phone Number -->

            </div>

            <!-- Email -->
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email <span class="asterisco">*</span></label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="Inserisci l'email"
                        required>
                    <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                </div>
            </div>
            <!-- /Email -->

            <!-- card detail payment -->

            <!-- title -->
            <h3 class="mt-3">Dettagli della carta</h3>

            <div class="form-row">

                <!-- Card Number -->
                <div class="form-group col-md-6">
                    <label for="card-number">Numero carta <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="card-number" v-model="paymentDetails.card_number"
                        required>
                    <div v-if="errors.card_number" class="text-danger">{{ errors.card_number }}</div>
                </div>

                <!-- Card Expiration Date -->
                <div class="form-group col-md-6">
                    <label for="card-expire">Data di scadenza <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="card-expire" v-model="paymentDetails.card_expire_date"
                        required>
                    <div v-if="errors.card_expire_date" class="text-danger">{{ errors.card_expire_date }}</div>
                </div>
                
            </div>
            <!-- card detail payment -->


            <p class="mt-5 mb-3 label"><span class="asterisco">*</span> questi campi sono obbligatori.</p>

            <div class="d-flex">
                <!-- btn pay -->
                <button type="submit" class="flex-center btn btn-primary gap-2" @click.prevent="validateForm()">
                    <span>Paga ora</span>
                    <span v-if="isLoading === true" :class="isLoading === true ? 'spinner-border' : ''"
                        class="spinner"></span>
                </button>
                <!-- /btn pay -->

                <!-- total price -->
                <div class="ml-auto ms_cart flex-sm-row">
                    <span class="fw-bold">Prezzo totale:</span>
                    <span class="d-none d-sm-inline-block">&ensp;</span>
                    <span>{{ cartPrice.totalPrice.toFixed(2) }} €</span>
                </div>
                <!-- /total price -->

            </div>
        </form>
    </div>
    <!-- New Page If Payment Is Successful -->
    <div v-else class="container-fluid page_success">
        <div class="ms_message flex-center flex-column gap-4">
            <div class="img-success">
                <img src="../assets/img/success.png" alt="">
                <routerLink :to="{ name: 'home' }">
                    <a class="btn btn-primary">Home</a>
                </routerLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

// container
.container {
    margin-top: 150px;
    margin-bottom: 50px;
}

// title
.section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 50px;
}

// success payment
.page_success {
    background-color: $white;
    min-height: 100vh;
    margin: 0;
}

.ms_message {
    height: 100vh;
}

.img-success {
    margin-top: 100px;
    width: 40%;
    text-align: center;

    a {
        padding: 2px 15px;
    }
}

// /success payment

// total price
.ms_cart {
    padding: 5px 5px;
    border: 1px solid $blue;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: clamp(10px, 2vw, 15px);
}

// total price

label,
.label {
    font-size: clamp(12px, 2vw, 15px);
}

.asterisco {
    color: $blue;
}

.text-danger {
    font-size: 0.9rem;
}

.spinner {
    font-size: 10px;
    width: 15px;
    height: 15px;
    display: inline-block;
}

// media query
@media (max-width: 1024px) {
    .img-success {
        width: 80%;

        a {
            font-size: 8px;
            padding: 3px 10px;
            border-radius: 4px;
        }
    }
}
</style>