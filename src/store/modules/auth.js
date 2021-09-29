import { connect } from "../../services/devops";

const state = {
  organization: "",
  token: "",
};

const actions = {
  connect({ state }) {
    const { organization, token } = state;
    if (!!organization && !!token) {
      this._vm.$devops = connect(organization, token);
    }
  },
  saveAuthInfos({ commit, dispatch }, { organization, token }) {
    commit("authInfosSaved", { organization, token });
    dispatch("connect");
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
  state: { ...state, ...(savedState.auth || {}) },
  actions,
  mutations,
});
