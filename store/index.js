import cookie from 'cookie';

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie || '');

      if (parsed.user_infor) {
        try {
          const user = JSON.parse(decodeURIComponent(parsed.user_infor));
          console.log("user", user);
          commit('user/setUser', user);
        } catch (e) {
          console.error('Lỗi parse cookie user_infor:', e);
        }
      }
    }
  }
};
