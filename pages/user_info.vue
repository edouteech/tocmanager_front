<template>
<div class="bas-page " data-bs-dismiss="offcanvas">
    <nav>
        <ul>
            <img src="/images/user.png" alt="logo" srcset="" data-bs-dismiss="offcanvas">
			<li class="item"><a href="#">
				<span class="user_name" data-bs-dismiss="offcanvas">{{user.name}}</span>
				<i class="fa fa-chevron-circle-down" aria-hidden="true"></i></a>
            <!-- First Tier Drop Down -->
            <ul>
                <li><a href="/mon_profil">Mon profil</a></li>
                <li><a href="/update_password">Modifier mot de passe</a></li>
				<!-- <li v-on:click.prevent="change()"><a href="#">Changer de compagnie</a></li> -->
                <li @click="logout()"><a href="" @click="logout()"><i class='bx bx-log-out'></i>Déconnexion</a></li>
            </ul>        
            </li>
        </ul>
    </nav>
<changeCompagnie :compagnies= 'liste'  v-show="showModal" @close-modal="showModal = false"/>
</div>
</template>

<script>
import changeCompagnie from './change_compagnie.vue'
export default {
    auth: true,
    name: "Userinfo",
	components: {
		changeCompagnie  
	},
	data () {
      return {
        showModal: false,
        liste: '',
		user: ''
	  }
	},
	mounted(){
		// console.log(this.$auth)
		this.checkUser()
	},
	methods:{
			async logout(){
				localStorage.removeItem('auth.user_id');
				localStorage.removeItem('auth.company_id');
				localStorage.removeItem('auth.roles');
				localStorage.removeItem('auth.email');
				this.$auth.logout();
				this.$router.push('/login');
			},

			change(){
				this.showModal = true;
				this.$axios.get('/user/compagnies')
				.then(response => {
					// console.log(response)        
				this.liste = response.data 
			})
			},

			checkUser(){
				this.$axios.get('/user')
				.then(response => {
					// console.log(response)        
				this.user = response.data 
			})
			},

              
      }

}
</script>

<style scoped>
.bas-page img{
    width: 45px;
    border: 1px solid transparent;
    border-radius: 100%;
    cursor: pointer;
}

i{
    cursor: pointer;
    font-size: 12px;
}

.bas-page .user_name{
    font-size: 12px;
    padding:  10px;
    padding-top:  5px;
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
	color: #FFF;
}

h1 {
	margin-top: 100px;
	text-align:center;
	font-size:60px;
	font-family: 'Bree Serif', 'serif';
	}



/* nav {
	background-color: rgb(31, 33, 44);
} */
ul .item{
    background: transparent;
}

ul .item a:hover{
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
	display:inline-block;
	background-color: #040404;
}

nav a {
	display:block;
	padding:0 5px;	
	color:#FFF;
	font-size:13px;
	line-height: 30px;
	text-decoration:none;
}

nav a:hover { 
	background-color: #ef1313; 
}

/* Hide Dropdowns by Default */
nav ul ul {
	display: none;
	position: absolute; 
	top: 35px; /* the height of the main nav */
}
	
/* Display Dropdowns on Hover */
nav ul li:hover > ul {
	display:inherit;
}
	
/* Fisrt Tier Dropdown */
nav ul ul li {
	float:none;
	display:list-item;
	position: relative;
	margin-left: -25%;
	width: 270px;
}

nav ul ul li:hover {
	background-color: #ef1313;
}
	
/* Change this in order to change the Dropdown symbol */
/* li > a:after { content:  ' '; } */
li > a:only-child:after { content: ''; }
</style>