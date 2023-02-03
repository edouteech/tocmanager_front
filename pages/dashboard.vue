<template>
<div>    
<link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet">
<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Tableau De Bord </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer ">
        <div class="app-main__inner">
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div class="page-title-icon">
                            <i class="fa fa-thermometer-three-quarters text-danger" aria-hidden="true"></i>
                        </div>
                        <div>Tableau de Bord Analytique
                            <div class="page-title-subheading">Vue résumée des divers composants
                            </div>
                        </div>
                    </div>
                    <div class="page-title-actions">
                        <NuxtLink to="/achats/achat">
                            <button type="button" data-toggle="tooltip" title="Lancer un achat" data-placement="bottom" class="btn-shadow mr-3 btn btn-dark">                               
                                <span class="btn-icon-wrapper pr-2 opacity-7">
                                    <i class="fa fa-shopping-cart" aria-hidden="true" data-bs-dismiss="offcanvas"></i> 
                                </span>
                                    Achat
                            </button>
                        </NuxtLink>
                        <div class="d-inline-block dropdown">
                            <NuxtLink to="/ventes/vente"> 
                                <button type="button" data-toggle="tooltip" aria-haspopup="true" title="Lancer une vente" class="btn-shadow btn btn-info">
                                    <span class="btn-icon-wrapper pr-2 opacity-7">
                                        <i class="fa fa-share-square-o" aria-hidden="true"></i>
                                    </span>
                                    Vente
                                </button>
                            </NuxtLink>
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
            <div class="row mb-5">
                <div class="col-md-6 col-xl-3">
                    <div class="card mb-3 widget-content bg-midnight-bloom">
                        <div class="widget-content-wrapper text-white p-2">
                            <div class="widget-content-left">
                                <div class="widget-heading">Chiffre d'affaire</div>
                                <div class="widget-subheading">Total des <br> transactions</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-white"><span>{{chiffre_affaire}} F</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card mb-3 widget-content bg-arielle-smile">
                        <div class="widget-content-wrapper text-white p-2">
                            <div class="widget-content-left">
                                <div class="widget-heading">Encaissements</div>
                                <div class="widget-subheading">Somme totale<br>  des encaissements</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-white"><span>{{encaissement}} F</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card mb-3 widget-content bg-grow-early">
                        <div class="widget-content-wrapper text-white p-2">
                            <div class="widget-content-left">
                                <div class="widget-heading">Décaissements</div>
                                <div class="widget-subheading">Somme totale<br> des décaissements</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-white"><span>{{decaissement}} F</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card mb-3 widget-content bg-dark">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper text-white p-2">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Volume des ventes</div>
                                    <div class="widget-subheading">Somme des quantités <br> de vente</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-warning">{{volume_vente}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-12">
                    <div class="mb-3 card">
                        <div class="card-header-tab card-header-tab-animation card-header">
                            <div class="card-header-title">
                                <i class="header-icon lnr-apartment icon-gradient bg-love-kiss"> </i>
                                Produits 
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active d-flex" id="tabs-eg-77">
                                    <!-- <div class="card mb-3 widget-chart widget-chart2 text-left w-100">
                                        <div class="widget-chat-wrapper-outer">
                                            <div class="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                                                <canvas id="myChart"></canvas>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="col-md-12 col-lg-6">
                                        <h6 class="text-muted text-uppercase  opacity-8 font-weight-normal">Top des 10 produits les plus vendus</h6>
                                        <div class="scroll-area-sm">
                                            <div class="scrollbar-container">
                                                <ul class="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                    <li class="list-group-item">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper">
                                                                Noms des produits
                                                                <div class="widget-content-right">
                                                                    <div class=" text-muted">
                                                                        <span>Quantités vendues</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item" v-for="(produits_vendus1, j) in produits_vendus" :key="j">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper fsize-1">
                                                                {{produits_vendus1.name}}
                                                                <div class="widget-content-right">
                                                                    <div class="fsize-2 text-muted">
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
                                        </div> 
                                        <br><br>
                                    </div>
                                    <div class="col-md-12 col-lg-6">
                                        <h6 class="text-muted text-uppercase  opacity-8 font-weight-normal">Top des 10 produits les plus achetés</h6>
                                        <div class="scroll-area-sm">
                                            <div class="scrollbar-container">
                                                <ul class="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                    <li class="list-group-item">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper">
                                                                Noms des produits
                                                                <div class="widget-content-right">
                                                                    <div class="text-muted">
                                                                        <span>Quantités achetées</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item" v-for="(produits_achetes1, k) in produits_achetes" :key="k">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper fsize-1">
                                                                {{produits_achetes1.name}}
                                                                <div class="widget-content-right">
                                                                    <div class="fsize-2 text-muted">
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
                </div>
                
                <div class="col-md-12 col-lg-12">
                    <div class="mb-3 card">
                        <div class="card-header-tab card-header">
                            <div class="card-header-title">
                                <i class="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                Courbe évolutive des 07 derniers jours
                            </div>
                        </div>
                        <div class="tab-content col-md-12 col-lg-10">
                            <div class="tab-pane fade active show" id="tab-eg-55">
                                <div class="widget-chart p-3">
                                    <div style="height: 400px">
                                        <canvas id="myChartVente"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-6 col-xl-4">
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
                </div> -->
                
                <!-- <div class="col-md-6 col-xl-4">
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
                </div> -->
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
           
        </div>               
    </div>

</div>

</template>

<script>
import Sidebar from './sidebar.vue';
import Userinfo from './user_info.vue';
import moment from "moment";
import Chart from 'chart.js/auto';
export default {
    layout: "empty",
    auth:true,
    components:{
        Sidebar,
        Userinfo,
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
        date_debut: moment().format("YYYY-MM-DDT00:00"),
        date_fin:  moment().format("YYYY-MM-DDT23:59"),
      }
    }
      
  },
//   moment().format("YYYY-MM-DDThh:mm")
    middleware:'auth',
    mounted(){    
        // console.log(this.$auth)
        this.$axios.post('/tableau/de/bord',{
              date_debut: this.form.date_debut,
              date_fin: this.form.date_fin,
              compagnie_id: localStorage.getItem('auth.company_id')
        }).then(response => {
            // console.log(response);

           this.volume_vente  = response.data.data.volume_vente
           this.chiffre_affaire = response.data.data.chiffre_affaire
           this.encaissement = response.data.data.encaissement
           this.decaissement = response.data.data.decaissement
           this.produits_vendus = response.data.data.produts_most_sell
           this.produits_achetes = response.data.data.produts_most_buy
           this.dernieres_ventes  = response.data.data.ventes
           this.courbe_vente = response.data.data.sell_10_last_days
           this.courbe_achat = response.data.data.buys_10_last_days


        var VV = this.volume_vente
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
            this.$axios.post('/tableau/de/bord',{
                date_debut: this.form.date_debut,
                date_fin: this.form.date_fin,
                compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response => {
                // console.log(response.data);

           this.volume_vente  = response.data.data.volume_vente
           this.chiffre_affaire = response.data.data.chiffre_affaire
           this.encaissement = response.data.data.encaissement
           this.decaissement = response.data.data.decaissement
           this.produits_vendus = response.data.data.produts_most_sell
           this.produits_achetes = response.data.data.produts_most_buy
           this.dernieres_ventes  = response.data.data.ventes
           this.courbe_vente = response.data.data.sell_10_last_days
           this.courbe_achat = response.data.data.buys_10_last_days


                var VV = this.volume_vente
                // console.log(VV)
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

.app-main__outer{
    padding: 5%;
    font-size: 14px;
}


.range{
  display: flex;
  /* border: 1px solid gainsboro; */
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


@media screen and (max-width: 900px) {

.name_side{
    display: none;
}
/* 
.app-main__outer{
    padding: 3%;
} */

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

.text-ajout{
    display: none;
}

}
 
</style>