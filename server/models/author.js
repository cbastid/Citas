const mongoose = require("mongoose");

// Creacion del esquema
const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'name required'],
    minlength:[3,"must have more than 3 characters"],
    maxlength:[100,"must have minous than 100 characters"] },
  citas: [
         {comentario: {type:String},
          valor: {type: Number}
          }
          ]
}, { timestamps: true })


// crea un objeto que contenga métodos para que Mongoose interactúe con MongoDB
const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
  