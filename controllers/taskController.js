const Task = require("../models/task");

// Defining methods for the bookController
module.exports = {
  findAll: function (req, res) {
    Task.find()
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    Task.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },
};

// Este código está exportando dos métodos para el controlador de tareas. El primer método, findAll, se usa para encontrar todas las tareas en la base de datos y devolverlas como una respuesta JSON. El segundo método, create, se usa para crear una nueva tarea en la base de datos y devolverla como una respuesta JSON.