<script>
export default {
  data() {
    return {
      lastScrollTop: 0, // start scroll 0
    };
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
    this.addLinkClickListener();
    window.addEventListener('scroll', this.handleScroll); // add event listner scroll
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('scroll', this.handleScroll); // remove event listner scroll
  },
  methods: {
    handleOutsideClick(event) {
      const navbar = this.$refs.navbar;
      if (navbar && !navbar.contains(event.target)) {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show'); // close hamburger menu
        }
      }
    },
    addLinkClickListener() {
      const links = document.querySelectorAll('.navbar-nav .nav-item a');
      links.forEach(link => {
        link.addEventListener('click', this.closeMenu);
      });
    },
    closeMenu() {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show'); // close hamburger menu when click link
      }
    },
    handleScroll() {
      const navbar = this.$refs.navbar;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > this.lastScrollTop) {
        // scroll down
        navbar.classList.add('transparent-bg');
      } else {
        // Scroll up
        navbar.classList.remove('transparent-bg');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita valori negativi
    }
  }
};
</script>


<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-sm" ref="navbar">

    <!-- logo -->
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

@use "../sass/colorpalette.scss" as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  background-color: rgb(201, 0, 54);
  color: $white;
  z-index: 1;
  transition: opacity 0.3s ease-in-out;

  &.transparent-bg {
    opacity: 0;
  }

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
