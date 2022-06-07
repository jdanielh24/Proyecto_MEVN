<template>
    <div>
        <v-container>
            <center>
                <h1>Registrar</h1>
                <form @submit.prevent="registrar">
                    <v-col cols="8" sm="6">
                        <v-text-field
                            type="text"
                            label="Nombre"
                            hide-details="auto"
                            outlined
                            v-model="usuario.nombre"
                        ></v-text-field>
                    </v-col>

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
                        <v-text-field
                            type="password"
                            label="Confirmar contraseña"
                            hide-details="auto"
                            outlined
                            v-model="usuario.password2"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col cols="8" sm="6">
                        <v-btn
                            color="primary" 
                            type="submit"
                            elevation="2"
                            large
                            block
                        >REGISTRAR</v-btn>
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
import router from '../router/index';
import API_USER from "../api_user";

export default {
    data() {
        return {
                usuario: {
                    nombre: '', email: '', password: '', password2: ''
                },
                mensaje: ''
            };
    },
    methods: {
        async registrar() {
            if(this.usuario.password == this.usuario.password2){
                try{
                    const res = await API_USER.registrar(this.usuario);
                    router.push({name: 'home'}).catch(() => {});
                    swal("¡Usuario registrado!", "Inicia sesión para acceder a todas las funcionalidades", "success");

                } catch (error) {
				    this.mensaje = "Error con el correo (inválido o ya registrado)";
			    }
            }
            else{
                this.mensaje = "Las contraseñas no coinciden";
            }
        }
    },
};
</script>