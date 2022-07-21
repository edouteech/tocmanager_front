<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">
        <div class="titre">
            Utilisateurs connectés
        </div>
      <p>Liste des utilisateurs</p>
      <NuxtLink class="custom-btn btn-10" to="/profils/add_profil">Inscrire un utilisateur</NuxtLink>
      
      <table class="tableau">
          <thead>
              <tr>
                  <th>Noms</th>
                  <th>Numéros de téléphone</th>
                  <th>Emails</th>
                  <th>Pays</th>
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(profil, i) in profils" :key="i">
              <td>{{profil.name}}</td>
              <td>{{profil.phone}}</td>
              <td>{{profil.email}}</td>
              <td>{{profil.country}}</td>
              <td>
                <NuxtLink :to="'/edit_profil/'+profil.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                <button @click="deleteProfil(profil.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
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
          profils: [],
          profil: "",
        }
      },

    mounted () {
      this.refresh()
    },
    methods: {

        deleteProfil(id){
          console.log(id);
          this.$axios.delete('/delete/profil/' +id)         
          .then(response => {console.log(response.data.data);
            this.refresh()})                            
        },
        
        refresh(){
          this.$axios.get('/index/profil')
          .then(response => 
            {console.log(response);
              this.profils = response.data.data.data
            })         
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

/* .ajout{
  border: 1px solid;
  border-radius: 15px;
  background-color: rgb(233, 250, 215);
  padding: 10px;
  margin-left: 80%;
}

.ajout:hover{
  background-color: green;
  color: #fff;
  
} */

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
