import axios from 'axios';
const url = '/user';

export default class API_USER {
    // Obtener un post por ID
    static async getUserByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    static async login(email, password){
        const res = await axios.post(`${url}/login`, {email, password})
        return res.data;         
    }

    static async registrar(user){
        const res = await axios.post(`${url}/registrar-usuario`, user)
        return res.data;
    }

    // Insertar un usuario
    static async addUser(user) {
        const res = await axios.post(url, user);
        return res.data;
    }

    // Insertar un usuario
    static async getUserName(id) {
        const res = await axios.get(url, id);
        return res.data;
    }
        
}

