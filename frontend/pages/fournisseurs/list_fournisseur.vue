<template>
<div class="contain">
     <SideBar/>

  <div class="zone">
        <div class="titre">
            Fournisseurs
        </div>
        <p>Liste des fournisseurs</p>
        <NuxtLink class="custom-btn btn-10" to="/fournisseurs/add_fournisseur">Ajouter fournisseur</NuxtLink>
        
        <table class="tableau">
            <thead>
                <tr>
                    <th>Noms</th>
                    <th>Numéros de téléphone</th>
                    <th>Emails</th>
                    <th>Nature</th>
                    <th>Actions</th>
                </tr>
            </thead>
          
            <tbody>
              <tr  v-for="(fournisseur, i) in fournisseurs" :key="i">
                <td>{{fournisseur.name}}</td>
                <td>{{fournisseur.phone}}</td>
                <td>{{fournisseur.email}}</td>
                <td>{{fournisseur.nature}}</td>
                <td>
                  <NuxtLink :to="'/edit_fournisseur/'+fournisseur.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                  <button @click="deleteFournisseur(fournisseur.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
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
  auth: true,
  components: {
    SideBar,  
  },

  data () {
    return {
      fournisseurs: [],
      fournisseur: "",
      compagnie_id: ''
    }
  },
  mounted () {
      this.refresh()
  },

  methods: {
    
       deleteFournisseur(id){
          console.log(id);
          this.$axios.delete('/delete/fournisseur/' +id)
          .then(response => {console.log(response.data.data);
            this.refresh()})                 
        },
         
        refresh(){
          this.$axios.post('/index/fournisseur',{
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          })
          .then(response => 
        
            {console.log(response);
            this.fournisseurs = response.data.data.data})
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
.user{
    display: flex;    
}
.user img{
    width: 30px;
    border: 1px solid transparent;
    border-radius: 100%;
}
.user .user_name{
    font-size: 15px;
    padding: 7px;
}
.haut{
    border: 1px solid transparent;
    border-radius: 15px;
    position: fixed;
    width: 100%;
    padding: 5px 50px;
    padding-left: 85%;
    font-size: 10px;
    color: #fff;
    background-color: #202020;
}
.espace{
    padding-top: 5%;
    margin-left: 18%;
}

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
