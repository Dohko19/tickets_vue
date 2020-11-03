require("./bootstrap");

window.Vue = require("vue");
import Vuex from 'vuex'
import router from "./routes";

import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import VueLazyload from "vue-lazyload";
import swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import Element from 'element-ui'

Vue.use(Element)
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
require("vue2-animate/dist/vue2-animate.min.css");

Vue.use(VueLazyload);
window.swal = swal;
window.toastr = require("toastr");
Vue.use(VueToastr2);

import VTooltip from "v-tooltip";

Vue.use(VTooltip);

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

Vue.use(vue2Dropzone);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// Componentes
Vue.component("tickets", require("./components/Tickets").default);
Vue.component("manage-persons", require("./components/ManagePersons").default);
Vue.component("nav-bar", require("./components/NavBar").default);
Vue.component("admin-category", require("./components/AdminCategory").default);
Vue.component("admin-products", require("./components/AdminProducts").default);
Vue.component("tags-view", require("./components/TagsView").default);
Vue.component("breadcum", require("./components/Breadcum/index").default);
Vue.component("vue-dropzone", vue2Dropzone);

import auth from "./mixins/auth";

Vue.mixin(auth);


import store from './store'

const app = new Vue({
    el: "#app",
    router,
    store,
        computed: {
            cachedViews() {
                return this.$store.state.tagsView.cachedViews
            },
            key() {
                return this.$route.path
            }
        }

})  ;
