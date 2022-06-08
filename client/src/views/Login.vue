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
            <v-btn color="primary" type="submit" elevation="2" large block
              >ACCEDER</v-btn
            >
          </v-col>

          <p>¿No tienes cuenta? <a href="http://mishoteles.tech/registrar-usuario"> Regístrate</a></p>
          <facebook-login class="button"
            appId="568311768188756"
            @login="onLogin"
            @logout="onLogout"
            @sdk-loaded="sdkLoaded"
          ></facebook-login>
        </form>
        <v-col cols="8" sm="6">
          <div v-if="mensaje != ''">
            <v-alert
              border="left"
              close-text="Close Alert"
              color="red accent-4"
              dark
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
import API_USER from "../api_user";
import router from "../router/index";

import facebookLogin from 'facebook-login-vuejs';

export default {
  data() {
    return {
      usuario: {email: "", password: ""},
      usuarioFB: {nombre: "", email: "", password: ""},
      mensaje: "",
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    async login() {
      if (this.usuario.email !== "" && this.usuario.password !== "") {
        if(this.usuarioFB.nombre != ""){
            try {
                const res = await API_USER.login(
                    this.usuario.email,
                    this.usuario.password
                );
                const token = res.token;

                this.guardarUsuario(token);
                localStorage.setItem("idUser", res.usuarioDB._id);
                localStorage.setItem("nombre", res.usuarioDB.nombre);
                localStorage.setItem("email", res.usuarioDB.email);
            } catch (error) {
                const res = await API_USER.registrar(this.usuarioFB);
            }
        }
        try {
          const res = await API_USER.login(
            this.usuario.email,
            this.usuario.password
          );
          const token = res.token;

          this.guardarUsuario(token);
          localStorage.setItem("idUser", res.usuarioDB._id);
          localStorage.setItem("nombre", res.usuarioDB.nombre);
          localStorage.setItem("email", res.usuarioDB.email);
        } catch (error) {
            //console.log('error1', error.response.data.mensaje)
            console.log('1')
          this.mensaje = error.response.data.mensaje;
        }
      } else {
        this.mensaje = "Asegúrate de no tener ningún campo vacío";
        console.log('2')
      }
    },
    getUserData(){
        this.FB.api('/me', 'GET', {fields: 'id,name,email'},
            userInformation =>{
                console.warn("INFORMACION", userInformation)
                this.personalID = userInformation.id;
                this.email = userInformation.email;
                this.name = userInformation.name;

                // this.usuario.nombre = userInformation.name;
                // this.usuario.password = userInformation.email;

                this.usuarioFB.nombre = userInformation.name;
                this.usuario.email = this.usuarioFB.email = userInformation.email;
                this.usuario.password = this.usuarioFB.password = userInformation.id;
            }
        )
        // registrarFB();
    },
    sdkLoaded(payload){
        this.isConnected = payload.isConnected;
        this.FB = payload.FB;
        if(this.isConnected) {
            this.getUserData()
        }
    },
    onLogin(){
        this.isConnected = true;
        this.getUserData()
    },
    onLogout(){
        this.isConnected = false;
    },
    // async registrarFB(){
    //     console.log("registrarUsuarioFB");
    //     const res = await API_USER.registrar(this.usuario);
    //     router.push({ name: "home" }).catch(() => {});
        
    // }
  },
  components: {
      facebookLogin
  }
};
</script>
