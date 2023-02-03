<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Utilisateurs </h3>
        </nav>
    
        <div class="app-main__outer py-5">
          <h4>Liste des utilisateurs enregistrés sur la plateforme</h4><hr><br>
          <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
              <button class="btn btn-outline-success" type="submit" @click.prevent="search()">Rechercher</button>
          </form>
          <div class="search_result table-responsive" v-if="this.element_search != ''">
            <!-- <div >{{result.name}}</div> -->
            <table class="table table-hover">
              <thead>
                <tr class="table-primary">
                      <th>Noms</th>
                      <th>Numéros de téléphone</th>
                      <th>Emails</th>
                      <th>Pays</th>
                      <!-- <th>Actions</th> -->
                  </tr>
              </thead>
              <tbody>
                <tr  v-for="(result, i) in results" :key="i"  @click="voirProfil(result.id)">
                  <td>{{result.name}}</td>
                  <td>{{result.phone}}</td>
                  <td>{{result.email}}</td>
                  <td>{{result.country}}</td>
                </tr>
              </tbody>
            </table>
          </div><br>
          <div class="table-responsive">
            <table class="table table-hover" v-if="this.element_search == ''">
              <thead>
                <tr class="table-primary">
                      <th>Noms</th>
                      <th>Numéros de téléphone</th>
                      <th>Emails</th>
                      <th>Pays</th>
                      <!-- <th>Actions</th> -->
                  </tr>
              </thead>
            
              <tbody>
                <tr  v-for="(profil, i) in profils" :key="i">
                  <td>{{profil.name}}</td>
                  <td>{{profil.phone}}</td>
                  <td>{{profil.email}}</td>
                  <td>{{profil.country}}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-center"><strong>{{total}} utilisateur(s) au total </strong></p><hr class="text-primary">
          </div>
          <br><br> 
          <form action="">
                <div class="nombre d-flex my-4 col-md-2">
                    <label class="title mx-3 my-2"><strong> Affichage:</strong></label> 
                    <select class="form-control " v-model="form.nombre" required @click.prevent="refresh()">
                        <option disabled value>10</option>
                        <option value="25" >25</option>
                        <option value="50">50</option>
                        <option value="10">100</option>
                    </select>
                </div>
            </form>
          <nav aria-label="Page navigation example "  class="d-flex nav" v-if="res_data != null">
            <ul class="pagination">
              <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
              <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
              
              <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
            </ul>
          </nav>
        </div><br><br>
    
    <voirProfil :nom= 'identifiant1' :phone= 'identifiant2' :email= 'identifiant3' :pays= 'identifiant4' v-show="showModal" @close-modal="showModal = false"/>
    </div>
    
    </template>
    
    <script>
    import voirProfil from './voir_profil.vue'
    import Sidebar from '../sidebar.vue'
    export default {
        layout: "empty",
        auth: true,
        components: {
          Sidebar,  
          voirProfil
        },
    
        data () {
            return {
              element_search: '',
              results: [],
              links: [],
              res_data: null,
              showModal: false,
              profils: [],
              profil: "",
              identifiant1 : "",
              identifiant2 : "",
              identifiant3 : "",
              identifiant4 : "",
              total: '',
              form: {
                  nombre: '',
              }
            }
          },
    
        mounted () {
          this.refresh()
        },
        methods: {
    
            deleteProfil(id){
              console.log(id);
              this.$axios.delete('/users/' +id)         
              .then(response => {console.log(response.data.data);
                this.refresh()})                            
            },
            
            refresh(page=1){
              this.$axios.get('/admin/users',{params: {
                page: page,
                per_page : this.form.nombre }   
              })        
              .then(response => 
                {
                  console.log(response.data.data.data);
                  this.profils = response.data.data.data
                  this.res_data= response.data.data
                  this.total = response.data.data.total
                  let firstE = response.data.data.links.shift()
                  let lastE = response.data.data.links.splice(-1,1);
                }
              )
            },
            search(){
              this.$axios.get('/admin/users',{params: {
                search: this.element_search
              }
              })
              .then(response => {console.log(response.data);
              this.results = response.data.data.data 
              
              })
            },
    
            voirProfil(id){
                this.showModal = true;
                this.$axios.get('users/'+ id).then(response => {console.log(response.data.data[0]);
                 this.identifiant1 = response.data.data[0].name
                 this.identifiant2 = response.data.data[0].phone
                 this.identifiant3 = response.data.data[0].email
                 this.identifiant4 = response.data.data[0].country      
        
                }) 
                   
            },
        },
    }
    </script>
    
    <style scoped>
    /* .app-main__outer{
      overflow: auto;
    } */
    
  .nav{
    overflow: auto;
  } 
    .fa{
      margin: 0 5px;
      font-size: 22px;
      cursor: pointer;
    }
    .table{
        margin-top: 2%;
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
    
    
    
  @media screen and (max-width: 900px) {
    .page{
      display: inline;
    }
  }
    </style>
    