import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
//Vue.component('star-rating', VueStarRating.default)

//Vue.component('star-rating', StarRating);

axios.defaults.baseURL = 'http://mishoteles.tech:5000/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')