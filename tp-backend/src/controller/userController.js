const db = require(`../database/models`);
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

userController = {
  list: async (req, res, next) => {
    try {
      await db.Users.findAll().then((users) => res.send(users));
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res) => {
    try {

      let errors = validationResult(req);

      if (errors.isEmpty()) {
        await db.Users.create({
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: bcrypt.hashSync(req.body.password, 10),
          country: req.body.country,
          city: req.body.city,
        });
        res.send("Registrado con éxito");
      } else {
        res.send(errors.mapped());
        console.log(errors);
      }
    } catch (e) {
      console.log(e);
    }
  },

  login: async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        const { username, password } = req.body;
        const user = await db.Users.findOne({ where: { username: username } });
        if (!user) {
          res.json("Error de autenticacion");
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.json("Contraseña incorrecta");
          } else {
            res.cookie("username", req.body.username, { maxAge: 1000 * 600 });
            req.session.isAuth = user;
            res.send(
              `Bienvenido ${
                req.session.isAuth.firstName + " " + req.session.isAuth.lastName
              }!!`
            );
          }
        }
      } else {
        res.send(errors.mapped());
      }
    } catch (e) {
      next(e);
    }
  },

  sendMessage: async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (
        errors.isEmpty() &&
        req.params.username === req.session.isAuth.username
      ) {
        if (req.body.receiverId !== req.session.isAuth.id) {
          await db.Messages.create({
            receiverId: req.body.receiverId,
            senderId: req.session.isAuth.id,
            text: req.body.text,
          });
          res.send(`Mensaje enviado con éxito`);
        } else {
          res.send("No puedes enviarte un mensaje a ti mismo");
        }
      } else {
        res.send(errors.mapped());
      }
    } catch (e) {
      next(e);
    }
  },

  logout: (req, res) => {
    res.clearCookie("username");
    req.session.destroy();
    res.send("Se cerró la sesión");
  },
};

module.exports = userController;
