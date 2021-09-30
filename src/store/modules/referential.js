import {
  getProjects,
  getTeams,
  getIterations,
  getWorkItemTypes,
} from "../../services/devops";

const state = {
  projects: [],
  teams: [],
  iterations: [],
  types: [],
};

const PROJECTS_LOADED = "PROJECTS_LOADED";
const TEAMS_LOADED = "TEAMS_LOADED";
const ITERATIONS_LOADED = "ITERATIONS_LOADED";
const WORK_ITEM_TYPES_LOADED = "WORK_ITEM_TYPES_LOADED";

const actions = {
  loadProjects({ commit }) {
    getProjects(this._vm.$devops).then((projects) =>
      commit(PROJECTS_LOADED, projects)
    );
  },
  loadWorkItemTypes({ commit }, projectId) {
    getWorkItemTypes(this._vm.$devops, projectId).then((types) =>
      commit(WORK_ITEM_TYPES_LOADED, types)
    );
  },
  loadTeams({ commit }, projectId) {
    return getTeams(this._vm.$devops, projectId).then((teams) =>
      commit(TEAMS_LOADED, teams)
    );
  },
  loadIterations({ commit }, { teamId, projectId }) {
    return getIterations(
      this._vm.$devops,
      projectId,
      teamId
    ).then((iterations) => commit(ITERATIONS_LOADED, iterations));
  },
};

const getters = {
  currentIteration(state) {
    return state.iterations.find(_ => _.current);
  }
};

const mutations = {
  [PROJECTS_LOADED](state, projects) {
    state.projects = projects;
  },
  [TEAMS_LOADED](state, teams) {
    state.teams = teams;
  },
  [ITERATIONS_LOADED](state, iterations) {
    state.iterations = iterations;
  },
  [WORK_ITEM_TYPES_LOADED](state, types) {
    state.types = types;
  },
};

export const referential = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
