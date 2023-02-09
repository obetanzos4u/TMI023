var fs = require("fs");
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
/*
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://pepe30:Sonata00@cluster0.er4a4.mongodb.net/task_manager_users?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  }
);*/

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  console.log(process.env.NODE_ENV);
});
