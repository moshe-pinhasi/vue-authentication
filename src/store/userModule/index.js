import userService from '../../services/userService';

const USER_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

const state = {
  user: null,
  status: ''
};

const getters = {
  user: state => state.user
};

const mutations = {
  setLoading: state => {
    state.status = USER_STATUS.LOADING;
  },
  setUser: (state, user) => {
    state.status = USER_STATUS.SUCCESS;
    state.user = user;
  },
  setError: state => {
    state.status = USER_STATUS.ERROR;
    state.user = null;
  }
};

const actions = {
  fetchUser: async ({ commit, dispatch }) => {
    commit('setLoading');

    try {
      const resp = await userService.getUser();
      commit('setUser', resp.user);
    } catch (err) {
      commit('setError');
      dispatch('auth/logout', null, { root: true }); // if resp is unauthorized, logout, to
      return Promise.reject(err);
    }
  },
  logout: ({ commit }) => {
    commit('setUser', null);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
