require("./bootstrap");

window.Vue = require("vue");

import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import VueLazyload from "vue-lazyload";

window.toastr = require("toastr");

Vue.use(VueToastr2);
Vue.use(VueLazyload);
// Componentes
Vue.component("home-component", require("./components/Home.vue").default);

const app = new Vue({
    el: "#app"
});
