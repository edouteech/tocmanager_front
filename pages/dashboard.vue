<template>
<div>    
<link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet">
<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Tableau De Bord </h3>
    </nav>

    <div class="app-main__outer p-5">
        <div class="app-main__inner">
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div class="page-title-icon">
                            <i class="pe-7s-car icon-gradient bg-mean-fruit">
                            </i>
                        </div>
                        <div>Tableau de Bord Analytique
                            <div class="page-title-subheading">Vue résumée des divers composants
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
                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a href="javascript:void(0);" class="nav-link">
                                                <NuxtLink to="/achats/achat"> 
                                                    <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                                    <span class="raccourci mx-4 text-decoration-none">Achats</span>
                                                </NuxtLink>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="javascript:void(0);" class="nav-link">
                                            <NuxtLink to="/ventes/vente"> 
                                                <i class="fa fa-share-square" aria-hidden="true"></i>
                                                <span class="raccourci mx-4 ">Ventes</span>
                                            </NuxtLink>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="javascript:void(0);" class="nav-link">
                                            <NuxtLink to="/encaissements/encaissement"> 
                                                <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
                                                <span class="raccourci mx-4 ">Encaissements</span>
                                            </NuxtLink>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="javascript:void(0);" class="nav-link">
                                            <NuxtLink to="/decaissements/decaissement"> 
                                                <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
                                                <span class="raccourci mx-4 ">Décaissements</span>
                                            </NuxtLink>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>     
            <form action="action" method="POST">
                <div class="range">
                <input class="form-control" type="datetime-local"  v-model="form.date_debut"  required />  
                <input  class="form-control" type="datetime-local"  v-model="form.date_fin"  required />  
                <div class="visualiser" @click="Visualiser()"><i class="fa fa-eye" aria-hidden="true"></i></div>    
                </div>  
            </form>       
            <div class="row">
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content bg-midnight-bloom">
                        <div class="widget-content-wrapper text-white">
                            <div class="widget-content-left">
                                <div class="widget-heading">Chiffre d'affaire</div>
                                <div class="widget-subheading">Total des transactions</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-white"><span>{{chiffre_affaire}} F</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content bg-arielle-smile">
                        <div class="widget-content-wrapper text-white">
                            <div class="widget-content-left">
                                <div class="widget-heading">Encaissements</div>
                                <div class="widget-subheading">Somme totale des encaissements</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-white"><span>{{encaissement}} F</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content bg-grow-early">
                        <div class="widget-content-wrapper text-white">
                            <div class="widget-content-left">
                                <div class="widget-heading">Décaissements</div>
                                <div class="widget-subheading">Somme totale des décaissements</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-white"><span>{{decaissement}} F</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-xl-none d-lg-block col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content bg-premium-dark">
                        <div class="widget-content-wrapper text-white">
                            <div class="widget-content-left">
                                <div class="widget-heading">Products Sold</div>
                                <div class="widget-subheading">Revenue streams</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-warning"><span>$14M</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-6">
                    <div class="mb-3 card">
                        <div class="card-header-tab card-header-tab-animation card-header">
                            <div class="card-header-title">
                                <i class="header-icon lnr-apartment icon-gradient bg-love-kiss"> </i>
                                Volume des ventes
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="tabs-eg-77">
                                    <div class="card mb-3 widget-chart widget-chart2 text-left w-100">
                                        <div class="widget-chat-wrapper-outer">
                                            <div class="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                                                <canvas id="myChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 class="text-muted text-uppercase  opacity-8 font-weight-normal">Top des 10 produits les plus vendus</h6>
                                    <div class="scroll-area-sm">
                                        <div class="scrollbar-container">
                                            <ul class="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            Noms des produits
                                                            <div class="widget-content-right">
                                                                <div class="font-size-xlg text-muted">
                                                                    <span>Quantités vendues</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" v-for="(produits_vendus1, j) in produits_vendus" :key="j">
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper fsize-2">
                                                            {{produits_vendus1.name}}
                                                            <div class="widget-content-right">
                                                                <div class="font-size-xlg text-muted">
                                                                    <span>{{produits_vendus1.quantity}}</span>
                                                                    <small class="text-danger pl-2">
                                                                        <i class="fa fa-angle-down"></i>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div> <br><br>
                                    <h6 class="text-muted text-uppercase  opacity-8 font-weight-normal">Top des 10 produits les plus achetés</h6>
                                    <div class="scroll-area-sm">
                                        <div class="scrollbar-container">
                                            <ul class="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                <li class="list-group-item">
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            Noms des produits
                                                            <div class="widget-content-right">
                                                                <div class="font-size-xlg text-muted">
                                                                    <span>Quantités achetées</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" v-for="(produits_achetes1, k) in produits_achetes" :key="k">
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper fsize-2">
                                                            {{produits_achetes1.name}}
                                                            <div class="widget-content-right">
                                                                <div class="font-size-xlg text-muted">
                                                                    <span>{{produits_achetes1.quantity}}</span>
                                                                    <small class="text-danger pl-2">
                                                                        <i class="fa fa-angle-down"></i>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-6">
                    <div class="mb-3 card">
                        <div class="card-header-tab card-header">
                            <div class="card-header-title">
                                <i class="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                Courbe évolutive des 07 derniers jours
                            </div>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane fade active show" id="tab-eg-55">
                                <div class="widget-chart p-3">
                                    <div style="height: 500px">
                                        <canvas id="myChartVente"></canvas>
                                    </div><br><br><br><br><br><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

            </div>
            <div class="row">
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Bénéfices</div>
                                    <div class="widget-subheading">Revenu total</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-success">1896</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Volume des ventes</div>
                                    <div class="widget-subheading">Somme des quantités de vente</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-warning">{{volume_vente}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Autres</div>
                                    <div class="widget-subheading">Pourcentage</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-danger">45,9%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="d-xl-none d-lg-block col-md-6 col-xl-4">
                    <div class="card mb-3 widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Income</div>
                                    <div class="widget-subheading">Expected totals</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-focus">$147</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-info" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style="width: 54%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">Expenses</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="main-card mb-3 card">
                        <div class="card-header">Dernières ventes éffectuées
                        </div>
                        <div class="table-responsive">
                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                <tr>
                                    <th class="text-center">Nom du client</th>
                                    <th class="text-center">Date de la facture</th>
                                    <th class="text-center">Montant de la facture</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(dernieres_ventes1, i) in dernieres_ventes" :key="i">
                                    <td class="text-center">
                                                {{dernieres_ventes1.client.name}}
                                    </td>
                                    <td class="text-center">{{dernieres_ventes1.date_sell}}</td>
                                    <td class="text-center">
                                        <div class="badge badge-success fsize-1">{{dernieres_ventes1.amount}}</div>
                                    </td>
                                    <td class="text-center"><NuxtLink :to="'/ventes/voir/'+dernieres_ventes1.id">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm">Details</button></NuxtLink>
                                    </td>
                                </tr>
                        
                                </tbody>
                            </table>
                        </div>
                        <div class="d-block text-center card-footer">
                            10 dernières ventes
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-md-6 col-lg-3">
                    <div class="card-shadow-danger mb-3 widget-chart widget-chart2 text-left card">
                        <div class="widget-content">
                            <div class="widget-content-outer">
                                <div class="widget-content-wrapper">
                                    <div class="widget-content-left pr-2 fsize-1">
                                        <div class="widget-numbers mt-0 fsize-3 text-danger">71%</div>
                                    </div>
                                    <div class="widget-content-right w-100">
                                        <div class="progress-bar-xs progress">
                                            <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style="width: 71%;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left fsize-1">
                                    <div class="text-muted opacity-6">Ventes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="card-shadow-success mb-3 widget-chart widget-chart2 text-left card">
                        <div class="widget-content">
                            <div class="widget-content-outer">
                                <div class="widget-content-wrapper">
                                    <div class="widget-content-left pr-2 fsize-1">
                                        <div class="widget-numbers mt-0 fsize-3 text-success">54%</div>
                                    </div>
                                    <div class="widget-content-right w-100">
                                        <div class="progress-bar-xs progress">
                                            <div class="progress-bar bg-success" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style="width: 54%;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left fsize-1">
                                    <div class="text-muted opacity-6">Achats</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="card-shadow-warning mb-3 widget-chart widget-chart2 text-left card">
                        <div class="widget-content">
                            <div class="widget-content-outer">
                                <div class="widget-content-wrapper">
                                    <div class="widget-content-left pr-2 fsize-1">
                                        <div class="widget-numbers mt-0 fsize-3 text-warning">32%</div>
                                    </div>
                                    <div class="widget-content-right w-100">
                                        <div class="progress-bar-xs progress">
                                            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100" style="width: 32%;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left fsize-1">
                                    <div class="text-muted opacity-6">Encaissements</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="card-shadow-info mb-3 widget-chart widget-chart2 text-left card">
                        <div class="widget-content">
                            <div class="widget-content-outer">
                                <div class="widget-content-wrapper">
                                    <div class="widget-content-left pr-2 fsize-1">
                                        <div class="widget-numbers mt-0 fsize-3 text-info">89%</div>
                                    </div>
                                    <div class="widget-content-right w-100">
                                        <div class="progress-bar-xs progress">
                                            <div class="progress-bar bg-info" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100" style="width: 89%;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left fsize-1">
                                    <div class="text-muted opacity-6">Décaissements</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>               
    </div>

</div>

</template>

<script>
import Sidebar from './sidebar.vue';
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
    components:{
        Sidebar,
    },
    data (){
    return{
      infos:'',
      volume_vente: '',
      chiffre_affaire: '',
      dernieres_ventes: '',
      dernieres_ventes1: '',
      produits_vendus: '',
      produits_achetes: '',
      produits_vendus1: '',
      courbe_vente: '',
      courbe_achat: '',
      encaissement: '',
      decaissement: '',
      
      form:{
        date_debut:  "",
        date_fin:  "",
      }
    }
      
  },
//   moment().format("YYYY-MM-DDThh:mm")
    middleware:'auth',
    mounted(){   
        console.log(this.form.date_debut)   
        this.$axios.post('/tableau/de/bord',{
              date_debut: this.form.date_debut,
              date_fin: this.form.date_fin,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
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
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [dd],
            datasets: [{
                label: '# ventes effectuées',
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
                date_fin: this.form.date_fin,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
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