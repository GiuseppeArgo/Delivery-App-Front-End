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

    computed: {
        // edit types
        typeNames() {
            if (this.cardObj.types && this.cardObj.types.length > 0) {
                return this.cardObj.types.map(type => type.name).join(' - ');
            }
            return '';
        }
        // edit types
    },
    methods: {
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

            <!-- image -->
            <div class="img-container">
                <img class="card-img-top w-100" :src="`${baseSrc}/${cardObj.image}`" alt="Card image cap">
            </div>
            <!-- /image -->

            <!-- card text -->
            <div class="card-body d-flex flex-column gap-1 p-2 mt-2">

                <!-- name -->
                <h5 class="card-title p-0 m-0 cutText font-size">

                    <strong class="text-truncate">
                        {{ cardObj.name }}
                    </strong>

                </h5>

                <!-- address -->
                <span class="card-title p-0 m-0 cutText">{{ cardObj.address }}</span>

                
            </div>
            <!-- /card text -->
            <!-- new types -->
            <div v-if="typeNames" class="list-unstyled mb-2 text-types container-types">
                <img :src="dynamicImage(typeNames)" alt="Logo">
                <!-- <span class="badge bg-primary text-wrap">{{ typeNames }}</span> -->
            </div>
            <!-- / new types -->

        </div>
    </router-link>


</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

// .img-container{
//     position: relative;
// }

.main-content {
    padding: 20px 0;
}

.form-check-inline {
    margin: 10px;
}

/* card style */

.card {
    position: relative;
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.card-body {
    position: absolute;
    width: 100%;
    bottom: 2%;
    background-color: rgba(255, 255, 255, 0.7);
}

.container-types {
    position: absolute;
    top: 3%;
    right: 3%;
    width: 35px;
}



.card-img-top {
    width: 100%;
    height: auto;
}

.card:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
}

.cutText {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

// .font-size {
//     font-size: 1.1rem;
// }

h5 {
    font-size: clamp(13px, 2vw, 18px);
}

span {
    font-size: clamp(10px, 2vw, 15px);
}

.badge {
    font-weight: 500;
    font-size: clamp(9px, 2vw, 13px);

}



@media (max-width: 768px) {
    .text-types {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container-types{
        top: 10%;
    }

    .center {
        text-align: center;
    }
}

@media (max-width: 468px) {
    .text-truncate {
        text-wrap: wrap;
        text-align: center;
    }
}

/* /card style */
</style>