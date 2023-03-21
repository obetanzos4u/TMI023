var fs = require("fs");
// Este código se usa para importar el módulo "fs" en Node.js. El módulo fs proporciona una API para interactuar con el sistema de archivos de una manera estrechamente modelada en torno a las funciones POSIX estándar.
var express = require("express");
const mongoose = require("mongoose");
const routes2 = require("./routes/routes2");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require("./routes/routes")(app);
app.use(routes2);

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb+srv://authuser01db:7bOlFemD0emWxwNr@cluster0.ksd5dtz.mongodb.net/?retryWrites=true&w=majority',
);

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  console.log(process.env.NODE_ENV);
});

// Este código configura un servidor para escuchar en el puerto especificado por la variable PORT. Cuando el servidor se está ejecutando, registrará un mensaje en la consola que indica que está escuchando en el puerto especificado, además de registrar el valor de la variable de entorno NODE_ENV.