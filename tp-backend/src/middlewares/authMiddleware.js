function authMiddleware(req, res, next) {
  if (!req.session.isAuth) {
    res.send("debes iniciar sesion");
  }
  next();
}

module.exports = authMiddleware;
