<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Encaissements </h3>
    </nav>

    <div class="contenu">
      <h4>Liste des encaissements</h4>
       <NuxtLink to="/encaissements/encaissement"><button class="custom-btn btn-3"><span>Remplir encaissement</span></button></NuxtLink>
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
                  <th>Dates d'encaissement</th>
                  <th>Montants</th>
                  <th>Clients concernés</th>
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(encaissement, i) in encaissements" :key="i">
              <td>{{encaissement.date}}</td>
              <td>{{encaissement.montant}}</td>
              <td>{{encaissement.client.name}}</td>
              <td><div class="action">
                <div @click="voirEncaissement(encaissement.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                <NuxtLink :to="'/encaissements/'+encaissement.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                <div @click="deleteEncaissement(encaissement.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table><br><br> 
        <nav aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
    </div><br>
<voirEncaissement :montant= 'identifiant1' :date= 'identifiant2' :client_id= 'identifiant3' v-show="showModal" @close-modal="showModal = false"/>

</div>

</template>

<script>
import moment from "moment";
import voirEncaissement from './voir_encaissement.vue'
import Sidebar from '../sidebar.vue'
export default {
  layout: "empty",
  auth:true,
  components: {
    Sidebar,  
    voirEncaissement,
  },
   data () {
      return {
        links: [],
        res_data: null,
        showModal: false,
        identifiant1 : "",
        identifiant2 : "",
        identifiant3 : "",
        compagnie_id: '',
        encaissements: [],
        encaissement: "",
      }
    },

    mounted () {
      this.refresh()
    },

    methods: {
        deleteEncaissement(id){ console.log(id);
          this.$axios.delete('/encaissements/' +id)
          .then(response =>  {console.log(response.data.data);
          this.refresh()})
         },

        refresh(page=1){
          this.$axios.get('/encaissements',
            {
                params: {
                  page: page
                    // compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }
            }
          ).then(response => 
          {
            console.log(response);
            this.encaissements = response.data.data.data
            this.res_data= response.data.data
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
          })
        },

        voirEncaissement(id){
            this.showModal = true;
            this.$axios.get('/encaissements/'+ id).then(response => {console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].montant
             this.identifiant2 = moment(response.data.data[0].date).format("YYYY-MM-D")
             this.identifiant3 = response.data.data[0].client.name 
             }) 
               
        },

    },       
     
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
</style>
