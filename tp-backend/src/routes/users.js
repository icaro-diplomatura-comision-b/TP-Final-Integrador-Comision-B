var express = require("express");
const userController = require("../controller/userController");
const messagesController = require("../controller/messagesController");
var router = express.Router();
let { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware.js");

// VALIDACIONES
let validations = [
  body("username").notEmpty().withMessage("Debes ingresar una username"),
  body("firstName").notEmpty().withMessage("Debes ingresar tu nombre"),
  body("lastName").notEmpty().withMessage("Debes ingresar tu apellid"),
  body("password").notEmpty().withMessage("Debes ingresar una contraseña"),
  body("country").notEmpty().withMessage("Debes ingresar tu pais"),
  body("city").notEmpty().withMessage("Debes ingresar tu ciudad"),
];

let validationsLogin = [
  body("username").notEmpty().withMessage("Debes ingresar un username"),
  body("password").notEmpty().withMessage("Debes ingresar una contraseña"),
];

let validationsMessage = [
  body("receiverId").notEmpty().withMessage("Debes ingresar el id del destinatario"),
  body("text").notEmpty().withMessage("Debes ingresar un mensaje"),
];

/********** GET  *******************************************************************************************************************************/

// lista
router.get("/users",
 [authMiddleware], userController.list);

// recibidos
router.get("/users/:username/messages/inbox",
  [authMiddleware],
  messagesController.inbox
);

// enviados
router.get("/users/:username/messages/sent",
  [authMiddleware],
  messagesController.sent
);

/********** POST  *******************************************************************************************************************************/

// registro
router.post("/users",
 [guestMiddleware], validations, userController.register);

// logueado / autenticacion
router.post("/login",
  [guestMiddleware],
  validationsLogin,
  userController.login
);

// enviar mensaje
router.post("/users/:username/messages",
  [authMiddleware],
  validationsMessage,
  userController.sendMessage
);

// deslogearse
router.post("/users/logout",
 [authMiddleware], userController.logout);

/********** DELETE  *******************************************************************************************************************************/

// borrar mensaje
router.post("/messages/:messageId",
  [authMiddleware],
  messagesController.deleteMessage
);

module.exports = router;
