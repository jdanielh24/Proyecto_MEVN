import axios from 'axios';
const url = '/user';

export default class API {
    // Obtener un post por ID
    // static async getUserByID(id) {
    //     const res = await axios.get(`${url}/${id}`);
    //     return res.data;
    // }

    // Insertar un post
    static async addUser(user) {
        const res = await axios.post("/user/registrar-usuario", user);
        return res.data;
    }

        
}

