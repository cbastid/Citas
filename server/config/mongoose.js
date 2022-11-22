const mongoose = require("mongoose");
// Conectarse a la BD con Mongoose
mongoose.connect("mongodb://localhost/authorDB", { useNewUrlParser: true });

module.exports = mongoose;