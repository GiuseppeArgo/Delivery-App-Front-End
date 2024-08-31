<script>
import { clearCart } from '../function.js';
export default {
  data() {
    return {
      slug: '',
      cart: {
        items: {},
        totalQuantity: 0,
        totalPrice: 0
      },
      curQuantity: 0,
    }
  },
  created() {
    window.scrollTo(0,0);
    this.$root.historyCount = window.history.length;
    this.slug = this.$route.params.slug;
    console.log(this.slug);
    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== 'undefined') {
      this.cart = JSON.parse(savedCart);
    }

    console.log(this.cart);
  },
  methods: {
    goBack() {
        this.$router.go(-1);
      },
    aggiorna(dish, value) {
      console.log(dish);
      // Save dish data
      let quantity = 0;
      if (value == 1) {
        quantity = 1;
      } else {
        quantity = -1;
      }

      const dish_id = dish.dish_id;
      const dish_name = dish.name;
      const price = parseFloat(dish.price);
      this.curQuantity = dish.quantity;
      console.log(this.curQuantity, dish_id, dish_name, price);

      // Retrieve the cart saved in localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart && savedCart !== 'undefined') {
        this.cart = JSON.parse(savedCart);
      }
      this.addToCart(dish_id, dish_name, quantity, price);


      console.log(this.cart);
      // this.$store.dispatch('updateRestaurantId', restaurant_id);
    },
    addToCart(dish_id, dish_name, quantity, price) {
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
        this.curQuantity += quantity;
        console.log(this.cart.totalPrice);
      } else if (this.cart.items[dish_id].quantity) {
        this.cart.totalQuantity += quantity;
        this.curQuantity += quantity;
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
          this.curQuantity += quantity;

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
    removeAllItems(item) {
        const dish_id = item.dish_id;
        const quantity = this.cart.items[dish_id].quantity;
        const price = this.cart.items[dish_id].price;

        // Rimuovi completamente l'articolo dal carrello
        delete this.cart.items[dish_id];
        this.cart.totalQuantity -= quantity;
        this.cart.totalPrice -= price * quantity;

        // Salva il carrello aggiornato in localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // Rimuovi articoli specifici dal localStorage se il carrello è vuoto
        if (Object.keys(this.cart.items).length === 0) {
            clearCart(this.cart);
        }
    },
    modalClearBtn() {
      clearCart(this.cart);
    }
  }
}
</script>

<template>
  <div class="container md_cont">
    <div class="d-flex flex-row-reverse justify-content-center align-items-center gap-2 mb-5">
      <h1 class="text-center p-0 m-0">Carrello</h1>
      <!-- <router-link :to="{ name: 'showrestaurant', params: { slug: slug.toString() } }"> -->
        <span @click="goBack()" class="btn bg-primary rounded-circle">
          <i class="fa-solid fa-arrow-left text-white"></i>
        </span>
      <!-- </router-link> -->
    </div>

    <div v-if="Object.keys(cart.items).length > 0">

      <table class="table table-striped w-75 m-auto text-center mb-5 border">
        <thead>
          <tr>
            <th scope="col">Piatto</th>
            <th scope="col">Quantita</th>
            <th scope="col" class="hide-responsive">Rimuovi</th>
            <th scope="col">Prezzo</th>
            <th scope="col" class="hide-responsive">Totale</th>
          </tr>
        </thead>

        <tbody>
      <tr v-for="(article, index) in Object.values(cart.items)" :key="index">
        <td scope="row">{{ article.name }}</td>
        
        <td class="align-middle">
          <div class="d-flex justify-content-center border-bottom-0 align-items-center">
            <!-- btn less -->
            <div @click.prevent="aggiorna(article, -1)"
              class="btn btn-secondary ms-btn d-flex justify-content-center align-items-center border-0">
              <a class="text-decoration-none  text-white"><i class="fa-solid fa-minus"></i></a>
            </div>
            <!-- /btn less -->
            <span class="ms-3 me-3 d-flex justify-content-center align-items-center">
              {{ article.quantity }}
            </span>
            <!-- btn add -->
            <div @click.prevent="aggiorna(article, 1)"
              class="btn btn-secondary ms-btn d-flex justify-content-center align-items-center border-0">
              <a class="text-decoration-none text-white"><i class="fa-solid fa-plus"></i></a>
            </div>
            <!-- /btn add -->
          </div>
        </td>
        <td class="align-middle hide-responsive">
          <div @click.prevent="removeAllItems(article)"
            class="btn btn-danger ms-btn-trash border-0">
            <a class="text-decoration-none text-white fw-bold"><i class="fa-solid fa-trash"></i></a>
          </div>
        </td>
        
        <td class="align-middle">{{ (article.price).toFixed(2) }}€</td>
        <td class="align-middle hide-responsive">{{ (article.price * article.quantity).toFixed(2) }}€</td>
      </tr>
      <tr>
        <td class="text-center" colspan="5">
          <div>
            <p>
              <strong>Prezzo Totale Carrello:</strong><br>
            </p>
            {{ cart.totalPrice.toFixed(2) }}€
          </div>
        </td>
      </tr>
    </tbody>
      </table>

      <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center w-50 m-auto gap-2">
        <router-link :to="{ name: 'checkout' }" class="ms_checkout">
          <button class="btn btn-primary mb-2 mb-sm-0 w-100 w-sm-25 mb-5 w-25">
            Paga ora
          </button>
        </router-link>
        <button type="button" class="btn btn-danger mb-2 mb-sm-0 w-100 w-sm-25 mb-5 w-25 text-nowrap"
          data-toggle="modal" data-target="#exampleModal">
          Svuota carrello
        </button>
      </div>

    </div>

      <!-- No match div for search -->
      <div class="row align-items-center border w-75 m-auto rounded-5 py-3 px-4 text-center" v-else>
        <p class="fw-bold fs-5 p-0 m-0">
          Il tuo carrello è vuoto
        </p>
      </div>
      <!-- /No match div for search -->

  </div>

  <!-- CART EMPTY MODAL -->

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog text-center" role="document">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column gap-4">
          <span class="modal-title text-danger fw-bold fs-3" id="exampleModalLabel"> ATTENZIONE!</span>
          <span class="fs-4">Sei sicuro di voler svuotare il carrello?</span>
        </div>
        <div class="modal-footer d-flex justify-content-around">
          <button type="button" class="btn btn-danger w-25 d-flex justify-content-center" data-dismiss="modal">Annulla</button>
          <button type="button" class="btn btn-primary w-25" @click.prevent="modalClearBtn"
            data-dismiss="modal">Svuota</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF CART EMPTY MODAL -->

</template>

<!-- @click.prevent="clearCart()" -->

<style scoped>
.md_cont {
  margin-top: 150px;
  /* margin-bottom: 50px; */
  min-height: 100vh;
}

.ms_checkout {
  width: 100%;
  text-decoration: none;
  color: white;
}

.ms-btn {
  width: 30px;
  aspect-ratio: 1;
  padding: 0;
}

.ms-btn-trash{
  width: 30px;
  aspect-ratio: 1;
  line-height: 30px;
  padding: 0;
  padding-left: 0.3px;
}

@media (max-width: 768px) {
  .w-sm-25 {
    width: 100% !important;
  }

  .mb-sm-0 {
    margin-bottom: 0 !important;
  }
}

.btn-secondary,
.bg-color {
  background-color: #b1b5b8;
}

@media (max-width: 430px) {
  .hide-responsive {
    display: none;
  }
}

</style>
