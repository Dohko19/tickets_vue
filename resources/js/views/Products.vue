<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card text-center">
                    <div class="card-header">Gestion de Productos</div>
                    <div class="card-body">
                    <h5 class="card-title">Listado de mi Productos</h5>
                    <button class="btn btn-primary float-right mb-2" @click="newProduct">Añadir Producto</button>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover table-dark">
                                    <thead>
                                        <tr>
                                            <th>Acciones</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Descripcion Larga</th>
                                            <th>Precio ($MXN) </th>
                                            <th>Categoria </th>
                                            <th>Creado el: </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in products" :key="product.id">
                                            <td >
                                                <button v-tooltip="'Ver Producto'" class="btn btn-sm btn-primary btn-rounded btn-circle">
                                                    <i class="fa fa-eye"></i>
                                                </button>
                                                <button @click="editProduct(product)" v-tooltip="'Editar Producto'" class="btn btn-sm btn-warning btn-circle">
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                                <button @click="deleteProduct(product.id)" v-tooltip="'Eliminar Producto'" class="btn btn-sm btn-danger btn-circle">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                                <button v-tooltip="'Agregar Imagenes del Producto'" class="btn btn-sm btn-info btn-circle">
                                                    <i class="fa fa-image"></i>
                                                </button>
                                            </td>
                                            <td v-text="product.name"></td>
                                            <td v-text="product.description"></td>
                                            <td v-text="product.long_description"></td>
                                            <td v-text="product.price"></td>
                                            <td v-text="product.category.name"></td>
                                            <td v-text="product.product_created">
                                                <!-- <img :src="person.avatar_image" :alt="person.name" width="75px" height="75px"> -->
                                            </td>
                                        </tr>
                                        <tr v-if="products.length == 0">
                                            <td colspan="7">No hay productos</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>

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
                            <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Agregar Producto</h5>
                            <h5 class="modal-title" v-show="editmode" id="addNewLabel">Actualizar Producto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <form
                            method="post"
                            @submit.prevent="editmode ? updateProduct() : createProduct()"
                            enctype="multipart/form-data"
                            >
                        <div class="modal-body">
                            <div class="form-group">
                            <input type="text" hidden v-model="form.id" />
                                <input
                                    v-model="form.name"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nombre del Producto"
                                >
                                </div>
                            <div class="form-group">
                                <textarea
                                    v-model="form.description"
                                    class="form-control"
                                    cols="5"
                                    rows="5"
                                    placeholder="Breve descripcion del Producto"
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <textarea
                                    v-model="form.long_description"
                                    class="form-control"
                                    cols="5"
                                    rows="5"
                                    placeholder="Breve descripcion del producto"
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <input placeholder="Precio" class="form-control" type="number" v-model="form.price" min="0" step="any">
                            </div>
                            <div class="form-group">
                                <select name="" class="form-control" v-model="form.category_id">
                                    <option value="">Selecciona una categoria</option>
                                    <option :key="category.id" v-for="category in categories" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button v-show="editmode" type="submit" class="btn btn-success">Actualizar</button>
                            <button v-show="!editmode" type="submit" class="btn btn-primary">Crear</button>
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
    data(){
        return{
            editmode: false,
            products: [],
            form: {
                id: '',
                name: '',
                description: '',
                long_description: '',
                price: '',
                category_id:''
            },
            categories: []
        }
    },
    methods: {
        newProduct() {
            this.$Progress.start();
            this.editmode = false;
            this.form.name = '';
            this.form.description = '';
            this.form.long_description = '';
            this.form.price = '',
            this.form.category_id = '',
            this.listCategory();
            $("#addNew").modal("show");
            this.$Progress.finish();
        },
        editProduct(product) {
            this.$Progress.start();
            this.editmode = true;
            this.form.id = product['id'];
            this.form.name = product['name'];
            this.form.description = product['description'];
            this.form.long_description = product['long_description'];
            this.form.price = product['price'],
            this.form.category_id = product['category_id'],
            this.listCategory();
            $("#addNew").modal("show");
            this.$Progress.finish();
        },
        updateProduct(){
            this.$Progress.start();
            let formData = new FormData();
            formData.append("name", this.form.name);
            formData.append("description", this.form.description);
            formData.append("long_description", this.form.long_description);
            formData.append("price", this.form.price);
            formData.append("category_id", this.form.category_id);
            formData.append('_method', 'PUT')
            //Para actualizar reggistros en un formData agregar este metodo, laravel no reconoce .put con formdata en axios,
            //hay que hacerlo de la manera tradicional como si se realizara en un form de blade normalmente


            axios.post("/product/update/" + this.form.id, formData)
                .then(res => {
                this.form.name = '';
                this.form.description = '';
                this.form.long_description = '';
                this.form.price = '',
                this.form.category_id = '',
                toastr["success"]("Producto Actualizado Correctamente", "Ok!");
                this.listProducts();
                this.$Progress.finish();
                toastr.options = {
                    closeButton: true,
                    closeButton: true,
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    progressBar: true
                };
                $("#addNew").modal("hide");
                })
                .catch(err => {
                console.log(err.response);
                toastr["warning"]("Error al registrar"+err.response, "Error!");
                this.$Progress.fail();
                });
        },
        createProduct(){
            this.$Progress.start();
            let formData = new FormData();
            formData.append("name", this.form.name);
            formData.append("description", this.form.description);
            formData.append("long_description", this.form.long_description);
            formData.append("price", this.form.price);
            formData.append("category_id", this.form.category_id);
            axios.post("/products", formData)
                .then(res => {
                this.form.name = '';
                this.form.description = '';
                this.form.long_description = '';
                this.form.price = '',
                this.form.category_id = '',
                toastr["success"]("Producto registrado Correctamente", "Ok!");
                this.listProducts();
                this.$Progress.finish();
                toastr.options = {
                    closeButton: true,
                    closeButton: true,
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    progressBar: true
                };
                $("#addNew").modal("hide");
                })
                .catch(err => {
                console.log(err.response);
                this.$Progress.fail();
                });
        },
        listCategory()
        {
            axios.get('/category/list')
            .then(res => {
                console.log(res.data)
                this.categories = res.data;
            })
            .catch(err => {
                this.$Progress.fail();
                console.log(err.response);
            })
        },
        listProducts(){
            axios.get('/products')
            .then(res => {
                this.$Progress.start()
                this.products = res.data
                this.$Progress.finish()
            })
            .catch(err => {
                this.$Progress.fail()

                console.log(err.response);
            })
        },
        deleteProduct(product){
             this.$Progress.start();
            swal
                .fire({
                title: "¿Estas seguro de Borrar esta Categoria?",
                text:
                    "Todos los productos que pertenezcan a esta categoria seran borrados",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar"
                })
                .then(result => {
                if (result.value) {
                    axios.delete('/product/'+product)
                    .then(res => {
                        this.listProducts();
                        this.$Progress.finish();
                    })
                    .catch(err => {
                        console.log(err);
                        this.$Progress.fail();
                    });
                    swal.fire("Eliminado", "Producto eliminado.", "success");
                }
                });
        },
    },
    mounted(){
        this.listProducts()
    }
}
</script>
<style>
.modal-content {
  margin-top: 20px !important;
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

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
