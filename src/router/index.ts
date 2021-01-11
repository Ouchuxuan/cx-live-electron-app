import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/layout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    redirect:'home',
    children:[
      {
        path:'/home',
        component:()=> import(/* webpackChunkName: "home" */'@/views/home/home.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
