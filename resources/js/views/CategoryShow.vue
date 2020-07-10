<template>
  <div class="container">
       <div class="row">
              <div class="col-md-12">
              <div class="jumbotron">
                     <img :src="category.image_category" width="150px" height="150px" :alt="category.name" class="rounded mx-auto d-block">
                     <h1 class="display-4 text-center">{{ category.name }}</h1>
                     <p class="lead text-center">{{ category.description }} </p>
                     <hr class="my-4">
                     <div class="row">
                            <div class="col-md-3" v-for="products in category.products" :key="products.id">
                                   <div class="card" style="width: 18rem;">
                                      <img class="card-img-top" :src="products.featured_image_url" alt="image product freatured">
                                    <div class="card-body">
                                      <h5 class="card-title" v-text="products.name"></h5>
                                      <h6 class="card-subtitle mb-2 text-muted" v-text="products.description"></h6>
                                      <p class="card-text" v-text="products.long_description"></p>
                                      <router-link :to="{name: 'product_show', params:{product: products.id} }"
                                      class="card-link">
                                      Ver detalles...
                                      </router-link>
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
      category: {}
    };
  },
  mounted() {
    axios.get(`/category/show/${this.$route.params.category}`)
      .then(res => {
        this.category = res.data;
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
};
</script>
