<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Exercices </h3>
      <User_info />
    </nav>

    <div class="app-main__outer p-5">
      <div class="p-2 mb-2 bg-secondary text-white text-center">
        <h4>Informations sur l'exercice</h4>
      </div><br>
      <div class="">
        <p><strong>Nom de l'exercice : {{ name_exercice }}</strong> </p>
        <p><strong> Période : De {{ start_at }} au {{ end_at }}</strong> </p>
        <p><strong> Statut : {{ status }}</strong> </p>
      </div>
      
      <h5>
        <p class="text-center">Listes des ecritures de cet exercice</p>
      </h5>
      <div class="d-flex flex-row-reverse">
        <div v-for="(user, i) in users" :key="i" class="web-btn"><button @click="addEcriture()"
            class="custom-btn btn-3"
            v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1 && status=='actif'"><span>Ajouter
              écriture</span></button></div>
      </div>
      
      <table class="facture table table-hover ">
        <thead>
          <tr class="table-success">
            <th>Date écriture</th>
            <th>Montant </th>
            <th>Nom</th>
            <th>Commentaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ecriture, j) in ecritures" :key="j">
            <td>{{ ecriture.date }}</td>
            <td>{{ ecriture.amount }}</td>
            <td>{{ ecriture.name_ecriture }}</td>
            <td>{{ ecriture.comment }}</td>
            <td>
              <div class="action" v-for="(user, i) in users" :key="i">
                <div @click="voirEcriture(ecriture.id)" v-if="compagny == user.pivot.compagnie_id"><i
                    class="fa fa-info-circle text-warning" aria-hidden="true"></i></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <voirEcriture :ligne_ecritures="ligne_ecritures" v-show="showModal" @close-modal="showModal = false" />
    </div>
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-dark text-white">
      <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
      <!-- Section: Social media -->
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <!-- Left -->
        <div class="me-5 d-none d-lg-block">
          <img src="../../../static/images/logo.png" class="logo-img" alt="">
        </div>
        <!-- Left -->

        <!-- Right -->
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <!-- Right -->
      </section>
      <!-- Section: Social media -->


      <!-- Copyright -->
      <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05);">
        Copyright © 2022 - Tous droits réservés TocManager
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>
    
    
<script>
import Sidebar from '../../sidebar.vue'
import User_info from "~/pages/user_info.vue";
import voirEcriture from '../../ecritures/voir_ecriture.vue';
export default {
  layout: "voir",
  components: {
    Sidebar,
    User_info,
    voirEcriture
  },

  data() {
    return {
      error_rest: null,
      res_data: null,
      factures: [],
      ecritures: [],
      name_exercice: '',
      idExercice: '',
      showModal: false,
      start_at: '',
      end_at: '',
      status: '',
      ligne_ecritures: '',
      users: ''
    }
  },

  mounted() {
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem('auth.company_id');
    this.role = localStorage.getItem('auth.roles');
    this.$axios.get('/exercices/' + this.$route.params.id,
      {
        params: {
          compagnie_id: localStorage.getItem('auth.company_id')
        }
      }).then(response => {
        // console.log(response);
        this.ecritures = response.data.data.ecritures
        this.name_exercice = response.data.data.name_exercice
        this.start_at = response.data.data.start_at
        this.end_at = response.data.data.end_at
        this.status = response.data.data.status
        this.idExercice = response.data.data.id
      })
  },

  methods: {
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

    },
    addEcriture () {
      this.$router.push({path:'/ecritures/add_ecriture',query: {
        exercice: this.idExercice
      }})
    }
  }
}
</script>
    
<style scoped>
.text-end {
  font-size: 13px;
}

.print i {
  font-size: 25px;
}

.print {
  border: 1px solid black;
  width: 150px;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
}

.print:hover {
  background-color: rgb(236, 244, 251);
}

.app-main__outer {
  overflow: auto;
}

@media print {

  /* .navbar {
        display: none !important;
      } */
  .print,
  .caisse,
  .decaissement {
    display: none !important;
  }

  nav {
    display: none !important;
  }

  footer {
    display: none !important;
  }

}

.fa {
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}

.table {
  margin-top: 5%;
  text-align: center;
  justify-content: center;

}


thead tr {
  background-color: transparent;
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 140, 250);
}

.total td {
  border: 1px solid black;
}

.facture tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 250, 149);
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
</style>
    