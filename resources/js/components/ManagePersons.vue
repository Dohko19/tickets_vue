<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Agregar Persones | Test</div>

            <div class="card-body">
              <form @submit.prevent="submit" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="Nombre">Nombre</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Nombre de la persona"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Email de la persona"
                  />
                </div>
                <div class="form-group">
                  <label for>Avatar</label>
                  <input
                    accept="image/*"
                    type="file"
                    class="form-control"
                    @change="handleSelects"
                    ref="avatarInput"
                    name="images"
                  />
                </div>
                <div class="form-group" v-for="image in images" :key="image">
                  <img :src="image" class="rounded mx-auto d-block" width="100px" height="100px" />
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Listado de Personas</div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-dark">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Avatar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="person in people" :key="person.id">
                      <td v-text="person.name"></td>
                      <td v-text="person.email"></td>
                      <td>
                        <img
                          :src="person.avatar_image"
                          :alt="person.name"
                          width="75px"
                          height="75px"
                        />
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
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "Daniel",
        email: "daniel@email.com",
        avatar: ""
      },
      images: [],
      people: []
    };
  },
  methods: {
    handleSelects(e) {
      this.images = [];
      this.form.avatar = "";

      this.form.avatar = e.target.files[0];

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
    submit() {
      this.$Progress.start();
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);

      // for(let i=0; i < this.form.avatar.length; i++)
      // {
      formData.append("avatar", this.form.avatar);

      // }

      axios
        .post("people/save", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.$refs.avatarInput.value = "";
          this.images = [];
          this.form.avatar = [];
          toastr["success"]("Persona registrada Correctamente", "Ok!");
          this.listPeople();
          this.$Progress.finish();
          toastr.options = {
            closeButton: true,
            closeButton: true,
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            progressBar: true
          };
        })
        .catch(err => {
          console.log(err);
          this.$Progress.fail();
        });
    },
    listPeople() {
      this.$Progress.start();
      axios
        .get("people/list")
        .then(res => {
          this.$Progress.finish();
          this.people = res.data;
        })
        .catch(err => {
          this.$Progress.fail();
          console.log(err.response);
        });
    }
  },
  mounted() {
    this.listPeople();
  }
};
</script>
<style>
</style>
