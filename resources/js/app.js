require('./bootstrap');

window.Vue = require('vue');

import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

window.toastr = require('toastr')

Vue.use(VueToastr2)

Vue.component('home-component', require('./components/Home.vue').default);



const app = new Vue({
    el: '#app',
});
