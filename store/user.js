export const state = () => ({
    user: null
  });
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
    }
  };
  
  export const getters = {
    isAuthenticated(state) {
      return !!state.user;
    },
    user(state) {
      return state.user;
    }
};
  