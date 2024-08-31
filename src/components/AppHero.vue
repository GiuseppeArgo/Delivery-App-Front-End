<script>
import AppCarousel from '../components/AppCarousel.vue'
import {store} from '../store'

export default {
    components: {
    AppCarousel,
  },
  data() {
    return {
      baseSrc: "http://127.0.0.1:8000/storage",
      store,
      name: 'Hero'
    }
  },
}
</script>

<template>
    
    <div class="hero d-flex justify-content-center align-item-center">   
        
        <AppCarousel />
    
    </div> 

</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.hero {
    background-color:$red;
    color: $white;
    height: 400px;
    margin-top: 61px;
    overflow-x: hidden;
}

@media (min-width: 1300px) {
  .hero {
    padding-top: 450px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 450px;
  }
}

/* HERO H1 SIZE NOT USED AT THE MOMENT */
// .hero h1 {
//     font-size: 3rem;
// }

// @media (max-width: 768px) {
//     .hero h1 {
//         font-size: 2rem;
//     }
// }

/* Hero image management */
.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>