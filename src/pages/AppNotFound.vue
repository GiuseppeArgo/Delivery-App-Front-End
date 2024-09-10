<script>
</script>

<template>

    <!-- container -->
    <div class="container text-center">

        <!-- img -->
        <div>
            <img src="../assets/img/notFoundPage.webp" alt="">
        </div>

        <!-- text -->
        <h2 class=" py-2 mb-4">Ops...Qualcosa è andato storto!</h2>

        <!-- button -->
        <router-link :to="{ name: 'home' }">
            <button class="btn btn-primary">Torna Alla Home</button>
        </router-link>

    </div>

</template>


<style lang="scss" scoped>
@use "../sass/colorpalette.scss" as *;

// container
.container {
    height: 70vh;
    margin-top: 60px;
    margin-bottom: 30px;
}

// media query
@media (max-width: 800px) {
    .container {
        margin-top: 50px;
        margin-bottom: 0;
    }
}

@media (max-width: 468px) {
    .container {
        margin-top: 110px;
        height: 60vh;
    }
}
</style>