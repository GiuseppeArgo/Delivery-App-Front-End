<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    toTop: function () {
      document.documentElement.scrollTop = 600;
    },
    handleScroll: function () {
      this.show = window.scrollY > 500;
    }
  }
};
</script>


<template>
    <!-- Footer -->
    <footer class="footer container-fluid text-center d-flex justify-content-between align-items-center">
      <div class="container">
        <div class="row flex-row justify-content-center align-items-center">
          <!-- logo  -->
          <div class="col-lg-3 col-md-3 col-sm-12 container-footer-logo">
            <img src="../assets/img/logo_bottom.png" alt="Logo" class="footer-logo" @click="toTop" />
          </div>
          <!-- /logo  -->

        <!-- copyright -->
         <div class=" col-lg-6 col-md-6 col-sm-12">
           <span class="text-white text-center pb-2 m-0 copyright">&copy; 2024 Deliveboo. Tutti i diritti riservati.</span>
         </div>
        <!-- /copyright -->

        <!-- contact -->
        <div class="contact d-flex flex-column flex-row-sm justify-content-sm-center justify-content-md-start align-items-sm-center align-items-md-start  text-white col-lg-3 col-md-3 col-sm-12">
            <span>
              Contatti
            </span>
            <span>
               Telefono 048-949302
            </span>
            <span>
              Email teamdeliveboo@pec.it
            </span>
        </div>
        <!-- /contact -->
        </div>

      </div>

    </footer>
    <!-- /Footer -->
</template>


<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

/* footer style management */

.footer {
  background-color: $blue;
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
}

.contact{
  font-size: 12px;
}

.copyright{
  align-self: flex-end;
  font-size: clamp(12px, 2vw, 14px);
}
/* /footer style management */

/* footer logo management */
.footer-logo {
  height: 45px;
}

.container-footer-logo{
  align-items:start
}
/* footer logo management */
</style>