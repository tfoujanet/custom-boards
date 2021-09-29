import Vue from "vue";
import Vuex from "vuex";
import { initAuth } from "./modules/auth";
import { referential } from "./modules/referential";
import { initBoards } from "./modules/boards";
import { storePlugin, loadState } from "./saveStatePlugin";

Vue.use(Vuex);

const savedState = loadState();

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: initAuth(savedState),
    referential,
    boards: initBoards(savedState),
  },
  plugins: [storePlugin],
});
