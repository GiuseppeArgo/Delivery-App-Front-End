<script>
export default {
    props: {
        scrollToPosition: {
            type: Number,
            default: 0 // position scroll default 0
        },
        scrollThreshold: {
            type: Number,
            default: 500 // scroll default
        }
    },
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
            document.documentElement.scrollTop = this.scrollToPosition;
        },
        handleScroll: function () {
            this.show = window.scrollY > this.scrollThreshold;
        }
    }
}
</script>

<template>
    <div class="ms_aspect btn btn-outline-danger"
        @click="toTop" v-if="show">
        <div class="d-flex flex-column">
            <i class="fa-solid fa-chevron-up"></i>
            <span>TOP</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.ms_aspect {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 30%;
    right: 0;
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

        div {
            transform: translateY(-5px);
            transition: transform 0.6s ease;
        }
    }

    div {
        transition: transform 0.6s ease;
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
