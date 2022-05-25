<template>
<div class="contenu">
    <h3>Liste des achats</h3>
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
  <SideBar/> 
</div>

</template>

<script>
import axios from "axios";
import bootstrap from 'bootstrap'
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'ListAchat',
  components: {
    SideBar,
    
  },
   data () {
    return {
      achats: [],
      achat: "",
    }
  },
  methods: {
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
  mounted () {
    axios
    .get('http://localhost:8000/api/index/achat')
    .then(response => 
        {console.log(response);
        this.achats = response.data.data
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
