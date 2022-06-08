import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert';
import router from './router/index'

//Para decodificar el jwt
import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        usuarioDB: ''
    },
    mutations: {
        obtenerUsuario(state, payload){
            state.token = payload;
            if(payload === ''){
                state.usuarioDB = ''
            }else{
                state.usuarioDB = decode(payload);
                router.push({name: 'home'})
            }
        }
    },
    actions: {
        guardarUsuario({commit}, payload){
            localStorage.setItem('token', payload);
            commit('obtenerUsuario', payload);
            window.location.reload();
        },
        cerrarSesion({commit}){
            const token = localStorage.getItem('token');
            if(token){
            swal({
                title: "¿Seguro que deseas cerrar sesión?",
                text: "Una vez que finalices sesión, no podrás ver los hoteles.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((cerrarSesion) => {
                if (cerrarSesion) {
                    commit('obtenerUsuario', '');
                    localStorage.removeItem('token');
                    localStorage.removeItem('nombre');
                    localStorage.removeItem('email');
                    router.push({name: 'login'});
                    window.location.reload();
                  swal("Has cerrado tu sesión", {
                    icon: "success",
                  });
                } 
              });
            }
            
        },
        leerToken({commit}){
            const token = localStorage.getItem('token');
            if(token){
                commit('obtenerUsuario', token);
                swal("¡Bienvenido, " + localStorage.getItem('nombre') + "!" );
            }else{
                commit('obtenerUsuario', '');
            }
        }
    },
    getters:{
        estaActivo: state => !!state.token
    }
})