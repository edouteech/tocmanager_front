<template>
<div class="contain">
     <SideBar/>

    <div class="zone">
      <div class="titre">
        Compagnies
      </div>
      <p>Liste des compagnies</p>
      <NuxtLink class="custom-btn btn-10" to="/compagnies/add_compagnie">Ajouter compagnie</NuxtLink>
        <table class="tableau">
          <thead>
              <tr>
                  <th>Noms</th>
                  <th>Numéros de téléphone</th>
                  <th>Emails</th>
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(compagnie, i) in compagnies" :key="i">
              <td>{{compagnie.name}}</td>
              <td>{{compagnie.phone}}</td>
              <td>{{compagnie.email}}</td>
              <td>
                <NuxtLink :to="'/compagnies/'+compagnie.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                <button @click="deleteCompagnie(compagnie.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
              </td>
            </tr>
          </tbody>
        </table>  
    </div>
      
</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
  components: {
    SideBar,  
  },
   data () {
      return {
        compagnies: [],
        compagnie: "",
      }
    },

    mounted () {
      this.refresh()
    },

    methods: {

        deleteCompagnie(id){ console.log(id);
          this.$axios.delete('/delete/compagnie/' +id)
          .then(response =>  {console.log(response.data.data);
          this.refresh()})
         },
        
        refresh(){
          this.$axios.get('/index/compagnie').then(response => {console.log(response.data.data);
          this.compagnies = response.data.data})
        }
    },       
     
}
</script>

<style scoped>
.zone p{
    font-size: 18px;
}

.bx{
  margin: 0 10px;
  font-size: 25px;
}
.ajout{
  border: 1px solid;
  border-radius: 15px;
  background-color: rgb(233, 250, 215);
  padding: 10px;
  margin-left: 80%;
}

.ajout:hover{
  background-color: green;
  color: #fff;
  
}
.tableau{
	border-collapse: collapse;


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
    padding: 15px 40px;
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
