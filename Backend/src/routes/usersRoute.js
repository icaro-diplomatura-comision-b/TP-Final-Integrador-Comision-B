const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//validaciones para login y register
const { body } = require("express-validator");
let validateLogin = [
  body("username").notEmpty().withMessage("Ingresa nombre de usuario"),
  body("password").notEmpty().withMessage("Debes ingresar una contraseña"),
];
let validateRegister = [
  body("lastName").notEmpty().withMessage("Ingresa apellido"),
  body("firstName").notEmpty().withMessage("Ingresa nombre"),
  body("username").notEmpty().withMessage("Ingresa nombre de usuario"),
  body("password").notEmpty().withMessage("Debes ingresar una contraseña"),

  //Validacion de confirmacion de password. No requerido por TP
  /*body('passConfirm')
  .notEmpty().withMessage('Confirme su contraseña')
  //validamos que ambas contraseñas sean iguales
  .custom(async (passConfirm,{req})=>{
    const password = req.body.password;
    //si las contraseñas no son iguales
    if(password !==passConfirm){
      throw new Error('Las contraseñas deben ser iguales')
    }
  }
    )*/
];

let validateMessage = [
  body("destinatary").notEmpty().withMessage("Ingresa destinatario"),
  body("message")
    .notEmpty()
    .withMessage("Ingrese el mensaje")
    .isLength({ max: 144 }),
];

// Routers GET
router.get("/users", userController.showUsers);
router.get("/users/:username/messages/inbox", userController.inbox);
router.get("/users/:username/messages/sent", userController.sent);

// Routers POST
router.post("/users", [validateRegister], userController.register);
router.post("/login", [validateLogin], userController.login);
router.post(
  "/users/:username/messages",
  [validateMessage],
  userController.message
);

//router DELETE
router.delete(`/messages/:messageId`, userController.delete);

module.exports = router;
