<template>
<div class="contenu">
    <h3>Liste des fournisseurs</h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Catégories</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(categorie, i) in categories" :key="i">

          <td>{{categorie.name}}</td>

          <td>
            <router-link :to="'/modifiercategorie/'+categorie.id"><button>modifier</button></router-link>
            <button @click="deletecategorie(categorie.id)">supprimer</button>
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
  name: 'ListCategorie',
  components: {
    SideBar,
    
  },
   data () {
    return {
      categories: [],
      categorie: "",
    }
  },
  methods: {
    deletecategorie(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/api/delete/categorie/' +id)
      .then(response => 
        {console.log(response);
        this.categorie = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/index/categorie')
      .then(response => (this.categories = response.data.data))
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
