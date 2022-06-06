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

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            usuario: {email: '', password: ''},
            mensaje: ''
        }
    },
    methods: {
        ...mapActions(['guardarUsuario']),
        login(){
            //console.log(this.usuario);
            this.axios.post('/user/login', this.usuario)
                .then(res => {
                    console.log(res.data);
                    const token = res.data.token;
                    this.guardarUsuario(token);
                    localStorage.setItem("nombre", res.data.usuarioDB.nombre);
                    localStorage.setItem("email", res.data.usuarioDB.email);
                    // this.mensaje = '';
                })
                .catch(e => {
                    console.log(e.response);
                    this.mensaje = e.response.data.mensaje;
                })
        }
    },
}
</script>