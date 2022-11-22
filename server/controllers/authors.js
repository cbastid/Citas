const Author = require("../models/author");

module.exports = {
  getAll: function (req, res) {
    Author.find()
      .then((author) => res.json(author))
      .catch((err) => res.json(err));
  },


  getById: function (req, res) {
    Author.findOne({ _id: req.params.id })
      .then((author) => res.json(author))
      .catch((err) => res.json(err));
  },

  new: function (req, res) {
    const author = new Author();

    author.name = req.body.name;
    author.save()
      .then((newAuthor) => res.json(newAuthor))
      .catch((err) => {
        res.status(404).json({ error: err.message })
      });

  },


  edit: async function (req, res) {
    // console.log("controller edit");

    const body = req.body;
    const id = body._id;

    Author.findOneAndUpdate({ _id: id }, { name: body.name }, function (err, data) {
      if (err) {
        res.status(404).json({ error: err.message })
      } else {
        res.json(data);
      }
    }
    );
  },

  delete: function (req, res) {
    let id = req.params.id;
    Author.deleteOne({ _id: id })
      .then((deletedAuthor) => res.json(deletedAuthor))
      .catch((err) => res.json(err));
  },

  newCita: async function (req, res) {
    const body = req.body;
    let id = req.body.id;
    let conment = req.body.comentario;
    console.log(id, conment);

    Author.findOneAndUpdate({ _id: id }, { $push: { citas: [{ comentario: conment, valor: 0 }] } }, function (err, data) {
      if (err) {
        res.status(404).json({ error: err.message })

      } else {
        console.log(data);
        res.json(data);
      }
    }
    );
  },

  updCita: async function (req, res) {
    let id = req.body.id;
    let conment = req.body.comentario;
    let citas = [];

    Author.find({_id: id}, function(err, data){
        if (err) {
            res.status(404).json({error: err.message})      
        }else{
            //capturo el array de comentarios y  elimino el cometario seleccionado en pantalla
            citas = data[0].citas;
            citas.forEach(function (item, index) {
                if (item.comentario === conment ) {
                    // console.log(item);
                    citas[index].valor = citas[index].valor + 1;
                }
            });
            
            //reemplazamos todo el array en la BD
            Author.findOneAndUpdate({_id: id}, {citas: citas }, function(err, data){
                if (err) {
                    res.status(404).json({error: err.message})      
                }else{
                    // console.log(data);
                    res.json(data);
                }
            });  
        }
    });
},

downCita: async function (req, res) {
  let id = req.body.id;
  let conment = req.body.comentario;
  let citas = [];
  Author.find({_id: id}, function(err, data){
      if (err) {
          res.status(404).json({error: err.message})      
      }else{
          //capturo el array de comentarios y  elimino el cometario seleccionado en pantalla
          citas = data[0].citas;
          citas.forEach(function (item, index) {
              if (item.comentario === conment ) {
                  // console.log(item);
                  citas[index].valor = citas[index].valor - 1;
              }
          });
          //reemplazamos todo el array en la BD
          Author.findOneAndUpdate({_id: id}, {citas: citas }, function(err, data){
              if (err) {
                  res.status(404).json({error: err.message})     
              }else{
                  // console.log(data);
                  res.json(data);
              }
          });  
      }
  });
},

deleteCita: async function (req, res) {
  let id = req.body.id;
  let conment = req.body.comentario;
  let citas = [];

  // console.log('id;',id,'conment:',conment);

  Author.find({_id: id}, function(err, data){
      if (err) {
          res.status(404).json({error: err.message})      
      }else{
          //capturo el array de comentarios y  elimino el cometario seleccionado en pantalla
          citas = data[0].citas;
          citas.forEach(function (item, index) {
              if (item.comentario === conment ) {
                  // console.log(item);
                  citas.splice(index, 1);
              }
          });
          //reemplazamos todo el array en la BD
          Author.findOneAndUpdate({_id: id}, {citas: citas }, function(err, data){
              if (err) {
                  res.status(404).json({error: err.message})     
              }else{
                  // console.log(data);
                  res.json(data);
              }
          });  
      }
  }    
  );
}



};
