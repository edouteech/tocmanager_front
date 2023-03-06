<template>
    <div>
      <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
        <Sidebar />
        <h3 class="name">Ecritures </h3>
        <Userinfo />
      </nav>
  
      <div class="app-main__outer p-5">
        <h4>Liste des écritures comptable</h4>
        <hr><br><br>
        <div class="d-flex">
          <div class="col-md-10">
            <form class="d-flex col-md-7" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search"
                @input="search()" aria-label="Search">
              <button class="btn btn-outline-success btn_recherche" type="submit"
                @click.prevent="search()">Rechercher</button>
            </form>
          </div>
          <NuxtLink to="/ecritures/add_ecriture" v-for="(user, i) in users" :key="i" class="web-btn"><button
              class="custom-btn btn-3"
              v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter
                écriture</span></button></NuxtLink>
        </div>
  
        <div class="mobile-btn mt-4">
          <NuxtLink to="/ecritures/add_ecriture" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3"
              v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter
                écriture</span></button></NuxtLink>
        </div>
  
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
          {{ error }}
        </div>
  
        <div class="table-responsive search_result" v-if="this.element_search != ''">
          <!-- <div >{{result.name}}</div> -->
          <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>Date écriture</th>
                <th>Montant</th>
                <th>Nom</th>
                <th>Commentaire</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(result, j) in results" :key="j">
                    <td>{{ result.start_at }}</td>
                    <td>{{ result.end_at }}</td>
                    <td>{{ result.name_exercice }}</td>
                    <td>{{ result.status }}</td>
                </tr>
            </tbody>
          </table>
        </div>
  
        <div class="table-responsive">
          <table class="table table-hover" v-if="this.element_search == ''">
            <thead>
                <tr class="table-primary">
                    <th>Date écriture</th>
                    <th>Montant</th>
                    <th>Nom</th>
                    <th>Commentaire</th>
                    <th>Actions</th>
                </tr>
            </thead>
  
            <tbody>
              <tr v-for="(ecriture, i) in ecritures" :key="i">
                <td>{{ ecriture.date }}</td>
                <td>{{ ecriture.amount }}</td>
                <td>{{ ecriture.name_ecriture }}</td>
                <td>{{ ecriture.comment }}</td>
                <td>
                  <div class="action" v-for="(user, i) in users" :key="i">
                    <div @click="voirEcriture(ecriture.id)" v-if="compagny == user.pivot.compagnie_id"><i
                    class="fa fa-info-circle text-warning" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/ecritures/' + ecriture.id"
                      v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i
                        class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteExercice(ecriture.id)"
                      v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i
                        class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="text-center"><strong>{{ total }} écritures(s) au total </strong></p>
          <hr class="text-primary">
  
        </div> <br><br>
        <nav class="page" aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null) ? 'page-item disabled' : 'page-item'"><a class="page-link"
                @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a
                :class="(link.active == true) ? 'page-link active' : 'page-link'" href="#" @click="refresh(link.label)">{{
      link.label
  }}</a></li>
  
            <li :class="(res_data.next_page_url == null) ? 'page-item disabled' : 'page-item'"><a class="page-link"
                @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
      </div><br>
      <voirEcriture :ligne_ecritures="ligne_ecritures" v-show="showModal" @close-modal="showModal = false" />
      <deleteModal :identifiant='key' v-show="showModalDelete" @close-modal="showModalDelete = false"
        @conf="setMessage" />
  
    </div>
  
  </template>
      
  <script>
  import Sidebar from '../sidebar.vue'
  import Userinfo from '../user_info.vue'
  import deleteModal from './deleteModal.vue'
  import VoirEcriture from './voir_ecriture.vue'
  export default {
    auth: true,
    layout: "empty",
    components: {
      Sidebar,
      Userinfo,
      deleteModal,
      VoirEcriture
    },
  
    data() {
      return {
        error: null,
        total: '',
        element_search: '',
        results: '',
        links: [],
        res_data: null,
        ecritures: [],
        compagnie_id: '',
        showModal: false,
        showModalDelete: false,
        users: '',
        compagny: '',
        form: {
          nombre: '',
        },
        role: "",
        id_cli: '',
        nom_cli: '',
        key: ''
      }
    },
    async mounted() {
      this.refresh()
      this.users = this.$auth.$state.user.roles;
      this.compagny = localStorage.getItem('auth.company_id');
      this.role = localStorage.getItem('auth.roles');
    },
  
    methods: {
        setMessage() {
            this.refresh()
        },
        deleteExercice(id) {
            this.showModalDelete = true
            this.key = id
    
        },
  
        refresh(page = 1) {
            this.$axios.get('/ecritures', {
            params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                page: page,
                per_page: this.form.nombre
            }
            })
            .then(response => {
                this.total = response.data.data.total;
                this.ecritures = response.data.data.data
                console.log(response.data);
    
                this.res_data = response.data.data
                let firstE = response.data.data.links.shift()
                let lastE = response.data.data.links.splice(-1, 1);
            })
        },
        voirEcriture(id) {
            this.showModal = true;
            this.$axios.get('/ecritures/' + id, {
                params: {
                compagnie_id: localStorage.getItem('auth.company_id')
                }
            }).then(response => {
                // console.log(response);
                this.ligne_ecritures = response.data.data.ligne_ecritures
            })

        }
    },
  
  }
  </script>
      
  <style scoped>
  .btn-group {
    display: flex;
  }
  
  .page {
    display: flex;
  }
  
  .nombre {
    margin: 0;
  }
  
  .title {
    margin: 0.5% 2% 0 10%;
    font-weight: bold;
  }
  
  /* .app-main__outer{
        overflow: auto;
      } */
  
  .fa {
    margin: 0 5px;
    font-size: 22px;
    cursor: pointer;
  }
  
  .table {
    margin-top: 5%;
    text-align: center;
  }
  
  
  thead tr {
    background-color: transparent;
  }
  
  
  tbody tr:last-of-type {
    border-bottom: 2px solid rgb(140, 140, 250);
  }
  
  .action {
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
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
      7px 7px 20px 0px rgba(0, 0, 0, .1),
      4px 4px 5px 0px rgba(0, 0, 0, .1);
    outline: none;
  }
  
  .btn-3 {
    background: rgb(0, 172, 238);
    background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
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
    background: rgba(2, 126, 251, 1);
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
  
  .btn-3:hover {
    background: transparent;
    box-shadow: none;
  }
  
  .btn-3:hover:before {
    height: 100%;
  }
  
  .btn-3:hover:after {
    width: 100%;
  }
  
  .btn-3 span:hover {
    color: rgba(2, 126, 251, 1);
  }
  
  .btn-3 span:before,
  .btn-3 span:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    background: rgba(2, 126, 251, 1);
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
  
  .mobile-btn {
    display: none;
  }
  
  
  
  @media screen and (max-width: 900px) {
    /* .btn_recherche{
          display:none;
        } */
  
    .mobile-btn {
      display: block;
    }
  
    .web-btn {
      display: none;
    }
  
    .btn-group {
      display: inline;
    }
  
    .btn-group .btn {
      margin: 10px 0;
    }
  }
  </style>
      