<template >
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ventes </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
      <h4>Liste des ventes effectuées</h4>
      <NuxtLink  to="/ventes/vente" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Nouvelle vente</span></button></NuxtLink>
      <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>Date facture</th>
              <th>Client concerné</th>
              <th>Montant facture </th>
              <th>Montant du</th>
              <th>Moyen de paiement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="(vente, i) in ventes" :key="i">
              <td>{{vente.date_sell}}</td>
              <td>{{vente.client.name}}</td>
              <td>{{vente.amount}}</td>
              <td>{{vente.rest}}</td>
              <td>{{vente.payment}}</td>
              <td><div class="action" v-for="(user, i) in users" :key="i">
                <NuxtLink :to="'/ventes/voir/'+vente.id" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle" aria-hidden="true"></i></NuxtLink>
                <NuxtLink :to="'/ventes/'+vente.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                <div class="cursor-pointer" @click="deleteVente(vente.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table> 
    <p class="text-center"><strong>{{total}} facture(s) au total </strong></p><hr class="text-primary">
        <br><br> 
        <nav aria-label="Page navigation example "  class="d-flex" v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
          <form action="">
              <div class="nombre d-flex">
                  <label class="title mx-5 my-2"><strong> Affichage:</strong></label> 
                  <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                      <option disabled value>10</option>
                      <option value="25" >25</option>
                      <option value="50">50</option>
                      <option value="10">100</option>
                  </select>
              </div>
          </form>
        </nav>
    </div>
    <br> 
</div>

</template>


<script>
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    Userinfo  
  },
   data () {
      return {
        links: [],
        res_data: null,
        showModal: false,
        identifiant0 : "",
        identifiant1 : "",
        identifiant2 : "",
        identifiant3 : "",
        identifiant4 : "",
        ventes: [],
        vente: "",
        total: '',
        users: '',
        compagny:'',
        form: {
            nombre: '',
        }
      }
    },
    methods: {
        deleteVente(id){
          console.log(id)
          this.$axios.delete('/sells/'+id,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
          .then(response =>{
            // console.log(response);
            this.refresh()})                
        },
        
        refresh(page=1){
          this.$axios.get('/sells',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            page: page,
            per_page : this.form.nombre }   
          })        
          .then(response => 
          {
            // console.log(response);
            this.ventes = response.data.data.data
            this.res_data= response.data.data
            this.total = response.data.data.total
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
          })  
        },

        recupClient(){
          this.$axios.get('/clients',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
          .then(response => {
          this.clients = response.data.data.data })
        },

        // voirVente(id){
        //     this.showModal = true;
        //     this.$axios.get('/sells/'+ id).then(response => {console.log(response.data.data[0]);
        //      this.identifiant0 = response.data.data[0].id
        //      this.identifiant1 = response.data.data[0].date_sell
        //      this.identifiant2 = response.data.data[0].client_id
        //      this.identifiant3 = response.data.data[0].amount
        //      this.identifiant4 = response.data.data[0].id   
        //      }) 
               
        // },
    },
    mounted () {
      this.refresh()
      this.recupClient()
      this.users = this.$auth.$state.user;
    this.compagny = localStorage.getItem('auth.company_id');
      // console.log(this.$auth)
    }
}
</script>

<style scoped>
.app-main__outer{
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
  justify-content: center;

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
