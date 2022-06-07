<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4" mx-auto>
                <v-card class="pa-2">
                    <v-img :src="`/${post.image}`"></v-img><br>
                    <v-row class="mt-1 mx-1">&nbsp;&nbsp;&nbsp;<b class="blue--text"> Autor</b>&nbsp; <span>{{autor}}</span> </v-row>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined color="primary">{{ post.category }}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <div v-if="post.idUser == idUser">
                                    <v-btn color="success" text :to="{ name: 'edit-post', params: { id: post._id } }">Edit</v-btn>
                                    <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
                                </div>  
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ post.title }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey-text">
                        <p>{{ post.content }}</p>
                        <p>{{ post.created }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-container>
            <!-- <v-col sm="10" class="pa-4" mx-auto>
                <v-card class="pa-2">
                    <h1> comentarios </h1>
                    <v-card>
                        <h4>Nombre</h4>
                        <h5>Estrellas</h5>
                        <p>Comentario</p>
                    </v-card>
                </v-card>
            </v-col> -->
            <v-card-title>Comentarios</v-card-title>

			<v-card-text>
				<v-list>
					<v-divider></v-divider>
					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-subtitle>
								<v-avatar color="secondary" class="mr-3" size="40" light>
									<span class="white--text headline">
										5
									</span>
								</v-avatar>
								Juanma
							</v-list-item-subtitle>
							<v-col>
								<v-row>
									<v-col md="auto">
										<v-rating
											hover
											length="5"
											size="14"
											:value="5"
											readonly
											dense
											color="amber"
										>
										</v-rating>
									</v-col>
									<v-col>
										<v-list-item-title>
                                            smns
                                        </v-list-item-title>
									</v-col>
								</v-row>

								<p
                                    class="text-body-1"
									readonly
									flat
									dense
									auto-grow
									no-resize
									rounded
									solo
                                    >eii
								</p>
							</v-col>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card-text>
            <CardRecipeDetailComment :maxWidth="1000" :menuItemId="5" />
        </v-container>
    </v-container>
    
</template>

<script>
import API from '../api';
export default {
    data() {
        return {
            post: {},
            idUser : localStorage.getItem("idUser"),
            autor : ''
        };
    },
    async created() {
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
        //console.log(response);
        //console.log(this.post.idUser);
        this.axios.get(`/user/${this.post.idUser}`)
                .then(res => {
                    console.log(res.data);
                    this.autor = res.data.nombre;
                    //console.log(autor);
                })
                .catch(e => {
                    console.log(e.response);
                    //this.mensaje = e.response.data.mensaje;
                })

    },
    methods: {
        async removePost(id) {
            const response = await API.deletePost(id);
            this.$router.push({ name: 'home', params: { message: response.message } });
        },
    },
}
</script>