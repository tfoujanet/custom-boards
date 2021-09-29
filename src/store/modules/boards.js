import { getWorkItems } from "../../services/devops";

const state = {
  list: [],
  current: {},
  workItems: [],
};

const CURRENT_BOARD_UPDATED = "CURRENT_BOARD_UPDATED";
const CURRENT_BOARD_RESET = "CURRENT_BOARD_RESET";
const BOARD_SAVED = "BOARD_SAVED";
const WORK_ITEMS_LOADED = "WORK_ITEMS_LOADED";

const actions = {
  resetCurrent({ commit }) {
    commit(CURRENT_BOARD_RESET);
  },
  updateCurrent({ commit }, current) {
    commit(CURRENT_BOARD_UPDATED, current);
  },
  selectProject({ commit, dispatch }, project) {
    commit(CURRENT_BOARD_UPDATED, { project });
    dispatch("referential/loadTeams", project, { root: true });
    dispatch("referential/loadWorkItemTypes", project, { root: true });
  },
  selectTeam({ commit, dispatch, state }, team) {
    commit(CURRENT_BOARD_UPDATED, { team });
    dispatch(
      "referential/loadIterations",
      { teamId: team, projectId: state.current.project },
      { root: true }
    );
  },
  saveBoard({ commit }) {
    commit(BOARD_SAVED);
    commit(CURRENT_BOARD_RESET);
  },
  loadWorkItems({ commit, state, dispatch, rootState }, id) {
    const { team, project } = state.list.find((_) => _.id === id) || {};
    dispatch(
      "referential/loadIterations",
      { teamId: team, projectId: project },
      { root: true }
    ).then(() => {
      const currentIteration = rootState.referential.iterations.find(
        (_) => _.current
      );
      getWorkItems(this._vm.$devops, project, team, currentIteration.id).then(
        (wi) => {
          commit(WORK_ITEMS_LOADED, wi);
        }
      );
    });
  },
};

const mutations = {
  [CURRENT_BOARD_RESET](state) {
    state.current = {};
  },
  [CURRENT_BOARD_UPDATED](state, current) {
    state.current = {
      ...state.current,
      ...current,
    };
  },
  [BOARD_SAVED](state) {
    state.list = [
      ...state.list,
      {
        ...state.current,
        id: state.current.name.toLowerCase().replace(" ", "_"),
      },
    ].sortBy("name");
  },
  [WORK_ITEMS_LOADED](state, wi) {
    state.workItems = wi;
  },
};

export const initBoards = (savedState) => ({
  namespaced: true,
  state: { ...state, list: savedState.boards?.list || [] },
  actions,
  mutations,
});
