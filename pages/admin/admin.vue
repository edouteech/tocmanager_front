<template>
    <div>    
    <link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Achats </h3>
    </nav>

        <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">  
            <div class="app-main__outer py-5 px-2">
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
                                <div class="widget-content-wrapper text-white p-4">
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
                                <div class="widget-content-wrapper text-white p-4">
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
                                <div class="widget-content-wrapper text-white p-4">
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
                                <div class="widget-content-wrapper text-white p-4">
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
                                            <div class="widget-numbers text-danger">{{users}}</div>
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
    import Sidebar from './sidebar.vue'
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
        components:{
            Sidebar,
        },
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
            date_debut: "",
            date_fin: ""
          }
        }
          
      },
    
        middleware:'auth',
        mounted(){      
            this.$axios.post('/stats',{
                  date_debut: this.form.date_debut,
                  date_fin: this.form.date_fin
            }).then(response => {
                // console.log(response.data);
    
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
    
    
         })
        },
    
        methods:{
            moment: function () {
              return moment();
            },
            
    
            async logout(){
                this.$auth.logout();
                this.$router.push('/login');
            },
            
            Visualiser(){
                this.$axios.post('/stats',{
                  date_debut: this.form.date_debut,
                  date_fin: this.form.date_fin
            }).then(response => {
                // console.log(response.data);
    
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
    
    
/* .bas-page{
    margin-top: 10%;
    display: flex;    
    border: 1px solid rgb(88, 87, 87);
    padding: 10px;
} */

.bas-page img{
    width: 45px;
    border: 1px solid transparent;
    border-radius: 100%;
    cursor: pointer;
}
.bas-page .user_name{
    font-size: 12px;
    padding: 10px;
    color: black;
}

.bas-page .btn{
    margin-left: 7%;
    padding: 10px;
    cursor: pointer;
    border: 1px solid ;
    background-color: red;
    border-radius: 10px;
    font-size: 13px;
     color: rgba(255, 255, 255, 0.86);
}

.bas-page .btn:hover{
     background-color: rgba(255, 255, 255, 0.86);
     color: red;
}


.custom-btn {
    width: 130px;
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

.btn-5 {
    text-align: center;
    width: 130px;
    height: 40px;
    line-height: 42px;
    padding: 0;
    border: none;
    background: rgb(255,27,0);
    background: linear-gradient(0deg, rgba(255,27,0,1) 0%, rgba(251,75,2,1) 100%);
  }

.btn-5:hover {
    color: #f0094a;
    background: transparent;
     box-shadow:none;
  }

.btn-5:before,
.btn-5:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #f0094a;
    box-shadow:
     -1px -1px 5px 0px #fff,
     7px 7px 20px 0px #0003,
     4px 4px 5px 0px #0002;
    transition:400ms ease all;
  }

.btn-5:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }

.btn-5:hover:before,
.btn-5:hover:after{
    width:100%;
    transition:800ms ease all;
  }

  @media screen and (max-width: 900px) {
    .app-main__outer{
        padding: 3%;
    }

    .range input{
    width: 45%;
    }

    table{
        font-size: 12px;
        padding: 15px 20px;
        white-space: nowrap;
    }

    .i{
        font-size: 13px
    }
    }
    </style>