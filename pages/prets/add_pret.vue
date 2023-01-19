<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Prêts</h3>
          <Userinfo />
        </nav>
    
        <div class="app-main__outer p-5">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}}
            </div>
            <h4>Ajouter un prêt pour un employé</h4><hr>

            <form action="">
                <div class="col-md-8 mx-auto">
                        <div class="input-form">
                            <label class="title">Montant du Prêt</label>					
                            <input type="number" class="form-control" placeholder="Entrer le montant" v-model="form.amount" autocomplete="off" id="name_four" required>
                        </div>  
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.amount">{{errors.amount}}</div>   
                        
                        <div class="input-form"> 
                            <label class="title">Employé concerné</label>       
                            <v-select 
                                placeholder="Nom de l'employé concerné"
                                v-model="form.employee_id"
                                label="last_name"
                                :options="employes"
                                :reduce="(employe) => employe.id"
                            />  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.employee_id">{{errors.employee_id}}</div> 
        
                        <div class="input-form">
                            <label class="title">Tranche de paiement</label>					
                            <input type="number" class="form-control" placeholder="Entrer le montant" v-model="form.tranche" autocomplete="off" id="name_four" required>
                        </div>  
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.tranche">{{errors.tranche}}</div>   
                        
                        
                        <!-- <div class="input-form">
                            <label class="title">Montant restant</label>					
                            <input type="number" class="form-control" placeholder="Entrer le montant" v-model="form.rest" autocomplete="off" id="name_four" required>
                        </div>  
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.rest">{{errors.rest}}</div>    -->
                        
                        <div class="input-form">       
                            <label class="title" for="date_start">Date d'enregistrement du Prêt</label> 
                            <input class="form-control"  type="datetime-local"  v-model="form.date_loan" id="date_start"/>  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.date_loan">{{errors.date_loan}}</div> 
        
                        <div class="input-form">        
                            <label class="title" for="">Date limite de paiement</label> 
                            <input class="form-control"  type="datetime-local"  v-model="form.date_limit"/>  
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.date_limit">{{errors.date_limit}}</div> 

                        <div class="col-md-8 mx-auto mt-4">
                            <button type="submit" class='btn btn-outline-primary col-md-12 mx-auto p-2' @click.prevent="submit()" >Ajouter le pret</button>				          
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
                    amount: '',
                    date_limit: '',
                    date_loan: '',
                    employee_id: '', 
                    tranche:'',
                    rest: '',
                    compagnie_id: '',
                    user: ''
                },
                error:null,
                status: '',
                errors: [],
                types: '',
                role: ''
            }
            },
        mounted() {
            this.AllEmploye()  
            this.role = localStorage.getItem('auth.roles') 
            this.user = localStorage.getItem('auth.user_id')  
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
    
            async submit(){
              await  this.$axios.post('/loans',{
                amount: this.form.amount,
                date_limit: this.form.date_limit,
                date_loan: this.form.date_loan,
                employee_id: this.form.employee_id,
                tranche: this.form.tranche,
                // rest: this.form.rest,
                user_id: this.user,
                compagnie_id: localStorage.getItem('auth.company_id')
              })
              .then(response =>{
                this.$emit('conf', { message: this.form.amount })
                  console.log( response ) 
                  this.error = response.data.message
                  this.status = response.data.status
                    if(this.status == 'success'){
                        this.status = response.data.status
                        this.$router.push({path:'/prets/list_pret'});
                        this.$toast("Pret ajouté !!! ", {
                        icon: 'fa fa-check-circle',
                    })
                    }
                    else{
                      this.status = response.data.status
                      this.errors = response.data.data
                    }
               }).catch( err => console.log( err ) )
              
              },
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