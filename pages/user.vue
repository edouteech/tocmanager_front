<template >
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Clients </h3>
          <div class="bas-page " data-bs-dismiss="offcanvas">
                        <img src="/images/user.png" alt="logo" srcset="" data-bs-dismiss="offcanvas">
                        <span class="user_name" data-bs-dismiss="offcanvas">{{$auth.user.name}}</span> 
                           
                </div>
        </nav>
        
        <div class="app-main__outer py-5 px-2">
          <h4>Liste des clients</h4><br>
          <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search">
              <button class="btn btn-outline-success" type="submit" @click.prevent="search()">Rechercher</button>
          </form>
          <div class="search_result" v-if="this.element_search != ''">
            <!-- <div >{{result.name}}</div> -->
            <table class="table table-hover">
              <tbody>
               <tr  v-for="(result, j) in results" :key="j" @click="voirClient(result.id)">
                  <td>{{result.name}}</td>
                  <td>{{result.phone}}</td>
                  <td>{{result.balance}}</td>
                  <td>{{result.nature}}</td>
                  <!-- <td><div class="action d-flex aligns-items-center justify-content-center">
                    <div @click="voirClient(client.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/clients/'+client.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteClient(client.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                    </div>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div><br>
          <NuxtLink  to="/clients/add_client"><button class="custom-btn btn-3"><span>Ajouter nouveau client</span></button></NuxtLink>
            <table class="table table-hover">
              <thead>
                <tr class="table-primary">
                      <th>Noms</th>
                      <th>Numéros de téléphone</th>
                      <th>Balance </th>
                      <th>Nature</th>
                      <th>Actions</th>
                </tr>
              </thead>
              <tbody>
               <tr  v-for="(client, i) in clients" :key="i">
                  <td>{{client.name}}</td>
                  <td>{{client.phone}}</td>
                  <td>{{client.balance}}</td>
                  <td>{{client.nature}}</td>
                  <td><div class="action d-flex aligns-items-center justify-content-center">
                    <div @click="voirClient(client.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/clients/'+client.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteClient(client.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
        <br><br>
        <nav aria-label="Page navigation example px-8 " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
        <br> 
      </div>
</div>
    
    </template>
    
    <script>
    import Sidebar from './sidebar.vue'
    export default {
      layout: "empty",
      auth: true,
      components: {
        Sidebar,  
        // voirClient,
      },
       data () {
          return {
            res_data: null,
            element_search: '',
            results: '',
            showModal: false,
            identifiant1 : "",
            identifiant2 : "",
            identifiant3 : "",
            identifiant4 : "",
            identifiant5 : "",
            compagnie_id: '',
            clients: [],
            client: "",
          }
        },
    
        mounted () {
          this.refresh()
        },
    
        methods: {
    
            search(){
              this.$axios.get('/clients',{params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
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
              this.$axios.get('/clients',{params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                page: page
              }
              })
              .then(response => {console.log(response.data);
              this.clients = response.data.data.data 
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
              }).then(response => {console.log(response.data.data[0]);
                 this.identifiant1 = response.data.data[0].name
                 this.identifiant2 = response.data.data[0].phone
                 this.identifiant3 = response.data.data[0].email
                 this.identifiant4 = response.data.data[0].nature  
                 this.identifiant5 = response.data.data[0].balance     
                 }) 
                   
            },
            
        },       
         
    }
    </script>
    
    <style scoped>
    /* .bas-page{
        display: flex;    
        border: 1px solid rgb(88, 87, 87);
        padding: 10px;
    } */
    
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
    