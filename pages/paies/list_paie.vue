<template >
    <div>
            <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
              <Sidebar /><h3 class="name_side">Paie </h3>
              <Userinfo />
            </nav>
            
            <div class="app-main__outer py-5 px-2">
              <h4>Liste des bulletins de paie</h4><hr><br>
              <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                    {{error}} 
                </div>
              <br>
              <div class="d-flex">
                  <!-- <div class="col-md-10">
                    <form class="d-flex col-md-7" role="search">
                      <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
                      <button class="btn btn-outline-success btn_recherche" type="submit" @click.prevent="search()">Rechercher</button>
                    </form>
                  </div> -->
                <NuxtLink  to="/paies/add_paie" v-for="(user, i) in users" :key="i" class="web-btn"><button class="custom-btn btn-3" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter une paie</span></button></NuxtLink>
              </div>
    
              <div class="mobile-btn my-4">
                <NuxtLink  to="/paies/add_paie" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter une paie</span></button></NuxtLink>
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
                <div v-if="defaultNum != 0">
                    <button class="btn btn-outline-dark mx-3" @click.prevent="chooseDefaultClient()">
                    Choisir commme client par défaut
                    </button>
                </div>
                <button class="btn btn-outline-danger"  v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1 &&  selection !=0" @click.prevent="multipleSup()">
                    <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
                </button>
            </div> -->
    
              <div class="table-responsive search_result" v-if="this.element_search != ''">>
                <table class="table table-hover">
                  <thead>
                    <tr class="table-dark">
                          <th v-if="selection != 0"></th>
                          <th>Dates de début</th>
                          <th>Dates de fin</th>
                          <th>Employés</th>
                          <th>Salaires de base </th>
                          <th>Salaires bruts </th>
                          <th>Salaires Nets</th>
                          <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                   <tr  v-for="(result, j) in results" :key="j">
                        <td v-if="selection != 0"><div class="form-check"><input type="checkbox" v-model="checks" @change="checkbox(result.id)" :value="result.id"/></div></td>
                      <td>{{result.date_start}}</td>
                      <td>{{result.date_end}}</td>
                      <td>{{result.employee.first_name}} {{result.employee.last_name}}</td>
                      <td>{{result.base_salary}}</td>
                      <td>{{result.brut_salary}}</td>
                      <td>{{result.net_salary}}</td>
                      <td>
                        <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                          <NuxtLink :to="'/paies/voir/'+result.id" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle text-warning" aria-hidden="true"></i></NuxtLink>
                          <NuxtLink :to="'/paies/'+result.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                          <div @click="deletePaie(result.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
        
              
              <div class="table-responsive" v-if="this.element_search == ''">
                <table class="table table-hover">
                  <thead>
                    <tr class="table-dark">
                          <th v-if="selection != 0"></th>
                          <th>Dates de début</th>
                          <th>Dates de fin</th>
                          <th>Employés</th>
                          <th>Salaires de base </th>
                          <th>Salaires bruts </th>
                          <th>Salaires Nets</th>
                          <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                   <tr  v-for="(paie, j) in paies" :key="j">
                        <td v-if="selection != 0"><div class="form-check"><input type="checkbox" v-model="checks" @change="checkbox(paie.id)" :value="paie.id"/></div></td>
                      <td>{{paie.date_start}}</td>
                      <td>{{paie.date_end}}</td>
                      <td>{{paie.employee.first_name}} {{paie.employee.last_name}}</td>
                      <td>{{paie.base_salary}}</td>
                      <td>{{paie.brut_salary}}</td>
                      <td>{{paie.net_salary}}</td>
                      <td>
                        <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                          <NuxtLink :to="'/paies/voir/'+paie.id" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle text-warning" aria-hidden="true"></i></NuxtLink>
                          <NuxtLink :to="'/paies/'+paie.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                          <div @click="deletePaie(paie.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="text-center"><strong>{{total}} bulletin(s) au total </strong></p><hr class="text-primary">
              </div><br><br>
            <!-- <form class="btn-group justify-content-end" role="search">
              <input type="file" id="file" ref="file" @change="handleFileUpload()" /> 
              <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">Importer</button>
              <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">Exporter en pdf</button>
              <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exporte()" v-if="role == 'admin'">Exporter en excel</button>
              <div class="d-flex mt-4">
                <button class="btn btn-outline-success mobile-btn" type="submit" @click.prevent="submitFile()" title="Importer fichier"><i class="fa fa-upload" aria-hidden="true"></i></button>
        
                <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="pdf()" title="Exporter en pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>
        
                <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exporte()" v-if="role == 'admin'" title="Exporter en excel"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
              </div>
    
            </form><br> -->
            <div class=" d-flex col-md-2 my-4">
              <label class="title mt-2">Affichage :</label> 
              <form action="">
              <div class="nombre">
                <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                    <option disabled value>10</option>
                    <option value="25" >25</option>
                    <option value="50">50</option>
                    <option value="10">100</option>
                </select>
              </div>
            </form>
            </div>
            <nav class="page nav" aria-label="Page navigation example px-8" v-if="res_data != null">
              <ul class="pagination">
                <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
                <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
                
                <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
              </ul>
            </nav>
            <br> 
          </div>
        <!-- <stockModal :cli="id_cli" :cli_name="nom_cli" v-show="stockModal" @close-modal="stockModal = false"/>  
        <voirClient :nom= 'identifiant1' :phone= 'identifiant2' :email= 'identifiant3' :balance="identifiant5" :nature= 'identifiant4' :type= 'type_client' :seuil='seuil_client' v-show="showModal" @close-modal="showModal = false"/>
        <exportModal v-show="exportModal" @close-modal="exportModal = false"/>
        <deleteMultipleModal :ids= 'checks' v-show="showModalMultipleDelete" @close-modal="showModalMultipleDelete = false" @conf="setMessage"/>   -->
        <deleteModal :identifiant= 'key' v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage"/>  
        </div>
        
        </template>
        
        <script>
        import Sidebar from '../sidebar.vue'
        import Userinfo from '../user_info.vue'
        import deleteModal from './deleteModal.vue'
        export default {
          layout: "empty",
          auth: true,
          components: {
            Sidebar,  
            Userinfo,
            deleteModal,
            // voirClient,
            // exportModal,
            // stockModal,
            // deleteMultipleModal
          },
           data () {
              return {
                error: null,
                total: '',
                file: '',
                res_data: null,
                element_search: '',
                results: '',
                showModal: false,
                paies: [],
                paie: "",
                users: '',
                compagny: '',
                form: {
                  nombre: '',
                },
                key: '',
                showModalDelete: false,
                exportModal: false,
                role: "",
                id_cli: '',
                nom_cli: '',
                stockModal: false,
                checks: [],
                selection: 0,
                showModalMultipleDelete: false,
                defaultNum: 0
              }
            },
        
            async mounted () {
              // await this.exp()
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
                this.defaultNum = 1
              },
        
              deselectionner(){
                this.selection = 0
                this.defaultNum = 0
                this.checks = []
              },
        
              checkbox(id){
                // console.log(id)
                // console.log(this.checks)
              },
        
        
              exporte(){
                this.exportModal = true
              },
        
              stockExporte(client){
                this.stockModal = true,
                this.id_cli = client.id
                this.nom_cli = client.name
              },
        
              pdf() {
                  this.$axios.get('/clients/download', {
                    params: {
                      compagnie_id: localStorage.getItem('auth.company_id'),
                      start_at: this.form.date_debut,
                      end_at: this.form.date_fin
                    },
                    responseType: 'blob',
                    Accept: 'application/pdf'
                  }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'clients.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    this.$toast('Téléchargement', {
                        icon: 'fa fa-check-circle',
                    })
                    this.$emit('close-modal')
                  })
                },
                  
              async exp(){
                await this.$axios.get('/clients',{
                    params: {
                      compagnie_id: localStorage.getItem('auth.company_id'),
                      is_paginated: 0
                    }
                  }).then(response =>{
                    // console.log(response);
                    this.data = response.data.data
                    })   
              },
              
              submitFile(){
                  let formData = new FormData();
                  formData.append('fichier', this.file);
        
                  this.$axios.post('/clients/import',
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
        
                handleFileUpload(){
                  this.file = this.$refs.file.files[0];
                },
    
    
                search(){
                  this.$axios.get('/payslips',{params: {
                    compagnie_id: localStorage.getItem('auth.company_id'),
                    search: this.element_search
                  }
                  })
                  .then(response => {
                    // console.log(response.data);
                  this.results = response.data.data.data 
                  this.total = response.data.data.total;
                  this.res_data= response.data.data
                  // this.links = response.data.data.links
                  let firstE = response.data.data.links.shift()
                  let lastE = response.data.data.links.splice(-1,1);
                  
                  })
                },
                
                deletePaie(id){ 
                  this.showModalDelete = true
                    this.key = id    
                          
                 },
        
                setMessage(){
                  this.refresh()
                },
        
                
                refresh(page=1){
                  this.$axios.get('/payslips',{params: {
                    compagnie_id: localStorage.getItem('auth.company_id'),
                    page: page,
                    per_page : this.form.nombre
                  }
                  })
                  .then(response => {
                    // console.log(response.data);
                  this.paies = response.data.data.data 
                  this.total = response.data.data.total;
                  this.res_data= response.data.data
                  // this.links = response.data.data.links
                  let firstE = response.data.data.links.shift()
                  let lastE = response.data.data.links.splice(-1,1);
                  })
                },
        
                voirClient(id){
                    this.showModal = true;
                    this.$axios.get('/clients/'+ id,{
                    params: {
                      compagnie_id: localStorage.getItem('auth.company_id')
                    }
                  }).then(response => {
                    // console.log(response.data.data[0]);
                     this.identifiant1 = response.data.data[0].name
                     this.identifiant2 = response.data.data[0].phone
                     this.identifiant3 = response.data.data[0].email
                     this.identifiant4 = response.data.data[0].nature  
                     this.identifiant5 = response.data.data[0].balance  
                     this.type_client = response.data.data[0].type_client
                     this.seuil_client = response.data.data[0].seuil_max    
        
                     }) 
                       
                },
                
            },       
             
        }
        </script>
        
        <style scoped>
        
        .nav{
            overflow: auto;
        }
        
        .btn-group{
          display: flex;
        }
        .page{
            display: flex;    
        }
        
        
        .nombre{
          margin: 0;
        }
        
        .title{
          margin: 0.5% 2% 0 10%;
          font-weight: bold;
        }
        
        .bas-page img{
            width: 45px;
            border: 1px solid transparent;
            border-radius: 100%;
            cursor: pointer;
        }
        
        .bas-page .user_name{
            font-size: 12px;
            padding: 10px;
            color: rgb(246, 245, 245);
            font-weight: bold;
        }
        
        .app-main__outer{
          overflow: auto;
        }
        
        .fa{
          margin: 0 5px;
          font-size: 18px;
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
        