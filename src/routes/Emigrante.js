const router = require("express").Router()
const controllerEmigrante = require("../controllers/emigranteController")
const jwt = require("jsonwebtoken")

router.post('/emigrante/register',controllerEmigrante.crearEmigrante)
router.post('/emigrante/login',controllerEmigrante.loginEmigrante)
router.get('/emigrante/emigrante',controllerEmigrante.mostrarEmigrantes)
router.get('/emigrantes/emigrante/:id',verifyToken,controllerEmigrante.mostrarEmigrante)
router.put('/emigrante/change/:id',verifyToken,controllerEmigrante.actualizarInformacion)
router.post('/emigrante/valid-account/',controllerEmigrante.validarCorreo)
router.put('/emigrante/change-password',verifyTokenPass,controllerEmigrante.changePassword)
router.post('/emigrante/search/', controllerEmigrante.buscarEmigrantes)


function verifyToken(req,res, next){

    try {
        if(!req.headers.authorization) return res.status(401).send("No tienes acceso");

        const token = req.headers.authorization
        if(token === undefined) return res.status(401).send("No tienes acceso")

        const payload = jwt.verify(token,'secretKey')
        req.userId = payload._id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Token No Valido"})
    }
}

function verifyTokenPass(req,res, next){

    try {
        if(!req.headers.authorization) return res.status(401).send("No tienes acceso");

        const token = req.headers.authorization
        if(token === undefined) return res.status(401).send("No tienes acceso")

        const payload = jwt.verify(token,'secret')
        req.userId = payload._id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Token No Valido"})
    }
}



module.exports = router
