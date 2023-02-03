<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Congés </h3>
          <Userinfo />
        </nav>
    
        <div class="app-main__outer py-3 px-2">
          <h4>Congés des employés</h4><hr><br>
          <div class="d-flex">
              <div class="col-md-10">
                <form class="d-flex col-md-7" role="search">
                  <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
                  <button class="btn btn-outline-success btn_recherche" type="submit" @click.prevent="search()"><i class="fa fa-search" aria-hidden="true"></i></button>
                </form>
              </div>
              <div v-for="(user, i) in users" :key="i" class="web-btn"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1" @click.prevent="congeModal= true"><span>Enregistrer un congé</span></button></div>
          </div>
    
          <div class="mobile-btn my-4">
              <div v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1" @click.prevent="congeModal= true"><span>Enregistrer un congé</span></button></div>
            
          </div>
    
          <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
            {{error}} 
          </div>
              <!-- <div class="d-flex justify-content-end mt-3" v-for="(user, i) in users" :key="i">
                <div v-if="selection == 0">
                  <button class="btn btn-outline-info" @click.prevent="selectionner()">
                    Sélectionner
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-dark mx-3" @click.prevent="deselectionner()">
                    Annuler
                  </button>
                </div>
                <button class="btn btn-outline-danger"  v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1 &&  selection !=0" @click.prevent="multipleSup()">
                  <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
                </button>
              </div> -->
          
          <div class="table-responsive search_result" v-if="this.element_search != ''" >
            <table class="table table-hover">
              <thead>
                <tr class="table-warning">
                      <th v-if="selection != 0"></th>
                        <th>Designations</th>
                        <th>Nombre de jours</th>
                        <th>Employé concerné</th>
                        <th>Dates de début</th>
                        <th>Dates de fin</th>
                        <th>Valideurs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
              <tbody>
               <tr  v-for="(result, j) in results" :key="j">
                  <td v-if="selection != 0"><div class="form-check"><input type="checkbox" v-model="checks" @change="checkbox(result.id)" :value="result.id"/></div></td>
                  <td v-if="result.name">{{result.name}}</td>
                  <td v-else>---</td>
                  <td v-if="result.days_count">{{result.days_count}}</td>
                  <td v-else>---</td>
                  <td v-if="result.vacationer">{{result.vacationer.last_name}} {{result.vacationer.first_name}}</td>
                  <td v-else>----</td>
                  <td>{{result.date_start}}</td>
                  <td>{{result.date_end}}</td>
                  <td v-if="result.authorizer">{{result.authorizer.last_name}} {{result.authorizer.first_name}}</td>
                  <td v-else>---</td>
                    <td>
                      <div class="action"  v-for="(user, i) in users" :key="i">
                        <NuxtLink :to="'/conges/voir/'+result.id" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle text-dark" aria-hidden="true"></i></NuxtLink>
                        <NuxtLink :to="'/conges/'+result.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                        <div @click="deleteConge(result.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                        <!-- <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de stock" @click="pdfExporte(result)" v-if="compagny == user.pivot.compagnie_id"><i class="fa fa-download text-success" aria-hidden="true"></i></div> -->
                      </div>
                    </td>
                  </tr>
                </tbody>
            </table>
            <p class="text-center"><strong>{{total}} congé(s) au total </strong></p><hr class="text-primary">
          
            <!-- <form class="justify-content-end btn-group" role="search">
              <input type="file" id="file" ref="file" @change="handleFileUpload()" />
              <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">Importer</button>
              <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">Exporter en pdf</button>
              <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'">Exporter en excel</button>
    
              <div class="d-flex mt-4">
                  <button class="btn btn-outline-success mobile-btn" type="submit" @click.prevent="submitFile()" title="Importer fichier"><i class="fa fa-upload" aria-hidden="true"></i></button>
    
                  <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="pdf()" title="Exporter en pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>
    
                  <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'" title="Exporter en excel"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
                </div>
            </form><br> -->
          </div>
          
          <div class="table-responsive" v-if="this.element_search == ''">
            <table class="table table-hover">
              <thead>
                <tr class="table-warning">
                      <th v-if="selection != 0"></th>
                        <th>Designations</th>
                        <th>Nombre de jours</th>
                        <th>Employé concerné</th>
                        <th>Dates de début</th>
                        <th>Dates de fin</th>
                        <th>Valideurs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
              <tbody>
               <tr  v-for="(conge, j) in conges" :key="j">
                  <td v-if="selection != 0"><div class="form-check"><input type="checkbox" v-model="checks" @change="checkbox(conge.id)" :value="conge.id"/></div></td>
                  <td v-if="conge.name">{{conge.name}}</td>
                  <td v-else>---</td>
                  <td v-if="conge.days_count">{{conge.days_count}}</td>
                  <td v-else>---</td>
                  <td v-if="conge.vacationer">{{conge.vacationer.last_name}} {{conge.vacationer.first_name}}</td>
                  <td v-else>----</td>
                  <td>{{conge.date_start}}</td>
                  <td>{{conge.date_end}}</td>
                  <td v-if="conge.authorizer">{{conge.authorizer.last_name}} {{conge.authorizer.first_name}}</td>
                  <td v-else>---</td>
                    <td>
                      <div class="action"  v-for="(user, i) in users" :key="i">
                        <NuxtLink :to="'/conges/voir/'+conge.id" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle text-dark" aria-hidden="true"></i></NuxtLink>
                        <NuxtLink :to="'/conges/'+conge.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                        <div @click="deleteConge(conge.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                        <!-- <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de stock" @click="pdfExporte(result)" v-if="compagny == user.pivot.compagnie_id"><i class="fa fa-download text-success" aria-hidden="true"></i></div> -->
                      </div>
                    </td>
                  </tr>
                </tbody>
            </table>
            <p class="text-center"><strong>{{total}} congé(s) au total </strong></p><hr class="text-primary">
          
            <!-- <form class="justify-content-end btn-group" role="search">
              <input type="file" id="file" ref="file" @change="handleFileUpload()" />
              <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">Importer</button>
              <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">Exporter en pdf</button>
              <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'">Exporter en excel</button>
    
              <div class="d-flex mt-4">
                  <button class="btn btn-outline-success mobile-btn" type="submit" @click.prevent="submitFile()" title="Importer fichier"><i class="fa fa-upload" aria-hidden="true"></i></button>
    
                  <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="pdf()" title="Exporter en pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>
    
                  <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'" title="Exporter en excel"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
                </div>
            </form><br> -->
          </div><br><br>
        
        <div class="d-flex col-md-2 my-4">
          <label class="title my-2">Affichage</label> 
              <form action="">
              <div class="nombre">
                <!-- -->
                <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                    <option disabled value>10</option>
                    <option value="25" >25</option>
                    <option value="50">50</option>
                    <option value="10">100</option>
                </select>
              </div>
              </form>
        </div>
    
            <nav class="page nav" aria-label="Page navigation example " v-if="res_data != null">
              <ul class="pagination">
                <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
                <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
                
                <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
              </ul>
            </nav>
      </div>          <!-- <pre> {{res_data}}</pre> --><br><br> 
    <deleteModal :identifiant= 'key' v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage"/>  
    <AddcongeModal v-show="congeModal" @close-modal="congeModal = false" @conf="setMessage"/>  
    </div>
    
    </template>
    
    <script>
    import deleteModal from './deleteModal.vue'
    import AddcongeModal from './addCongeModal.vue'
    import Sidebar from '../sidebar.vue'
    import Userinfo from '../user_info.vue'
    export default {
      layout: "empty",
      auth: true,
      components: {
        Sidebar,  
        Userinfo,
        deleteModal,
        AddcongeModal,
      },
    
      data () {
        return {
          total: '',
          file: '',
          element_search: '',
          results: '',
          links: [],
          error: null,
          res_data: null,
          showModal: false,
          congeModal: false,
          conges: [],
          produit: "",
          compagnie_id: "",
          users: '',
          compagny: '',
          form: {
              nombre: '',
          },
          key: "",
          showModalDelete: false,
          checks: [],
          selection: 0,
          showModalMultipleDelete: false
        }
      },
    
      mounted () {
          this.refresh()
          this.users = this.$auth.$state.user.roles;
          this.compagny = localStorage.getItem('auth.company_id');
          this.role = localStorage.getItem('auth.roles');
          
      },
    
      methods: {
            multipleSup(){
              this.showModalMultipleDelete = true
            },
    
            selectionner(){
              this.selection = 1
            },
    
            deselectionner(){
              this.selection = 0
              this.checks = []
            },
    
            checkbox(id){
              // console.log(id)
              console.log(this.checks)
            },
    
            exp(){
                this.exportModal = true
            },
    
            pdfExporte(produit){
              // console.log(produit)
              this.pdfModal = true,
              this.id_prod = produit.id
              this.nom_prod = produit.name
            },
    
            pdf() {
              this.listModal = true
            },
    
           submitFile(){
              let formData = new FormData();
              formData.append('fichier', this.file);
    
              this.$axios.post('/products/import',
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
                // console.log(response);
                if(response.data.status == "success"){
                  this.refresh()
                  // alert("L'importation s'est bien effectuée ...");
                    
                 }else{
                  // alert("Echec de l'importation. Veuillez réessayer !!!");
                  this.error= "Echec de l'importation. Veuillez réessayer !!!"
                 }
              })
            },
    
            Export(){
               this.$axios.get('/products',{
                  params: {
                    export: true,
                    compagnie_id: localStorage.getItem('auth.company_id')
                  },
                  responseType: 'blob'
              }).then((response) => {
                  // Let's create a link in the document that we'll
                  // programmatically 'click'.
                  const link = document.createElement('a');
          
                  // Tell the browser to associate the response data to
                  // the URL of the link we created above.
                  link.href = window.URL.createObjectURL(
                      new Blob([response.data])
                  );
          
                  // Tell the browser to download, not render, the file.
                  link.setAttribute('download', 'report.xlsx');
          
                  // Place the link in the DOM.
                  document.body.appendChild(link);
          
                  // Make the magic happen!
                  link.click();
              }); // Please catch me!
    
                // this.refresh()
            },
    
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
            },
            
            search(){
              this.$axios.get('/vacations',{params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                search: this.element_search
              }
              })
              .then(response => {
                // console.log(response.data);
              this.results = response.data.data.data 
              this.res_data= response.data.data
              this.total = response.data.data.total;
              let firstE = response.data.data.links.shift()
              let lastE = response.data.data.links.splice(-1,1);
              })
            },
            deleteConge(id){
              this.showModalDelete = true
                this.key = id    
                      
             },
    
            setMessage(){
              this.refresh()
            },
              
    
            refresh(page=1){
              this.$axios.get('/vacations',{params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                page: page,
                per_page : this.form.nombre
              }
              })
              .then(response => 
                {
                  console.log(response.data);
                  this.conges = response.data.data.data
                  this.res_data= response.data.data
                  this.total = response.data.data.total;
                  let firstE = response.data.data.links.shift()
                  let lastE = response.data.data.links.splice(-1,1);
                }
              )
            },
            
    
            
        },
       
    }
    </script>
    
    <style scoped>
    
    .nav{
      overflow: auto;
    }
    
    .page{
        display: flex;    
    }
    
    .btn-group{
      display: flex
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
      margin: 2px 10px;
      font-size: 18px;
      cursor: pointer;
    }
    .table{
        margin-top: 2%;
      text-align: center;
    }          
    
    .replace{
      display: flex;
    }
    
    .controler{
      width: 15%;
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
      /* width: 180px;
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
    
    
    @media screen and (max-width: 600px) {
    
      .replace i{
        margin: 5px 2px;
        font-size: 20px;
      }
    
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
    