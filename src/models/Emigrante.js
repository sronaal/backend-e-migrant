const mongoose = require("mongoose")

const bcrypy = require("bcrypt")
const emigranteSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    tipoDocumento:{
        type: String,
        required: true
    },
    Cedula:{
        type: String,
        required: true
    },
    PaisOrigen:{
        type: String,
        required: true
    },
    FechaNacimiento:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    contraseña:{
        type: String,
        required: true
    },
    Telefono:{
        type: String,
        required: true
        
    },
    Direccion:{
        type: String,
        required: true
    },
    Ciudad:{
        type: String,
        required: true
    },
    situacionLaboral:{
        type: String,
        required: true
    },
});

emigranteSchema.methods.comparePassword = function(password){
    return bcrypy.compareSync(password,this.hash_password);
};

module.exports = mongoose.model('Emigrante',emigranteSchema)