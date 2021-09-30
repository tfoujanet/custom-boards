import Vue from "vue";
import Vuex from "vuex";
import { initAuth } from "./modules/auth";
import { referential } from "./modules/referential";
import { initBoards } from "./modules/boards";
import workItems from "./modules/work-items";
import { storePlugin, loadState } from "./saveStatePlugin";

Vue.use(Vuex);

const { auth, boards } = loadState();

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: initAuth(auth),
    referential,
    boards: initBoards(boards),
    workItems
  },
  plugins: [storePlugin],
});
