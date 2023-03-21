const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configSchema = new Schema({
  sapUrl: { type: String, required: true, unique: true },
  sapFunctionalUser: { type: String, required: true, unique: true },
  sapFunctionalPass: { type: String, required: true, unique: true },
  saptechnicallUser: { type: String, required: true, unique: true },
  saptechnicallPass: { type: String, required: true, unique: true },
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;

// Este código está configurando un esquema y modelo Mongoose para un objeto Config. El objeto Config tendrá cinco propiedades: sapUrl, sapFunctionalUser, sapFunctionalPass, saptechnicallUser y saptechnicallPass. Todas estas propiedades son cadenas y son obligatorias. Además, los valores de cada propiedad deben ser únicos. Finalmente, el modelo de configuración se exporta para que pueda usarse en otras partes de la aplicación.