const Valoracion = require('../models/valoracion.model');

module.exports = class ValoracionController {
    // Obtener todos las valoraciones
    static async getAllValoraciones(req, res) {
        try {
            const valoraciones = await Valoracion.find();
            res.status(200).json(valoraciones);
        } catch (err) {
            res.send(404).json({ message: err.message });
        }
    }

    // crer una valoracion
    static async createValoracion(req, res) {
        const valoracion = req.body;
        try {
            await Valoracion.create(valoracion);
            res.status(201).json({ message: 'Valoracion created succesfully'});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

}