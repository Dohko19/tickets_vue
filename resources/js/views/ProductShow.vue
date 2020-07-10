<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card text-center">
                        <div class="card-header">Producto</div>
                        <div class="card-body">
                            <img
                                class="image-responsive"
                                :src="product.featured_image_url"
                                width="120px"
                                height="120px"
                                alt="image product freatured"
                            />
                            <h5 class="card-title" v-text="product.name"></h5>
                            <p
                                class="card-text"
                                v-text="product.description"
                            ></p>
                            <div class="alert alert-primary" role="alert">
                                <p
                                    class="card-text font-weight-bold"
                                    v-text="product.long_description"
                                ></p>
                                <p>${{ product.price }}</p>
                            </div>
                            <span v-if="isAuthenticated">
                                <button
                                    @click="newOrder"
                                    class="btn btn-warning btn-rounded"
                                >
                                    Añadir al Carrito
                                </button>
                            </span>
                            <span v-else
                                >Necestias Iniciar Sesion o Registrarte para
                                poder realizar esta compra</span
                            >
                        </div>
                        <!-- <div class="card-footer text-muted">2 days ago</div> -->
                    </div>
                </div>
            </div>
        </div>
        <transition name="modal">
            <div
                class="modal fade"
                id="addNew"
                tabindex="-1"
                role="dialog"
                aria-labelledby="addNewLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addNewLabel">
                                Agregar Productos al Carrito de Compras
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form @submit.prevent="addNewArticle" method="post" enctype="multipart/form-data">
                            <div class="modal-body">
                                <div class="form-group" :class="{ 'form-group--error': $v.quantity.$error }">
                                  <input type="text" hidden v-model="product.price">
                                  <input type="text" hidden v-model="product.id">
                                    <input
                                        type="number"
                                        :class="{'input': true, 'is-invalid': $v.quantity.$invalid, 'input': !true, 'is-valid': !$v.quantity.$invalid }"
                                        class="form-control"
                                        v-model="quantity"
                                        required
                                    />
                                  <div class="error" :class="{'div': true, 'invalid-feedback': !$v.quantity.required}"  v-if="!$v.quantity.required">Campo requerido</div>
                                   <div class="error" style="color: red;" v-if="!$v.quantity.between">La cantidad debe ser minimo {{$v.quantity.$params.between.min}} y maximo {{$v.quantity.$params.between.max}}</div>
                                    <p class="typ" 
                                      :class="{'p': true, 'valid-feedback': submitStatus === 'OK'}"
                                       v-if="submitStatus === 'OK'">Ok!</p>
                                    <p class="typ" 
                                    :class="{'p': true, 'invalid-feedback': submitStatus === 'ERROR'}"
                                    v-if="submitStatus === 'ERROR'">Rellena el campo correctamente.</p>
                                    <p class="typ" v-if="submitStatus === 'PENDING'">Enviando...</p>
                                </div>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        data-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        :disabled="submitStatus === 'Pendiente'"
                                    >
                                        Agregar Producto
                                    </button>
                                   
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            product: {},
            showModal: false,
            quantity: 0,
            product_id: '',
            comment: '',
            price: 0,
            submitStatus: null
        };
    },
    validations: {
        quantity: {
            required,
            minLength: minLength(1),
            between: between(1, 50)
        }
    },
    methods: {
        newOrder() {
            this.$Progress.start();
            this.quantity = 0;
            $("#addNew").modal("show");
            this.$Progress.finish();
        },
        addNewArticle(){
          this.$Progress.start();
          this.$v.$touch()
          if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
          } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          let formData = new FormData();
          formData.append("quantity", this.quantity);
          formData.append("product_id", this.$route.params.product);
          axios.post('/cart', formData)
          .then( res=> {
              this.$Progress.finish();
              toastr["info"]("Articulo Agregado correctamente", "Ok!");
              this.submitStatus = 'OK';
            $("#addNew").modal("hidde");

          })
          .catch(err => {
            console.log(err);
                this.$Progress.fail();
                toastr["error"](err.response, "Ok!");
          })
            
          }
        }
    },
    mounted() {
        axios
            .get("/products/" + this.$route.params.product)
            .then(res => {
                this.$Progress.start();
                this.product = res.data;
                this.$Progress.finish();
            })
            .catch(err => {
                this.$Progress.fail();

                console.log(err.response);
            });
    }
};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal {
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
