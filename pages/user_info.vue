<template>
  <div class="bas-page" data-bs-dismiss="offcanvas">
    <nav>
      <ul>
        <img
          src="/images/user.png"
          alt="logo"
          srcset=""
          data-bs-dismiss="offcanvas"
        />
        <li class="item">
          <NuxtLink to="#">
            <span class="user_name" data-bs-dismiss="offcanvas">{{
              user.name
            }}</span>
            <i class="fa fa-chevron-circle-down" aria-hidden="true"></i
          ></NuxtLink>
          <!-- First Tier Drop Down -->
          <ul>
            <li>
              <NuxtLink to="/mon_profil"
                ><i class="fa fa-user mx-3" aria-hidden="true"></i>Mon
                profil</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/update_password"
                ><i class="fa fa-key mx-2" aria-hidden="true"></i>Modifier mot
                de passe</NuxtLink
              >
            </li>
            <li @click="logout()">
              <NuxtLink to="" @click="logout()"
                ><i class="fa fa-sign-out mx-2" aria-hidden="true"></i
                >Déconnexion</NuxtLink
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <changeCompagnie
      :compagnies="liste"
      v-show="showModal"
      @close-modal="showModal = false"
    />
  </div>
</template>

<script>
import changeCompagnie from "./change_compagnie.vue";
export default {
  auth: true,
  name: "Userinfo",
  components: {
    changeCompagnie,
  },
  data() {
    return {
      showModal: false,
      liste: "",
      user: "",
    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    async logout() {
      localStorage.removeItem("auth.user_id");
      localStorage.removeItem("auth.company_id");
      localStorage.removeItem("auth.roles");
      localStorage.removeItem("auth.email");
      this.$auth.logout();
      this.$router.push("/login");
    },

	//modal pour changer de compagnie
    change() {
      this.showModal = true;
      this.$axios.get("/user/compagnies").then((response) => {
        this.liste = response.data;
      });
    },

	//utilisateur connecté
    checkUser() {
      this.$axios.get("/user").then((response) => {
        this.user = response.data;
      });
    },
  },
};
</script>

<style scoped>
.bas-page img {
  width: 45px;
  border: 1px solid transparent;
  border-radius: 100%;
  cursor: pointer;
  color: #040404;
}

i {
  cursor: pointer;
  font-size: 12px;
}

.bas-page .user_name {
  font-size: 12px;
  /* padding:  5px; */
  padding-top: 5px;
  color: rgb(246, 245, 245);
  font-weight: bold;
}

/* CSS Document */

/* @import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://fonts.googleapis.com/css?family=Bree+Serif); */

/* body {
	background: #212121;
	font-size:22px;
	line-height: 32px;
	color: #ffffff;
	word-wrap:break-word !important;
	font-family: 'Open Sans', sans-serif;
	} */

a {
  color: #fff;
}

h1 {
  margin-top: 100px;
  text-align: center;
  font-size: 60px;
  font-family: "Bree Serif", "serif";
}

/* nav {
	background-color: rgb(31, 33, 44);
} */
ul .item {
  background: transparent;
}

ul .item a:hover {
  background: transparent;
}
nav ul {
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  z-index: 999;
}

nav ul li {
  display: inline-block;
  background-color: #040404;
  padding: 10px 2px;
  border: 1px solid transparent;
  border-radius: 10px;
}

nav a {
  display: block;
  padding: 0 5px;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  text-decoration: none;
}

nav a:hover {
  background-color: #ef1313;
}

/* Hide Dropdowns by Default */
nav ul ul {
  display: none;
  position: absolute;
  top: 50px; /* the height of the main nav */
}

/* Display Dropdowns on Hover */
nav ul li:hover > ul {
  display: inherit;
}

/* Fisrt Tier Dropdown */
nav ul ul li {
  float: none;
  display: list-item;
  position: relative;
  margin-left: -45%;
  width: 240px;
  border-bottom: 1px solid white;
}

nav ul ul li:hover {
  background-color: #ef1313;
}

/* Change this in order to change the Dropdown symbol */
/* li > a:after { content:  ' '; } */
li > a:only-child:after {
  content: "";
}
</style>