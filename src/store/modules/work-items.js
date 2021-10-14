import { getWorkItems, getIterationWorkItems } from "../../services/devops";

const state = {
  list: [],
  filteredMembers: [],
};

const WORK_ITEMS_LOADED = "WORK_ITEMS_LOADED";
const MEMBERS_FILTERED = "MEMBERS_FILTERED";

const actions = {
  loadWorkItems({ commit, rootGetters }, { iteration, project, team }) {
    const { id } = iteration || rootGetters["referential/currentIteration"];
    getIterationWorkItems(this._vm.$devops, project, team, id).then((ids) => {
      getWorkItems(this._vm.$devops, ids).then((wi) =>
        commit(WORK_ITEMS_LOADED, wi)
      );
    });
  },
  filterMembers({ commit }, members) {
    commit(MEMBERS_FILTERED, members);
  },
};

const getters = {
  members(state) {
    return state.list.reduce((acc, current) => {
      return acc.includes(current.assignedTo)
        ? acc
        : [...acc, current.assignedTo];
    }, []);
  },
  hasUnassigned(state) {
    return state.list.some((_) => !_.assignedTo);
  },
  filteredWorkItem(state) {
    return state.filteredMembers.length
      ? state.list.filter((_) => state.filteredMembers.includes(_.assignedTo))
      : state.list;
  },
};

const mutations = {
  [WORK_ITEMS_LOADED](state, wi) {
    state.list = wi;
  },
  [MEMBERS_FILTERED](state, members) {
    state.filteredMembers = members;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
