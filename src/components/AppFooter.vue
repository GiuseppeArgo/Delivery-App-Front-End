<template>
  <!-- Footer -->
  <footer class="container-fluid">
    <div class="container">
      <div class="row flex-center">
        <!-- logo  -->
        <div class="col-lg-3 col-md-3 col-sm-12">
          <img src="../assets/img/logo_bottom.png" alt="Logo" class="footer-logo">
        </div>
        <!-- /logo  -->

        <!-- copyright -->
        <div class=" col-lg-6 col-md-6 col-sm-12">
          <span class="copyright">&copy; 2024 Deliveboo. Tutti i diritti
            riservati.</span>
        </div>
        <!-- /copyright -->

        <!-- contact -->
        <div
          class="contact col-lg-3 col-md-3 col-sm-12 flex-row-sm justify-content-sm-center justify-content-md-start align-items-sm-center align-items-md-start">
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

// container
.container-fluid {
  background-color: $blue;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  bottom: 0;
  padding: 10px 0;
}

// commons
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
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


// logo
.footer-logo {
  height: 45px;
}

</style>