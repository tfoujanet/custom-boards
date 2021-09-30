import { getWorkItems, getIterationWorkItems } from "../../services/devops";

const state = {
    list: []
};

const WORK_ITEMS_LOADED = "WORK_ITEMS_LOADED";

const actions = {
    loadWorkItems({ commit, rootGetters }, { iteration, project, team }) {
        const { id } = iteration || rootGetters["referential/currentIteration"];
        getIterationWorkItems(this._vm.$devops, project, team, id).then(
            (ids) => {
                getWorkItems(this._vm.$devops, ids).then(wi => commit(WORK_ITEMS_LOADED, wi));
            }
        );
    }
};

const getters = {
    members(state) {
        return state.list.reduce((acc, current) => {
            return !current.assignedTo || acc.includes(current.assignedTo)
                ? acc
                : [...acc, current.assignedTo];
        }, []);
    }
};

const mutations = {
    [WORK_ITEMS_LOADED](state, wi) {
        state.list = wi;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};