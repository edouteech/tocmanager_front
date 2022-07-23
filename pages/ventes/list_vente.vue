<template >
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ventes </h3>
    </nav>

    <div class="contenu">
      <h4>Liste des ventes effectuées</h4>
      <NuxtLink  to="/ventes/vente"><button class="custom-btn btn-3"><span>Nouvelle vente</span></button></NuxtLink>
      <table class="table table-hover">
          <thead>
            <tr class="table-primary">
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
              <td class="action">
                <div  @click="voirVente(vente.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                <NuxtLink :to="'/ventes/'+vente.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                <div class="cursor-pointer" @click="deleteVente(vente.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
              </td>
            </tr>
          </tbody>
        </table>
  <voirVente :date= 'identifiant1' :client= 'identifiant2' :montant= 'identifiant3' :facture='identifiant4' v-show="showModal" @close-modal="showModal = false"/>
  </div><br><br><br><br>
</div>

</template>


<script>
import voirVente from './voir_vente.vue'
import Sidebar from '../sidebar.vue'
export default {
  layout: "empty",
  components: {
    Sidebar,  
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
             this.identifiant4 = response.data.data[0].id
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

.contenu{
  margin: 5%;

}
.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;

}         


thead tr{
    background-color: transparent;
}


tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}
.action{
   display: flex;
}

.custom-btn {
  width: 180px;
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
.btn-3 {
  background: rgb(0,172,238);
background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  width: 180px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover{
   background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover{
   color: rgba(2,126,251,1);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}

</style>
