<template >
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Employés </h3>
          <User_info />
        </nav>
    
        <div class="app-main__outer py-5 px-2">  
            <h4 class="text-center title_voir">Informations générales de l'employé</h4>
            <div class="d-flex align-items-end flex-column" v-for="(user, i) in users" :key="i" >        
                <!-- <NuxtLink to="/employes/add_employe" v-if=" compagny == user.pivot.compagnie_id"><button type="submit" class="btn btn-outline-primary">Ajouter un employé</button></NuxtLink> -->
                <NuxtLink :to="'/employes/'+modify" v-if=" compagny == user.pivot.compagnie_id"><button type="submit" class="btn btn-outline-success">Modifier les informations</button></NuxtLink>
            </div>
            <form action=""><hr>
                <div class="col-md-3 mx-auto">
                    <img src="../../../static/images/user.png" alt="" width="300" height="300">
                </div>
                <div class="row p-3">
                    <div class="col-md-6">
                        <div class="title-row">Informations personnelles</div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="title">Nom de l'employé</label>
                                <input type="text" class="form-control" v-model="form.last_name" autocomplete="off" required placeholder="Nom" disabled>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="title">Prénom(s) de l'employé</label>
                                <input type="text" class="form-control" v-model="form.first_name" autocomplete="off" required placeholder="Prénoms" disabled>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="title">Sexe</label>
                                <select class="form-control" v-model="form.sex" disabled>
                                        <option disabled value="">Choisissez...</option>
                                        <option value="M">Masculin</option>
                                        <option value="F">Féminin</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="title">Situation </label>
                                <select class="form-control" v-model="form.marital_status" disabled>
                                        <option disabled value="">Choisissez...</option>
                                        <option value="Célibataire">Célibataire</option>
                                        <option value="Marié(e)">Marié(e)</option>
                                        <option value="Divorcé(e)">Divorcé(e)</option>
                                        <option value="Veuf(ve)">Veuf(ve)</option>
                                </select>
                            </div>

                            <div class="form-group col-md-4">
                                <label class="title">Nombre d'enfant(s)</label>
                                <input type="number" class="form-control" v-model="form.children_count" autocomplete="off" required  placeholder="" disabled>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="title">Téléphone</label>
                                <vue-tel-input class="form-control form-control-sm" v-model="form.phone" disabled></vue-tel-input> 
                            </div>
                
                            <div class="form-group col-md-6">
                                <label class="title">Email</label>
                                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="Email" disabled>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="title">Pays</label>
                                <input type="text" class="form-control" v-model="form.country" autocomplete="off" required placeholder="Pays" disabled>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="title">Ville</label>
                                <input type="text" class="form-control" v-model="form.city" autocomplete="off" required placeholder="Ville" disabled>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="title">Adresse</label>
                                <input type="text" class="form-control" v-model="form.address" autocomplete="off" required placeholder="Addresse" disabled>
                            </div>
                            
                            <div class="form-group col-md-6">
                                <label class="title">Lieu de travail</label>
                                <input type="text" class="form-control" v-model="form.workplace" autocomplete="off" required placeholder="Lieu de travail" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="title-row">Informations supplementaires</div>
                        <div class="row">
                            <div class="form-group col-md-6 ">
                                <label class="title">Date d'embauche</label>
                                <input type="datetime-local" class="form-control" v-model="form.hiring_date" autocomplete="off" required disabled>
                            </div>

                            <div class="form-group col-md-6 ">
                                <label class="title">Date de sortie</label>
                                <input type="datetime-local" class="form-control" v-model="form.release_date" autocomplete="off" required disabled>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6 ">
                                <label class="title">Département</label>
                                <input type="text" class="form-control" v-model="form.department" autocomplete="off" required placeholder="Departement" disabled>
                            </div>

                            <div class="form-group col-md-6 ">
                                <label class="title">Poste occupé</label>
                                <input type="text" class="form-control" v-model="form.position_hield" autocomplete="off" required placeholder="Poste" disabled>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="title">Numéro de régistre</label>
                                <input type="text" class="form-control" v-model="form.reg_number" autocomplete="off" required  placeholder="Num reg" disabled>
                            </div>

                            
                            <div class="form-group col-md-6">
                                <label class="title">Référence CNSS</label>
                                <input type="text" class="form-control" v-model="form.cnss" autocomplete="off" required  placeholder="CNSS" disabled>
                            </div>
                        </div>

                        <!-- <div class="form-group ">
                            <label class="title">Entrer le lieu de travail de l'employé</label>
                            <input type="text" class="form-control" v-model="form.workplace" autocomplete="off" required placeholder="Pays">
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.workplace">
                            {{errors.workplace}}
                        </div> -->


                        <div class="row" v-if="form.hierachy">
                            <label class="title mt-4">Supérieur hiérarchique</label>
                            <div class=" col-md-6">
                                <label class="title">Nom</label>
                                <input type="text" class="form-control" v-model="form.hierachy.last_name" autocomplete="off" required  placeholder="" disabled>
                            </div>

                            
                            <div class=" col-md-6">
                                <label class="title">Prénom</label>
                                <input type="text" class="form-control" v-model="form.hierachy.first_name" autocomplete="off" required  placeholder="" disabled>
                            </div>
                        </div>

                        <div class="form-group " v-else>
                            <label class="title">Supérieur hiérarchique</label>
                            <input type="text" class="form-control" v-model="form.aucun" autocomplete="off" required  placeholder="" disabled>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6 ">
                                <label class="title">Contrat</label>
                                <select class="form-control" v-model="form.contract_kind" disabled>
                                        <option disabled value="">Choisissez...</option>
                                        <option value="CDI">CDI</option>
                                        <option value="CDD">CDD</option>
                                </select>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="title">Heures de travail</label>
                                <input type="number" class="form-control" v-model="form.workhour" autocomplete="off" required  placeholder="0" disabled>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="title">Salaire de base de l'employé</label>
                                <input type="number" class="form-control" v-model="form.base_salary" autocomplete="off" required  placeholder="0" disabled>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="title">Bonus de l'employé</label>
                                <input type="number" class="form-control" v-model="form.bonus" autocomplete="off" required  placeholder="0" disabled>
                            </div>
                        </div>

            
                    </div>                    
                </div>
                <div class="col-md-10 mx-auto">
                    
                    <div class="form-group ">
                            <label class="title">Commentaires</label>
                            <textarea
                                v-model="form.comment"
                                name="comment"
                                id="comment"
                                cols="30"
                                rows="3"
                                class="form-control"
                                placeholder="Entrer votre commentaire"
                                disabled
                            ></textarea>
                        </div>
                </div>
                <br><br><hr><br>
                <div class="row">
                    <div class="col-md-6">
                        <div class="title-row">Congés</div>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                <tr class="table-success">
                                        <th>Désignations</th>
                                        <th>Nombres de jours</th>
                                        <th>Débuts</th>
                                        <th>Fins</th>
                                        <th>Détails</th>
                                        
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(vacation, i) in vacations" :key="i" >
                                    <td v-if="vacation.name">{{ vacation.name }}</td>
                                    <td v-else>---</td>
                                    <td v-if="vacation.days_count">{{ vacation.days_count }}</td>
                                    <td v-else>---</td>
                                    <td>{{vacation.date_start}}</td>
                                    <td>{{vacation.date_end}}</td>
                                    <td class="text-center"><NuxtLink :to="'/conges/voir/'+vacation.id"><i class="fa fa-eye cursor-pointer" aria-hidden="true"></i></NuxtLink></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="title-row">Prets</div>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                <tr class="table-danger">
                                        <th>Dates de pret</th>
                                        <th>Montants</th>
                                        <th>Tranches</th>
                                        <th>Reste à payer</th>
                                        <th>Dates limites</th>
                                        
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(loan, i) in loans" :key="i" >
                                    <td>{{ loan.date_loan }}</td>
                                    <td>{{ loan.amount }}</td>
                                    <td>{{ loan.tranche }}</td>
                                    <td>{{loan.rest}}</td>
                                    <td v-if="loan.date_limit">{{loan.date_limit}}</td>
                                    <td v-else>---</td>
                                    <!-- <td><NuxtLink :to="'/prets/voir/'+loan.id"><i class="fa fa-eye cursor-pointer" aria-hidden="true"></i></NuxtLink></td> -->
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
    
        </div>
         <!-- Footer -->
      <footer class="text-center text-lg-start bg-dark text-white">
          <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
        <!-- Section: Social media -->
        <section
          class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        >
          <!-- Left -->
          <div class="me-5 d-none d-lg-block">
            <img src="../../../static/images/logo.png" class="logo-img" alt="">
          </div>
          <!-- Left -->
    
          <!-- Right -->
          <div>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-github"></i>
            </a>
          </div>
          <!-- Right -->
        </section>
        <!-- Section: Social media -->
    
    
        <!-- Copyright -->
        <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05);">
          Copyright © 2022 - Tous droits réservés TocManager-dS
        </div>
        <!-- Copyright -->
      </footer>
    <!-- Footer -->
    </div>
    </template>
    
    
    <script>
    import moment from "moment";
    import Sidebar from '../../sidebar.vue'
    import User_info from "~/pages/user_info.vue";
    export default {
        layout: "voir",
        components: {
        Sidebar,
        User_info
    },
    
        data () {
          return {
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
                    hierachy: "",
                    aucun: 'Relié à aucun supérieur hiérarchique',
                    contract_kind: '',
                    workhour: '',
                    base_salary: '',
                    bonus: '',
                    comment: '',
                    user_id:'',
                    compagnie_id: ''
                },
                employes: "",
                loans: '',
                vacations: '',
                users: "",
                employe: "",
                modify: ""
          }
        },
    
        mounted(){
          this.modify =this.$route.params.id
          this.users = this.$auth.$state.user.roles;
          this.compagny = localStorage.getItem('auth.company_id');
          this.recupEmploye()
          this.AllEmploye()
        },
    
        methods: {
    
            generatePdf() {
                window.print();
            },

            AllEmploye(){
                this.$axios.get('/employees',{params: {
                    compagnie_id: localStorage.getItem('auth.company_id'),
                    is_paginated: 0
                }
                })
                .then(response => {
                    // console.log(response.data);
                this.employes = response.data.data.data 
                })
            },
    
            recupEmploye(){
                this.$axios.get('/employees/'+ this.$route.params.id,{
                    params: {
                        compagnie_id: localStorage.getItem('auth.company_id')
                    }
                })
                .then(response => {
                    // console.log(response.data.data )
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
                    this.form.hierachy = employe.hierachy
                    this.form.contract_kind = employe.contract_kind
                    this.form.workhour = employe.workhour
                    this.form.base_salary = employe.base_salary
                    this.form.bonus = employe.bonus
                    this.form.comment = employe.comment
                    this.loans = employe.loans
                    this.vacations = employe.vacations
                    
                })
    
            },
        },
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
   .title_voir{
        border: 1px solid transparent;
        background-color: rgb(215, 215, 215);
        padding: 15px;
        margin: 50px;
   }
    
   
   .form-group{
        margin-top: 3%;
    }
    
    .title{
        margin: 1% 0;
        font-size: 16px;
        font-weight: 700;
    }
    
    .custom-btn {
      width: 180px;
      height: 40px;
      color: #fff;
      border-radius: 5px;
      padding: 10px 25px;
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
       box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
       7px 7px 20px 0px rgba(0,0,0,.1),
       4px 4px 5px 0px rgba(0,0,0,.1);
      outline: none;
    }
    .btn-3 {
      background: rgb(0,172,238);
    background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
      width: 180px;
      height: 40px;
      line-height: 42px;
      padding: 0;
      border: none;
      
    }
    .btn-3 span {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    .btn-3:before,
    .btn-3:after {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
       background: rgba(2,126,251,1);
      transition: all 0.3s ease;
    }
    .btn-3:before {
      height: 0%;
      width: 2px;
    }
    .btn-3:after {
      width: 0%;
      height: 2px;
    }
    .btn-3:hover{
       background: transparent;
      box-shadow: none;
    }
    .btn-3:hover:before {
      height: 100%;
    }
    .btn-3:hover:after {
      width: 100%;
    }
    .btn-3 span:hover{
       color: rgba(2,126,251,1);
    }
    .btn-3 span:before,
    .btn-3 span:after {
      position: absolute;
      content: "";
      left: 0;
      bottom: 0;
       background: rgba(2,126,251,1);
      transition: all 0.3s ease;
    }
    .btn-3 span:before {
      width: 2px;
      height: 0%;
    }
    .btn-3 span:after {
      width: 0%;
      height: 2px;
    }
    .btn-3 span:hover:before {
      height: 100%;
    }
    .btn-3 span:hover:after {
      width: 100%;
    }
    
    </style>
    