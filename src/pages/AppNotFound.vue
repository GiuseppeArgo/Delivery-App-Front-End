<script>
</script>

<template>

    <div class="containert md_container">


        <div class="text-center ">
            <div>
                <img src="../assets/img/notFoundPage.webp" alt="">
            </div>
            
            <h2 class=" py-2 mb-4">Ops...Qualcosa è andato storto!</h2>
            <router-link :to="{ name: 'home' }">
                
                <button class="btn btn-primary">Torna Alla Home</button>
            </router-link>

        </div>
    </div>




</template>


<style lang="scss" scoped>
@use "../sass/colorpalette.scss" as *;

.md_container {
    min-height: 90vh;
    margin-top: 130px;
}

.fas {
    font-size: 3rem;
}
</style>