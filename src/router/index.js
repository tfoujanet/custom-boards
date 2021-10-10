import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (from, to, next) => {
      if (to.path === "/" && !store.getters.hasBoard) {
        next({ name: "NoBoard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/no-board",
    name: "NoBoard",
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/NoBoard.vue"),
  },
  {
    path: "/new-board",
    name: "NewBoard",
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/NewBoard.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
