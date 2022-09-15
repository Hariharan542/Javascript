import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import formTwo from '@/components/formTwo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/FormTwo',
    name: 'formTwo',
    component: formTwo
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
