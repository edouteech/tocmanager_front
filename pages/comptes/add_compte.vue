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
            <h4>Enregistrer un nouveau compte comptable</h4>
            <form action="">
                <div class="form-group col-md-6">
                    <label class="title">Entrer le code du compte</label>
                    <input type="text" class="form-control" v-model="form.code" autocomplete="off" required placeholder="Code du compte">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors && errors.code">
                    {{errors.code}}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Libellé du compte</label>
                    <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Libellé du compte">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors && errors.name">
                    {{errors.name}}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Groupe</label>
                    <input type="text" class="form-control" v-model="form.group" autocomplete="off" required placeholder="Groupe">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors && errors.group">
                    {{errors.group}}
                </div>
    
                <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer compte</button>
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
                    code: '',
                    name: '',
                    group: '',
                },
                errors: [],
                error: null,
            }
        },
        methods: {
            async submit(){
                await  this.$axios.post('/comptes',{
                code: this.form.code,
                name: this.form.name,
                group: this.form.group,
                compagnie_id: localStorage.getItem('auth.company_id')
                }).then(response =>{
                    // console.log( response ) 
                    this.error = response.data.message
                    // console.log(this.error)
    
                    if(response.data.status == "success"){
                        this.$router.push({path:'/comptes/list_compte'});
                        this.$toast('Nouvel compte ajouté !!!', {
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