import Vue from 'vue'
import router from './router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Unicon from 'vue-unicons'
import { uniThumbsUp, uniTrashAlt } from 'vue-unicons/src/icons'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Unicon.add([uniThumbsUp, uniTrashAlt])
Vue.use(Unicon)
Vue.config.silent = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
