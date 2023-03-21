const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: { type: String },
  sapNumber: { type: Number },
  task: { type: String },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;


// Este código está configurando un esquema Mongoose para un modelo de 'Tarea'. Está definiendo los campos que se almacenarán en la base de datos, como usuario, sapNumber y task. También está exportando el modelo de tareas para que pueda usarse en otros archivos.