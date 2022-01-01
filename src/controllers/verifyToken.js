function verifyToken(req,res, next){

    try {
        if(!req.headers.authorization) return res.status(401).send("No tienes acceso");

        const token = req.headers.authorization.split(' ')[1]
        if(token === undefined) return res.status(401).send("No tienes acceso")

        const payload = jwt.verify(token,'secretKey')
        req.userId = payload._id;
        next();
    } catch (error) {
        return res.status(400).json({error: "Token No Valido"})
    }
}