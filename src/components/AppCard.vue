<script>
export default {
    props: {
        cardObj: Object,
    },
    data() {
        return {
            baseSrc: "http://127.0.0.1:8000/storage",
        }
    },
    
    methods: {
        // flag image
        dynamicImage: function (curImg) {
            console.log(curImg);
            const lowerCaseImg = curImg.toLowerCase();
            return new URL(`../assets/img/bandiera/${lowerCaseImg}.png`, import.meta.url).href;
        }
    }

}
</script>

<template>

    <router-link :to="{ name: 'showrestaurant', params: { slug: cardObj.slug } }" class="text-decoration-none">
        <div class="card p-0 m-0">

            <!-- restaurant image -->
            <div class="img-container">
                <img :src="`${baseSrc}/${cardObj.image}`" alt="Restaurant-image">
            </div>
            <!-- /restaurant image -->

            <!-- card text -->
            <div class="card-body gap-1 p-2 mt-2">

                <!-- name -->
                <span class="card-title p-0 m-0 cutText font-card-title">
                    {{ cardObj.name }}
                </span>
                <!-- /name -->

                <!-- address -->
                <span class="card-title p-0 m-0 cutText">{{ cardObj.address }}</span>
                <!-- /address -->

            </div>
            <!-- /card text -->

            <!-- types -->
            <div v-if="cardObj.types && cardObj.types.length > 0" class="container-types">
                <div class="types">
                    <img :src="dynamicImage(type.name)" :alt="type.name + ' Flag'" v-for="type in cardObj.types" :key="type.id">
                </div>
            </div>
            <!-- /types -->

        </div>
    </router-link>


</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

// flag types

.container-types {
    position: absolute;
    width: min-content;
    top: 5px;
    right: 5px;
}

.types{
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
    width: 30px;
}
// flag types

//card
    // container
.card {
    position: relative;
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.card:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
}

    // card-text
.card-body {
    position: absolute;
    width: 100%;
    bottom: 2%;
    background-color: rgba(255, 255, 255, 0.7);
}

.font-card-title {
    font-size: clamp(13px, 2vw, 18px);
    font-weight: 700;
}

span {
    font-size: clamp(10px, 2vw, 15px);
}

// img
.img-container {
  width: 100%;
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
}

// @media query

@media (max-width: 468px) {
    .text-truncate {
        text-wrap: wrap;
    }

    .types {
        width: 20px;
    }
}

</style>