<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4" mx-auto>
        <v-card class="pa-2">
          <v-img :src="`/${post.image}`"></v-img><br />
          <v-row class="mt-1 mx-1"
            >&nbsp;&nbsp;&nbsp;<b class="blue--text"> Autor</b>&nbsp;
            <span>{{ autor }}</span>
          </v-row>
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{
                  post.category
                }}</v-btn>
              </v-col>
              <v-col sm="10" class="d-flex justify-end">
                <div v-if="post.idUser == idUser">
                  <v-btn
                    color="success"
                    text
                    :to="{ name: 'edit-post', params: { id: post._id } }"
                    >Edit</v-btn
                  >
                  <v-btn color="red" text @click="removePost(post._id)"
                    >Delete</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ post.title }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey-text">
            <p>{{ post.content }}</p>

            <stars-rating v-model="rating" :settings="settings"></stars-rating>
            <br />
            <p>{{ post.created }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col sm="10" class="pa-2" mx-auto>
        <v-container>
          <v-card-title>Comentarios</v-card-title>

          <v-card class="pa-4">
            <v-row class="pa-4">
              <p>{{nombreUser}}</p>
              &nbsp;&nbsp;
              <stars-rating
                v-model="rating"
                :settings="settings"
              ></stars-rating>
            </v-row>
            <p>este es mi comentario</p>
          </v-card>
          <br>
          <v-card class="pa-4">
            <v-row class="pa-4">
              <p>{{nombreUser}}</p>
              &nbsp;&nbsp;
              <stars-rating
                v-model="rating"
                :settings="settings"
              ></stars-rating>
            </v-row>
            <p>este es mi comentario</p>
          </v-card>

            <br>
            <br>
        
         <form @submit.prevent="comentar">
          <v-card class="pa-4">
            <v-row class="pa-4">
              <p>¿Qué te parece?</p>
              &nbsp;&nbsp;
              <stars-rating
                v-model="valoracion.valoracion"
                :settings="settings"
              ></stars-rating>
            </v-row>
            <v-textarea
              v-model="valoracion.comentario"
              outlined
              name="input-7-4"
              label="Agrega un comenchairo"
              value=""
            ></v-textarea>

            <v-btn color="primary" type="submit" elevation="2" large
              >ENVIAR</v-btn
            >
          </v-card>
         </form>

        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
import StarsRating from "stars-rating-component-vue";

export default {
  data() {
    return {
      post: {},
      idUser: localStorage.getItem("idUser"),
      nombreUser: localStorage.getItem("nombre"),
      autor: "",

      settings: {
        starsQuantity: 5,
        stroke: "none",
        strokeWidth: 0,
        fill: "#DDD",
        highlighted: "#FFDF12",
        hover: "#FFED84",
        size: 20,
        readOnly: false,
        rating: 0,
        marginRight: 5,
        d: "M50 0 l-15 35 -35 5 25 24 -6 35 31 -18 31 18 -6 -35 25 -24 -35 -5 -15 -35 z",
        viewBox: "0 0 100 100",
      },

      valoracion: {
                    idUser: '', idPost: '', comentario: '', valoracion: ''
                },
      comentarios: []
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
    this.axios
      .get(`/user/${this.post.idUser}`)
      .then((res) => {
        console.log(res.data);
        this.autor = res.data.nombre;
        //console.log(autor);
      })
      .catch((e) => {
        console.log(e.response);
        //this.mensaje = e.response.data.mensaje;
      });
    console.log("id: ", this.post._id)
    this.axios.get(`/valoracion/${this.post._id}`)
                .then(res => {
                    let todosComentarios = res.data;

                    todosComentarios.forEach(element =>{
                        this.comentarios.push(element)
                    });

                }).catch(e => {
                    console.log('eror1')
                    console.log(e.response);
                })
  },
  methods: {
    comentar() {
            
            if(this.valoracion.comentario != '' && this.valoracion.valoracion != 0){
                /*const formData = new FormData();
                formData.append('idUser', this.idUser);
                formData.append('idPost', this.idPost);
                formData.append('comentario', this.comentario);
                formData.append('valoracion', this.valoracion);*/
                this.valoracion.idUser = this.idUser;
                this.valoracion.idPost = this.post._id;
                //console.log(this.valoracion);
                this.axios.post('/valoracion/createVal', this.valoracion)
                .then(res => {
                     //router.push({name: 'home'});
                     window.location.reload();
                     swal("¡Comentario insertado!", "MESSI PECHO FRIO", "success");
                }).catch(e => {
                    console.log(e.response);
                })
            }
            else{
                swal("Formulario incompleto", "Asegúrate de dar una valoración e ingresar un comentario y MESSI PECHO FRIO", "success");
            }
        }
    , 
    async removePost(id) {
      const response = await API.deletePost(id);
      this.$router.push({
        name: "home",
        params: { message: response.message },
      });
    },
  },
  components: {
    StarsRating,
  },
};
</script>
