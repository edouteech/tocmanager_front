<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Catégories</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
      <h4>Liste des catégories</h4><hr><br>
      <div class="d-flex">
        <div class="col-md-10">
          <form class="d-flex col-md-7" role="search">
            <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
              <button class="btn btn-outline-success btn_recherche" type="submit" @click.prevent="search()"><i class="fa fa-search" aria-hidden="true"></i></button>
          </form>
        </div>

        <NuxtLink  to="/categorie/add_categorie" v-for="(user, i) in users" :key="i" class="web-btn"><button class="custom-btn btn-3" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter nouvelle catégorie</span></button></NuxtLink>
      </div>

      <div class="mobile-btn my-4">
        <NuxtLink  to="/categorie/add_categorie" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter nouvelle catégorie</span></button></NuxtLink>
      </div>
      <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
        {{error}} 
      </div>
      <div class="table-responsive search_result" v-if="this.element_search != ''">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
                <th>Noms de Catégorie</th>
                <th>Catégories parentes</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           <tr  v-for="(result, j) in results" :key="j" >
              <td>{{result.name}}</td>
              <td v-if="result.parent != null">{{result.parent.name}}</td>
              <td v-else>---</td>
              <td><div class="action" v-for="(user, i) in users" :key="i">
                <NuxtLink :to="'/categorie/voir'+result.id" class="text-black" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle" aria-hidden="true"></i></NuxtLink>
                <NuxtLink :to="'/categorie/'+result.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                <div @click="deleteCategorie(result.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div><br>
      
      
      
      <div class="table-responsive">
        <table class="table table-hover" v-if="this.element_search == ''">
            <thead>
              <tr class="table-primary">
                  <th>Noms de Catégorie</th>
                  <th>Catégories parentes</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(categorie, i) in categories" :key="i" >
                <td>{{categorie.name}}</td>
                <td v-if="categorie.parent != null">{{categorie.parent.name}}</td>
                <td v-else>---</td>
                <td><div class="action" v-for="(user, i) in users" :key="i">
                  <NuxtLink :to="'/categorie/voir/'+categorie.id" class="text-black" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle" aria-hidden="true"></i></NuxtLink>
                  <NuxtLink :to="'/categorie/'+categorie.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteCategorie(categorie.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>
        <p class="text-center"><strong>{{total}} catégorie(s) au total </strong></p><hr class="text-primary">
      </div><br><br> 
        <form class="btn-group justify-content-end" role="search">
          <input type="file" id="file" ref="file" @change="handleFileUpload()" /> 
          <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">Importer</button>
          <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">Exporter en pdf</button>
          <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'">Exporter en excel</button>
          
       <div class="d-flex mt-4">
          <button class="btn btn-outline-success mobile-btn" type="submit" @click.prevent="submitFile()" title="Importer fichier"><i class="fa fa-upload" aria-hidden="true"></i></button>

          <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="pdf()" title="Exporter en pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>

          <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'" title="Exporter en excel"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
        </div>
        </form><br>
        <div class="d-flex col-md-2 my-4">
          <label class="title my-2">Affichage :</label> 
          <form action="">
          <div class="nombre">
            <!-- -->
            <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                <option value>10</option>
                <option value="25" >25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
          </div>
          </form></div>
        <nav class="d-flex" aria-label="Page navigation example " v-if="res_data != null ">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
  </div><br>
 <!-- <voirCategorie :nom= 'identifiant1' :parent= 'identifiant2' :stock= 'identifiant3' :valorisation= 'identifiant4' v-show="showModal" @close-modal="showModal = false"/>   -->
 <deleteModal :identifiant= 'key' v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage"/>  
 <exportModal v-show="exportModal" @close-modal="exportModal = false"/>  
 <pdfModal v-show="pdfModal" @close-modal="pdfModal = false"/>  
</div>
</template>

<script>
import pdfModal from './pdfModal.vue'
import deleteModal from './deleteModal.vue'
import exportModal from './exportModal.vue'
import voirCategorie from './voir_categorie.vue'
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
      Sidebar,  
      voirCategorie,
      Userinfo,
      deleteModal,
      exportModal,
      pdfModal
    },

    data () {
      return {
        error: null,
        total: '',
        file: '',
        element_search: '',
        results: '',
        links: [],
        res_data: null,
        showModal: false,
        identifiant1 : "",
        identifiant2 : "",
        identifiant3: '',
        identifiant4: '',
        compagnie_id: ''  ,
        categories: [],
        categorie: "",
        users: '',
        compagny: '',
        form: {
          nombre: '',
        },
        key: "",
        showModalDelete: false,
        exportModal: false,
        pdfModal: false,
        role: ""
                
                
      }
    },

    
    methods: {
      exp(){
       this.exportModal = true 
      },
      
      pdf(){
       this.pdfModal = true 
      },
      
      submitFile(){
          let formData = new FormData();
          formData.append('fichier', this.file);

          this.$axios.post('/categories/import',
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              params: {
                compagnie_id: localStorage.getItem('auth.company_id')
              }
            }
          ).then(response => {
            console.log(response);
            // console.log(formData);
            if(response.data.status == "success"){
              this.refresh()
              // alert("L'importation s'est bien effectuée ...")
                
             }else{
              // alert("Echec de l'importation. Veuillez réessayer !!!");
              this.error= "Echec de l'importation. Veuillez réessayer !!!"
             }
            })
              
        },

        handleFileUpload(){
          this.file = this.$refs.file.files[0];
        },
    

        search(){
          this.$axios.get('/categories',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            search: this.element_search
          }
          })
          .then(response => {
            // console.log(response.data);
          this.results = response.data.data.data 
          
          })
        },

       deleteCategorie(id){
          this.showModalDelete = true
            this.key = id                  
        },      

        setMessage(){
          this.refresh()
        },
        
        refresh(page=1){
          this.$axios.get('/categories',{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id'),
              page: page,
              per_page : this.form.nombre
            }
          }).then(response =>{
            // console.log(response);
            this.categories = response.data.data.data
            this.res_data= response.data.data
            this.total = response.data.data.total;
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
            })     
        },

        // voirCategorie(id){
        //     this.showModal = true;
        //     this.$axios.get('/categories/'+ id,{
        //     params: {
        //       compagnie_id: localStorage.getItem('auth.company_id')
        //     }
        //   }).then(response => {
        //     console.log(response.data.data[0]);
        //      this.identifiant1 = response.data.data[0].name
        //      this.identifiant3 = response.data.data[0].stock_produit
        //      this.identifiant4 = response.data.data[0].valorisation
        //      if(response.data.data[0].parent != null){
        //         this.identifiant2 = response.data.data[0].parent.name  
        //      }else{
        //         this.identifiant2 = "Pas de catégorie parente associée"
        //      }
             
        //      })               
        // },


        
    },

    async mounted () {
      this.refresh()
         this.users = this.$auth.$state.user.roles;
       this.compagny = localStorage.getItem('auth.company_id');
       this.role = localStorage.getItem('auth.roles');
    }
}
</script>

<style scoped>
.btn-group{
  display: flex;
}
.nombre{
  margin: 0 ;
}

.title{
  margin: 0.5% 2% 0 10%;
  font-weight: bold;
}

.app-main__outer{
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
  /* width: 200px;
  height: 40px; */
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
  width: 200px;
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


.mobile-btn{
  display: none;
}



@media screen and (max-width: 900px) {
  /* .btn_recherche{
    display:none;
  } */

  .mobile-btn{
    display: block;
  }

  .web-btn{
    display: none;
  }


  .btn-group{
    display: inline;
  }

  .btn-group .btn{
    margin: 10px 0;
  }
}

</style>
