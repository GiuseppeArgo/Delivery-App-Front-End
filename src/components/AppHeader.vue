<script>
import { store } from '../store';
import AppCart from './AppCart.vue';

export default {
  components: {
    AppCart
  },
};
</script>

<template>

  <!-- Navbar -->

  <!-- logo -->
  <nav class="navbar navbar-expand-sm">
    <div class="logo-img">
      <router-link :to="{ name: 'home' }">
        <img src="../assets/img/logo_top.png" alt="Logo">
      </router-link>
    </div>
    <!-- /logo -->

    <!-- menu hamburger  -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars text-white"></i>
    </button>
    <!-- /menu hamburger  -->

    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav d-flex align-items-end gap-4">

        <!-- Home Link -->
        <router-link :to="{ name: 'home' }" class="text-decoration-none">
          <li class="nav-item active">
            <a class="text-decoration-none text-light">
              Home
            </a>
          </li>
        </router-link>
        <!-- /Home Link -->

        <!-- login -->
        <li class="nav-item">
          <a class="text-decoration-none text-light" href="http://127.0.0.1:8000/login">Accedi</a>
        </li>
        <!-- /login -->

        <!-- register -->
        <li class="nav-item">
          <a class="text-decoration-none text-light" href="http://127.0.0.1:8000/register">Registrati</a>
        </li>
        <!-- /register -->
      </ul>
    </div>
  </nav>
  <!-- /navbar -->

</template>

<style scoped lang="scss">
/* Navbar and Logo Management */

@use "../sass/colorpalette.scss" as *;

.container {
  max-width: 100%;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  // background-color: rgba(227, 15, 36,0.9);
  background-color: $red;
  color: $white;
  z-index: 1;
  // px-3 position-fixed top-0 w-100

  .logo-img {
    width: 70px;
  }

  .navbar-toggler {
    border: 2px solid $white;
    outline-width: 0;
    --bs-navbar-toggler-focus-width: 0;
  }

  li {
    color: $gray;
    display: inline-block;
    margin: 0;
    text-transform: uppercase;
  }

  li::after {
    content: '';
    display: block;
    border-bottom: solid 3px #ffffff;
    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 500ms ease-in-out;
  }

  li:hover::after {
    transform: scaleX(1);
  }
}
</style>
