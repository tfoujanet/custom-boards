const state = {
  list: [],
  current: {},
  selected: '',
  selectedMembers: []
};

const CURRENT_BOARD_UPDATED = "CURRENT_BOARD_UPDATED";
const CURRENT_BOARD_RESET = "CURRENT_BOARD_RESET";
const BOARD_SAVED = "BOARD_SAVED";
const WORK_ITEMS_LOADED = "WORK_ITEMS_LOADED";
const BOARD_SELECTED = "BOARD_SELECTED";
const MEMBERS_SELECTED = "MEMBERS_SELECTED";

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
  selectBoard({ commit, state, dispatch }, id) {
    commit(BOARD_SELECTED, id);
    const { team, project } = state.list.find((_) => _.id === id) || {};
    dispatch(
      "referential/loadIterations",
      { teamId: team, projectId: project },
      { root: true }
    ).then(() => dispatch("workItems/loadWorkItems", { project, team }, { root: true }));
  },
  filterMembers({ commit }, members) {
    commit(MEMBERS_SELECTED, members);
  }
};

const getters = {
  // eslint-disable-next-line
  selectedBoard(state, getters, rootState, rootGetters) {
    const selected = state.list.find(_ => _.id === state.selected);
    const workItems = (rootState.workItems.list || []).filter(_ => selected.types.includes(_.type));
    const filteredWorkItems = state.selectedMembers.length
      ? workItems.filter(_ => state.selectedMembers.includes(_.assignedTo))
      : workItems;
    return selected ?
    {
      ...selected,
      columns: (selected.columns || []).map(c => ({
        label: c.label,
        workItems: filteredWorkItems.filter(wi => c.columns[wi.type].includes(wi.state))
      }))
    }
    : { columns: [] };
  }
}

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
  [BOARD_SELECTED](state, id) {
    state.selected = id;
  },
  [MEMBERS_SELECTED](state, members) {
    state.selectedMembers = members;
  }
};

export const initBoards = (savedState) => ({
  namespaced: true,
  state: { ...state, list: savedState || [] },
  getters,
  actions,
  mutations,
});
