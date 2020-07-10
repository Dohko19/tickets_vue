<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h1 class="display-4 text-center">Imagenes del Producto "{{ product.name }}"</h1>
                        <hr class="my-4">
                        <div class="row">
                            <div class="col-md-12 col-lg-12" v-show="dropzoneStatus">
                                <vue-dropzone ref="dropzone" :options="dropzoneOptions" id="dropzone" :useCustomSlot=true
                                @vdropzone-complete="afterComplete">
                                    <div class="dropzone-custom-content">
                                        <h3 class="dropzone-custom-title">Arrastra y suelta tus imagenes para subirlas!</h3>
                                        <div class="subtitle">...o da click para seleccionarlas desde tu computadora</div>
                                    </div>
                                </vue-dropzone>
                            </div>
                            <div class="col-md-4 my-4" v-for="image in images" :key="image.id">
                                <div class="card-deck" style="width: 18rem;">
                                    <div class="card align-content-center">
                                        <img class="card-img-top" :src="image.url" alt="Image">
                                        <div class="card-body">

                                        <button @click="deleteImage(image.id)" class="btn btn-danger btn-rounded">Eliminar</button>
                                        <button v-show="image.featured == 1" class="btn btn-success btn-circle btn-round" rel="tooltip" title="Imagen Destacada Actual">
                                            <i class="fas fa-heart"></i>
                                        </button>
                                        <button v-show="image.featured == 0" @click="setFreaturedImage(image.id)" class="btn btn-primary btn-circle btn-round" rel="tooltip" title="Imagen Destacada Actual">
                                            <i class="far fa-heart"></i>
                                        </button>
                                        <p class="card-text"><small class="text-muted">
                                            Ultima actualizacion hace {{ image.diff_minutes }} minutos</small>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 text-center my-5" v-if="images.length == 0">
                                <div class="card-group">
                                <div class="card">
                                    <div class="card-body">
                                    <h5 class="card-title">Sin Imagenes</h5>
                                    <p class="card-text">No se econtraron Imagenes</p>
                                    <p class="card-text">Usa el recuadro de arriba para subir tus imagenes</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            images: [],
            product: {},
            dropzoneStatus: true,
            dropzoneOptions: {
                url: '/products/'+ this.$route.params.id +'/images',
                thumbnailWidth: 200,
                acceptedFiles: 'image/*',
                headers: {
                "X-CSRF-TOKEN": document.head.querySelector("[name=csrf-token]").content
                    },
                paramName: 'photo',
                addRemoveLinks: true,
                maxFilesize: 2, // MB
                maxFiles: 4,
            },
        }
    },
    methods: {
        removeAllFiles() {
                this.$refs.dropzone.removeAllFiles();
            },
            disable(){
                this.dropzoneStatus = false;
                this.$refs.dropzone.disable();
            },
            enable(){
                this.dropzoneStatus = true;
                this.$refs.dropzone.enable();
            },
            afterComplete(file) {
                this.getProductImage();
                toastr["success"]("Imagen agregada correctamente", "Ok!");
            },
            getProductImage(){
                axios.get('/products/'+ this.$route.params.id +'/images')
                .then(res => {
                    this.images = res.data.images;
                    this.product = res.data.product;
                })
                .catch(err => {
                    console.log(err);
                })
            },
            setFreaturedImage(image){
                this.$Progress.start();
                axios.get('/products/'+this.$route.params.id+'/images/select/'+image)
                .then(res => {
                    this.$Progress.finish()
                    this.getProductImage()
                    toastr["info"]("La imagen destacada Cambio", "Ok!");

                })
                .catch(err => {
                    this.$Progress.fail()

                    conosole.log(err);
                })
            },
            deleteImage(id){ //id de la imagen
                this.$Progress.start();
                axios.delete('/products/'+id+'/images')
                .then(res => {
                    this.$Progress.finish()
                    this.getProductImage()
                    toastr["info"]("Imagen eliminada correctamente", "Ok!");

                })
                .catch(err => {
                    this.$Progress.fail()

                    conosole.log(err);
                })
            }
    },
    mounted(){
        this.getProductImage();
    }
}
</script>
<style>
    .dropzone-custom-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    }

    .dropzone-custom-title {
    margin-top: 0;
    color: #00b782;
    }

    .subtitle {
    color: #314b5f;
    }
    .btn-circle.btn-xl {
        width: 70px;
        height: 70px;
        padding: 10px 16px;
        border-radius: 35px;
        font-size: 24px;
        line-height: 1.33;
    }

    .btn-circle {
        width: 30px;
        height: 30px;
        padding: 6px 0px;
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        line-height: 1.42857;
    }

</style>
