import axios from 'axios';
const url = '/valoracion';

export default class API_VALORACION {
    // Obtener valoraciones por id
    static async getValoracionByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // Insertar una valoracion
    static async addValoracion(valoracion) {
        const res = await axios.post(`${url}/createVal`, valoracion);
        return res.data;
    }
        
}