import cookie from 'cookie';

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie || '');
  
      const hasUserInfor = parsed.user_infor;
      const hasToken = parsed.token_user;
      console.log("hasUserInfor", hasUserInfor);
      console.log("hasToken", hasToken);
      if (hasUserInfor && hasToken) {
        try {
          const user = JSON.parse(decodeURIComponent(hasUserInfor));
          commit('user/setUser', user);
        } catch (e) {
          console.error('Lỗi parse cookie user_infor:', e);
        }
      } else {
        console.log("Không có thông tin người dùng trong cookie");
        // clear user state if no cookie
        commit('user/setUser', null);
      }
     
    }
  }
};