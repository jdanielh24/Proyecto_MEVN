import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import Login from '../views/Login.vue'
import Registrar from '../views/Registrar.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {requireAuth: true}
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: AddPost,
    meta: {requireAuth: true}
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
    meta: {requireAuth: true}
  },
  {
    path: '/edit-post/:id',
    name: 'edit-post',
    component: EditPost,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/registrar-usuario',
    name: 'registrar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Registrar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const rutaProtegia = to.matched.some(record => record.meta.requireAuth)

  if(rutaProtegia && store.state.token === ''){
    next({name: 'login'})
  }else{
    next();
  }
});

export default router