<script>
export default {
  data() {
    return {
      lastScrollTop: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const footer = this.$refs.footer;

      if (currentScroll > this.lastScrollTop) {
        footer.classList.remove('hidden-footer');
      } else {
        footer.classList.add('hidden-footer');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
  }
};
</script>



<template>

  <!-- Footer -->
  <footer class="container-fluid" ref="footer">
    <div class="container">
      <div class="row flex-center">
        <!-- logo  -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <img src="../assets/img/logo_bottom.png" alt="Logo" class="footer-logo" />
        </div>
        <!-- /logo  -->

        <!-- copyright -->
        <div class="col-lg-6 col-md-6 col-sm-12">
          <span class="copyright">
            &copy; 2024 Deliveboo. Tutti i diritti riservati.
          </span>
        </div>
        <!-- /copyright -->

        <!-- contact -->
        <div class="contact col-lg-3 col-md-3 col-sm-12">
          <span>Contatti</span>
          <span>Telefono 048-949302</span>
          <span>Email teamdeliveboo@pec.it</span>
        </div>
        <!-- /contact -->
      </div>
    </div>
  </footer>
  <!-- /Footer -->
</template>






<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.container-fluid {
  background-color: $blue;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  transition: transform 0.3s ease-in-out;
}

.hidden-footer {
  transform: translateY(100%);
}

.contact {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  color: white;
}

.copyright {
  font-size: clamp(12px, 2vw, 14px);
  text-align: center;
  color: white;
}

.footer-logo {
  height: 45px;
}
</style>

