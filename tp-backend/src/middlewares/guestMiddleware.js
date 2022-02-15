function guestMiddleware(req, res, next) {
  try {
    if (!req.session.isAuth) {
      next();
    } else {
      res.send("es una seccion solo para invitados");
    }
  } catch (e) {
    next(e);
  }
}

module.exports = guestMiddleware;
