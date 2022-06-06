<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
                {{ nombre }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
      <v-list-item-group
        color="primary"
      >
        <v-list-item 
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          link
          
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>


      <v-list-item-group>
        <v-list-item @click="cerrarSesion">
          <v-list-item-icon>
            <v-icon v-text="'mdi-logout'"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'CerrarSesion'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn color="info" plain :to="{ name: 'home' }">MyTeacher</v-btn>
        
        <!-- Vue-Interest -->
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
  export default {
    data: () => ({
      nombre : localStorage.getItem("nombre"),
      email : localStorage.getItem("email"), 
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home', link: "/" },
        { title: 'Add Post', icon: 'mdi-note-plus', link: "/add-post" },
        { title: 'About', icon: 'mdi-help-box', link: "/about" },
        
      ], 
    }),
    methods: {
      ...mapActions(['cerrarSesion', 'leerToken'])
    },
    computed:{
      ...mapGetters(['estaActivo'])
    },
    created(){
      this.leerToken();
    }
  }
</script>