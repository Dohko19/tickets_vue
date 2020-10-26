require("./bootstrap");

window.Vue = require("vue");
import Vuex from 'vuex'
import router from "./routes";

import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import VueLazyload from "vue-lazyload";
import swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
require("vue2-animate/dist/vue2-animate.min.css");

//progressbar
import VueProgressBar from "vue-progressbar";

Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    height: "3px"
});

const options = {
    color: "#22bf2f",
    failedColor: "#c70202",
    thickness: "5px",
    transition: {
        speed: "1.2s",
        opacity: "0.6s",
        termination: 300
    },
    autoRevert: true,
    location: "left",
    inverse: false
};

Vue.use(VueProgressBar, options);

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
Vue.component("vue-dropzone", vue2Dropzone);

import auth from "./mixins/auth";

Vue.mixin(auth);

const app = new Vue({
    el: "#app",
    router,
    state,
    computed: {
            cachedViews() {
            return this.$store

            // state.tagsView.cachedViews
            },
            key() {
            return this.$route.path
            },
        },
        mounted() {
            //  [App.vue specific] When App.vue is finish loading finish the progress bar
            this.$Progress.finish();
        },
        created() {
            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start();
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress;
                    // parse meta tags
                    this.$Progress.parseMeta(meta);
                }
                //  start the progress bar
                this.$Progress.start();
                //  continue to next page
                next();
            });
            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach((to, from) => {
                //  finish the progress bar
                this.$Progress.finish();
            });
        }
});
