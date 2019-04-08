import storageService from '@/services/storageService';
import authService from '@/services/authService';

const USER_TOKEN = 'token';

const AUTH_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

const TOKEN = storageService.get(USER_TOKEN) || '';

const state = {
  token: TOKEN,
  status: null
};

const getters = {
  token: state => state.token,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const mutations = {
  setLoading: state => {
    state.status = AUTH_STATUS.LOADING;
  },
  setToken: (state, token) => {
    state.status = AUTH_STATUS.SUCCESS;
    state.token = token;
  },
  setStatusError: state => {
    state.status = AUTH_STATUS.ERROR;
  },
  logout: state => {
    state.token = '';
    state.status = null;
  }
};

const actions = {
  doLogin: async ({ commit }, user) => {
    commit('setLoading');

    try {
      const resp = await authService.login(user);
      commit('setToken', resp.token);
      storageService.save(USER_TOKEN, resp.token);
    } catch (err) {
      commit('setStatusError', err);
      storageService.remove(USER_TOKEN); // if the request fails, remove any possible user token if possible
      return Promise.reject(err);
    }
  },
  doLogout: ({ commit, dispatch }) => {
    commit('logout');
    storageService.remove(USER_TOKEN); // clear your user's token from localstorage
    dispatch('user/logout', null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
