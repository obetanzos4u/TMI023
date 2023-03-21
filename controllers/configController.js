const Config = require("../models/config");

// Defining methods for the bookController
module.exports = {
  find: function (req, res) {
    Config.find(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },


  // El error significa que estás haciendo una petición que el servidor entiende, pero no puede procesarla. Normalmente, esto ocurre porque hay un error semántico en alguna parte de la petición, normalmente dentro de un archivo PHP o JavaScript.

  create: function (req, res) {
    Config.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log(req.body.info);
    Config.findOneAndUpdate({ _id: req.body.id }, req.body.info)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
};

// Este código es un módulo que exporta funciones para interactuar con un modelo de configuración. Las funciones son buscar, crear y actualizar. La función de búsqueda toma un objeto de solicitud y respuesta y encuentra el objeto de configuración en la base de datos según el cuerpo de la solicitud. La función de creación también toma un objeto de solicitud y respuesta y crea un nuevo objeto de configuración basado en el cuerpo de la solicitud. La función de actualización toma un objeto de solicitud y respuesta, encuentra un objeto de configuración basado en su id del cuerpo de la solicitud, luego lo actualiza con nueva información también del cuerpo de la solicitud.