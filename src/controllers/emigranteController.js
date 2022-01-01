const Emigrante = require("../models/Emigrante")
const bcrypy = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.actualizarInformacion = async (req,res) =>{

    try {
        const {
            nombre,apellidos,tipoDocumento,Cedula,PaisOrigen,FechaNacimiento,correo,Telefono,Direccion,
            Ciudad,situacionLaboral} = req.body;

        let emigrante = await Emigrante.findById(req.params.id);

        if(!emigrante){
            res.status(404).json({msg: 'No existe el emigrante'});
        }

        emigrante.nombre = nombre,
        emigrante.apellidos = apellidos,
        emigrante.tipoDocumento = tipoDocumento,
        emigrante.Cedula = Cedula,
        emigrante.PaisOrigen = PaisOrigen,
        emigrante.FechaNacimiento = FechaNacimiento,
        emigrante.correo = correo,
        emigrante.Telefono = Telefono,
        emigrante.Direccion = Direccion,
        emigrante.Ciudad = Ciudad,
        emigrante.situacionLaboral = situacionLaboral

        emigrante = await Emigrante.findByIdAndUpdate({_id: req.params.id},emigrante,{new : true})
        res.status(201).json({emigrante})
        
    } catch (error) {
        
        res.status(500).send("Hubo un error", error);
    }

 
}
exports.crearEmigrante = async (req,res) =>{

    try {

        let emigrante;
        const usuario =   await Emigrante.findOne({correo: req.body.correo})
        
        if(usuario) return res.status(400).send("Usuario registrado")
        emigrante = new Emigrante(req.body)
        
        //let passHash = bcrypy.hashSync(req.body.contraseña,8)
        //emigrante.contraseña = passHash
        await emigrante.save();
        const token = jwt.sign({_id: emigrante._id},'secretKey')
        res.status(201).json({token})

    } catch (error) {
        console.log(error)
        res.status(500).send("Hubo un error");
    }
}

exports.mostrarEmigrantes = async (req,res) =>{
    Emigrante
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send("Hubo un error"))
}

exports.mostrarEmigrante =   (req,res) =>{

    const {id} = req.params;

    Emigrante
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send("Hubo un error"))
}

exports.loginEmigrante = async (req,res) =>{

    try {
        
        const {correo, contraseña} = req.body;
        
        const usuario = await Emigrante.findOne({correo})
        if(!usuario) return res.status(401).send("Correo Invalido")
        if(usuario.contraseña !== contraseña) return res.status(401).send("Contraseña Invalida")
        let iduser = usuario._id
        const token = jwt.sign({_id:usuario._id},'secretKey')
        return res.status(200).json({token,iduser})

    } catch (error) {
        res.status(500).json({error})
    }
}

exports.validarCorreo = async (req,res) =>{

    try {

        const usuario =   await Emigrante.findOne({correo: req.body.correo})
        console.log(usuario)
        console.log(req.body.correo)
       if(!usuario) return res.status(401).send("El correo no esta registrado")
        
        let idUser = usuario._id
        const token = jwt.sign({_id:idUser},'secret')
        return res.status(200).json({token,idUser})
        
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.changePassword = async (req,res) =>{

    try {
        
        let usuario = {}
        usuario.contraseña = req.body.contraseña
        console.log(usuario.contraseña)
        console.log(req.body.id)
        usuario = await Emigrante.findByIdAndUpdate(req.body.id ,usuario)
        res.status(201)
    

    } catch (error) {
        console.log(error)
        res.status(500).send(error)    
    }
}

exports.buscarEmigrantes = async (req,res) =>{

    console.log(req.body.Cedula)
    usuario = await  Emigrante.findOne({Cedula: req.body.Cedula})

    if(!usuario) return res.status(401).send("No existe")  

    res.status(200).json(usuario)
}