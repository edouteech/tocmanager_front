<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Exercices </h3>
          <User_info />
        </nav>
    
    
      
        <div class="app-main__outer p-5">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                {{error}}
            </div>
            <h4>Enregistrer un nouvel exercice</h4>
            <form action="">
                <div class="form-group col-md-6">
                    <label class="title">Entrer le nom de l'exercice</label>
                    <input type="text" class="form-control" v-model="form.name_exercice" autocomplete="off" required placeholder="Nom de l'exercice">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors && errors.name_exercice">
                    {{errors.name_exercice}}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Date de début</label>
                    <input type="date" class="form-control" v-model="form.start_at" autocomplete="off" required placeholder="2022-10-05">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors && errors.start_at">
                    {{errors.start_at}}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Date de fin</label>
                    <input type="date" class="form-control" v-model="form.end_at" autocomplete="off" required placeholder="2022-10-05">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors && errors.end_at">
                    {{errors.end_at}}
                </div>
    
                <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer exercice</button>
            </form>
        </div>
    </div>
    </template>
    
    <script>
    import Sidebar from '../sidebar.vue'
    import User_info from '../user_info.vue'
    export default {
        layout: "empty",
        auth: true,
        components: {
        Sidebar,
        User_info
    },
        
        data () {
            return{
                form: {
                    name_exercice: '',
                    start_at: '',
                    end_at: '',
                },
                errors: [],
                error: null,
            }
        },
        methods: {
            async submit(){
                await  this.$axios.post('/exercices',{
                name_exercice: this.form.name_exercice,
                start_at: this.form.start_at,
                end_at: this.form.end_at,
                compagnie_id: localStorage.getItem('auth.company_id')
                }).then(response =>{
                    // console.log( response ) 
                    this.error = response.data.message
                    // console.log(this.error)
    
                    if(response.data.status == "success"){
                        this.$router.push({path:'/exercices/list_exercice'});
                        this.$toast('Nouvel exercice ajouté !!!', {
                            icon: 'fa fa-check-circle',
                        })
                    }
                    else{
                        this.errors = response.data.data
                        // this.$router.push({path:'/clients/add_client'});
                    }
                })
                .catch( error => console.log( error ) )
                    //  console.log(this.form.name)                
            },
    
        },
      
    }
    </script>
    
    <style scoped>
    form{
        margin-left: 10%;
        margin-top: 5%;
    }
    
    .form-group{
        margin-top: 2%;
    }
    
    .title{
        margin: 1% 0;
    }
    
    .btn{
        margin-top: 5%;
    }
    
    .app-main__outer{
      overflow: auto;
    }
    
    .fa{
      margin: 0 5px;
      font-size: 22px;
      cursor: pointer;
    }
    .table{
        margin-top: 5%;
    
    }      
    input::placeholder {
        font-size: 15px;
        opacity: 0.5;
    }
    
    </style>