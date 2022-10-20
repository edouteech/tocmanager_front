<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
      <h4>Liste des utilisateurs enregistrés</h4>
      <NuxtLink  to="/profils/add_profil" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter nouvel utilisateur</span></button></NuxtLink>
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
                  <th>Noms</th>
                  <th>Numéros de téléphone</th>
                  <th>Emails</th>
                  <th>Fonction de l'utilisateur</th>
                  <th>Pays</th>
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(profil, i) in profils" :key="i">
              <td>{{profil.name}}</td>
              <td>{{profil.phone}}</td>
              <td>{{profil.email}}</td>
              <td v-if="profil.role_name =='admin'">Administrateur</td>
              <td v-else-if="profil.role_name =='comptable'">Comptable</td>
              <td v-else-if="profil.role_name =='cashier'">Caissier</td>
              <td>{{profil.country}}</td>
              <td><div class="action"  v-for="(user, i) in users" :key="i">
                    <div @click="voirProfil(profil.id)"  v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/profils/'+profil.id"  v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteProfil(profil.id)"  v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                  </div>
              </td>
            </tr>
          </tbody>
      </table>
    <p class="text-center"><strong>{{total}} utilisateur(s) au total </strong></p><hr class="text-primary">
        <br><br> 
        <nav aria-label="Page navigation example " class="d-flex" v-if="res_data != null">
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
    </div><br><br><br>

<voirProfil :nom= 'identifiant1' :phone= 'identifiant2' :email= 'identifiant3' :pays= 'identifiant4' :role= 'identifiant5' :ajout= 'identifiant6' :modifier= 'identifiant7' :supprimer= 'identifiant8' v-show="showModal" @close-modal="showModal = false"/>
</div>

</template>

<script>
import voirProfil from './voir_profil.vue'
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
      Sidebar,  
      voirProfil,
      Userinfo
    },

    data () {
        return {
          links: [],
          res_data: null,
          showModal: false,
          profils: [],
          profil: "",
          identifiant1 : "",
          identifiant2 : "",
          identifiant3 : "",
          identifiant4 : "",
          identifiant5 : "",
          identifiant6 : "",
          identifiant7 : "",
          identifiant8 : "",
          total: '',
          users: '',
          compagny:'',
          form: {
              nombre: '',
          }
        }
      },

    mounted () {
      this.refresh()
      this.users = this.$auth.$state.user;
    this.compagny = localStorage.getItem('auth.company_id');
    },
    methods: {

        deleteProfil(id){
          // console.log(id);
          this.$axios.delete('/users/' +id,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')}   
          })         
          .then(response => {
            // console.log(response.data.data);
            this.refresh()})                            
        },
        
        refresh(page=1){
          this.$axios.get('/users',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            page: page,
            per_page : this.form.nombre }   
          })        
          .then(response => 
            {
              // console.log(response.data.data.data);
              this.profils = response.data.data.data
              this.res_data= response.data.data
              this.total = response.data.data.total
              let firstE = response.data.data.links.shift()
              let lastE = response.data.data.links.splice(-1,1);
            }
          )
        },

        voirProfil(id){
            this.showModal = true;
            this.$axios.get('users/'+ id,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')}   
          }).then(response => {
            // console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].name
             this.identifiant2 = response.data.data[0].phone
             this.identifiant3 = response.data.data[0].email
             this.identifiant4 = response.data.data[0].country 
             this.identifiant5 = response.data.data[0].role_name      
             this.identifiant6 = response.data.data[0].droits_add
             this.identifiant7 = response.data.data[0].droits_edition
             this.identifiant8 = response.data.data[0].droits_delete   
    
            }) 
               
        },
    },
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
}          

.replace{
  display: flex;
}

.replace img{
  width: 20%;
  cursor: pointer;
}

.controler{
  width: 15%;
}
.replace input{
  margin-left: 10%;
}
/* .replace_button{
  width: 20%;
} */

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
