import Vue from 'vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App';

import Home from './views/home.vue';
import adminUsers from './views/adminUsers.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    path     : '/',
    component: Home
  },
  {
    path     : '/adminUsers',
    component: adminUsers
  },
  {
    path     : '*',
    component: Home
  }
];

const router = new VueRouter({
  // mode: 'history',  history模式
  routes
});

router.beforeEach((to, from, next) => {
  // store._mutations.pushLoadStack[0]();
  next()
});

router.afterEach(route => {
  document.body.scrollTop            = 0;
  document.documentElement.scrollTop = 0;
  window.onscroll                    = null;
  setTimeout(() => {
    // store._mutations.completeLoad[0]()
  }, 100)
});

var app = new Vue({
  el: '#app',
  router,
  // store,
  ...App,
});
