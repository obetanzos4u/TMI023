const User = require("../models/user");

// Defining methods for the bookController
module.exports = {
  find: function (req, res) {
    User.find(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    User.find()
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(req.body);
    console.log(req.body);
    User.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log(req.body.info);
    User.findOneAndUpdate({ _id: req.body.id }, req.body.info)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
  delete: function (req, res) {
    console.log(req.body);
    User.deleteOne({ _id: req.body._id })
      .then((dbUser) => {
        res.status(202).json({ message: "Success" });
      })
      .catch((err) => res.status(422).json(err));
  },
};

// Este código es un módulo que exporta funciones relacionadas con el modelo Usuario. Las funciones incluyen buscar, buscar todo, crear, actualizar y eliminar. Estas funciones permiten a los usuarios consultar la base de datos para un usuario, crear un nuevo usuario, actualizar la información de un usuario existente y eliminar un usuario de la base de datos.