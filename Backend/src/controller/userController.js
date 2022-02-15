let express = require("express");
const { validationResult } = require("express-validator");
const model = require("../models/userModel");
const usuarios = require("../data/users.json");
const { use } = require("../routes/usersRoute");

const userController = {
  //ingreso de usuario
  login: (req, res) => {
    let errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      //no hay errores
      //recuperamos username y password del body
      const { username, password } = req.body;

      const user = model.findByUser(username);

      if (user.password == password) {
        req.session.user = username;
        res.json({ loginSuccesful: true, message: `Bienvenido ${username}` });
      } else {
        res.json({
          loginSuccesful: false,
          message: "Credenciales incorrectas. Vuelve a intentarlo",
        });
      }
    } else {
      res.send("Faltan datos");
    }
  },
  //crea un nuevo usuario
  register: (req, res) => {
    const { username } = req.body;

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      //no hay errores
      //valida que no exista el usuario
      if (model.findByUser(username) == null) {
        const users = model.create(req.body);
        res.json(users);
      } else {
        res.send("Usuario existente");
      }
    } else {
      res.send("faltan datos");
    }
  },
  //muestra todos los usuarios
  showUsers: (req, res) => {
    res.json(usuarios.users);
  },
  //devuelve los mensajes recibidos
  inbox: (req, res) => {
    const { username } = req.params;
    const receiverID = model.findByUser(username).id;
    const messageInbox = model.inbox(receiverID);
    res.send(messageInbox);
  },
  //devuelve los mensajes enviados
  sent: (req, res) => {
    const { username } = req.params;
    const senderID = model.findByUser(username).id;
    const messageSent = model.sent(senderID);
    res.send(messageSent);
  },
  //envia un nuevo mensaje
  message: (req, res) => {
    const { username } = req.params;
    const message = req.body.text;
    const senderID = model.findByUser(username).id;
    receiverID = req.body.receiverId;
    const msg = model.sentMessage(message, receiverID, senderID);
    if (msg) {
      res.send("Mensaje enviado");
    }
  },
  delete: (req, res) => {
    const messageId = req.params.messageId;
    const messageDeleted = model.delete(messageId);

    if (messageDeleted) {
      res.send(`Mensaje eliminado`);
    } else {
      res.send("No se puede eliminar este mensaje");
    }
  },
};

module.exports = userController;
