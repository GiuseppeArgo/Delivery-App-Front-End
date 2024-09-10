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
    
    <div class="hero">   
        
        <AppCarousel />
    
    </div> 

</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.hero {
    background-color:$red;
    height: min-content;
    padding-top: 81px;
    overflow-x: hidden;
}

</style>