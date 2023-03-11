<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Grand livre</h3>
      <Userinfo />
    </nav>

    <div class="table-responsive container-fluid">
      <table
        class="table table-borderless table-striped table-hover"
      >
        <thead>
          <tr>
            <th colspan="3">Grand livre au --</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(compte, j) in comptes" :key="j">
            <table class="table table-borderless">
              <tr>
                <td colspan="3">{{ compte.name }}</td>
              </tr>
              <tr v-for="(ligne_ecriture, i) in compte.ligne_ecritures" :key="i">
                <td>{{ligne_ecriture.date}}</td>
                <td>{{ligne_ecriture.amount}}</td>
                <td>{{ligne_ecriture.side}}</td>
              </tr>
            </table>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
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
    };
  },

  mounted() {
    this.refresh();
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
  },

  methods: {
    refresh(page = 1) {
      this.$axios
        .get("/book", {
          params: {
            page: page,
            compagnie_id: 1
            //   per_page : this.form.nombre
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          this.comptes = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
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
  margin-top: 5%;
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

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 140, 250);
}
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
