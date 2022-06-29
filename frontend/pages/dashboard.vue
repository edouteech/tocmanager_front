<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">
    <div class="titre">
      Tableau de Bord
    </div>

    <div class="carreaux">
            <div class="carre">
                <div class="icon">
                  <i class='bx bx-money-withdraw' ></i>
                  <span class="percent">15%</span>
                </div>
                <div class="design">
                  <p>1 850 000 F CFA</p>
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
                  <p>1 400 000 F CFA</p>
                  Encaissements
                </div>
            </div>

            <div class="carre">
                <div class="icon">
                  <i class='bx bx-money-withdraw' ></i>
                  <span class="percent">15%</span>
                </div>
                <div class="design">
                  <p>20 000 F CFA</p>
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
                  Pourcentages
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>Coca cola</td>
                <td>80 %</td>

              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>Coca cola</td>
                <td>80 %</td>

              </tr>
              
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>Coca cola</td>
                <td>80 %</td>

              </tr>
              
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <td>Coca cola</td>
                <td>80 %</td>

              </tr>
              
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <td>Coca cola</td>
                <td>80 %</td>

              </tr>

              
              
              
            </tbody>
          </table>
      </div>
      <div class="dernier">
         Derniers produits vendus
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              
              <tr>
                <th scope="col" class="px-6 py-3">
                 
                </th>
                <th scope="col" class="px-6 py-3">
                  Noms
                </th>
                <th scope="col" class="px-6 py-3">
                  Prix
                </th>
                <th scope="col" class="px-6 py-3">
                  Dates
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <td></td>
                <td>Paracétamol</td>
                <td>6820</td>
                <td>25 / 05 / 2022 </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td></td>
                <td>Paracétamol</td>
                <td>6820</td>
                <td>25 / 05 / 2022 </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td></td>
                <td>Paracétamol</td>
                <td>6820</td>
                <td>25 / 05 / 2022 </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <td></td>
                <td>Paracétamol</td>
                <td>6820</td>
                <td>25 / 05 / 2022 </td>
              </tr>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <td></td>
                <td>Paracétamol</td>
                <td>6820</td>
                <td>25 / 05 / 2022 </td>
              </tr>
              
            </tbody>
          </table>
      </div>
    </div>
      <div class="produits">
        <div class="bar">
            Volume des ventes 
          <Bar
            :chart-options="chartOptions"
            :chart-data="chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
          />
        </div>
        <div class="dette">
            Dettes sur une période


        </div>
      </div>  
    </div>

</div>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import SideBar from './nav.vue'
export default {
  components: {
    SideBar,
    Bar,   
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
    middleware:'auth',
    // auth: false,

    methods:{
        async logout(){
            this.$auth.logout();
            this.$router.push('/login');
        }
        
    },
 
}
</script>

<style scoped>
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
.bx{
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
  padding-top: 23%;
  font-size: 15px;
}

.carre .design p{
  font-weight: bold;
  font-size: 20px;
}

.produits{
  display: flex;
  padding: 5%;
  text-align: center;
}

.vendu{
  margin-right: 10%;
}

table{
margin-top: 3%;
}
th, td{
    padding: 15px 40px;
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
  padding: 3%;
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