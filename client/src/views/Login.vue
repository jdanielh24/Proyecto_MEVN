<template>
    <div>
        <v-container>
            <center>
                <h1>Login</h1>
                <form @submit.prevent="login">
                    <v-col cols="8" sm="6">
                        <v-text-field
                            type="email"
                            label="Email"
                            hide-details="auto"
                            outlined
                            v-model="usuario.email"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col cols="8" sm="6">
                        <v-text-field
                            type="password"
                            label="Contraseña"
                            hide-details="auto"
                            outlined
                            v-model="usuario.password"
                        ></v-text-field>
                    </v-col>
                    
                    
                    <v-col cols="8" sm="6">
                        <v-btn
                            color="primary" 
                            type="submit"
                            elevation="2"
                            large
                            block
                        >ACCEDER</v-btn>
                    </v-col>

                    <p>¿No tienes cuenta? <a href="/registrar-usuario"> Regístrate</a></p>
                    
                </form>
                 <v-col cols="8" sm="6">
                    <div v-if="mensaje != ''">
                        <v-alert border="left" close-text="Close Alert" color="red accent-4" dark dismissible
                            >
                            {{ mensaje }}
                        </v-alert>
                    </div>
                </v-col>
            </center>
        </v-container>
    </div>
</template>


<script >
import { mapActions } from "vuex";
import API_USER from "../api_user";

export default {
    data() {
        return {
            usuario: {email: '', password: ''},
            mensaje: ''
        }
    },
    methods: {
        ...mapActions(['guardarUsuario']),
        async login(){
            try{
                const res = await API_USER.login(this.usuario.email, this.usuario.password)
                const token = res.token;
            
                this.guardarUsuario(token);
                localStorage.setItem("idUser", res.usuarioDB._id);
                localStorage.setItem("nombre", res.usuarioDB.nombre);
                localStorage.setItem("email", res.usuarioDB.email);
            } catch (error) {
				this.mensaje = error.response.data.mensaje;
			}
            
        }
    },
}
</script>