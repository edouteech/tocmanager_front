<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3 mb-5">
      <Sidebar />
      <Userinfo />
    </nav>

    <div class="container mb-5">
      <h3 class="name text-center">Grand livre au {{ today }}</h3>
      <table class="table" v-for="(compte, j) in comptes" :key="j">
        <thead>
          <tr class="table-primary">
            <th scope="col" colspan="4">{{ compte.code }} {{ compte.name }}</th>
          </tr>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Libellé</th>
            <th scope="col">Débit</th>
            <th scope="col">Crédit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ligne_ecriture, i) in compte.ligne_ecritures" :key="i">
            <td>{{ ligne_ecriture.date }}</td>
            <td>{{ligne_ecriture.ecriture.name_ecriture}}</td>
            <td v-if="ligne_ecriture.side == 'Debit'">{{ ligne_ecriture.amount }}</td>
            <td v-else></td>
            <td v-if="ligne_ecriture.side == 'Credit'">{{ ligne_ecriture.amount }}</td>
            <td v-else></td>
          </tr>
          <tr class="recap">
            <td>---</td>
            <td>Total</td>
            <td> {{ compte.sum_debit }} </td>
            <td> {{ compte.sum_amount - compte.sum_debit }} </td>
          </tr>
          <tr v-if="compte.sum_amount < 2 * compte.sum_debit" class="recap">
            <td>---</td>
            <td>Solde</td>
            <td> {{ 2 * compte.sum_debit - compte.sum_amount }} </td>
            <td></td>
          </tr>
          <tr v-if="compte.sum_amount > 2 * compte.sum_debit" class="recap">
            <td>---</td>
            <td>Solde</td>
            <td></td>
            <td> {{ compte.sum_amount - 2 * compte.sum_debit }} </td>
          </tr>
          <tr v-if="compte.sum_amount == 2 * compte.sum_debit" class="recap">
            <td>Solde</td>
            <td>0,00</td>
            <td>0,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
import moment from "moment";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    Userinfo,
  },

  data() {
    return {
      users: "",
      compagny: "",
      role: "",
      comptes: [],
      today: moment().format("DD-MM-YYYY"),
    };
  },

  mounted() {
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
    this.refresh();
  },

  methods: {
    moment: function () {
      return moment();
    },
    refresh(page = 1) {
      this.$axios
        .get("/book", {
          params: {
            page: page,
            compagnie_id: this.compagny,
            //   per_page : this.form.nombre
          },
        })
        .then((response) => {
          console.log(response.data);
          this.comptes = response.data.data;
          this.res_data = response.data;
          // this.total = response.data.data.total;
          // let firstE = response.data.data.links.shift();
          // let lastE = response.data.data.links.splice(-1, 1);
        });
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
}

.recap {
  background-color: black;
  color:white;
}

.btn-group {
  display: flex;
}

.nombre {
  margin: 0;
}

.title {
  margin: 0.5% 2% 0 10%;
  font-weight: bold;
}
.app-main__outer {
  overflow: auto;
}
.fa {
  margin: 2px 10px;
  font-size: 18px;
  cursor: pointer;
}
.table {
  /* margin-top: 5%; */
  text-align: center;
}

.replace {
  display: flex;
}

.controler {
  width: 15%;
}

thead tr {
  background-color: transparent;
}
/* 
tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 140, 250);
} */
.action {
  display: flex;
}

.custom-btn {
  /* width: 180px;
      height: 40px; */
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.btn-3 {
  background: rgb(0, 172, 238);
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
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

@media screen and (max-width: 600px) {
  .replace i {
    margin: 5px 2px;
    font-size: 20px;
  }
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
