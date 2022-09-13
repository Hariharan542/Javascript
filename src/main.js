import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

Vue.filter('place',function(a){
  if(a.length>10){
    return a.slice(0,10)+'...'
  }
  else
    return a
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
