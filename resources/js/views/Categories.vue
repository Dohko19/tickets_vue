<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">Gestiona tus Categorias Categorias</div>

            <div class="card-body">
              <div class>
                <button
                  class="btn btn-primary float-right"
                  @click="newCategory"
                >Agregar Nueva Categoria</button>
                <div class="table-resposive">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr style="background-color: #C8A2C8">
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Imagen representativa de la categoria</th>
                        <th>Acciones:</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="category in categories" :key="category.id">
                        <td v-text="category.name"></td>
                        <td v-text="category.description"></td>
                        <td>
                          <img
                            :src="category.image_category"
                            :alt="`Imagen de la categoria ${category.name}`"
                            height="60px"
                            width="60px"
                          />
                        </td>
                        <td>
                          <button class="btn btn-sm btn-warning" @click="editCategory(category)">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="eraseCategory(category.id)">
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Agregar Categoria</h5>
              <h5 class="modal-title" v-show="editmode" id="addNewLabel">Actualizar Categoria</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form
              method="post"
              @submit.prevent="editmode ? updateCategory() : createCategory()"
              enctype="multipart/form-data"
            >
              <div class="modal-body">
                <div class="form-group">
                  <input type="text" hidden v-model="form.category" />
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Nombre de la Categoria"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    cols="5"
                    rows="5"
                    placeholder="Breve descripcion de la categoria"
                  ></textarea>
                </div>
                <div class="form-group">
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    @change="handleSelects"
                    ref="categoryInput"
                    name="images"
                  />
                </div>
                <div class="form-group" v-for="image in images" :key="image">
                  <img :src="image" class="rounded mx-auto d-block" width="100px" height="100px" />
                  <small
                    class="text-danger"
                    v-show="editmode"
                  >Si no quieres cambiar la imagen no es necesario subir una</small>
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
  data() {
    return {
      categories: [],
      showModal: false,
      editmode: false,
      form: {
        category: "",
        name: "",
        description: "",
        image: ""
      },
      images: []
    };
  },
  methods: {
    handleSelects(e) {
      this.images = [];
      this.form.image = "";

      this.form.image = e.target.files[0];

      let fileList = Array.prototype.slice.call(e.target.files);
      fileList.forEach(f => {
        if (!f.type.match("image.*")) {
          return;
        }
        let reader = new FileReader();
        let that = this;
        reader.onload = function(e) {
          that.images.push(e.target.result);
        };
        reader.readAsDataURL(f);
      });
    },
    newCategory() {
      this.$Progress.start();
      this.editmode = false;
      this.form.name = "";
      this.form.description = "";
      this.images = [];
      $("#addNew").modal("show");
      this.$Progress.finish();
    },
    getCategories() {
      axios
        .get("category/list")
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err.response);
          this.$Progress.fail();
        });
    },
    updateCategory() {
      this.$Progress.start();
      let formData = new FormData();
      //   formData.append("category", this.form.id);
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("image", this.form.image);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      console.log(formData);
      axios
        .put("category/update/" + this.form.category, formData, config)
        .then(res => {
          this.$refs.categoryInput.value = "";
          this.images = [];
          this.form.image = [];
          this.form.id = "";
          this.form.name = "";
          this.form.description = "";
          toastr["success"]("Categoria registrada Correctamente", "Ok!");
          this.getCategories();
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
          toastr["danger"]("Error al registrar".err, "Error!");
          this.$Progress.fail();
        });
    },
    createCategory() {
      this.$Progress.start();
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("image", this.form.image);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post("category/save", formData, config)
        .then(res => {
          this.$refs.categoryInput.value = "";
          this.images = [];
          this.form.image = [];
          this.form.name = "";
          this.form.description = "";
          toastr["success"]("Categoria registrada Correctamente", "Ok!");
          this.getCategories();
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
    editCategory(category) {
      this.$Progress.start();
      this.images = [];
      this.editmode = true;
      $("#addNew").modal("show");
      this.form.category = category["id"];
      this.form.name = category["name"];
      this.form.description = category["description"];
      this.images.push(category["image_category"]);
      this.$Progress.finish();
    },
    eraseCategory(id) {
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
            axios
              .delete("category/" + id)
              .then(res => {
                this.getCategories();
                this.$Progress.finish();
              })
              .catch(err => {
                console.log(err);
                this.$Progress.fail();
              });
            swal.fire("Eliminado", "Categoria eliminada.", "success");
          }
        });
    }
  },
  mounted() {
    this.getCategories();
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
