<template>
<div class="contenu">
    <h3>Liste des utilisateurs</h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Noms</th>
                <th>Emails</th>
                <th>Numéros de téléphone</th>
                <th>Addresses</th>
                <th>Villes</th>
                <th>Pays</th>
                <th>Etats</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(utilisateur, i) in utilisateurs" :key="i">
          <td>{{utilisateur.name}}</td>
          <td>{{utilisateur.email}}</td>
          <td>{{utilisateur.phone}}</td>       
          <td>{{utilisateur.address}}</td>
          <td>{{utilisateur.city}}</td>
          <td>{{utilisateur.country}}</td>
          <td>{{utilisateur.state}}</td>
          <td>
            <router-link :to="'/voirutilisateur/'+utilisateur.id"><button  @click="afficherUtilisateur(utilisateur.id)">voir</button></router-link>
            <router-link :to="'/modifierutilisateur/'+utilisateur.id"><button>modifier</button></router-link>
            <button @click="deleteUtilisateur(utilisateur.id)">supprimer</button>
          </td>
        </tr>
        </tbody>

    </table>
  <SideBar/> 
</div>

</template>

<script>
import axios from "axios";
import bootstrap from 'bootstrap'
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'ListUtilisateur',
  components: {
    SideBar,
    
  },
   data () {
    return {
      utilisateurs: [],
      utilisateur: "",
    }
  },
  methods: {
    deleteUtilisateur(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/api/delete/profil/' +id)
      .then(response => 
        {console.log(response);
        this.utilisateur = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
    .get('http://localhost:8000/api/index/profil')
    .then(response => 
        {console.log(response);
        this.utilisateurs = response.data.data
        }
        )
  }
}
</script>

<style lang="scss" >
.contenu{

  position:absolute;
  height: 100%;
  width: calc(100% - 280px);
  left: 280px;

  .text{
      font-size: 25px;
      font-weight: 500;
      color: #11101d;
      margin: 12px;
  }
  .tableau{
	border-collapse: collapse;
	min-width: 800px;
	width: auto;
	box-shadow: 0 5px 50px rgba(122, 115, 115, 0.918);
	border: 2px solid #ddd;
	text-align: center;
	margin-top: 1%;
	font-size: 18px;
       
    thead tr{
        background-color: rgb(140, 140, 250);
    }
    th, td{
        padding: 15px 20px;
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
}
}

</style>
