import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logged from '../views/Logged.vue'
import Logout from '../views/Logout.vue'
import Test from '../views/Test.vue'
import User from '../views/User.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false}
  },
  {
    path: '/logged',
    name: 'Logged',
    component: Logged,
    meta: { requiresAuth: true}
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { requiresAuth: true}
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true}
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: { requiresAuth: true}
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: NotFound,
    meta: { requiresAuth: false}
  },


]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.getLoggedIn === 1) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
