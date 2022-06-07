<template>
  <div class="about">
    <v-row class="mt-5 mx-5">
        <h1 class="blue--text"> Nuestra App</h1>
    </v-row>
    <v-row class="mt-5 mx-5">
        <h4 class="gray--text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Asperiores ab rerum accusantium adipisci architecto. Qui enim dolores quam fugiat 
          provident exercitationem, 
          modi animi laborum dignissimos placeat ex ipsum ea nemo.</h4>
    </v-row><br>
    <v-row class="mt-5 mx-5">
      <h2 class="blue--text"> Desarrollado por</h2>
    </v-row>
    <v-row class="mt-5 mx-5">
      <v-col sm="4" class="pa-3">
          <v-card class="pa-1">
          <v-img height="250" :src="`/${ruta1}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ "Back-end Developer" }}
          </v-btn>
          <v-card-title class="headline">
            {{ "Juanma Alfaro" }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ "HaHey" }}</p>
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
            <p>{{ "Un Crack" }}</p>
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
            <p>{{ "ese wey no trabaja y es joto, lo dejo su morrita, es un endogamico y fanfarron" }}</p>
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
      ruta1: "imgAbout/juanma.jpg",
      ruta2: "imgAbout/yisus.png",
      ruta3: "imgAbout/manuel.jpg",
      ruta4: "imgAbout/cr.png",
      myStyle:{
            backgroundColor:"#EAEAEA" 
            }
    };
  }
};
</script>
