require("./bootstrap");

window.Vue = require("vue");

import router from './routes';

import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import VueLazyload from "vue-lazyload";
import swal from 'sweetalert2'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
require('vue2-animate/dist/vue2-animate.min.css')

//progressbar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  })


const options = {
    color: '#22bf2f',
    failedColor: '#c70202',
    thickness: '5px',
    transition: {
      speed: '1.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
  }

  Vue.use(VueProgressBar, options)


Vue.use(VueLazyload);
window.swal = swal;
window.toastr = require('toastr');
Vue.use(VueToastr2);
// Componentes
Vue.component("tickets", require("./components/Tickets").default);
Vue.component("manage-persons", require("./components/ManagePersons").default);
Vue.component("nav-bar", require("./components/NavBar").default);

const app = new Vue({
    el: "#app",
    router,
    mounted () {
        //  [App.vue specific] When App.vue is finish loading finish the progress bar
        this.$Progress.finish()
      },
      created () {
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start()
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
          //  does the page we want to go to have a meta.progress object
          if (to.meta.progress !== undefined) {
            let meta = to.meta.progress
            // parse meta tags
            this.$Progress.parseMeta(meta)
          }
          //  start the progress bar
          this.$Progress.start()
          //  continue to next page
          next()
        })
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
          //  finish the progress bar
          this.$Progress.finish()
        })
      }
});
