<script>
import { store } from "../store.js";
import { nextTick } from 'vue';

export default {
    data() {
        return {
            foods: store.foods,
            currentFood: 0,
        }
    },

    mounted() {
        nextTick(() => {
            this.autoPlay();
        });
    },

    beforeUnmount() {
        clearInterval(this.interval);
    },

    methods: {
        // carousel slide show
        autoPlay() {
            this.interval = setInterval(() => {
                this.currentFood = (this.currentFood + 1) % this.foods.length;
            }, 4000);
        },
        // for dynamic image
        getImage(name) {
            if (this.flag.includes(name)) {
                return new URL(`../assets/img/${name}.png`, import.meta.url).href;
            } else {
                return new URL(`../assets/img/int.png`, import.meta.url).href;
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex align-items-end ms_container carousel">
        <div class="row " name="slide" mode="out-in">

            <!-- dynamic image -->
            <div class="col-sm-12 col-md-6 col-lg-6 p-2">
                
                <transition name="fade" mode="out-in">
                    
                        <div  :key="currentFood" :class="{ 'active-slide': true }"
                            class="d-flex justify-content-center  justify-content-md-end">
                            <img :src="foods[currentFood].image" alt="" class="w-75" />
                        </div>
  
                </transition>
            
            </div>
            <!-- /dynamic image -->

            <!-- dynamic text -->
            <div class="col-sm-12 col-md-6 col-lg-6 p-2 d-flex justify-content-center justify-content-md-start">
                
                <transition name="slide-fade" mode="out-in">
                    <!-- <p :key="currentFood" class="">{{ foods[currentFood].text }}</p> -->
                        <img :src="foods[currentFood].text" alt="" :key="currentFood"
                            class="w-75" />
                    
                </transition>
            </div>
            <!-- dynamic text -->

        </div>
    </div>
</template>

<style lang="scss" scoped>
//Debug Container prova con dimenzioni i px indali per immagini
// .md_cont-img1 {
//     border: 1px solid;
//     width: 556px;
//     height: 360px;
// }
.ms_container {
    width: 80%;

    // img container
    .container-img-food {
        padding: 0;
        margin: 0;

        img {
            width: 80%;
        }
    }

    .ms_carousel-text {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        /* Relative positioning to allow the transition */
    }
}

@media (max-width: 768px) {
    .carousel {
        max-width: 300px;
    }
}

@media (min-width: 768px) {
    .carousel {
        min-width: 900px;
    }
}

.ms_carousel-img {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transform: translateX(0);
    transition: transform 1s ease;
    position: relative;
}

// /img container

// text container
.container-text-hero {
    padding: 0;
    margin: 0;
}

// /text container


//// animation carousel

// animation img food
.fade-enter-active {
    transition: opacity 3s ease;
}

.fade-leave-active {
    transition: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

// .img-carousel{
    
// }

// /animation img food

// animation img text
.slide-fade-enter-active {
    transition: all 1.5s ease;
}

.slide-fade-leave-active {
    transition: all 6.5 ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-fade-leave-to {
    opacity: 1;
    transform: translateX(0);
}

// /animation img text</style>