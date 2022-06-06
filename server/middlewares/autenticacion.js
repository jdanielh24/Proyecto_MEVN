const verificarAuth = (req, res, next) =>{
    const token = req.get('token');

    jwt.verify(token, 'secret', (err,decoded) => {
        if(err){
            return res.status(401).json({
                mensaje: 'Usuario no valido'
            })
        }

        req.usuario = decoded.data;

        next();
    })
}

module.exports = { verificarAuth }