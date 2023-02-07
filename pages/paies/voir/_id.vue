<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Paies </h3>
          <Userinfo />
        </nav>
    
    
        <div class="app-main__outer py-5 px-2">
            <h4 class="impres">Informations sur le bulletin de paie</h4><hr class="impres">
            <form action="">
                <div class="p-3">
                    <div class="row entete" v-if="employe">
                        <div class="col-md-6 compagnie">
                            <div class="compagnie-img">
                                <img :src="'http://localhost:8000/'+employe.compagnie.logo" alt="profil" v-if="employe.compagnie.logo">
                            </div>
                            <div class="cadre_compagnie">
                                <p class="text-uppercase"><b>{{ employe.compagnie.name }}</b></p>
                                <div>
                                    <p class="text-uppercase" v-if="employe.compagnie.address">ADRESSE: {{ employe.compagnie.address }}</p>
                                    <p class="text-uppercase" v-if="employe.compagnie.phone">TEL: {{ employe.compagnie.phone }}</p>
                                </div>
                                <div>
                                    <p class="text-uppercase" v-if="employe.compagnie.cnss"><b>N° CNSS: <span>{{employe.compagnie.cnss }}</span></b></p>
                                    <p class="text-uppercase"><b>NUMERO IFU: <span></span></b></p>
                                    <p class="text-uppercase"><b>RCCM: <span v-if="employe.compagnie.rccm">{{ employe.compagnie.rccm }}</span></b></p>
                                </div>
                            </div>

                            <div class="mt-4">
                                <div class="row my-2">
                                    <div class="col-md-3">
                                        <b>Emploi: </b>
                                    </div>
                                    <div class="text-uppercase col-md-6" v-if="employe.employee.position_hield">
                                        <b>{{ employe.employee.position_hield }}</b>
                                    </div>
                                    <div class="col-md-2">
                                        <b>Indice: </b>
                                    </div>
                                    <div class="col-md-1">
                                        <b></b>
                                    </div>
                                </div>
                                
                                <div class="row my-2">
                                    <div class="col-md-3">
                                        <b>Qualification: </b>
                                    </div>
                                    <div class="text-uppercase col-md-6" >
                                        <b></b>
                                    </div>
                                    <div class="col-md-2">
                                        <b>Niveau: </b>
                                    </div>
                                    <div class="col-md-1">
                                        <b></b>
                                    </div>
                                </div>
                                
                                <div class="row my-2">
                                    <div class="col-md-3">
                                        <b>Département: </b>
                                    </div>
                                    <div class="text-uppercase col-md-6" v-if="employe.employee.department">
                                        <b>{{ employe.employee.department }}</b>
                                    </div>
                                    <div class="col-md-2">
                                        <b>Coef: </b>
                                    </div>
                                    <div class="col-md-1">
                                        <b></b>
                                    </div>
                                </div>
                                
                                <div class="row my-2">
                                    <div class="col-md-3">
                                        <b>Catégorie: </b>
                                    </div>
                                    <div class="text-uppercase col-md-6">
                                        <b></b>
                                    </div>
                                    <div class="col-md-2">
                                        <b>Horaire: </b>
                                    </div>
                                    <div class="col-md-1">
                                        <b></b>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <h2 class="text-center">BULLETIN DE PAIE</h2>
                            <div class="text-center">
                                <p><b>Période du {{ employe.date_start }} au {{ employe.date_end }}</b></p>
                                <p><b>Paiement le {{ employe.date_end }} par ...</b></p>
                            </div>
                            <div class="cadre_employe">
                                <p>Matricule <b v-if="employe.employee.reg_number">{{ employe.employee.reg_number }}</b></p>
                                <p class="text-uppercase" v-if="employe.employee.sex == 'M'"><b>M {{ employe.employee.last_name }} {{ employe.employee.first_name }}</b></p>
                                <p class="text-uppercase" v-else><b>Mme {{ employe.employee.last_name }} {{ employe.employee.first_name }}</b></p>
                                <p class="text-uppercase" v-if="employe.employee.address"><b> {{ employe.employee.address }} </b></p>
                                
                                <div class="mt-4">
                                    <p class="text-uppercase" v-if="employe.employee.workplace"><b> {{ employe.employee.workplace }} </b></p>
                                    <p class="" v-if="employe.employee.hiring_date"><b>Date d'embauche: </b> {{ employe.employee.hiring_date }}</p>
                                    <p class="" v-if="employe.employee.cnss"><b>N° CNSS: </b> {{ employe.employee.cnss }}</p>
                                    <p class="" v-if="employe.employee.children_count"><b>Nbre d'enfants en Charge:</b> {{ employe.employee.children_count }} </p>
                                
                                </div>
                            </div>
                        </div>
                    </div> 
                    <br>
                    <div class="col">
                        <div class="table-responsive" v-if="employe">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2" class="col_percents">Désignation</th>
                                        <th rowspan="2" class="col_percent">Nombre</th>
                                        <th rowspan="2" class="col_percente">Base</th>  
                                        <th colspan="3">Part salariale</th>
                                        <th colspan="2">Part patronale</th>                    
                                    </tr>
                                    <tr>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percen">Gain</th>
                                        <th class="col_percent">Retenue</th>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Retenue</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="(ligne, index) in form.lignes" :key="index">
                                        <td>{{ ligne.designation }}</td>
                                        <td>{{ligne.nombre}}</td> 
                                        <td>{{ligne.base}}</td>
                                        <td>{{ligne.part_salariale.taux}}</td>
                                        <td>{{ligne.part_salariale.gain}}</td>         
                                        <td></td>       
                                        <td></td>     
                                        <td></td>
                                    </tr>
                                    <tr v-for="(bonus, index) in form.Bonus" :key="index">
                                        <td>{{ bonus.designation }}</td>
                                        <td>{{bonus.nombre}}</td> 
                                        <td>{{bonus.base}}</td>
                                        <td>{{bonus.part_salariale.taux}}</td>
                                        <td>{{bonus.part_salariale.gain}}</td>         
                                        <td></td>       
                                        <td></td>     
                                        <td></td>
                                    </tr>
                                    <tr v-for="(retain, j) in form.retains" :key="j">
                                        <td>{{ retain.designation }}</td>
                                        <td></td> 
                                        <td>{{retain.base}}</td>
                                        <td>{{retain.part_salariale.taux}}</td>
                                        <td></td>         
                                        <td>{{retain.part_salariale.retenue}}</td>       
                                        <td></td>     
                                        <td></td>
                                    </tr>
                                    <tr v-for="(cotisation, j) in form.cotisations" :key="j">
                                        <td>{{ cotisation.designation }}</td>
                                        <td></td> 
                                        <td>{{cotisation.base}}</td>
                                        <td></td>
                                        <td></td>         
                                        <td></td>       
                                        <td>{{cotisation.part_patronale.taux}}</td>     
                                        <td>{{cotisation.part_patronale.retenue}}</td>
                                    </tr>
                                    <!-- <tr v-for="(patronal_retain, j) in form.patronal_retains" :key="j">
                                        <td>{{ patronal_retain.designation }}</td>
                                        <td></td> 
                                        <td>{{patronal_retain.base}}</td>
                                        <td></td>
                                        <td></td>         
                                        <td></td>       
                                        <td>{{patronal_retain.part_patronale.taux}}</td>     
                                        <td>{{patronal_retain.part_patronale.retenue}}</td>
                                    </tr> -->
                                </tbody>
                            </table>   
                        </div><br>
                    </div> 
                    
                    <br>
                    <div class="title-row">Recapitulatif</div>
                    <div class="d-flex align-items-end" v-if="employe">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2">Cumuls</th>
                                        <th rowspan="2">Salaire brut</th>
                                        <th rowspan="2">Charges salariales</th>
                                        <th rowspan="2">Charges patronales</th>  
                                        <th rowspan="2">Avantages en nature</th>
                                        <th rowspan="2">Net imposable</th>   
                                        <th rowspan="2">Heures travaillées</th> 
                                        <th rowspan="2">Heures supplémentaires</th>   
                                        <th></th>
                                        <th class="mx-2">NET A PAYER</th>               
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr>
                                        <td><strong>Période</strong></td>
                                        <td>{{ employe.brut_salary }}</td>
                                        <td>{{ employe.employee_cotisation }}</td>
                                        <td>{{ employe.company_cotisation }}</td>
                                        <td></td>
                                        <td>{{ employe.net_salary }}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="mx-2"><b>{{ employe.net_salary }}</b></td>
                                    </tr>
                                    <tr v-if="infos">
                                        <td><strong>Année</strong></td>
                                        <td>{{ infos.total_brut_salary }}</td>
                                        <td>{{ infos.total_salary_charge }}</td>
                                        <td>{{ infos.total_patronal_charge }}</td>
                                        <td></td>
                                        <td>{{ infos.total_net_salary }}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <!-- <td>{{ infos.total_net_salary }}</td> -->
                                    </tr>
                                </tbody>
                            </table>   
                        </div>
                    </div>

                    <div class="row" v-if="employe">
                        <div class="col-md-6 table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2">Compteurs</th>
                                        <th rowspan="2">Pris</th>
                                        <th rowspan="2">Restant</th>
                                        <th rowspan="2">Acquis</th>               
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr>
                                        <td><strong>Congés <br> 
                                            Repos compensateur</strong> 
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>

                        <div class="col-md-3">
                            <p class="text-center mt-2"><strong>Dates de congés</strong></p>
                            <div v-if="employe.employee.vacations">
                                <div v-for="(vacation, i) in employe.employee.vacations" :key="i"><b>Du </b> {{vacation.date_start }} <b> Au </b> {{ vacation.date_end }}</div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="row mt-2">
                                    <div class="col-md-8">ABSENCES INJUST</div>
                                    <div class="col-md-4"></div>
                            </div>
                            <div class="row mt-2">
                                    <div class="col-md-8">ABSENCES PAYEES</div>
                                    <div class="col-md-4"></div>
                            </div>
                            <div class="row mt-2">
                                    <div class="col-md-8">ABSENCES TOTALES</div>
                                    <div class="col-md-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mx-auto impres">
                    <button class="btn btn-outline-dark col-md-12 p-3 " v-on:click.prevent="imprim()">Imprimer Fiche de paie</button>
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
        Copyright © 2022 - Tous droits réservés TocManager
      </div>
      <!-- Copyright -->
    </footer>
  <!-- Footer -->
    </div>
    </template>
    
    <script>
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import Sidebar from '../../sidebar.vue'
    import Userinfo from '../../user_info.vue'
    export default {
        layout: "voir",
        auth:true,
        components: {
            Sidebar,
            Userinfo,
            vSelect
            
        },
        data () {
            return{
                form: {
                    date_start: '',
                    date_end: '',
                    employee_id: '',
                    lignes: [],
                    Bonus: [],
                    retains: [],
                    cotisations: []
                },
                employe: "",
                employe_concerne: "",
                infos: "",
                types: '',
                errors: [],
                error: null,
                id_employe: '',
                date_facture: ''
            }
        },
    
         mounted(){
            this.refresh()
            this.infoAnnee()
        },
    
        methods: {
            async infoAnnee() {
                await this.$axios.get('/payslips/'+ this.$route.params.id,{
                    params: {
                    compagnie_id: localStorage.getItem('auth.company_id')
                    }
                })
                .then(response => {
                    // console.log(response.data.data)
                    this.date_facture = response.data.data.date_start
                    this.id_employe = response.data.data.employee.id
                    this.$axios.get('/employees/'+ this.id_employe +'/salary',{
                        params: {
                            compagnie_id: localStorage.getItem('auth.company_id'),
                            date: this.date_facture
                        }
                    })
                    .then(response => {
                        // console.log(response.data.data)
                        this.infos = response.data.data[0]
                    })  
                })
            },


            refresh() {
                this.$axios.get('/payslips/'+ this.$route.params.id,{
                    params: {
                    compagnie_id: localStorage.getItem('auth.company_id')
                    }
                })
                .then(response => {
                    // console.log(response.data.data)
                    this.employe = response.data.data
                    // this.id_employe = this.employe.id
                    this.form.lignes = this.employe.sup_hours
                    this.form.Bonus = this.employe.bonus
                    this.form.retains = this.employe.retained
                    this.form.cotisations = this.employe.patronal_retained
                    let salaire = this.employe.base_salary
                    this.form.lignes.unshift(
                        {
                            designation: "SALAIRE DE BASE MENSUEL", 
                            nombre: 1, 
                            base: salaire, 
                            part_salariale: {
                                taux: 100,
                                gain: salaire,
                            }, 
                        });
                })          
            },

            imprim() {
                window.print() ;
            },
        },
      
    }
    </script>
    
    <style scoped>

    
  @media print {
    /* *{
        margin: 0;
    } */
    .navbar, .impres {
      display: none !important;
    }
   
    footer{
      display: none !important;
    }
    
    @page {
          margin-left: 0;
          margin-right: 0;
          margin-top: 0;
          margin-bottom: 0;
    }
  }

    .compagnie-img{
        width: 100%;
        height: 100px;
    }

    .compagnie img{
        max-height: 90px;
    }

    .cadre_compagnie, .cadre_employe{
        border: 1px solid black;
        padding: 5px;
    }

    .entete{
        font-size: 13px;
    }

    .text-uppercase{
        text-transform: uppercase;
    }

    .col_percent{
        width: 10%;
    }

    .col_percente{
        width: 13%;
    }

    .col_percen{
        width: 13%;
    }

    .col_percents{
        width: 24%;
    }

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
        margin-top: 2%;
    }
    
    .title{
        margin: 1% 0;
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
        margin-top: 2%;
        text-align: center;
        justify-content: center;
        font-size: 13px;
    
    }      
    input::placeholder {
        font-size: 15px;
        opacity: 0.5;
    }
    
    </style>