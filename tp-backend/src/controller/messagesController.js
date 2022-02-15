const db = require("../database/models");

messagesController = {
  sent: async (req, res, next) => {
    try {
      if (req.params.username === req.session.isAuth.username) {
        let messages = await db.Messages.findAll({
          where: { senderId: req.session.isAuth.id },
        })
          .then((messages) => res.json(messages))
          .catch((e) => {
            res.send(e);
          });

        if (!messages) {
          res.send("inbox vacío");
        }
      } else {
        res.send("Debes iniciar sesión para acceder a esta sección");
      }
    } catch (e) {
      next(e);
    }
  },

  inbox: async (req, res, next) => {
    try {
      if (req.params.username === req.session.isAuth.username) {
        await db.Messages.findAll({
          where: { receiverId: req.session.isAuth.id },
        })
          .then((messages) => res.json(messages))
          .catch((e) => {
            res.send(e);
          });
      } else {
        res.send("debes iniciar sesion para acceder a esta seccion");
      }
    } catch (e) {
      next(e);
    }
  },

  deleteMessage: async (req, res, next) => {
    try {
      let message = await db.Messages.findOne({
        where: { id: req.params.messageId },
      });
      if (message) {
        await db.Messages.destroy({ where: { id: req.params.messageId } });
        res.send("Mensaje borrado");
      } else {
        res.send("El mensaje ya ha sido borrado o no existe");
      }
    } catch (e) {
      next(e);
    }
  },
};

module.exports = messagesController;
