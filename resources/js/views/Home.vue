<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">Bienvenido</div>
            <div class="card-body">
              <h2 class="text-center">Listado de Categorias</h2>
              <div class="row">
                <div class="col-md-4" v-for="category in categories" :key="category.id">
                  <div class="card" style="width: 18rem;">
                    <img
                      class="card-img-top"
                      :src="category.image_category"
                      width="150px"
                      height="150px"
                      :alt="category.name"
                    />
                    <div class="card-body">
                      <h5 class="card-title" v-text="category.name"></h5>
                      <p class="card-text" v-text="category.description"></p>
                      <router-link
                        :to="{name: 'category_show', params: {category: category.id}}"
                      >Ver mas...</router-link>
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
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    axios
      .get("category/list")
      .then(res => {
        this.categories = res.data;
      })
      .catch(err => {
        console.log(err);
        this.$Progress.fail();
      });
  }
};
</script>
