import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    roles: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
      commit('setRoles', user.roles || []);
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setRoles', []);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userRoles: (state) => state.roles,
  },
});

export default store;
