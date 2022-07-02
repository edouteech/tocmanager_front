<template>
<div class="contain">
     <SideBar/>
  <div class="zone">
    <div class="titre">
      Catégories de produits
    </div>
      <p>Liste des catégories de produits</p>
      <NuxtLink class="custom-btn btn-10" to="/categorie/add_categorie">Ajouter catégorie</NuxtLink>
      
	 <!-- début du new table -->


		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<div class="p-4">
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative mt-1">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"></path>
					</svg>
				</div>
				<input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recherche...">
		</div>
			</div>
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="p-4">
							<!-- <div class="flex items-center">
								<input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="checkbox-all-search" class="sr-only">checkbox</label>
							</div> -->
						</th>
						<th scope="col" class="px-6 py-3">
							Noms
						</th>
						<th scope="col" class="px-6 py-3">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="(categorie, i) in categories" :key="i"
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td class="w-4 p-4">
							<div class="flex items-center">
								<input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="checkbox-table-search-1" class="sr-only">checkbox</label>
							</div>
						</td>

              			<td>{{categorie.name}}</td>
						<td>
							<NuxtLink :to="'/edit_categorie/'+categorie.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
							<button @click="deleteCategorie(categorie.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
						</td>
					</tr>
					
				</tbody>
			</table>
		</div>

    <!-- fin du new table -->

      <!-- <table class="tableau">
          <thead>
              <tr>
                  <th>Noms</th>              
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(categorie, i) in categories" :key="i">
              <td>{{categorie.name}}</td>
              <td>
                <NuxtLink :to="'/edit_categorie/'+categorie.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                <button @click="deleteCategorie(categorie.id)"><i class='bx bx-stop-circle'></i></button>
              </td>
            </tr>
          </tbody>

      </table> -->
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
        compagnie_id: ''  ,
        categories: [],
        categorie: "",
      }
    },
    methods: {
      async logout(){
          this.$auth.logout();
          this.$router.push('/login');
      },

       deleteCategorie(id){
          console.log(id);
          this.$axios.delete('/delete/categorie/' +id)
          .then(response => {console.log(response.data.data);
            this.refresh()})                 
        },      
        
        refresh(){
          this.$axios.post('/index/categorie',{
            compagnie_id: this.$auth.$storage.getUniversal('company_id')})        
        .then(response =>{console.log(response.data.data.data);
            this.categories = response.data.data.data
            })     
        }
        
    },

    mounted () {
      this.refresh()
    }
}
</script>

<style scoped>
.bx{
  margin: 0 10px;
  font-size: 25px;
}
.zone p{
    font-size: 18px;
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

.w-full{
  text-align: center;
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
