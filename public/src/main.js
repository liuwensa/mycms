import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import App from "./App";

import Home from "./views/home.vue";
import adminUsers from "./views/adminUsers.vue";
import tags from "./views/tags.vue";
import category from "./views/category.vue";
import categories from "./views/categories.vue";
import content from "./views/content.vue";
import contentdetail from "./views/contentdetail.vue";

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
    path     : '/tags',
    component: tags
  },
  {
    path     : '/category',
    component: category
  },
  {
    path     : '/categories',
    component: categories
  },
  {
    path     : '/content',
    component: content
  },
  {
    path     : '/contentdetail',
    component: contentdetail
  },
  {
    path     : '/contentdetail/:id',
    component: contentdetail
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
  next()
});

router.afterEach(route => {
  document.body.scrollTop            = 0;
  document.documentElement.scrollTop = 0;
  window.onscroll                    = null;
});

window.bus = new Vue();
var app = new Vue({
  el: '#app',
  router,
  ...App,
});
