const router2 = require("express").Router();
const userController = require("../controllers/userController");
const configController = require("../controllers/configController");
const taskController = require("../controllers/taskController");

// Matches with "/api/books"
router2.route("/find").post(userController.find);
router2.route("/getAll").get(userController.findAll);
router2.route("/createUser").post(userController.create);
router2.route("/deleteUser").post(userController.delete);
router2.route("/updateUser").post(userController.update);
router2.route("/updatePassword").post(userController.update);

router2.route("/findSystem").post(configController.find);
router2.route("/createSystem").post(configController.create);
router2.route("/updateSystem").post(configController.update);

router2.route("/saveRecord").post(taskController.create);

// Matches with "/api/books/:id"

// Este código está configurando rutas para una aplicación Express.js. Requiere el módulo express y tres archivos de controlador, userController, configController y taskController. Luego configura rutas para cada uno de estos controladores con varios métodos HTTP (POST, GET). Las rutas son para buscar usuarios, crear usuarios, eliminar usuarios, actualizar usuarios y sus contraseñas, buscar configuraciones del sistema, crear configuraciones del sistema, actualizar configuraciones del sistema y guardar registros. Finalmente exporta el objeto router2 para que pueda ser utilizado en otras partes de la aplicación.

module.exports = router2;
