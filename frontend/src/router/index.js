import Vue from 'vue'
import VueRouter from 'vue-router'
import customerTable from '@/components/customerTable.vue'
import hotelTable from '@/components/hotelTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/customer',
    name: 'customer',
    component: customerTable
  },
  {
    path: '/hotel',
    name: 'hotel',
    component:hotelTable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
