<script>
import axios from "axios";
import { store } from "../store";
import AppCard from "../components/AppCard.vue";
import AppHero from "../components/AppHero.vue";
import AppLinkCart from "../components/AppLinkCart.vue";
import AppTop from "../components/AppTop.vue";

export default {
  components: {
    AppCard,
    AppHero,
    AppLinkCart,
    AppTop,
  },
  data() {
    return {
      restaurantsList: [], // List to store restaurant data
      typesList: [], // List to store types of restaurants
      selectedTypes: [], // Array to store selected restaurant types
      baseSrc: "http://127.0.0.1:8000/storage", // Base URL for image sources
      store,
      slug: '',
      cart: '',
      isLoading: false, // Flag to manage loading state
    };
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.slug = localStorage.getItem('slug');
    console.log(this.cart.items);
    console.log(this.slug);
    this.CallRestaurant();
    this.CallTypes();

  },
  methods: {
    CallRestaurant() {
      const selectedTypesJson = encodeURIComponent(
        JSON.stringify(this.selectedTypes)
      ); // Codifica l'array in una stringa URL
      axios
        .get(`${store.apiMainUrl}/api/restaurants?type=${selectedTypesJson}`)
        .then((response) => {
          this.isLoading = true;
          this.restaurantsList = response.data.result; // Update restaurantsList with API response
          if(this.restaurantsList == null) {
                       this.$router.push({ name: 'paginanontrovata' }); // redirect not found page 
                    }
        })
        .catch((error) => {
          console.error(
            "Errore durante la chiamata API:",
            error.message || JSON.stringify(error)
          );
          this.$router.push({ name: 'paginanontrovata' }); // redirect not found page
        });
    },

    CallTypes() {
      axios
        .get(`${store.apiMainUrl}/api/types`, {
          params: {},
        })
        .then((response) => {
          this.typesList = response.data.result;
        })
        .catch((error) => {
          console.error("Errore durante la chiamata API:", error);
        });
    },

    // SelectType(id, isChecked) {
    //   if (isChecked) {
    //     // Add the type ID to the array if the checkbox is selected
    //     this.selectedTypes.push(id);
    //   } else {
    //     // Remove the type ID from the array if the checkbox is deselected
    //     const index = this.selectedTypes.indexOf(id);
    //     if (index > -1) {
    //       this.selectedTypes.splice(index, 1);
    //     }
    //   }
    //   this.CallRestaurant(); // Remove the type ID from the array if the checkbox is deselected
    // },
    SelectType(id, isChecked) {
    const inputElement = document.getElementById('type-' + id);
    if (isChecked) {
      // Add the type ID to the array if the checkbox is selected
      this.selectedTypes.push(id);
      inputElement.classList.add('selected-checkbox');
    } else {
      // Remove the type ID from the array if the checkbox is deselected
      const index = this.selectedTypes.indexOf(id);
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      }
      inputElement.classList.remove('selected-checkbox');
    }
    this.CallRestaurant(); // Remove the type ID from the array if the checkbox is deselected
  },
    getCartItemsLength() {
            return this.cart && this.cart.items ? Object.keys(this.cart.items).length : 0;
        }

  },
};
</script>

<template>
  <AppHeader />

  <AppHero />

  <AppTop />


  <div class="ms-homepage" v-if="isLoading">
    
        <!-- cart-container -->
        <div v-if="getCartItemsLength() > 0">
           <AppLinkCart :quantity="cart.totalQuantity" />
         </div>
        <!-- /cart-container -->

    <!-- checkbox types -->
    <div class="container w-50 pt-5 pb-5">
      <div class="row justify-content-center align-items-center">
        <div v-for="curType in typesList" :key="curType.id"
          class="col-sm-6 col-md-6 col-lg-4 btn-group btn-group-toggle bnt-test d-flex justify-content-center align-items-center  provadelleprove">
          <input type="checkbox" class="btn-check" :id="'type-' + curType.id" name="types" :value="curType.id" @change="(event) => {
            SelectType(event.target.value, event.target.checked);
          }
            " />
          <label class="checkbox-btn rounded"
          :for="'type-' + curType.id">{{ curType.name }}</label>
        </div>
      </div>
    </div>
    <!-- /checkbox types -->

    <!-- card-container -->
    <div class="container pb-5">
      <div class="row gap-4 justify-content-center" v-if="restaurantsList.length > 0">
        <!-- card -->
        <div v-for="curRestaurant in restaurantsList" :key="curRestaurant.id"
          class="card col-lg-3 col-md-4 col-sm-5 col-7 p-0">
          <AppCard :cardObj="curRestaurant" />
        </div>
        <!-- /card -->
      </div>

      <!-- No match div for search -->
      <div class="row align-items-center border w-75 m-auto rounded-5 py-3 px-4 text-center" v-else>
        <p class="fw-bold fs-5 p-0 m-0">
          Nessun ristorante corrispondente alla tua ricerca
        </p>
      </div>
      <!-- /No match div for search -->
    </div>
    <!-- /card container -->

    <!-- MORE RESULT NOT USED AT THE MOMENT -->
    <!-- <div class="col-12 text-center"> -->
    <!-- <button class="btn btn-outline-danger">Mostra altri</button> -->
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.main-content {
  padding: 20px 0;
}

.form-check-inline {
  margin: 10px;
}

/* card style */

.card {
  height: 100%;
}

.card-img-top {
  width: 100%;
  height: auto;
}

/* /card styles */

.ms-homepage {
  min-height: 60vh;
  // margin-bottom: 50px;
  margin: 0;
  background-color: #F8F7F4;
}

.checkbox-btn{
  width: 150px;
  min-width: 70px;
  border: 1px solid $blue;
  text-align: center;
  color: $blue;
  font-size: clamp(15px,2vw,20px);
  padding: 5px 10px;
}

.selected-checkbox + .checkbox-btn {
  background-color: $blue;
  color: white;
}


/* Riduci la dimensione del testo rendendolo responsive per tutti i breakpoint */

.btn {
  font-size: 1rem;
}

@media (max-width: 1200px) {
  .btn {
    font-size: 1.2rem;
  }
}

@media (max-width: 992px) {
  .btn {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .btn {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .btn {
    font-size: 0.8rem;
  }
}

@media (max-width: 400px) {
  .btn {
    font-size: 0.7rem;
  }
}

@media (max-width: 360px) {
  .btn {
    font-size: 0.6rem;
  }
}

/* Riduci la dimensione del testo rendendolo responsive per tutti i breakpoint */
</style>
