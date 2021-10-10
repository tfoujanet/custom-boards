import { connect } from "../../services/devops";

const state = {
  organization: "",
  token: "",
};

const actions = {
  connect({ state, rootState }) {
    const organization = rootState.board.organization || state.organization;
    const token = rootState.board.token || state.token;

    if (!!organization && !!token) {
      this._vm.$devops = connect(organization, token);
    }
    return Promise.resolve(this._vm.$devops);
  },
  saveAuthInfos({ commit, dispatch }, { organization, token }) {
    commit("authInfosSaved", { organization, token });
    return dispatch("connect");
  },
};

const mutations = {
  authInfosSaved(state, { organization, token }) {
    state.organization = organization;
    state.token = token;
  },
};

export const initAuth = (savedState) => ({
  namespaced: true,
  state: { ...state, ...(savedState || {}) },
  actions,
  mutations,
});
