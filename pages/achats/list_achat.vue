<template >
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Achats </h3>
    </nav>

    <div class="contenu">
      <h4>Liste des achats éffectués</h4>
      <NuxtLink  to="/achats/achat"><button class="custom-btn btn-3"><span>Nouvel achat</span></button></NuxtLink>
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
                  <th>Date facture</th>
                  <th>Fournisseur concerné</th>
                  <th>Montant de la facture</th>
                  <th>Montant restant à payer </th>
                  <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="(achat, i) in achats" :key="i">
              <td>{{achat.date_buy}}</td>
              <td>{{achat.supplier.name}}</td>
              <td>{{achat.amount}}</td>
              <td>{{achat.rest}}</td>
              <td><div class="action">
                <NuxtLink :to="'/achats/voir/'+achat.id"><i class="fa fa-info-circle text-success" aria-hidden="true"></i></NuxtLink>
                <NuxtLink :to="'/achats/'+achat.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                <div @click="deleteAchat(achat.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
<br><br>
    <nav aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
    </div>           <!-- <pre> {{res_data}}</pre> --><br><br> 
<voirAchat :date= 'identifiant1' :fournisseur= 'identifiant2' :montant= 'identifiant3' :facture='identifiant4' v-show="showModal" @close-modal="showModal = false"/>
</div>

</template>

<script>
import voirAchat from './voir_achat.vue'
import Sidebar from '../sidebar.vue'
export default {
  layout: "empty",
  components: {
    Sidebar,  
    voirAchat,
  },
   data () {
      return {
        links: [],
        res_data: null,
        showModal: false,
        identifiant1 : "",
        identifiant2 : "",
        identifiant3 : "",
        identifiant4 : "",
        achats: [],
        achat: "",
      }
    },
    methods: {
        deleteAchat(id){
          this.$axios.delete('/buys/' +id).then(response =>{console.log(response.data.data);
            this.refresh()})                
        },
        
        refresh(page=1){
          this.$axios.get('/buys',{params: {
            page: page}
          }).then(response => 
          {
            console.log(response);
            this.achats = response.data.data.data
            this.res_data= response.data.data
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
          })  
        },

        recupFournisseur(){
          this.$axios.get('/suppliers',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          }).then(response => {console.log(response.data.data.data);
          this.fournisseurs = response.data.data.data })
        },
        
        voirAchat(id){
            this.showModal = true;
            this.$axios.get('/buys/'+ id).then(response => {console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].date_buy
             this.identifiant2 = response.data.data[0].supplier_id
             this.identifiant3 = response.data.data[0].amount
             this.identifiant4 = response.data.data[0].id
            //  this.identifiant4 = response.data.data[0].nature      
             }) 
               
        },
    },
    mounted () {
      this.refresh()
      this.recupFournisseur()
    }
}
</script>

<style scoped>

.contenu{
  margin: 5%;
  overflow: auto;

}
.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}

.table{
	margin-top: 5%;
  text-align: center;
   
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


@media screen and (max-width: 400px) {
  .action{
    padding: 20px 0;
  }
}
</style>
