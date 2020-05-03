<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Sistema de Tickets</div>

                    <div class="card-body text-center">
                        <button class="btn btn-info" @click="altaTicket('ticket','registrar')" style="color: white;">Levantar un Ticket</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" :class="{'mostrar' : modal}" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="tituloModal"></h4>
                        <button type="button" class="close" @click="cerrarModal()" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="motivo">Motivo del Ticket</label>
                                <div class="col-md-9">
                                    <input type="hidden" v-model="motivo" class="form-control" placeholder="Ticket">
                                    <select class="form-control" v-model="motivo">
                                        <option disabled value="">Seleccione un elemento</option>
                                        <option v-for="motivos  in motivosTicket">{{motivos}}</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="motivo === 'Otro'">
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="otroMotivo">Escribe el otro motivo</label><br>
                                    <div class="col-md-9">
                                        <textarea class="form-control" name="otroMotivo" id="otroMotivo" v-model="otroMotivo" cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="email-input">Comentario</label>
                                <div class="col-md-9">
                                    <input type="email" v-model="comentario" class="form-control" placeholder="Comentario">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="email-input">Fotos</label>
                                <div class="col-md-9">
                                    <input type="file" @change="obtenerFoto" class="form-control" placeholder="Foto 1">
                                    <figure v-if="foto1">
                                        <img width="200" height="200" :src="foto1" alt="Foto 1">
                                    </figure>
                                </div>
                            </div>
                            <div v-show="errorTicket" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in errorMostrarMsjTicket" :key="error" v-text="error">
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarTicket()">Guardar</button>
                        <!--                    <button type="button" v-if="tipoAccion==2" class="btn btn-primary" @click="actualizarCategoria()">Actualizar</button>-->
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                modal: 0,
                motivo: '',
                otroMotivo: '',
                tituloModal : '',
                tipoAccion : 0,
                comentario: '',
                tipoAccion : 0,
                errorTicket: 0,
                status: 0,
                foto1: '',
                foto2: '',
                foto3: '',
                foto4: '',
                errorMostrarMsjTicket : [],
                motivosTicket: [
                    'Solcitud 4+1',
                    'Compra jabonera (rota, robo, vandalismo',
                    'Otro'
                ],
                imageMini: ''
            }
        },
        methods: {
            obtenerFoto(e){
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.foto1 = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            cerrarModal(){
                this.modal=0;
                this.tituloModal='';
                this.motivo='';
                this.comentario='';
                this.foto1 = '';
            },
            altaTicket(modelo, accion, data = [])
            {
                switch (modelo) {
                    case "ticket":
                    {
                        switch (accion){
                            case 'registrar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Registrar Ticket';
                                this.motivo = '';
                                this.otroMotivo = '';
                                this.comentario = '';
                                this.tipoAccion = 1;
                                this.foto1 = ''
                                break;
                            }
                        }
                    }

                }
            },
            validarTicket(){
                this.errorTicket=0;
                this.errorMostrarMsjTicket =[];

                if (!this.motivo) this.errorMostrarMsjTicket.push("El motivo del ticket no puede estar vacío.");
                if (!this.comentario) this.errorMostrarMsjTicket.push("Dejanos tus comentarios para saber mas a detalle lo que ocurre")
                if (this.errorMostrarMsjTicket.length) this.errorTicket = 1;

                return this.errorTicket;
            },
            registrarTicket(){
                if (this.validarTicket()){
                    return;
                }
                let me = this;
                axios.post('/tickets/registrar', {
                    'motivo': this.motivo,
                    'comentario': this.comentario,
                    'otroMotivo': this.otroMotivo,
                    'status': 0,
                    foto1: this.foto1
                }).then(res => {
                    me.cerrarModal();
                    console.log(res);
                    this.$toastr.success('El ticket fue dado de alta exitosamente ', 'Guardado', toastr.options={
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": 5000,
                        "extendedTimeOut": 1000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut",
                        "tapToDismiss": false
                    });
                }).catch(err => {
                    this.$toastr.error('Algo salio mal'+err, 'Error', toastr.options={
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": 5000,
                        "extendedTimeOut": 1000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut",
                        "tapToDismiss": false
                    });
                });
            },
        },
        computed: {
            imagen(){
                return this.imageMini;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style>
    .modal-content{
        width: 100% !important;
        position: absolute !important;
        margin-top: 100px;
    }
    .mostrar{
        display: list-item !important;
        opacity: 1 !important;
        position: absolute !important;
        background-color: #3c29297a !important;
    }
    .div-error{
        display: flex;
        justify-content: center;
    }
    .text-error{
        color: red !important;
        font-weight: bold;
    }
</style>
