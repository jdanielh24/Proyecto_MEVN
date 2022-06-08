<template>
  <div class="about">
    <v-row class="mt-5 mx-5">
        <h1 class="blue--text"> <b> <span class="blue--text">MIS</span><span class="black--text">HOTELES </span> </b> </h1>
    </v-row>
    <v-row class="mt-5 mx-5">
        <h4 class="gray--text"> MisHoteles es una plataforma web donde los usuarios pueden
          calificar hoteles y moteles, además de contar su experiencia para ayudar a otros usuarios
          a encontrar un buen hotel donde hospedarse.
        </h4>
    </v-row><br>
    <v-row class="mt-5 mx-5">
      <h2 class="blue--text"> Desarrollado por</h2>
    </v-row>
    <v-row class="mt-5 mx-5">
      <v-col sm="4" class="pa-3">
          <v-card class="pa-1">
          <v-img height="250" :src="`${ruta1}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ "Back-end Developer" }}
          </v-btn>
          <v-card-title class="headline">
            {{ "Juanma Alfaro" }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ "jmanuel.alfaro.22@gmail.com" }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4" class="pa-3">
          <v-card class="pa-1">
          <v-img height="250" :src="`/${ruta2}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ "Back-end Developer" }}
          </v-btn>
          <v-card-title class="headline">
            {{ "Jesús López" }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ "jdanielopez24@gmail.com" }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4" class="pa-3">
          <v-card class="pa-1">
          <v-img height="250" :src="`/${ruta3}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ "Front-end Developer" }}
          </v-btn>
          <v-card-title class="headline">
            {{ "Manuel Rodríguez" }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ "contacto.manuelrdzz@gmail.com" }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row><br><br>
    <div :style="myStyle">
      <center class="pa-2">
              <h3 class="gray--text"> Desarrollo web pila completa I</h3>
              <h3 class="gray--text"> Equipo J</h3>
              <span>©️2022</span>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruta1: "http://mishoteles.tech/uploads/teacher.png",
      ruta2: "imgAbout/yisus.jpg",
      ruta3: "imgAbout/manuel.jpg",
      ruta4: "imgAbout/cr.png",
      myStyle:{
            backgroundColor:"#EAEAEA" 
            }
    };
  }
};
</script>
