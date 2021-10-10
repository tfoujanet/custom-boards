import Vue from "vue";
import Vuex from "vuex";
import { initAuth } from "./modules/auth";
import { referential } from "./modules/referential";
import { initBoards } from "./modules/boards";
import initBoard from "./modules/board";
import workItems from "./modules/work-items";
import { storePlugin, loadState } from "./saveStatePlugin";

Vue.use(Vuex);

const { auth, boards, board } = loadState();

export default new Vuex.Store({
  getters: {
    hasBoard(state, getters, rootState) {
      const {
        board: { organization, token },
      } = rootState;
      return !!organization && !!token;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    auth: initAuth(auth),
    referential,
    boards: initBoards(boards),
    workItems,
    board: initBoard(board),
  },
  plugins: [storePlugin],
});
