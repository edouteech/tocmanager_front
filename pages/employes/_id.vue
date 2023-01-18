<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Employés </h3>
          <Userinfo />
        </nav>
    
        <div class="app-main__outer p-5">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}}
            </div>
            <h4>Modifier les informations de cet employé</h4><hr>

            <form action="">
                <div class="row p-3">
                    <div class="col-md-6">
                        <div class="title-row">Informations personnelles</div>
                        <div class="form-group ">
                            <label class="title">Entrer le nom de l'employé</label>
                            <input type="text" class="form-control" v-model="form.last_name" autocomplete="off" required placeholder="Nom">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.last_name">
                            {{errors.last_name}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer le(s) prénom(s) de l'employé</label>
                            <input type="text" class="form-control" v-model="form.first_name" autocomplete="off" required placeholder="Prénoms">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.first_name">
                            {{errors.first_name}}
                        </div> -->
                        
                        <div class="form-group">
                            <div class="form-group ">
                            <label class="title">Sexe du client</label>
                            <select class="form-control" v-model="form.sex">
                                    <option disabled value="">Choisissez...</option>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                            </select>
                            </div>
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.sex">
                            {{errors.sex}}
                        </div> -->
            
                        <div class="form-group ">
                            <label class="title">Entrer le numero de téléphone de l'employé</label>
                            <vue-tel-input class="form-control form-control-sm" v-model="form.phone"></vue-tel-input> 
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.phone">
                            {{errors.phone}}
                        </div> -->
            
                        <div class="form-group">
                            <label class="title">Entrer l'email de l'employé</label>
                            <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="Email" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.email">
                            {{errors.email}}
                        </div> -->
                        
                        <div class="form-group ">
                            <label class="title">Entrer le pays de l'employé</label>
                            <input type="text" class="form-control" v-model="form.country" autocomplete="off" required placeholder="Pays">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.country">
                            {{errors.country}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer la ville de l'employé</label>
                            <input type="text" class="form-control" v-model="form.city" autocomplete="off" required placeholder="Ville">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.city">
                            {{errors.city}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer l'adresse de l'employé</label>
                            <input type="text" class="form-control" v-model="form.address" autocomplete="off" required placeholder="Addresse">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.address">
                            {{errors.address}}
                        </div> -->
            
                        <div class="form-group">
                            <div class="form-group ">
                            <label class="title">Situation matrimoniale de l'employé</label>
                            <select class="form-control" v-model="form.marital_status">
                                    <option disabled value="">Choisissez...</option>
                                    <option value="Célibataire">Célibataire</option>
                                    <option value="Marié(e)">Marié(e)</option>
                                    <option value="Divorcé(e)">Divorcé(e)</option>
                                    <option value="Veuf(ve)">Veuf(ve)</option>
                            </select>
                            </div>
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.marital_status">
                            {{errors.marital_status}}
                        </div> -->
            
                        <div class="form-group">
                            <label class="title">Entrer le nombre d'enfant(s)</label>
                            <input type="number" class="form-control" v-model="form.children_count" autocomplete="off" required  placeholder="" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.children_count">
                            {{errors.children_count}}
                        </div> -->
                        
                        <div class="form-group ">
                            <label class="title">Entrer le lieu de travail de l'employé</label>
                            <input type="text" class="form-control" v-model="form.workplace" autocomplete="off" required placeholder="Lieu de travail">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.workplace">
                            {{errors.workplace}}
                        </div> -->
                    </div>

                    <div class="col-md-6">
                        <div class="title-row">Informations supplementaires</div>
                        <div class="form-group ">
                            <label class="title">Entrer la date d'embauche de l'employé</label>
                            <input type="datetime-local" class="form-control" v-model="form.hiring_date" autocomplete="off" required placeholder="Pays">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.hiring_date">
                            {{errors.hiring_date}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer la date de sortie de l'employé</label>
                            <input type="datetime-local" class="form-control" v-model="form.release_date" autocomplete="off" required placeholder="Pays">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.release_date">
                            {{errors.release_date}}
                        </div> -->

                        <!-- <div class="form-group ">
                            <label class="title">Entrer le lieu de travail de l'employé</label>
                            <input type="text" class="form-control" v-model="form.workplace" autocomplete="off" required placeholder="Pays">
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.workplace">
                            {{errors.workplace}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer le département de l'employé</label>
                            <input type="text" class="form-control" v-model="form.department" autocomplete="off" required placeholder="Departement">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.department">
                            {{errors.department}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer le poste occupé par l'employé</label>
                            <input type="text" class="form-control" v-model="form.position_hield" autocomplete="off" required placeholder="Poste">
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.position_hield">
                            {{errors.position_hield}}
                        </div> -->

                        
                        <div class="form-group">
                            <label class="title">Entrer le numéro de régistre de l'employé</label>
                            <input type="text" class="form-control" v-model="form.reg_number" autocomplete="off" required  placeholder="Num reg" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.reg_number">
                            {{errors.reg_number}}
                        </div> -->

                        
                        <div class="form-group">
                            <label class="title">Entrer la référence CNSS de l'employé</label>
                            <input type="text" class="form-control" v-model="form.cnss" autocomplete="off" required  placeholder="CNSS" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.cnss">
                            {{errors.cnss}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Supérieur hiérarchique</label>
                            <v-select 
                                placeholder="Choississez le client"
                                v-model="form.hierachy_id"
                                label="last_name"
                                :options="employes"
                                :reduce="(employe) => employe.id"
                                append-to-body
                            />
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.hierachy_id">
                            {{errors.hierachy_id}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Type de contrat</label>
                            <select class="form-control" v-model="form.contract_kind" >
                                    <option disabled value="">Choisissez...</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                            </select>
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.contract_kind">
                            {{errors.contract_kind}}
                        </div> -->

                        <div class="form-group">
                            <label class="title">Entrer le nombre d'heures de travail</label>
                            <input type="number" class="form-control" v-model="form.workhour" autocomplete="off" required  placeholder="0" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.workhour">
                            {{errors.workhour}}
                        </div> -->

                        <div class="form-group">
                            <label class="title">Entrer le salaire de base de l'employé</label>
                            <input type="number" class="form-control" v-model="form.base_salary" autocomplete="off" required  placeholder="0" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.base_salary">
                            {{errors.base_salary}}
                        </div> -->

                        <div class="form-group">
                            <label class="title">Entrer le bonus</label>
                            <input type="number" class="form-control" v-model="form.bonus" autocomplete="off" required  placeholder="0" >
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.bonus">
                            {{errors.bonus}}
                        </div> -->

                        <div class="form-group ">
                            <label class="title">Entrer un commentaire</label>
                            <textarea
                                v-model="form.comment"
                                name="comment"
                                id="comment"
                                cols="30"
                                rows="3"
                                class="form-control"
                                placeholder="Entrer votre commentaire"
                            ></textarea>
                        </div>
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.phone">
                            {{errors.comment}}
                        </div> -->
            
                    </div>                    
                </div>
                <div class="col-md-6 mx-auto">
                    <button type="submit" class="btn btn-outline-success col-md-12 p-3 " v-on:click.prevent="submit()">Modifier les informations de l'employé</button>
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
                    last_name: '',
                    first_name: '',
                    email: '',
                    phone: '',
                    sex: '',
                    country: '',
                    city: '',
                    address: '',
                    // workplace: '',
                    marital_status: '',
                    children_count: '',
                    hiring_date: '',
                    release_date: '',
                    workplace: '',
                    department: '',
                    position_hield: '',
                    reg_number: '',
                    cnss: '',
                    hierachy_id: '',
                    contract_kind: '',
                    workhour: '',
                    base_salary: '',
                    bonus: '',
                    comment: '',
                    user_id:'',
                    compagnie_id: ''
                },
                error:null,
                errors: [],
                types: '',
                role: ''
            }
            },
        mounted() {
            this.recupEmploye()
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
    
            recupEmploye(){
                this.$axios.get('/employees/'+ this.$route.params.id,{
                    params: {
                        compagnie_id: localStorage.getItem('auth.company_id')
                    }
                })
                .then(response => {
                    // console.log(response.data.data[0] )
                    let employe = response.data.data;
                    this.form.last_name = employe.last_name
                    this.form.first_name= employe.first_name 
                    this.form.email = employe.email
                    this.form.phone= employe.phone
                    this.form.sex = employe.sex
                    this.form.country = employe.country
                    this.form.city = employe.city
                    this.form.address = employe.address
                    this.form.marital_status = employe.marital_status,
                    this.form.children_count = employe.children_count
                    this.form.hiring_date = employe.hiring_date
                    this.form.release_date = employe.release_date
                    this.form.workplace = employe.workplace
                    this.form.department = employe.department
                    this.form.position_hield = employe.position_hield
                    this.form.reg_number = employe.reg_number
                    this.form.cnss = employe.reg_number
                    this.form.hierachy_id = employe.hierachy_id
                    this.form.contract_kind = employe.contract_kind
                    this.form.workhour = employe.workhour
                    this.form.base_salary = employe.base_salary
                    this.form.bonus = employe.bonus
                    this.form.comment = employe.comment
                    
                })
    
            },
    
            // recupType(){
            //     this.$axios.get('/clients/types',{
            //         params: {
            //         compagnie_id: localStorage.getItem('auth.company_id'),
            //         }
            //     }).then(response =>{
            //         this.types = response.data.data
            //     })   
            // },
    
            submit(){          
                this.$axios.put('/employees/'+this.$route.params.id,{
                    last_name: this.form.last_name,
                    first_name: this.form.first_name,
                    email: this.form.email,
                    phone: this.form.phone,
                    sex: this.form.sex,
                    country: this.form.country,
                    city: this.form.city,
                    address: this.form.address,
                    marital_status: this.form.marital_status,
                    children_count: this.form.children_count,
                    hiring_date: this.form.hiring_date,
                    release_date: this.form.release_date,
                    workplace: this.form.workplace,
                    department: this.form.department,
                    position_hield: this.form.position_hield,
                    reg_number: this.form.reg_number,
                    cnss: this.form.cnss,
                    hierachy_id: this.form.hierachy_id,
                    contract_kind: this.form.contract_kind,
                    workhour: this.form.workhour,
                    base_salary: this.form.base_salary,
                    bonus: this.form.bonus,
                    comment: this.form.comment,
                    user_id: localStorage.getItem('auth.user_id'),
                    compagnie_id: localStorage.getItem('auth.company_id')
    
                })
                .then(response =>{
                    this.error = response.data.message
                    // console.log(this.error)
    
                    if(response.data.status == "success"){
                        this.$router.push({path:'/employes/list_employe'});
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
    
    .form-group{
        margin-top: 4%;
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
    
    input {
        border: none; outline: none;
        border-bottom: 2px solid #605050;
    }
           
    </style>