<script>
import AppTop from '../components/AppTop.vue';
import { clearCart } from '../function.js';

export default {
  components:{
    AppTop
  },
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
    window.scrollTo(0, 0);
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
    refresh(dish, value) {
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

      // Add or remove quantity in the cart or remove item
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
      // / Add or remove quantity in the cart or remove item


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

      // remove article in cart
      delete this.cart.items[dish_id];
      this.cart.totalQuantity -= quantity;
      this.cart.totalPrice -= price * quantity;

      // save refresh cart in local storage
      localStorage.setItem('cart', JSON.stringify(this.cart));

      // remove all element in this.cart if cart is empty
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
  <AppTop :scrollThreshold="200"/>
  <div class="container">
    <div class="w-75 m-auto position-relative d-flex justify-content-center align-items-center gap-2 mb-5">
      <!-- btn go back -->
      <span @click="goBack()" class="btn btn-outline-primary rounded-5 btn-title btn-pos-left">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
      <!-- btn go bbtn-pos-right      <!-- title -->
      <h1 class="text-center m-0">Carrello</h1>
      <!-- /title -->
    </div>

    <div v-if="Object.keys(cart.items).length > 0">

      <table class="table table-striped w-75 m-auto text-center mb-3 border">
        <thead>
          <tr>
            <th scope="col">Piatto</th>
            <th scope="col">Quantita</th>
            <th scope="col" class="d-none d-sm-table-cell">Rimuovi</th>
            <th scope="col">Prezzo</th>
            <th scope="col" class="d-none d-sm-table-cell">Totale</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(article, index) in Object.values(cart.items)" :key="index">
            <td scope="row">{{ article.name }}</td>

            <td class="align-middle">
              <div class="d-flex justify-content-center border-bottom-0 align-items-center">
                <!-- btn less -->
                <div @click.prevent="refresh(article, -1)"
                  class="ms-btn btn-left p-2 btn btn-outline-secondary d-flex justify-content-center align-items-center">
                  <i class="fa-solid fa-minus"></i>
                </div>
                <!-- /btn less -->
                <span class="ms-btn btn-count">
                  {{ article.quantity }}
                </span>
                <!-- btn add -->
                <div @click.prevent="refresh(article, 1)"
                  class="ms-btn btn-right p-2 btn btn-outline-secondary flex-center">
                  <i class="fa-solid fa-plus"></i>
                </div>
                <!-- /btn add -->
              </div>
            </td>
            <td class="align-middle d-none d-sm-table-cell">
              <div @click.prevent="removeAllItems(article)" class="btn btn-outline-danger ms-btn-trash">
                <i class="fa-solid fa-trash"></i>
              </div>
            </td>

            <td class="align-middle">{{ (article.price).toFixed(2) }}€</td>
            <td class="align-middle d-none d-sm-table-cell">{{ (article.price * article.quantity).toFixed(2) }}€</td>
          </tr>
          <tr>
            <td colspan="5">
              <div class="flex-center justify-content-between">
                <div class="">
                  <span>
                    <strong>Prezzo Totale Carrello: </strong>
                  </span>
                  <span>
                    {{ cart.totalPrice.toFixed(2) }}€
                  </span>
                </div>
                <!-- trash -->
                <div>
                  <span class="btn btn-outline-danger rounded-5" data-toggle="modal" data-target="#exampleModal">
                    <i class="fa-solid fa-trash "></i>
                  </span>
                </div>
                <!-- trash -->

              </div>

            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center w-100 mb-5">
        <router-link :to="{ name: 'checkout' }">
          <button class="btn btn-primary border-0 w-sm-100 w-md-25">
            Procedi al checkout
          </button>
        </router-link>
      </div>

    </div>

    <!-- No match div for search -->
     <div v-else class="container-empty-cart">
       <div class="row py-4 ">
         <p class="m-0">
           Il tuo carrello è vuoto
         </p>
       </div>
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
          <button type="button" class="btn btn-outline-danger w-25 d-flex justify-content-center"
            data-dismiss="modal">Annulla</button>
          <button type="button" class="btn btn-outline-success w-25" @click.prevent="modalClearBtn"
            data-dismiss="modal">Svuota</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF CART EMPTY MODAL -->

</template>

<!-- @click.prevent="clearCart()" -->

<style scoped lang="scss">

// container
.container {
  margin-top: 150px;
  min-height: 60vh;
}

.container-empty-cart{
 margin-top: 100px;
 width: 75%;
 margin: auto;
 border-radius: 30px;
 border: 1px solid rgb(228, 228, 228);
 text-align: center;
 font-weight: 700;
 font-size: 22px;

}

// btn
.ms-btn {
  width: 30px;
  aspect-ratio: 1;
  padding: 0;
}

.ms-btn-trash {
  width: 30px;
  aspect-ratio: 1;
  line-height: 30px;
  padding: 0;
  padding-left: 0.3px;
}


// media query
@media (max-width: 768px) {
  .w-sm-25 {
    width: 100% !important;
  }

  .mb-sm-0 {
    margin-bottom: 0 !important;
  }
}

@media (max-width: 468px){
  .container{
    min-height: 60vh;
    margin-top: 110px;
  }
}

</style>
