import { isBoardValid } from "../../services/board-validation";

const BOARD_UPDATED = "BOARD_UPDATED";

const state = {
  organization: "",
  token: "",
  project: "",
  team: "",
  types: [],
  columns: [],
  colors: {}
};

const actions = {
  update({ commit, state }, board) {
    const futureState = { ...state, ...board };
    commit(BOARD_UPDATED, futureState);
  },
  updateColumn({ commit, state }, { oldLabel, label, statuses }) {
    const columnIndex = state.columns.findIndex((_) => _.label === oldLabel);
    if (columnIndex < 0) {
      return;
    }

    const columns = [...state.columns];
    columns[columnIndex] = { ...columns[columnIndex], label, statuses };
    commit(BOARD_UPDATED, { columns });
  },
  importBoard({ commit, dispatch }, { token, content }) {
    const serialied = JSON.parse(content || "{}");
    const newBoard = { token, ...serialied };

    if (isBoardValid(newBoard)) {
      commit(BOARD_UPDATED, newBoard);
      dispatch("auth/connect", undefined, { root: true });
      return Promise.resolve(true);
    }

    return Promise.reject("");
  },
};

const getters = {
  workItemStatuses(state, getters, rootState) {
    return (rootState.referential.types || []).reduce((acc, curr) => {
      if (!state.types.includes(curr.name)) {
        return acc;
      }

      return [
        ...acc,
        ...curr.states.filter((s) => !acc.includes(s.name)).map((_) => _.name),
      ];
    }, []);
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
    getters,
    actions,
    mutations,
  };
}
