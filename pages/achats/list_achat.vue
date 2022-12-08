<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Achats </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
      <h4>Liste des achats éffectués</h4>
      <hr><br>
      <div class="d-flex">
        <div class="col-md-10">
          <form class="d-flex col-md-7" role="search">
            <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search"
              @input="search()" aria-label="Search">
              <button class="btn btn-outline-success btn_recherche" type="submit" @click.prevent="search()"><i class="fa fa-search" aria-hidden="true"></i></button>
          </form>
        </div>
        <NuxtLink to="/achats/achat" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3"
            v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Nouvel achat</span></button>
        </NuxtLink>
      </div>
        <div class="range">
            <input class="form-control" type="date"  v-model="date_debut"  required />  
            <input  class="form-control" type="date"  v-model="date_fin"  required />  
            <button class="btn btn-outline-success" @click="refresh()"><i class="fa fa-check-circle" aria-hidden="true"></i></button>    
          </div>  
      <div v-if="this.element_search != ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>Date facture</th>
              <th>Fournisseur concerné</th>
              <th>Montant facture </th>
              <th>Montant restant à payer </th>
              <!-- <th>Moyen de paiement</th> -->
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, i) in results" :key="i">
              <td>{{ result.date_buy }}</td>
              <td>{{ result.supplier.name }}</td>
              <td>{{ result.amount }}</td>
              <td>{{ result.rest }}</td>
              <!-- <td>{{result.payment}}</td> -->
              <td>
                <div class="action" v-for="(user, i) in users" :key="i">
                  <NuxtLink :to="'/achats/voir/' + result.id" v-if="compagny == user.pivot.compagnie_id"><i
                      class="fa fa-info-circle text-success" aria-hidden="true"></i></NuxtLink>
                  <NuxtLink :to="'/achats/' + result.id"
                    v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i
                      class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteAchat(result.id)"
                    v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i
                      class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center"><strong>{{ total }} facture(s) au total </strong></p>
        <hr class="text-primary">
      </div>

      <div v-if="this.element_search == ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>Date facture</th>
              <th>Fournisseur concerné</th>
              <th>Montant de la facture</th>
              <th>Montant restant à payer </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(achat, i) in achats" :key="i">
              <td>{{ achat.date_buy }}</td>
              <td>{{ achat.supplier.name }}</td>
              <td>{{ achat.amount }}</td>
              <td>{{ achat.rest }}</td>
              <td>
                <div class="action" v-for="(user, i) in users" :key="i">
                  <NuxtLink :to="'/achats/voir/' + achat.id" v-if="compagny == user.pivot.compagnie_id"><i
                      class="fa fa-info-circle text-success" aria-hidden="true"></i></NuxtLink>
                  <NuxtLink :to="'/achats/' + achat.id"
                    v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i
                      class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteAchat(achat.id)"
                    v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i
                      class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center"><strong>{{ total }} factures au total </strong></p>
        <hr class="text-primary">
      </div>
      <br><br>
      <form class="d-flex justify-content-end" role="search">
        <!-- <input type="file" id="file" ref="file" @change="handleFileUpload()" />
        <button class="btn btn-outline-dark" type="submit" @click.prevent="submitFile()">Importer</button>
        <vue-excel-xlsx class="btn btn-outline-info mx-5" :data="data" :columns="columns" :file-name="'factures_achats'"
          :file-type="'xlsx'" :sheet-name="'sheetname'">
          Exporter
        </vue-excel-xlsx> -->
        <button class="btn btn-outline-dark mx-2" type="submit" @click.prevent="exp()" v-if="role =='admin'">Exporter en excel</button>
        <button class="btn btn-outline-dark mx-2" type="submit" @click.prevent="pdf()">Exporter en pdf</button>
      </form><br><br>
        <form action="">
          <div class="nombre d-flex col-md-2 my-4">
            <label class="title mx-3 my-2"><strong> Affichage:</strong></label>
            <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
              <option disabled value>10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="10">100</option>
            </select>
          </div>
        </form>
      <nav aria-label="Page navigation example " class="d-flex" v-if="res_data != null">
        <ul class="pagination">
          <li :class="(res_data.prev_page_url == null) ? 'page-item disabled' : 'page-item'"><a class="page-link"
              @click="refresh(res_data.current_page - 1)">Précédent</a></li>
          <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a
              :class="(link.active == true) ? 'page-link active' : 'page-link'" href="#"
              @click="refresh(link.label)">{{ link.label }}</a></li>

          <li :class="(res_data.next_page_url == null) ? 'page-item disabled' : 'page-item'"><a class="page-link"
              @click="refresh(res_data.current_page + 1)">Suivant</a></li>
        </ul>
      </nav>
    </div> <!-- <pre> {{res_data}}</pre> --><br><br>
    <voirAchat :date='identifiant1' :fournisseur='identifiant2' :montant='identifiant3' :facture='identifiant4'
      v-show="showModal" @close-modal="showModal = false" />
      <exportModal v-show="exportModal" @close-modal="exportModal = false" />  
      <pdfModal v-show="pdfModal" @close-modal="pdfModal = false" /> 
    <deleteModal :identifiant='key' v-show="showModalDelete" @close-modal="showModalDelete = false"
      @conf="setMessage" />

  </div>

</template>

<script>
import pdfModal from './pdfModal.vue'
import exportModal from './exportModal.vue'
import deleteModal from './deleteModal.vue'
import voirAchat from './voir_achat.vue'
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    voirAchat,
    Userinfo,
    deleteModal,
    exportModal,
    pdfModal
  },
  data() {
    return {
      links: [],
      res_data: null,
      showModal: false,
      exportModal: false,
      identifiant1: "",
      identifiant2: "",
      identifiant3: "",
      identifiant4: "",
      achats: [],
      achat: "",
      total: '',
      users: '',
      compagny: '',
      form: {
        nombre: '',
      },
      key: '',
      showModalDelete: false,
      element_search: "",
      results: "",
      date_debut: "",
      date_fin: "",
      role: "",
      pdfModal: false
    }
  },

  methods: {
    exp(){
        this.exportModal = true
    },

    pdf() {
      this.pdfModal = true
    },

    search() {
      this.$axios.get('/buys', {
        params: {
          compagnie_id: localStorage.getItem('auth.company_id'),
          search: this.element_search,
          date_debut: this.date_debut,
          date_fin: this.date_fin
        }
      })
        .then(response => {
          console.log(response);
          this.results = response.data.data.data
          this.res_data = response.data.data
          this.total = response.data.data.total
          let firstE = response.data.data.links.shift()
          let lastE = response.data.data.links.splice(-1, 1);

        })
    },

    deleteAchat(id) {
      this.showModalDelete = true
      this.key = id

    },

    refresh(page = 1) {
      this.$axios.get('/buys', {
        params: {
          page: page,
          compagnie_id: localStorage.getItem('auth.company_id'),
          per_page: this.form.nombre,
          date_debut: this.date_debut,
          date_fin: this.date_fin
        }
      }).then(response => {
        console.log(response);
        this.achats = response.data.data.data
        this.res_data = response.data.data
        this.total = response.data.data.total
        let firstE = response.data.data.links.shift()
        let lastE = response.data.data.links.splice(-1, 1);
      })
    },

    recupFournisseur() {
      this.$axios.get('/suppliers', {
        params: {
          compagnie_id: localStorage.getItem('auth.company_id')
        }
      }).then(response => {
        console.log(response.data.data.data);
        this.fournisseurs = response.data.data.data
      })
    },

    voirAchat(id) {
      this.showModal = true;
      this.$axios.get('/buys/' + id).then(response => {
        console.log(response.data.data[0]);
        this.identifiant1 = response.data.data[0].date_buy
        this.identifiant2 = response.data.data[0].supplier_id
        this.identifiant3 = response.data.data[0].amount
        this.identifiant4 = response.data.data[0].id
        //  this.identifiant4 = response.data.data[0].nature      
      })

    },

    setMessage() {
      this.refresh()
    },
  },

  async mounted() {
    this.refresh()
    this.recupFournisseur()
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem('auth.company_id');
  }
}
</script>

<style scoped>
.app-main__outer {
  overflow: auto;
}


.range{
  display: flex;
  /* border: 1px solid gainsboro; */
  border-radius: 10px;
  padding: 1% 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  font-size: 18px;

}

.range input{
  margin-right: 2%;
}


.fa {
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}

.table {
  margin-top: 2%;
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
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    7px 7px 20px 0px rgba(0, 0, 0, .1),
    4px 4px 5px 0px rgba(0, 0, 0, .1);
  outline: none;
}

.btn-3 {
  background: rgb(0, 172, 238);
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
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


@media screen and (max-width: 400px) {
  .action {
    padding: 20px 0;
  }
}

  
@media screen and (max-width: 900px) {
.range input{
  width: 45%;
}
}
.range{
  margin: 30px 0;
}
</style>
