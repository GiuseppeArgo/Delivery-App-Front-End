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
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row " name="slide" mode="out-in">

            <!-- image -->
            <div class="col-sm-12 col-md-6 col-lg-6 p-2">

                <transition name="fade" mode="out-in">

                    <div :key="currentFood" :class="{ 'active-slide': true }"
                        class="carousel-img justify-content-md-end">
                        <img :src="foods[currentFood].image" alt="" class="w-75" />
                    </div>

                </transition>

            </div>
            <!-- /image -->

            <!-- text -->
            <div class="carousel-text  col-sm-12 col-md-6 col-lg-6 p-2 justify-content-md-start">

                <transition name="slide-fade" mode="out-in">
                    <img :src="foods[currentFood].text" alt="" :key="currentFood" class="w-75" />

                </transition>
            </div>
            <!-- /text -->

        </div>
    </div>
</template>

<style lang="scss" scoped>
// container
.container {
    width: 80%;
    display: flex;
    align-items: end;
    // text
    .carousel-text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    // text
    
    
    // img
    .carousel-img {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    // img
}


// img


// // // // // // // // // // 
//       ANIMATION         //
// // // // // // // // // // 

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