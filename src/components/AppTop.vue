<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        toTop: function () {
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            this.show = window.scrollY > 500;
        }
    }
}
</script>

<template>
    <div class="text-white d-flex flex-column justify-content-center align-items-center ms_aspect"
        @click="toTop" v-if="show">
        <i class="fa-solid fa-chevron-up"></i>
        <span>TOP</span>
    </div>
</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.ms_aspect {
    position: fixed;
    bottom: 30%;
    right: 0;
    background-color: $red;
    font-weight: 700;
    width: 50px;
    border-radius: 50%;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;

    span {
        font-size: 12px;
    }

    &:hover {
        span {
            opacity: 0;
        }

        i {
            transform: translateY(10px);
            transition: transform 0.3s ease;
        }
    }

    i {
        transition: transform 0.3s ease;
    }
}

@media (max-width: 430px) {
    .ms_aspect{
        width: 40px;
        aspect-ratio: 1;
        span,i{
            font-size: 10px
        }
    }
}
</style>