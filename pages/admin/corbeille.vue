<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Corbeille </h3>
        </nav>

        <div class="app-main__outer px-2 py-5">
            <div class="row mt-5">       
                <div class="col-md-6 col-xl-3">
                    <NuxtLink to="/admin/compagnies/delete_compagnie" class="wid">
                    <div class="card mb-3 widget-content bg-dark text-white">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper p-5">
                                <div class="widget-content-left">
                                    <div class="widget-heading text-center">Compagnies supprimées</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </NuxtLink>
                </div>

                <div class="col-md-6 col-xl-3">
                    <NuxtLink to="/admin/users/delete_user" class="wid">
                    <div class="card mb-3 widget-content bg-dark text-white">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper p-5">
                                <div class="widget-content-left">
                                    <div class="widget-heading text-center">Utilisateurs supprimés</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </NuxtLink>
                </div>
                
        
                
            </div><hr class="line bg-dark">
        </div>
    </div>
    
    </template>
    
    <script>
    import Sidebar from '../sidebar.vue'
    export default {
      auth: true,
      layout: "empty",
      components: {
        Sidebar,  
      },
    
      data () {
        return {
          total: '',
          file: '',
          element_search: '',
          results: '',
          links: [],
          res_data: null,
          showModal: false,
          identifiant1 : "",
          identifiant2 : "",
          identifiant3 : "",
          compagnies: [],
          compagnie: "",
          compagnie_id: '',
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
    
              this.$axios.post('/suppliers/import',
                formData,
                {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
                }
              ).then(response => {
                // console.log(response);
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
              this.$axios.get('/admin/compagnies',{params: {
                search: this.element_search
              }
              })
              .then(response => {
                // console.log(response.data);
              this.results = response.data.data.data 
              
              })
            },
        
           deleteCompagnie(id){
              console.log(id);
              this.$axios.delete('/suppliers/' +id)
              .then(response => {
                // console.log(response.data.data);
                this.refresh()})                 
            },
             
            refresh(page=1){
              this.$axios.get('/admin/compagnies',{params: {
                page: page,
                per_page : this.form.nombre
              }
              })
              .then(response => 
                {
                  // console.log(response);
                  this.total = response.data.data.total;
                  this.compagnies = response.data.data.data
    
                  this.res_data= response.data.data
                  let firstE = response.data.data.links.shift()
                  let lastE = response.data.data.links.splice(-1,1);
                })
            },
    
            // voirCompagnie(id){
            //     this.showModal = true;
            //     this.$axios.get('/admin/compagnies/'+ id,{
            //     params: {
            //       compagnie_id: this.$auth.$storage.getUniversal('company_id')
            //     }
            //   }).then(response => {
            //     console.log(response.data.data[0]);
            //      this.identifiant1 = response.data.data[0].name
            //      this.identifiant2 = response.data.data[0].phone
            //      this.identifiant3 = response.data.data[0].email     
            //      }) 
                   
            // },

            async abonne(id){
              await this.$axios.get('/compagnie/suscribed/plan/'+id)
              .then(response => 
                {
                  // console.log(response.data);
                  this.identifiant2 = response.data.data.id
                })
        
              this.showModal = true
              this.identifiant1 = id
            }
        },
    
    }
    </script>
    
    <style scoped>

    .wid{
        text-decoration: none;
    }
    
  .nav{
    overflow: auto;
  } 
    .nombre{
      margin: 0 ;
    }
    
    .title{
      margin: 0.5% 2% 0 10%;
      font-weight: bold;
    }
    
    /* .app-main__outer{
      overflow: auto;
    } */
    
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
      /* width: 220px;
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
      width: 220px;
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
    