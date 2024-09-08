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
      flag: ['american.png', 'italiana.png', 'japanese.png', 'chinese.png', 'greek.png', 'vegan.png', 'indian.png', 'français.png'],
      selectedTypes: [], // Array to store selected restaurant types
      baseSrc: "http://127.0.0.1:8000/storage", // Base URL for image sources
      store,
      slug: '',
      cart: '',
      isLoading: false, // Flag to manage loading state
      currentPage: 1, // current page
      hasMoreRecords: true, // flag more restaurant
    };
  },

  created() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.slug = localStorage.getItem('slug');
    this.CallRestaurant(); // start loading restaurant
    this.CallTypes(); // call to typeList
  },

  methods: {
    CallRestaurant() {
      // trasform to JSON the selected types
      const selectedTypesJson = encodeURIComponent(
        JSON.stringify(this.selectedTypes)
      );
      axios
        .get(`${store.apiMainUrl}/api/restaurants?type=${selectedTypesJson}&page=${this.currentPage}`)
        .then((response) => {
          this.isLoading = true;

          if (response.data && response.data.data && response.data.data.length > 0) {
            // add to list the new restaurant loaded
            this.restaurantsList = [...this.restaurantsList, ...response.data.data];
            this.currentPage++; // incremnent currentPage
            const totalCount = response.data.total;
            const loadedCount = this.restaurantsList.length;

            this.hasMoreRecords = loadedCount < totalCount;
          } else {
            // disable flag more records
            this.hasMoreRecords = false;
          }

          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Errore durante la chiamata API:", error.message || JSON.stringify(error));
          this.$router.push({ name: 'paginanontrovata' });
          this.isLoading = false;
        });
    },

    loadMoreRestaurants() {
      if (this.hasMoreRecords && !this.isLoading) {
        this.CallRestaurant();
      }
    },

    CallTypes() {
      axios
        .get(`${store.apiMainUrl}/api/types`)
        .then((response) => {
          this.typesList = response.data.result;
          console.log(this.typesList);
          this.flag = response.data.flags;
        })
        .catch((error) => {
          console.error("Errore durante la chiamata API:", error);
        });
    },

    SelectType(id, isChecked) {
      if (isChecked) {
        this.selectedTypes.push(id);
      } else {
        const index = this.selectedTypes.indexOf(id);
        if (index > -1) {
          this.selectedTypes.splice(index, 1);
        }
      }
      // reset function on page when selected or note type
      this.currentPage = 1;
      this.restaurantsList = [];
      this.hasMoreRecords = true;
      this.CallRestaurant();
    },

    getCartItemsLength() {
      return this.cart && this.cart.items ? Object.keys(this.cart.items).length : 0;
    },

    dynamicImage: function (curImg) {
      return new URL(`../assets/img/bandiera/${curImg}`, import.meta.url).href;
    }
  },
};
</script>

<template>
  <AppHeader />
  <AppHero />
  <AppTop />

  <div>
    <!-- cart-container -->
    <div v-if="getCartItemsLength() > 0">
      <AppLinkCart :quantity="cart.totalQuantity" />
    </div>
    <!-- /cart-container -->

    <!-- Sezione per la selezione dei tipi di cucina -->
    <div class="container font-title mb-5 pt-5">
      <span class="d-block text-center text-danger pb-3 fs-4 fw-bold">
        Seleziona la tipologia di cucina:
      </span>
      <div class="btn-container d-flex justify-content-center gap-1 flex-wrap">
        <div v-for="(curType, index) in typesList" :key="curType.id"
          class="d-flex justify-content-center align-items-center">
          <input type="checkbox" class="btn-check" :id="'type-' + curType.id"
            @change="(event) => SelectType(curType.id, event.target.checked)" />
          <label class="btn btn-outline-danger btn-type border-0 rounded-5 p-1 d-flex" :for="'type-' + curType.id">
            <!-- Usa un'immagine predefinita o personalizzata basata su `curType` -->
            <img :src="dynamicImage(curType.name.toLowerCase() + '.png')" alt="type image">
          </label>
        </div>
      </div>
    </div>
    <!-- /Sezione per la selezione dei tipi di cucina -->

    <!-- card-container -->
    <div class="container pb-5">
      <div class="row gap-3 justify-content-center p-0 m-0" v-if="restaurantsList.length > 0">
        <!-- card -->
        <div v-for="curRestaurant in restaurantsList" :key="curRestaurant.id"
          class="card col-7 col-sm-5 col-md-4 col-lg-3 p-0 m-0">
          <AppCard :cardObj="curRestaurant" />
        </div>
        <!-- /card -->
      </div>

      <!-- Nessun ristorante corrispondente -->
      <div class="row align-items-center border w-75 m-auto rounded-5 py-3 px-4 text-center" v-else>
        <p class="fw-bold fs-5 p-0 m-0">
          Nessun ristorante corrispondente alla tua ricerca
        </p>
      </div>
      <!-- /Nessun ristorante corrispondente -->
    </div>
    <!-- /card-container -->

    <!-- Pulsante "Carica altri" -->
    <div class="text-center mb-4">
      <button v-if="hasMoreRecords" @click="loadMoreRestaurants" :disabled="isLoading" class="btn btn-danger">
        Carica altri ristoranti
      </button>
      <p v-else>Non ci sono più ristoranti da caricare.</p>
    </div>
    <!-- /Pulsante "Carica altri" -->
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
  width: 100%;
  // margin-bottom: 50px;
  margin: 0;
  background-color: #F8F7F4;
}

.btn-type {
  width: 60px;
  height: 60px;
}


@media (max-width: 992px) {
  .btn-type {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .btn-container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (max-width: 580px) {
  .btn-container {
    padding-left: 120px;
    padding-right: 120px;
  }
}

@media (max-width: 468px) {
  .btn-container {
    padding-left: 70px;
    padding-right: 70px;
  }
}

@media (max-width: 350px) {
  .btn-container {
    padding-left: 30px;
    padding-right: 30px;
  }
}

.selected-checkbox+.checkbox-btn {
  background-color: $blue;
  color: white;
}

.btn-round {
  border-radius: 50%;
}



/* Riduci la dimensione del testo rendendolo responsive per tutti i breakpoint */

// .btn {
//   font-size: 1rem;
// }

// @media (max-width: 1200px) {
//   .btn {
//     font-size: 1.2rem;
//   }
// }

// @media (max-width: 992px) {
//   .btn {
//     font-size: 1rem;
//   }
// }

// @media (max-width: 768px) {
//   .btn {
//     font-size: 0.9rem;
//   }
// }

// @media (max-width: 576px) {
//   .btn {
//     font-size: 0.8rem;
//   }
// }

// @media (max-width: 400px) {
//   .btn {
//     font-size: 0.7rem;
//   }
// }

// @media (max-width: 360px) {
//   .btn {
//     font-size: 0.6rem;
//   }
// }

/* Riduci la dimensione del testo rendendolo responsive per tutti i breakpoint */
</style>
