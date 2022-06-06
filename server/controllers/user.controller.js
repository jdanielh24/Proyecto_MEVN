const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

// Hash contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = class UserController {
    // crer un post
    static async registrarUsuario(req, res) {
        const user = {
            nombre: req.body.nombre,
            email: req.body.email
        }

        user.password = bcrypt.hashSync(req.body.password, saltRounds);

        try {
            const result = await User.create(user);
            res.status(200).json(result)
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async login(req, res, next) {
		const body = req.body;

        try {
            // Evaluar email
			const usuarioDB = await User.findOne({email: body.email});
            
            if (!usuarioDB){
                return res.status(400).json({
                    mensaje: 'Email no encontrado'
                })
            }

            // Evaluar password
            if(!bcrypt.compareSync(body.password, usuarioDB.password)){
                return res.status(400).json({
                    mensaje: 'Contraseña incorrecta'
                })
            }

            //Generar token
            const token = jwt.sign({
                data: usuarioDB
            }, 'secret', { expiresIn: 60 * 60 * 24 });

			res.json({
                usuarioDB, 
                token
            })

            

		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	}

    /*async editarUsuario(req, res, next) {
		try {
			const result = await User.findByIdAndUpdate(req.auth, req.body)
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}*/

}