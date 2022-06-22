<template>
<div class="general">
    <div class="font-bold ml-80">
        <div> 
             Utilisateur connecté: {{$auth.user.name}}
             <button type="button" class="bg-red-700 text-white rounded p-3 ml-80" @click="logout">Déconnexion</button>    
        </div>
    <h3>Liste des achats</h3>
       <button type="button" class="bg-green-700 text-white rounded p-3 "><NuxtLink to="/add_achat">Ajouter achat</NuxtLink></button>   
    <table class="tableau">
        <thead>
            <tr>
                <th>Dates des achats</th>
                <th>Taxes appliquées</th>
                <th>Déductions</th>
                <th>Montants</th>
                <th>Restes</th>
                <th>Identifiants de l'utilisateur</th>
                <th>Identifiants du vendeur</th>
                <th>Lignes d'achat</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(achat, i) in achats" :key="i">
          <td>{{achat.date_buy}}</td>
          <td>{{achat.tax}}</td>
          <td>{{achat.discount}}</td>       
          <td>{{achat.rest}}</td>
          <td>{{achat.user_id}}</td>
          <td>{{achat.supplier_id}}</td>
          <td>{{achat.buy_lines}}</td>
          <td>
            <router-link :to="'/modifierachat/'+achat.id"><button>Modifier</button></router-link>
            <button @click="deleteAchat(achat.id)">Supprimer</button>
          </td>
        </tr>
        </tbody>

    </table>
    </div>
 <SideBar/>
 </div>

</template>

<script>
import axios from "axios";
import SideBar from './nav.vue'
export default {
  components: {
    SideBar,
    
  },
    data () {
    return {
      achats: [],
      achat: "",
    }
  },
    middleware:'auth',
    // auth: false,
    mounted () {
        axios
        .get('http://localhost:8000/api/index/achat')
        .then(response => 
            {console.log(response);
            this.achats = response.data.data
            }
            )
    },
    methods:{
        async logout(){
            this.$auth.logout();
            this.$router.push('/login');
            
        },

        deleteAchat(id){
        console.log(id);
        axios
        .delete('http://localhost:8000/api/delete/achat/' +id)
        .then(response => 
            {console.log(response);
            this.achat = response.data.data
            }
            )
        }
    },
  
}
</script>

<style>

.tableau{
	border-collapse: collapse;
	min-width: 800px;
	width: auto;
	box-shadow: 0 5px 50px transparent;
	border: 2px solid transparent;
	text-align: center;
	margin-top: 1%;
	font-size: 18px;
}      
thead tr{
    background-color: transparent;
}
th, td{
    padding: 15px 20px;
    border: 1px solid #ddd
}
tbody, tr, td, th{
    border: 1px solid #ddd
}

tbody tr:nth-child(even){
    background-color: rgb(233, 233, 255);
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}

</style>