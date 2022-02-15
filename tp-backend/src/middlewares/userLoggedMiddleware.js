const db = require("../database/models");

module.exports = async function userLoggedMiddleware(req, res, next) {
  try {
    res.locals.isLogged = false;

    let usernameCookie = req.cookies.username;

    let userFromCookie;

    if (usernameCookie) {
      userFromCookie = await db.Users.findOne({
        where: {
          username: usernameCookie,
        },
      });
    }

    if (userFromCookie) {
      req.session.isAuth = userFromCookie;
    }

    if (req.session.isAuth) {
      res.locals.isLogged = true;
      res.locals.isAuth = req.session.isAuth;
    }

    next();
  } catch (e) {
    next(e);
  }
};
