<template>
<div>
<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Tableau De Bord </h3>
    </nav>

    <div class="contenu">

          <form action="action" method="POST">
            <div class="range">
              <input class="form-control" type="date"  v-model="form.date_debut"  required />  
              <input  class="form-control" type="date"  v-model="form.date_fin"  required />  
              <div class="visualiser" @click.prevent="Visualiser()"><i class="fa fa-eye" aria-hidden="true"></i></div>    
            </div>  
          </form>
        <div class="contain">
          <div class="carreaux">
                  <div class="carre">
                      <div class="icon">
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>{{chiffre_affaire}} F CFA</p>
                        Chiffre d'affaire
                      </div>
                  </div>

                  <div class="carre">
                      <div class="icon">
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>3 500 000 F CFA</p>
                        Bénéfices
                      </div>
                  </div>

                  <div class="carre">
                      <div class="icon">
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>{{encaissement}} F CFA</p>
                        Encaissements
                      </div>
                  </div>

                  <div class="carre">
                      <div class="icon">
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>{{decaissement}} F CFA</p>
                        Décaissements
                      </div>
                  </div>
          </div><hr>

          <div class="produits">
              <div class="vendu">
                  Produits les plus vendus
                  <table class="table table-hover">
                    <thead>
                      <tr class="table-success">
                        <th>
                          Noms
                        </th>
                        <th>
                          Quantités
                        </th>
                      </tr>
                    </thead>
                    <tbody v-for="(produits_vendus1, j) in produits_vendus" :key="j">
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td>{{produits_vendus1.name}}</td>
                        <td>{{produits_vendus1.quantity}}</td>      
                      </tr>                
                    </tbody>
                  </table>
              </div>

              <div class="dernier">
                Dernières ventes éffectuées
                  <table class="table table-hover">
                    <thead>
                      <tr class="table-dark">
                        <th >
                          Noms
                        </th>
                        <th>
                          Total
                        </th>
                        <th>
                          Dates
                        </th>
                      </tr>
                    </thead>
                    <tbody v-for="(dernieres_ventes1, i) in dernieres_ventes" :key="i">
                      <tr>
                        <td>{{dernieres_ventes1.client_id}}</td>
                        <td>{{dernieres_ventes1.amount}}</td>
                        <td>{{dernieres_ventes1.date_sell}}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>

              <div class="bar">
                  Volume des ventes 
                  <canvas id="myChart" width="400" height="300"></canvas>
              </div>

          </div><hr>
            
          <div class="courbes">
              <div class="courbe_vente">
                Courbe des Ventes
                <canvas id="myChartVente" width="500" height="350"></canvas>
              </div>
              <div class="courbe_achat">
                Courbe des Achats
                <canvas id="myChartAchat" width="500" height="350"></canvas>
              </div>
          </div>  
        </div>
      </div> 
  </div>
</template>

<script>
import Sidebar from './sidebar.vue';
import Chart from 'chart.js/auto';
import moment from "moment";
export default {
    head() {
      return {
        script: [
          {
            src: "https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"
          },
          {
            src: "https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"
          },
          {
            src: "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"
          }
        ],

      }
    },
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
      produits_vendus1: '',
      encaissement: '',
      decaissement: '',
      form:{
        date_debut: moment().format("yyyy-MM-D"),
        date_fin: moment().format("yyyy-MM-D")
      }
    }
      
  },

    middleware:'auth',
    mounted(){      
        this.$axios.post('/tableau/de/bord',{
              date_debut: this.form.date_debut,
              date_fin: this.form.date_fin
        }).then(response => {console.log(response.data);
           this.volume_vente  = response.data.data[0][0].volume_vente
           this.chiffre_affaire = response.data.data[1][0].chiffre_d_affaire
           this.encaissement = response.data.data[2][0].encaissement
           this.decaissement = response.data.data[3][0].decaissement
           this.produits_vendus = response.data.data[4]
           this.dernieres_ventes  = response.data.data[5]
          
          var VV = this.volume_vente
          var dd = 'Intervalle de dates'
          const ctx = document.getElementById('myChart');
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [dd],
                datasets: [{
                    label: '# ventes',
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

          var d1 = this.dernieres_ventes[0].date_sell
          const ctz = document.getElementById('myChartVente');
          const myChartVente = new Chart(ctz, {
            type: 'line',
            data: {
                labels: ['success', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# ventes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor:'rgba(255, 99, 132, 1)',
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
          myChartAchat;

          const cty = document.getElementById('myChartAchat');
          const myChartAchat = new Chart(cty, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# achats',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor:'rgba(54, 162, 235, 1)',
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
          myChartAchat;
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
          }).then(response => {console.log(response.data.data);
              this.volume_vente  = response.data.data[0][0].volume_vente
              this.chiffre_affaire = response.data.data[1][0].chiffre_d_affaire
              this.encaissement = response.data.data[2][0].encaissement
              this.decaissement = response.data.data[3][0].decaissement
              this.produits_vendus = response.data.data[4]
              this.dernieres_ventes  = response.data.data[5]})

              var VV = this.volume_vente
                console.log(VV)
                myChart;
                }
           
        
    },
 
}
</script>

<style scoped>
.zone{
   margin: 5%;
}

.contenu{
  margin: 5%;
}

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

.contain{
  margin: 0 3%;
}

.carreaux{
    display: flex;
}

.carreaux .carre{
    margin: 2%;
    width: 25%;
    height: 5%;
    border: 1px solid transparent;
    background-color: rgb(241, 243, 254);;

}
.carreaux .carre:hover{
    transform: translateX(2px);
}

.carre .icon{
    display: flex;    
}
.carreaux .carre .icon .fa {
  font-size: 25px;
  margin-top: 5%;
  margin-left: 6%;
  color: rgb(40, 107, 251);
}

.percent{
  margin-top: 5%;
  margin-left: 63%;
  border: 1px solid black;
  border-radius: 20px;
  padding: 3px 15px;
  font-size: 11px;
}

.carre .design{
  margin-left: 5%;
  padding-top: 12%;
  font-size: 15px;
}

.carre .design p{
  font-weight: bold;
  font-size: 20px;
}

.produits{
  display: flex;
  padding: 5% 2%;
  text-align: center;
}

.courbes{
  display: flex;
  padding: 5% 2%;
  text-align: center;
}

.courbe_vente{
  margin-right: 10%;
}

.dernier{
  margin-left: 3%;
  margin-right: 4%;
}

@media screen and (max-width: 900px) {
  .carreaux{
    display: inline;
  }

  .carreaux .carre{
    width: 90%;
  }

  .produits{
    display: inline;
  }

  .courbes{
    display: inline;
  }


}

</style>