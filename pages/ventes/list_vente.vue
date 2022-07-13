<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">
    <div class="titre">
        Ventes
    </div>
      <p>Liste des ventes éffectuées</p>
      <button type="button" class="custom-btn btn-10"><NuxtLink to="/ventes/vente">Nouvelle vente</NuxtLink></button>    
        <table class="tableau">
          <thead>
              <tr>
                  <th>Date facture</th>
                  <th>Client concerné</th>
                  <th>Montant </th>
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(vente, i) in ventes" :key="i">
              <td>{{vente.date_sell}}</td>
              <td>{{vente.client.name}}</td>
              <td>{{vente.amount}}</td>
              <td>
                <button @click="voirVente(vente.id)"><i class='bx bxs-info-circle'></i></button>
                <NuxtLink :to="'/ventes/'+vente.id"><i class='bx bxs-edit' label="modifier"></i></NuxtLink>
                <button @click="deleteVente(vente.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
              </td>
            </tr>
          </tbody>
        </table>  
  </div>
  <voirVente :date= 'identifiant1' :client= 'identifiant2' :montant= 'identifiant3' v-show="showModal" @close-modal="showModal = false"/>

</div>

</template>


<script>
import voirVente from './voir_vente.vue'
import SideBar from '../nav.vue'
export default {
  components: {
    SideBar,  
    voirVente,
  },
   data () {
      return {
        showModal: false,
        identifiant1 : "",
        identifiant2 : "",
        identifiant3 : "",
        identifiant4 : "",
        ventes: [],
        vente: "",
      }
    },
    methods: {
        deleteVente(id){
          console.log(id)
          this.$axios.delete('/delete/vente/'+id).then(response =>{console.log(response);
            this.refresh()})                
        },
        
        refresh(){
          this.$axios.get('/index/vente').then(response => {console.log(response);
          this.ventes = response.data.data.data})  
        },

        recupClient(){
          this.$axios.get('/index/client',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
          .then(response => {
          this.clients = response.data.data.data })
        },

        voirVente(id){
            this.showModal = true;
            this.$axios.get('/index/vente/'+ id).then(response => {console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].date_sell
             this.identifiant2 = response.data.data[0].client_id
             this.identifiant3 = response.data.data[0].amount
            //  this.identifiant4 = response.data.data[0].nature      
             }) 
               
        },
    },
    mounted () {
      this.refresh()
      this.recupClient()
    }
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
.tableau{
	border-collapse: collapse;
	min-width: 800px;
	width: auto;
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
    padding: 15px 70px;
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
