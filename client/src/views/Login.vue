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
                <div v-if="mensaje != ''">
                    <p>{{mensaje}}</p>
                </div>
            </center>
            
            
        </v-container>

        <v-container fill-height fluid>
            <v-row align="center"
                justify="center">
                <v-col>
                    
                </v-col>
            </v-row>
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
                    // this.mensaje = '';
                })
                .catch(e => {
                    console.log(e.response);
                    // this.mensaje = e.response.data.mensaje;
                })
        }
    },
}
</script>