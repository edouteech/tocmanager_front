<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Congés </h3>
          <Userinfo />
        </nav>
    
        <div class="app-main__outer py-3 px-2">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}}
            </div>
            <h4>Modifier les informations de ce congé</h4><hr>

            <form action="">
                <div class="col-md-8 mx-auto">
                        <div class="input-form">
                            <label class="title">Désignation du congé</label>					
                            <input type="text" class="form-control" placeholder="Entrer la désignation du congé" v-model="form.name" autocomplete="off" id="name_four" required>
                        </div>  
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.name">{{errors.name}}</div>   
                        
                        <div class="input-form"> 
                            <label class="title">Employé concerné</label>       
                            <v-select 
                                placeholder="Nom de l'employé concerné"
                                v-model="form.vacationer_id"
                                label="last_name"
                                :options="employes"
                                :reduce="(employe) => employe.id"
                            />  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['vacationer_id'] != null">{{errors['vacationer_id']}}</div> 
        
                        <div class="input-form">       
                            <label class="title" for="date_start">Date de début</label> 
                            <input class="form-control"  type="datetime-local"  v-model="form.date_start" id="date_start"/>  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['date_start'] != null">{{errors['date_start']}}</div> 
        
                        <div class="input-form">        
                            <label class="title" for="">Date de fin</label> 
                            <input class="form-control"  type="datetime-local"  v-model="form.date_end"/>  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['date_end'] != null">{{errors['date_end']}}</div> 

                        <div class="input-form">   
                            <label class="title">Nombre de jours</label> 
                            <input type="number" class="form-control" placeholder="Entrer le nombre de jours" v-model="form.days_count" autocomplete="off" id="count" required>
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['days_count'] != null">{{errors['days_count']}}</div> 
        
                        <div class="input-form">  
                            <label class="title">Employé autorisateur du congé</label>      
                            <v-select 
                                placeholder="Nom de l'employé autorisateur du congé"
                                v-model="form.authorizer_id"
                                label="last_name"
                                :options="employes"
                                :reduce="(employe) => employe.id"
                            />  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['vacationer_id'] != null">{{errors['vacationer_id']}}</div> 
        
                        
                        <div class="input-form">
                            <label class="title">Commentaire</label>    
                            <textarea
                                v-model="form.comment"
                                name="comment"
                                id="comment"
                                cols="30"
                                rows="4"
                                class="form-control"
                                placeholder="Entrer un commentaire"
                            ></textarea>
                        </div>

                        <div class="col-md-8 mx-auto mt-4">
                            <button type="submit" class='btn btn-outline-success col-md-12 mx-auto p-2' @click.prevent="submit()" >Modifier le congé</button>				          
                        </div>

              
                </div>
            </form>
        </div>
          
    </div>
    
    </template>
    
    <script>
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import Sidebar from '../sidebar.vue'
    import Userinfo from '../user_info.vue'
    export default {
        layout: "empty",
        auth:true,
        components: {
            Sidebar,  
            Userinfo,
            vSelect
        },
        data () {
            return{
                employes: [],
                form: {
                    name: '',
                    vacationer_id: '',
                    date_end: '',
                    date_start: '', 
                    authorizer_id:'',
                    days_count: '',
                    comment: '',
                    compagnie_id: ''
                },
                error:null,
                errors: [],
                types: '',
                role: ''
            }
            },
        mounted() {
            this.recupConge()
            this.AllEmploye()  
            this.role = localStorage.getItem('auth.roles')   
        },
    
        methods: {
            AllEmploye(){
                this.$axios.get('/employees',{params: {
                    compagnie_id: localStorage.getItem('auth.company_id'),
                    is_paginated: 0
                }
                })
                .then(response => {
                    // console.log(response.data);
                this.employes = response.data.data 
                })
            },
    
            recupConge(){
                this.$axios.get('/vacations/'+ this.$route.params.id,{
                    params: {
                        compagnie_id: localStorage.getItem('auth.company_id')
                    }
                })
                .then(response => {
                    // console.log(response.data.data[0] )
                    let conge = response.data.data;
                    this.form.name = conge.name
                    this.form.date_start = conge.date_start
                    this.form.date_end = conge.date_end
                    this.form.days_count = conge.days_count
                    this.form.authorizer_id = conge.authorizer_id
                    this.form.vacationer_id = conge.vacationer_id
                    this.form.comment = conge.comment
                    
                })
    
            },
    
    
            submit(){          
                this.$axios.put('/vacations/'+this.$route.params.id,{
                    name: this.form.name,
                    vacationer_id: this.form.vacationer_id,
                    date_end: this.form.date_end,
                    date_start: this.form.date_start,
                    authorizer_id: this.form.authorizer_id,
                    days_count: this.form.days_count,
                    comment: this.form.comment,
                    compagnie_id: localStorage.getItem('auth.company_id')
        
                })
                .then(response =>{
                    this.error = response.data.message
                    // console.log(this.error)
    
                    if(response.data.status == "success"){
                        this.$router.push({path:'/conges/list_conge'});
                        this.$toast('Modifications éffectuées avec succès !!!', {
                            icon: 'fa fa-check-circle',
                        })
                    }
                    else{
                        this.errors = response.data.data
                        // this.$router.push({path:'/clients/add_client'});
                    }
                })          
            }
        }
       
    }
    </script>
    
    <style scoped>
       .title-row{
        margin: 15px 0;
        border: 2px dotted rgb(236, 236, 236);
        text-align: center;
        padding: 10px;
        font-weight: 700;
        text-transform: uppercase;
        background-color: rgb(236, 236, 236);
    }
    /* form{
        margin-left: 10%;
        margin-top: 5%;
    } */
    
    .input-form{
        margin-top: 2%;
    }
    
    .title{
        margin: 1% 0;
        font-weight: 500;
    }
    
    .btn{
        margin-top: 5%;
    }
    
    .app-main__outer{
      overflow: auto;
    }
    
    /* input {
        border: none; outline: none;
        border-bottom: 2px solid #605050;
    } */
           
    </style>