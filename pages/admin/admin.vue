<template>
    <div>    
    <link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    
    <nav class="navbar navbar-expand-lg bg-white shadow p-3">
        <div class="container">
                <img src="/images/logo.png" class="logo-img" alt="">
            
            <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon "></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0"></ul> -->
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                <li class="nav-item mx-4">
                    <NuxtLink to="/login" class="nav-link fsize-2">Tableau de Bord</NuxtLink>
                </li>
                <li class="nav-item mx-4">
                    <NuxtLink to="/" class="nav-link fsize-2 ">Produits</NuxtLink>
                </li>
                <li class="nav-item mx-4">
                    <NuxtLink to="/" class="nav-link fsize-2">Nos Services</NuxtLink>
                </li>
                <div class="bas-page">
                    <div class="custom-btn btn-5" @click="logout" data-bs-dismiss="offcanvas">
                    <!-- <i class='bx bx-log-out'></i> -->
                    Déconnexion</div>    
                </div>
                <!-- <li class="nav-item">
                    <NuxtLink to="/contact" class="nav-link">Contact Us</NuxtLink>
                </li> -->
                <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Autres
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Contactez nous</a></li>
                    <li><a class="dropdown-item" href="#">A propos de nous</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Aide</a></li>
                </ul>
                </li> -->
                <!-- <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
                </li> -->
            </ul>
            <!-- <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form> -->
            </div>
        </div>
    </nav>
        <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">  
            <div class="app-main__outer p-5">
                <div class="app-main__inner">
                    <div class="app-page-title">
                        <div class="page-title-wrapper">
                            <div class="page-title-heading">
                                <div class="page-title-icon">
                                    <i class="pe-7s-car icon-gradient bg-mean-fruit">
                                    </i>
                                </div>
                                <div>Tableau de Bord Administrateur
                                    <div class="page-title-subheading">Vue générale de toutes les entités
                                    </div>
                                </div>
                            </div>
                            <div class="page-title-actions">
                                <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" class="btn-shadow mr-3 btn btn-dark">
                                    <i class="fa fa-star"></i>
                                </button>
                                <div class="d-inline-block dropdown">
                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-shadow dropdown-toggle btn btn-info">
                                        <span class="btn-icon-wrapper pr-2 opacity-7">
                                            <i class="fa fa-business-time fa-w-20"></i>
                                        </span>
                                        Raccourcis
                                    </button>
                                  
                                </div>
                            </div>    
                        </div>
                    </div>     
                    <form action="action" method="POST">
                        <div class="range">
                        <input class="form-control" type="date"  v-model="form.date_debut"  required />  
                        <input  class="form-control" type="date"  v-model="form.date_fin"  required />  
                        <div class="visualiser" @click="Visualiser()"><i class="fa fa-eye" aria-hidden="true"></i></div>    
                        </div>  
                    </form>       
                    <div class="row">
                        <div class="col-md-6 col-xl-3 ">
                            <div class="card mb-3 widget-content bg-midnight-bloom">
                                <div class="widget-content-wrapper text-white p-5">
                                    <div class="widget-content-left">
                                        <div class="widget-heading">Sommes Achats</div>
                                        <div class="widget-subheading">Montant total des achats</div>
                                    </div>
                                    <div class="widget-content-right">
                                        <div class="widget-numbers text-white"><span>{{montant_buys}}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content bg-arielle-smile">
                                <div class="widget-content-wrapper text-white p-5">
                                    <div class="widget-content-left">
                                        <div class="widget-heading">Sommes Ventes</div>
                                        <div class="widget-subheading">Montant total des ventes</div>
                                    </div>
                                    <div class="widget-content-right">
                                        <div class="widget-numbers text-white"><span>{{montant_sells}} </span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content bg-grow-early">
                                <div class="widget-content-wrapper text-white p-5">
                                    <div class="widget-content-left">
                                        <div class="widget-heading">Sommes Encaissements</div>
                                        <div class="widget-subheading">Montant total des encaissements</div>
                                    </div>
                                    <div class="widget-content-right">
                                        <div class="widget-numbers text-white"><span>{{montant_encaissements}} </span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content bg-premium-dark">
                                <div class="widget-content-wrapper text-white p-5">
                                    <div class="widget-content-left">
                                        <div class="widget-heading">Sommes Décaissements</div>
                                        <div class="widget-subheading">Montant total des décaissements </div>
                                    </div>
                                    <div class="widget-content-right">
                                        <div class="widget-numbers text-white"><span>{{montant_decaissements}}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Utilisateurs</div>
                                            <div class="widget-subheading">Nombre d'utilisateurs connectés</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-danger">{{buys}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Clients</div>
                                            <div class="widget-subheading">Nombre de clients inscrits</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-danger">{{clients}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Fournisseurs</div>
                                            <div class="widget-subheading">Nombre de fournisseurs inscrits</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-danger">{{suppliers}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Compagnies</div>
                                            <div class="widget-subheading">Nombre de compagnies inscrits</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-danger">{{compagnies}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Achats</div>
                                            <div class="widget-subheading">Nombre d'achats éffectués</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">{{buys}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Ventes</div>
                                            <div class="widget-subheading">Nombre de ventes éffectuées</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">{{sells}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Encaissements</div>
                                            <div class="widget-subheading">Nombre total d'encaissements enregistrés</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">{{encaissements}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-3">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Décaissements</div>
                                            <div class="widget-subheading">Nombre total de décaissements enregistrés</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">{{decaissements}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 col-xl-6">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Produits</div>
                                            <div class="widget-subheading">Nombre de produits en stock</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-warning">{{products}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-6">
                            <div class="card mb-3 widget-content">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper p-4">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Catégories</div>
                                            <div class="widget-subheading">Nombre de catégories enregistrées</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-warning">{{categories}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    
            </div>
            
        </div>
    </div>
    
    
    </template>
    
    <script>
    import moment from "moment";
    import Chart from 'chart.js/auto';
    export default {
        // head() {
        //   return {
        //     script: [
        //       {
        //         src: "https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
        //       },
        //       {
        //         src: "http://maps.google.com/maps/api/js?sensor=true"
        //       },
        //       {
        //         src: "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"
        //       }
        //     ],
    
        //   }
        // },
        layout: "empty",
        auth:true,
        data (){
        return{
          users: '',
          suppliers: '',
          sells: '',
          products: '',
          encaissements: '',
          decaissements: '',
          compagnies: '',
          clients: '',
          categories: '',
          buys: '',
          montant_sells: '',
          montant_buys: '',
          montant_encaissements: '',
          montant_decaissements: '',
          form:{
            date_debut: moment().format("yyyy-MM-D"),
            date_fin: moment().format("yyyy-MM-D")
          }
        }
          
      },
    
        middleware:'auth',
        mounted(){      
            this.$axios.post('/stats',{
                  date_debut: this.form.date_debut,
                  date_fin: this.form.date_fin
            }).then(response => {console.log(response.data);
    
               this.users  = response.data.data.total_users
               this.suppliers = response.data.data.total_suppliers
               this.clients = response.data.data.total_clients
               this.categories = response.data.data.total_categories
               this.products = response.data.data.total_products
               this.compagnies = response.data.data.total_compagnies
               this.encaissements  = response.data.data.total_encaissements
               this.decaissements = response.data.data.total_decaissements
               this.buys = response.data.data.total_buys
               this.sells = response.data.data.total_sells
               this.montant_buys = response.data.data.montant_buys
               this.montant_sells = response.data.data.montant_sells
               this.montant_encaissements = response.data.data.montant_encaissements
               this.montant_decaissements = response.data.data.montant_decaissements
    
    
            // var VV = this.volume_vente
            // console.log(VV)
            // var dd = 'Intervalle de dates'
            // const ctx = document.getElementById('myChart');
            // const myChart = new Chart(ctx, {
            // type: 'bar',
            // data: {
            //     labels: [dd],
            //     datasets: [{
            //         label: '# ventes effectuées',
            //         data: [VV],
            //         backgroundColor: 'rgba(153, 102, 255, 0.2)',
            //         borderColor:'rgba(153, 102, 255, 1)',
            //         borderWidth: 1
            //     }]
            // },
            // options: {
            //     scales: {
            //         y: {
            //             beginAtZero: true
            //         }
            //     }
            // }
            // });
            // myChart;
            // var q1 = this.courbe_vente[0].amount
            // var q2 = this.courbe_vente[1].amount
            // var q3 = this.courbe_vente[2].amount
            // var q4 = this.courbe_vente[3].amount
            // var q5 = this.courbe_vente[4].amount
            // var q6 = this.courbe_vente[5].amount
            // var q7 = this.courbe_vente[6].amount
    
            // var Q1 = this.courbe_achat[0].amount
            // var Q2 = this.courbe_achat[1].amount
            // var Q3 = this.courbe_achat[2].amount
            // var Q4 = this.courbe_achat[3].amount
            // var Q5 = this.courbe_achat[4].amount
            // var Q6 = this.courbe_achat[5].amount
            // var Q7 = this.courbe_achat[6].amount
    
            // var d1 = moment(this.courbe_vente[0].date_sell).format("YYYY-MM-D")
            // var d2 = moment(this.courbe_vente[1].date_sell).format("YYYY-MM-D")
            // var d3 = moment(this.courbe_vente[2].date_sell).format("YYYY-MM-D")
            // var d4 = moment(this.courbe_vente[3].date_sell).format("YYYY-MM-D")
            // var d5 = moment(this.courbe_vente[4].date_sell).format("YYYY-MM-D")
            // var d6 = moment(this.courbe_vente[5].date_sell).format("YYYY-MM-D")
            // var d7 = moment(this.courbe_vente[6].date_sell).format("YYYY-MM-D")
    
            //   const ctz = document.getElementById('myChartVente');
            //   const myChartVente = new Chart(ctz, {
            //     type: 'line',
            //     data: {
            //         labels: [d7, d6, d5, d4, d3, d2, d1],
            //         datasets: [{
            //             label: '# montant vente',
            //             data: [q7, q6, q5, q4, q3, q2, q1],
            //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //             borderColor:'rgba(255, 99, 132, 1)',
            //             borderWidth: 3,
            //             tension: 0.5,
            //         },
            //         {
            //             label: '# montant achat',
            //             data: [Q7, Q6, Q5, Q4, Q3, Q2, Q1],
            //             backgroundColor: 'rgba(54, 162, 235, 0.2)',
            //             borderColor: 'rgba(54, 162, 235, 1)',
            //             borderWidth: 3,
            //             tension: 0.5,
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             y: {
            //                 beginAtZero: false
            //             }
            //         }
            //     }
            //   });
            //   myChartVente;
    
            // var Q1 = this.courbe_achat[0].amount
            // var Q2 = this.courbe_achat[1].amount
            // var Q3 = this.courbe_achat[2].amount
            // var Q4 = this.courbe_achat[3].amount
            // var Q5 = this.courbe_achat[4].amount
            // var Q6 = this.courbe_achat[5].amount
            // var Q7 = this.courbe_achat[6].amount
    
            // var D1 = moment(this.courbe_achat[0].date_buy).format("YYYY-MM-D")
            // var D2 = moment(this.courbe_achat[1].date_buy).format("YYYY-MM-D")
            // var D3 = moment(this.courbe_achat[2].date_buy).format("YYYY-MM-D")
            // var D4 = moment(this.courbe_achat[3].date_buy).format("YYYY-MM-D")
            // var D5 = moment(this.courbe_achat[4].date_buy).format("YYYY-MM-D")
            // var D6 = moment(this.courbe_achat[5].date_buy).format("YYYY-MM-D")
            // var D7 = moment(this.courbe_achat[6].date_buy).format("YYYY-MM-D")
    
            //   const cty = document.getElementById('myChartAchat');
            //   const myChartAchat = new Chart(cty, {
            //     type: 'line',
            //     data: {
            //         labels: [D7, D6, D5, D4, D3, D2, D1],
            //         datasets: [{
            //             label: '# montant',
            //             data: [Q7, Q6, Q5, Q4, Q3, Q2, Q1],
            //             backgroundColor: 'rgba(54, 162, 235, 0.2)',
            //             borderColor: 'rgba(54, 162, 235, 1)',
            //             borderWidth: 3,
            //             tension: 0.5,
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             y: {
            //                 beginAtZero: false
            //             }
            //         }
            //     }
            //   });
            //   myChartAchat;
         })
          // console.log(this.$auth);
          // console.log(this.$auth.$storage.getUniversal('company_id'));
        },
    
        methods:{
            moment: function () {
              return moment();
            },
            // picker(){
            //   let recap = document.createElement('script') 
            //   recap.setAttribute('src', 'https://cdn.jsdelivr.net/jquery/latest/jquery.min.js') 
            //   recap.setAttribute('src', 'https://cdn.jsdelivr.net/momentjs/latest/moment.min.js') 
            //   recap.setAttribute('src', 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js')
            //   document.head.appendChild(recap);
            //     $('input[name="daterange"]').daterangepicker({
            //     opens: 'left'
            //   }, function(start, end, label) {
            //     console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            //   });
            // },
    
            async logout(){
                this.$auth.logout();
                this.$router.push('/login');
            },
            
            Visualiser(){
                this.$axios.post('/tableau/de/bord',{
                    date_debut: this.form.date_debut,
                    date_fin: this.form.date_fin
                }).then(response => {console.log(response.data);
    
                    this.volume_vente  = response.data.data[0][0].volume_vente
                    this.chiffre_affaire = response.data.data[1][0].chiffre_d_affaire
                    this.encaissement = response.data.data[2][0].encaissement
                    this.decaissement = response.data.data[3][0].decaissement
                    this.produits_vendus = response.data.data[4]
                    this.produits_achetes = response.data.data[5]
                    this.dernieres_ventes  = response.data.data[6]
                    this.courbe_vente = response.data.data[7]
                    this.courbe_achat = response.data.data[8]
    
    
                    var VV = this.volume_vente
                    console.log(VV)
                    var dd = 'Intervalle de dates'
                    const cty = document.getElementById('myChart');
                    const myChart = new Chart(cty, {
                    type: 'bar',
                    data: {
                        labels: [dd],
                        datasets: [{
                            label: '# ventes éffectuées',
                            data: [VV],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor:'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                    });
                    myChart;
                    var q1 = this.courbe_vente[0].amount
                    var q2 = this.courbe_vente[1].amount
                    var q3 = this.courbe_vente[2].amount
                    var q4 = this.courbe_vente[3].amount
                    var q5 = this.courbe_vente[4].amount
                    var q6 = this.courbe_vente[5].amount
                    var q7 = this.courbe_vente[6].amount
    
                    var Q1 = this.courbe_achat[0].amount
                    var Q2 = this.courbe_achat[1].amount
                    var Q3 = this.courbe_achat[2].amount
                    var Q4 = this.courbe_achat[3].amount
                    var Q5 = this.courbe_achat[4].amount
                    var Q6 = this.courbe_achat[5].amount
                    var Q7 = this.courbe_achat[6].amount
    
                    var d1 = moment(this.courbe_vente[0].date_sell).format("YYYY-MM-D")
                    var d2 = moment(this.courbe_vente[1].date_sell).format("YYYY-MM-D")
                    var d3 = moment(this.courbe_vente[2].date_sell).format("YYYY-MM-D")
                    var d4 = moment(this.courbe_vente[3].date_sell).format("YYYY-MM-D")
                    var d5 = moment(this.courbe_vente[4].date_sell).format("YYYY-MM-D")
                    var d6 = moment(this.courbe_vente[5].date_sell).format("YYYY-MM-D")
                    var d7 = moment(this.courbe_vente[6].date_sell).format("YYYY-MM-D")
    
                    const ctz = document.getElementById('myChartVente');
                    const myChartVente = new Chart(ctz, {
                        type: 'line',
                        data: {
                            labels: [d7, d6, d5, d4, d3, d2, d1],
                            datasets: [{
                                label: '# montant vente',
                                data: [q7, q6, q5, q4, q3, q2, q1],
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor:'rgba(255, 99, 132, 1)',
                                borderWidth: 3,
                                tension: 0.5,
                            },
                            {
                                label: '# montant achat',
                                data: [Q7, Q6, Q5, Q4, Q3, Q2, Q1],
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 3,
                                tension: 0.5,
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: false
                                }
                            }
                        }
                    });
                    myChartVente;
            })
            }
            
        },
     
    }
    </script>
    
    <style>
    
    .range{
      display: flex;
      border: 1px solid gainsboro;
      border-radius: 10px;
      padding: 1% 2%;
      margin-bottom: 5%;
      font-size: 18px;
    
    }
    
    .range input{
      margin-right: 2%;
    }
    
    .range .visualiser{
      border: 1px solid black;
      padding: 5px 8px;
      cursor: pointer;
      font-weight: normal;
      border-radius: 10px;
      font-size: 15px;
    }
    
    .range .visualiser:hover{
      background-color: rgb(233, 243, 251);
    }
    
    </style>