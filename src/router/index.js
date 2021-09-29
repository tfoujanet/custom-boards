import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  {
    path: "/new-board",
    name: "NewBoard",
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/NewBoard.vue"),
  },
  {
    path: "/board/:id",
    name: "Board",
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/Board.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
