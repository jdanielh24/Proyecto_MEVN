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

            <v-rating
											hover
											length="5"
											size="25"
											:value="promedio_val"
											readonly
											dense
											color="#FFED84"
										>
										</v-rating>
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

          <div>
            <div v-for="item in comentarios">
              <v-card class="pa-4">
                <v-row class="pa-4">
                  <p>{{ item.nombre }}</p>
                  &nbsp;&nbsp;
                  <v-rating
											hover
											length="5"
											size="20"
											:value="item.estrellas.rating"
											readonly
											dense
											color="#FFED84"
										>
										</v-rating>
                </v-row>
                <p>{{ item.comentario }}</p>
              </v-card>
              <br />
            </div>
          </div>

          <br />

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
                label="Agrega un comentario"
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
import API_VALORACION from "../api_valoracion";
import API_USER from "../api_user";
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
        rating: 5,
        marginRight: 5,
        d: "M50 0 l-15 35 -35 5 25 24 -6 35 31 -18 31 18 -6 -35 25 -24 -35 -5 -15 -35 z",
        viewBox: "0 0 100 100"
      },

      valoracion: {
        idUser: "",
        idPost: "",
        comentario: "",
        valoracion: "",
      },
      comentarios: [],

      promedio_val : 0
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;

    const resAutor = await API_USER.getUserByID(this.post.idUser);
    this.autor = resAutor.nombre;

    const resVals = await API_VALORACION.getValoracionByID(this.post._id);

    let todosComentarios = resVals;

    let suma_val = 0;

      await todosComentarios.reduce(async (m, element) => {
      const resAutorVal = await API_USER.getUserByID(element.idUser);

      let nombreU = resAutorVal.nombre;
      element["nombre"] = nombreU;

      const estrella =  {
        starsQuantity: 5,
        stroke: "none",
        strokeWidth: 0,
        fill: "#DDD",
        highlighted: "#FFDF12",
        hover: "#FFED84",
        size: 20,
        readOnly: true,
        rating: element.valoracion,
        marginRight: 5,
        d: "M50 0 l-15 35 -35 5 25 24 -6 35 31 -18 31 18 -6 -35 25 -24 -35 -5 -15 -35 z",
        viewBox: "0 0 100 100"
      }
      element["estrellas"] = estrella;
      this.comentarios.push(element);

      suma_val += element.valoracion;
    }, 0);
    this.promedio_val = Math.round(suma_val / this.comentarios.length);
  },
  methods: {
    async comentar() {
      if (this.valoracion.comentario != "" && this.valoracion.valoracion != 0) {
        this.valoracion.valoracion = Math.ceil(this.valoracion.valoracion);
        this.valoracion.idUser = this.idUser;
        this.valoracion.idPost = this.post._id;

        const resVal = await API_VALORACION.addValoracion(this.valoracion);
        this.$router.push({ name: "home" });
        swal("Tu comentario ha sido insertado", "Revisa el post para verificar", "success");
      } else {
        swal(
          "Formulario incompleto",
          "Asegúrate de dar una valoración e ingresar un comentario",
          "success"
        );
      }
    },
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
