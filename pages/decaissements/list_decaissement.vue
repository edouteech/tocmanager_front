<template>
<div class="contain">
     <SideBar/>

    <div class="zone">
      <div class="titre">
            Décaissements 
        </div>
      <p>Liste des décaissements</p>
      <NuxtLink class="custom-btn btn-10" to="/decaissements/decaissement">Remplir décaissement</NuxtLink>
        <table class="tableau">
          <thead>
              <tr>
                  <th>Dates de décaissement</th>
                  <th>Montants</th>
                  <th>Fournisseurs concernés</th>
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(decaissement, i) in decaissements" :key="i">
              <td>{{decaissement.date}}</td>
              <td>{{decaissement.montant}}</td>
              <td>{{decaissement.supplier_id}}</td>
              <td>
                <button @click="voirDecaissement(decaissement.id)"><i class='bx bxs-info-circle'></i></button>
                <NuxtLink :to="'/decaissements/'+decaissement.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                <button @click="deleteDecaissement(decaissement.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
              </td>
            </tr>
          </tbody>
        </table>  
    </div>
<voirDecaissement :montant= 'identifiant1' :date= 'identifiant2' :supplier_id= 'identifiant3' v-show="showModal" @close-modal="showModal = false"/>

</div>

</template>

<script>
import voirDecaissement from './voir_decaissement.vue'
import SideBar from '../nav.vue'
export default {
  auth:true,
  components: {
    SideBar,  
    voirDecaissement,
  },
   data () {
      return {
        showModal: false,
        identifiant1 : "",
        identifiant2 : "",
        identifiant3 : "",
        compagnie_id: '',
        decaissements: [],
        decaissement: "",
      }
    },

    mounted () {
      this.refresh()
    },

    methods: {
        deleteDecaissement(id){ console.log(id);
          this.$axios.delete('/delete/decaissement/' +id)
          .then(response =>  {console.log(response.data.data);
          this.refresh()})
         },

        refresh(){
          this.$axios.get('/index/decaissement',
            // {
            //     params: {
            //         compagnie_id: this.$auth.$storage.getUniversal('company_id')
            //     }
            // }
          ).then(response => {console.log(response.data.data);
          this.decaissements = response.data.data})
        },

        voirDecaissement(id){
            this.showModal = true;
            this.$axios.get('/index/decaissement/'+ id).then(response => {console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].montant
             this.identifiant2 = response.data.data[0].date
             this.identifiant3 = response.data.data[0].supplier_id  
             }) 
               
        },

    },       
     
}
</script>

<style scoped>
.zone p{
    font-size: 18px;
}

.bx{
  margin: 0 10px;
  font-size: 25px;
}
.ajout{
  border: 1px solid;
  border-radius: 15px;
  background-color: rgb(233, 250, 215);
  padding: 10px;
  margin-left: 80%;
}

.ajout:hover{
  background-color: green;
  color: #fff;
  
}
.tableau{
	border-collapse: collapse;


	box-shadow: 0 5px 50px transparent;
	border: 2px solid transparent;
	text-align: center;
	margin-top: 1%;
	font-size: 18px;
}      
thead tr{
    background-color: transparent;
}
th, td{
    padding: 15px 20px;
    border: 1px solid #ddd
}
tbody, tr, td, th{
    border: 1px solid #ddd
}

tbody tr:nth-child(even){
    background-color: rgb(233, 233, 255);
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}
</style>
