const fs = require("fs");
const path = require("path");
const { all } = require("../routes/usersRoute");

const userModel = {
  filename:
    //se guarda en un metodo la ruta de usuario
    path.resolve(__dirname, "../data", "users.json"),

  //pedimos que lea el archivo users.json
  getData: (req, res) => {
    return fs.readFileSync(userModel.filename, "utf-8");
  },
  //buscamos todos los usuarios
  findAll: (req, res) => {
    const allUsers = userModel.getData();
    const users = JSON.parse(allUsers);
    return users;
  },

  //buscamos un usuario por id
  findByPk: (id) => {
    const readUsers = userModel.findAll;
    const findElement = readUsers.find((element) => element.id == id);
    return findElement;
  },

  //retorna busqueda de usuario por nombre de usuario como parametro
  findByUser: (user) => {
    const allUsers = userModel.findAll();
    const userFound = allUsers.users.find(
      (element) => element.username === user
    );
    return userFound;
  },
  //retorna mensajes recividos por un id de usuario como parametro
  inbox: (receiverId) => {
    const allUsers = userModel.findAll();
    console.log(allUsers.messages);
    const messageInbox = allUsers.messages.filter(
      (element) => element.receiverId === receiverId
    );
    console.log(messageInbox);
    return messageInbox;
  },
  //retorna los mensajes enviados por un id de usuario como parametro
  sent: (senderId) => {
    const allUsers = userModel.findAll();
    const messageSent = allUsers.messages.filter(
      (element) => element.senderId === senderId
    );
    return messageSent;
  },
  //metodo para crear una nueva id para un nuevo usuario
  generateIdUsers: (req, res) => {
    const allUsers = userModel.findAll();
    const lastUser = allUsers.users.pop();

    if (lastUser) {
      return (parseInt(lastUser.id) + 1).toString();
    }
    // si la tabla esta vacia
    return (1).toString();
  },
  //metodo para crear id de mensajes
  generateIdMessage: (req, res) => {
    const allMessages = userModel.findAll();
    const lastMsg = allMessages.messages.pop();

    if (lastMsg) {
      return (parseInt(lastMsg.id) + 1).toString();
    }
    // si la tabla esta vacia
    return (1).toString();
  },
  // creamos un usuario nuevo y lo guardamos en el archivo usuarios
  create: (userData) => {
    const allUsers = userModel.findAll();

    const newUser = {
      id: userModel.generateIdUsers(),
      username: userData.username,
      lastName: userData.lastName,
      firstName: userData.firstName,
      password: userData.password,
      country: userData.country,
      city: userData.city,
      notDeletable: false,
    };
    allUsers.users.push(newUser);
    fs.writeFileSync(userModel.filename, JSON.stringify(allUsers, null, " "));
    return allUsers;
  },
  //guardamos el mensaje en
  sentMessage: (message, receiverId, senderId) => {
    const allUsers = userModel.findAll();
    const newMessage = {
      id: userModel.generateIdMessage(),
      senderId: senderId,
      receiverId: receiverId,
      text: message,
      notDeletable: false,
    };
    allUsers.messages.push(newMessage);
    fs.writeFileSync(userModel.filename, JSON.stringify(allUsers, null, " "));
    return allUsers;
  },
  //borramos un registro

  delete: (msgId) => {
    const allUsers = userModel.findAll();
    if (
      allUsers.messages.notDeletable == false &&
      allUsers.messages.id == msgId
    ) {
      const finalMessages = allUsers.messages.filter(
        (message) => message.id != msgId
      );
      allUsers.messages = finalMessages;

      fs.writeFileSync(userModel.filename, JSON.stringify(allUsers, null, " "));

      return true;
    } else {
      return false;
    }
  },
};
//exportamos el modelo para usar en otro modulo
module.exports = userModel;
