import { createRouter, createWebHistory } from "vue-router";
import AppHomePage from './pages/AppHomePage.vue';
import ShowRestaurant from './pages/ShowRestaurant.vue';
import AppShop from "./pages/AppShop.vue";
import AppCheckout from "./pages/AppCheckout.vue";
import AppNotFound from "./pages/AppNotFound.vue";

// modifica
// export const routes = [
//   ];
// modifica

// export const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//       {
//         path: '/',
//         name: 'home',
//         component: Home
//       },
//       {
//         path: '/showrestaurant/:slug',
//         name: 'showrestaurant',
//         component: ShowRestaurant,
//         // props: true
//       }
//     ]
// });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHomePage
    },
    {
      path: '/showrestaurant/:slug',
      name: 'showrestaurant',
      component: ShowRestaurant,
      // props: true
    },
    {
      path: '/cartshopping/:slug',
      name: 'cartshopping',
      component: AppShop
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: AppCheckout
    },
    {
      path: "/:pathMatch(.*)*",
      name:'paginanontrovata',
      component: AppNotFound
    }
  ],
});

export { router };