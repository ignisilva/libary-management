const { COOKIE } = require('../../constants');
const { authService } = require('../../services');

// Controller 역할
// status code 및 res return

const login = async (ctx) => {
  try {
    const {
      accessToken,
      refreshTokenCookie: cookie,
    } = await authService.login(ctx.request.body);

    ctx.cookies.set(cookie.name, cookie.token, cookie.options);

    ctx.body = { accessToken };
  } catch (err) {
    ctx.throw(err);
  }
};

const logout = async (ctx) => {
  const { id: userId } = ctx.user;

  try {
    await authService.logout(userId);

    ctx.body = '로그아웃 완료';
  } catch (err) {
    ctx.throw(err);
  }
};

const refreshAccessToken = async (ctx) => {
  try {
    const {
      accessToken,
    } = await authService.refreshAccessToken(ctx.cookies.get(COOKIE.REFRESH_TOKEN));

    ctx.body = { accessToken };
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  login,
  logout,
  refreshAccessToken,
};
