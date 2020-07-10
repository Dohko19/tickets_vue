<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card text-center">
            <div class="card-header">Producto</div>
            <div class="card-body">
                <img class="image-responsive" :src="product.featured_image_url" width="120px" height="120px" alt="image product freatured">
              <h5 class="card-title" v-text="product.name"></h5>
              <p class="card-text" v-text="product.description"></p>
              <div class="alert alert-primary" role="alert">
                <p class="card-text font-weight-bold" v-text="product.long_description"></p>
                <p>${{ product.price }}</p>
              </div>
              <span v-if="isAuthenticated">
                <button
                  @click.prevent="newCart()"
                  class="btn btn-warning btn-rounded"
                >Añadir al Carrito</button>
              </span>
              <span v-else>Necestias Iniciar Sesion o Registrarte para poder realizar esta compra</span>
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
              <h5 class="modal-title" id="addNewLabel">Agregar Productos al Carrito de Compras</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form method="post" enctype="multipart/form-data">
              <div class="modal-body">
                <div class="form-group"></div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                  <button type="submit" class="btn btn-primary">Agregar Producto</button>
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
export default {
  data() {
    return {
      product: {},
      showModal: false
    };
  },
  methods: {
    newCart() {
      this.$Progress.start();
      $("#addNew").modal("show");
      this.$Progress.finish();
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
