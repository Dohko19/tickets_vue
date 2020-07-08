<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Not Found 404</div>

                        <div class="card-body text-center">
                            <h1 class="text-capitalize">Pagina no Encontrada</h1>
                            <p>Volver al <router-link :to="{name: 'home'}">Inicio</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

</style>
