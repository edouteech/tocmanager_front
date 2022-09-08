<template >
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Clients </h3>
                <div class="bas-page " data-bs-dismiss="offcanvas">
                        <img src="/images/user.png" alt="logo" srcset="" data-bs-dismiss="offcanvas">
                        <span class="user_name" data-bs-dismiss="offcanvas">{{$auth.user.name}}</span>                        
                </div>
        </nav>
        
        <div class="app-main__outer p-5">
          <h4>Liste des clients de la plateforme</h4><br>
          <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search">
              <button class="btn btn-outline-success" type="submit" @click.prevent="search()">Rechercher</button>
          </form>
          <div class="search_result" v-if="this.element_search != ''">
            <!-- <div >{{result.name}}</div> -->
            <table class="table table-hover">
              <thead>
                <tr class="table-primary">
                      <th>Noms</th>
                      <th>Numéros de téléphone</th>
                      <th>Emails </th>
                      <th>Balance </th>
                      <th>Nature</th>
                      <th>Compagnie associée</th>
                </tr>
              </thead>
              <tbody>
               <tr  v-for="(result, j) in results" :key="j" @click="voirClient(result.id)">
                  <td>{{result.name}}</td>
                  <td>{{result.phone}}</td>
                  <td>{{result.email}}</td>
                  <td>{{result.balance}}</td>
                  <td>{{result.nature}}</td>
                  <td>{{result.compagny.name}}</td>
                  <!-- <td><div class="action">
                    <div @click="voirClient(result.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/clients/'+result.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteClient(result.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div><br>
          <!-- <NuxtLink  to="/clients/add_client"><button class="custom-btn btn-3"><span>Ajouter nouveau client</span></button></NuxtLink> -->
            <table class="table table-hover" v-if="this.element_search == ''">
              <thead>
                <tr class="table-primary">
                      <th>Noms</th>
                      <th>Numéros de téléphone</th>
                      <th>Emails </th>
                      <th>Balance </th>
                      <th>Nature</th>
                      <th>Compagnie associée</th>
                </tr>
              </thead>
              <tbody>
               <tr  v-for="(client, i) in clients" :key="i" @click="voirClient(client.id)">
                  <td>{{client.name}}</td>
                  <td>{{client.phone}}</td>
                  <td>{{client.email}}</td>
                  <td>{{client.balance}}</td>
                  <td>{{client.nature}}</td>
                  <td>{{client.compagny.name}}</td>
                  <!-- <td><div class="action">
                    <div @click="voirClient(client.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/clients/'+client.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteClient(client.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
            <p class="text-center"><strong>{{total}} client(s) au total </strong></p><hr class="text-primary">
        <br><br>
        <!-- <form class="d-flex justify-content-end" role="search"><input type="file" id="file" ref="file" @change="handleFileUpload()" /> <button class="btn btn-outline-dark" type="submit" @click.prevent="submitFile()">Importer</button></form><br><br> -->
        <nav class="page" aria-label="Page navigation example px-8 " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
          <label class="title">Affichage :</label> 
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
        </nav>
        <br> 
      </div>
    <voirClient :nom= 'identifiant1' :phone= 'identifiant2' :email= 'identifiant3' :balance="identifiant5" :nature= 'identifiant4' :compagny= 'identifiant6' v-show="showModal" @close-modal="showModal = false"/>
    </div>
    
    </template>
    
    <script>
    import voirClient from './voir_client.vue'
    import Sidebar from '../sidebar.vue'
    export default {
      layout: "empty",
      auth: true,
      components: {
        Sidebar,  
        voirClient,
      },
       data () {
          return {
            total: '',
            file: '',
            res_data: null,
            element_search: '',
            results: '',
            showModal: false,
            identifiant1 : "",
            identifiant2 : "",
            identifiant3 : "",
            identifiant4 : "",
            identifiant5 : "",
            identifiant6 : "",
            compagnie_id: '',
            clients: [],
            client: "",
            form: {
              nombre: '',
            }
          }
        },
    
        mounted () {
          this.refresh()
        },
    
        methods: {
          submitFile(){
              let formData = new FormData();
              formData.append('fichier', this.file);
    
              this.$axios.post('/clients/import',
                formData,
                {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
                }
              ).then(response => {console.log(response);
                if(response.data.status == "success"){
                  this.refresh()
                  alert("L'importation s'est bien effectuée ...");
                    
                 }else{
                  alert("Echec de l'importation. Veuillez réessayer !!!");
                 }
              })
            },
    
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
            },
            search(){
              this.$axios.get('/admin/clients',{params: {
                // compagnie_id: this.$auth.$storage.getUniversal('company_id'),
                search: this.element_search
              }
              })
              .then(response => {console.log(response.data);
              this.results = response.data.data.data 
              
              })
            },
            
            deleteClient(id){ console.log(id);
              this.$axios.delete('/clients/' +id)
              .then(response =>  {console.log(response);
              this.refresh()})
             },
              
            
            refresh(page=1){
              this.$axios.get('/admin/clients',{params: {
                // compagnie_id: this.$auth.$storage.getUniversal('company_id'),
                page: page,
                per_page : this.form.nombre
              }
              })
              .then(response => {console.log(response.data);
              this.clients = response.data.data.data 
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
                  compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }
              }).then(response => {console.log(response.data.data[0]);
                 this.identifiant1 = response.data.data[0].name
                 this.identifiant2 = response.data.data[0].phone
                 this.identifiant3 = response.data.data[0].email
                 this.identifiant4 = response.data.data[0].nature  
                 this.identifiant5 = response.data.data[0].balance     
                 this.identifiant6 = response.data.data[0].compagny.name     
                 }) 
                   
            },
            
        },       
         
    }
    </script>
    
    <style scoped>
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
    </style>
    