<template>
<div class="contain">
    <SideBar/>

      <div class="zone">
          <div class="titre">
            Tableau de Bord 
          </div>
          <form action="action=" method="POST">
            <div class="range">
                <span class="du"> Du : </span><input class="debut" type="datetime-local"  v-model="form.date_debut"  required />      
                <span class="du">Au :</span> <input  class="fin" type="datetime-local"  v-model="form.date_fin"  required />   
                <div class="visualiser" @click="Visualiser()">Visualiser</div>               
            </div>
          </form>

          <div class="carreaux">
                  <div class="carre">
                      <div class="icon">
                        <i class='bx bx-money-withdraw' ></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>{{chiffre_affaire}} F CFA</p>
                        Chiffre d'affaire
                      </div>
                  </div>

                  <div class="carre">
                      <div class="icon">
                        <i class='bx bx-money-withdraw' ></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>3 500 000 F CFA</p>
                        Bénéfices
                      </div>
                  </div>

                  <div class="carre">
                      <div class="icon">
                        <i class='bx bx-money-withdraw' ></i>
                        <span class="percent">15%</span>
                      </div>
                      <div class="design">
                        <p>{{encaissement}} F CFA</p>
                        Encaissements
                      </div>
                  </div>

                  <div class="carre">
                      <div class="icon">
                        <i class='bx bx-money-withdraw' ></i>
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
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Noms
                        </th>
                        <th scope="col" class="px-6 py-3">
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
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      
                      <tr>
                        <th scope="col" class="px-6 py-3">
                        
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Noms
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Total
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Dates
                        </th>
                      </tr>
                    </thead>
                    <tbody v-for="(dernieres_ventes1, i) in dernieres_ventes" :key="i">
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td></td>
                        <td>{{dernieres_ventes1.client_id}}</td>
                        <td>{{dernieres_ventes1.amount}}</td>
                        <td>{{moment(dernieres_ventes1.date_sell).utc().format('DD MM YYYY')}}</td>
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
</template>

<script>
import SideBar from './nav.vue'
import Chart from 'chart.js/auto';
import moment from "moment";
export default {   
  
  components: {
    SideBar,
    
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
        date_debut: '',
        date_fin: ''
      }
    }
      
  },

    middleware:'auth',
    // auth: false,
 
    mounted(){      
        var d = new Date();
        var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();  
        this.$axios.post('/tableau/de/bord',{
              date_debut: date,
              date_fin: date
        }).then(response => {console.log(response.data.data);
           this.volume_vente  = response.data.data[0][0].volume_vente
           this.chiffre_affaire = response.data.data[1][0].chiffre_d_affaire
           this.encaissement = response.data.data[2][0].encaissement
           this.decaissement = response.data.data[3][0].decaissement
           this.produits_vendus = response.data.data[4]
           this.dernieres_ventes  = response.data.data[5]
          
          // console.log(moment(this.infos).utc().format('MMMM Do YYYY, h:mm:ss a'));
          // console.log('------------------new-----------------+');
          // var info = dat.getFullYear()+'-'+(dat.getMonth()+1)+'-'+dat.getDate();
          // console.log(info);

      
        // var today = new Date();
        // console.log(today.toString());
        // console.log('------------------new-----------------+');
        


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
              labels: [d1, 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
        });  })
        myChartAchat;


      // console.log(this.$auth);
      // console.log(this.$auth.$storage.getUniversal('company_id'));
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
              date_fin: this.form.date_fin
          }).then(response => {console.log(responseresponse.data.data.data);
          this.infos  = response.data.data})
        }
        
    },
 
}
</script>

<style>
.range{
  display: flex;
  border: 1px solid gainsboro;
  border-radius: 10px;
  padding: 1% 10%;
  margin-bottom: 5%;
  font-size: 18px;

}

.range input{
  border: none; outline: none;

}

.range .debut{
  margin-right: 10%;
  margin-left: 3%;
}

.range .fin{
  margin-left: 3%;
  margin-right: 10%;
}

.range .du{
  padding-top: 7px;
}

.range .visualiser{
  border: 2px dotted blue;
  padding: 5px 8px;
  cursor: pointer;
  font-weight: normal;
  border-radius: 20px;
  font-size: 15px;
}

.range .visualiser:hover{
  background-color: rgb(129, 192, 246);
}

.carreaux{
    display: flex;
}

.carreaux .carre{
    margin: 2%;
    width: 25%;
    height: 150px;
    border: 1px solid transparent;
    background-color: rgb(241, 243, 254);;

}
.carreaux .carre:hover{
    transform: translateX(2px);
}

.carre .icon{
    display: flex;    
}
.carreaux .carre .icon .bx {
  font-size: 25px;
  margin-top: 5%;
  margin-left: 6%;
  color: rgb(40, 107, 251);
}

.percent{
  margin-top: 5%;
  margin-left: 57%;
  border: 1px solid black;
  border-radius: 20px;
  padding: 3px 15px;
  font-size: 11px;
}

.carre .design{
  margin-left: 5%;
  padding-top: 20%;
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


table{
margin-top: 3%;
}
th, td{
    padding: 5px 10px;
    text-align: center;

}

thead tr{
    background-color: rgb(239, 239, 246);
}
.contain{
  display: flex;
}

.nav{
  flex-basis: 22%;
}

.zone{
  flex-basis: 77%;
  position: relative;
}

.titre{
  border: 1px solid #202020;
  padding: 3% 10%;
  margin-bottom: 3%;
  margin-left: -5%;
  background-color: #202020;
  color: #fff;
  font-size: 24px;
  letter-spacing: 2px;
}
.custom-btn {

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

  
.btn-10 {
  background: rgb(35, 240, 82);
background: linear-gradient(0deg, rgb(53, 246, 56) 0%, rgb(28, 243, 107) 100%);
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-left: 80%;

}
.btn-10:after {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  -webkit-transform: scale(.1);
  transform: scale(.1);
}
.btn-10:hover {
  color: #fff;
  border: none;
  background: transparent;
}
.btn-10:hover:after {
  background: rgb(50, 242, 73);
background: linear-gradient(0deg, rgb(92, 228, 42) 0%,  rgb(100, 243, 56)100%);
  -webkit-transform: scale(1);
  transform: scale(1);
}


</style>