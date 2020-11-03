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
        this.categories = res.data
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header+.app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header+.app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
