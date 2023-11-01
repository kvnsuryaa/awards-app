import * as API from "../../api/awards";

const state = {
  nextPageLoaded: false,
  poin: {
    min_poin: 0,
    max_poin: 0,
  },
  awards: [],
};
const mutations = {
  CLEAR_AWARDS: (state) => {
    state.awards = [];
  },
  SET_AWARDS: (state, payload) => {
    state.awards = [...state.awards, ...payload.awards];
    state.poin = payload.poin;
  },
  SET_NEXT_PAGE_LOAD: (state, status) => {
    state.nextPageLoaded = status;
  },
};
const actions = {
  GET_AWARDS: async ({ commit }, payload) => {
    const resp = await API.GET_AWARDS(payload);
    const awards = resp.data.data.awards;
    if (awards && awards.length > 0) {
      commit("SET_NEXT_PAGE_LOAD", false);
    }
    commit("SET_AWARDS", resp.data.data);
  },
};
const getters = {
  awards: (state) => state.awards,
  poin: (state) => state.poin,
  nextPageLoaded: (state) => state.nextPageLoaded,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
