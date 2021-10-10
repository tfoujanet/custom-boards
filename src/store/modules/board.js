const BOARD_UPDATED = "BOARD_UPDATED";

const state = {
  organization: "",
  token: "",
  project: "",
  team: "",
  types: [],
};

const actions = {
  update({ commit, state }, board) {
    const futureState = { ...state, ...board };
    commit(BOARD_UPDATED, futureState);
  },
};

const mutations = {
  [BOARD_UPDATED](state, newState) {
    Object.entries(newState).forEach(([key, value]) => (state[key] = value));
  },
};

export default function initBoard(initialValue) {
  return {
    namespaced: true,
    state: { ...state, ...(initialValue || {}) },
    actions,
    mutations,
  };
}
