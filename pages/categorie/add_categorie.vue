<template>
<div class="contain">
     <SideBar/>
  <div class="zone">
    <div class="titre">
      Catégories de produits
    </div>
         <p>Enregistrer une nouvelle catégorie de produit</p>
       
      <form action="" method="POST">
            <h1>Ajout de catégorie</h1>

            <div class="input-form">					
                <input type="text" placeholder="Entrer le nom de la catégorie " v-model="form.name" autocomplete="off" required>
                <span class="error">{{error_champ.name}}</span>
            </div>    
            <div class="input-form">
                <select v-model="form.parent_id" required>
                    <option disabled value="">Choisissez la catégorie parente associée</option>
                    <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">{{categorie.name}}</option>
                </select>
            </div>
            <div class="submit-form">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer" name="submit">				          
            </div>
 
            
        </form>
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
        return{
            categories: [],
            categorie: '',
            form: {
                name: '',
                parent_id: '',
                compagnie_id: ''               
            },
            error_message: "",
            error_champ: [],
        }
    },
    mounted(){
        this.$axios.post('/index/categorie',{
        compagnie_id: this.$auth.$storage.getUniversal('company_id')})        
        .then(response =>{console.log(response.data.data.data);
            this.categories = response.data.data.data
            })     
    },
    
    methods: {
        async submit(){
            await  this.$axios.post('/create/categorie',{
                name: this.form.name,
                parent_id: this.form.parent_id,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })   
            .then(response =>{ this.$router.push({ path:'/categorie/list_categorie', })})
            .catch( error => console.log( error ) )      
                 console.log(this.form.name)                
        },

    },
  
}                       

</script>

<style scoped>
.zone p{
    font-size: 18px;
}
form {
    width: 80%;
    padding-left: 100px;
    padding-right: 300px;
    padding-top: 50px;
}
.input-form {
    display: flex;
    flex-direction: column-reverse;
    margin: 1.2em 0;
    height: 50px;
}

.error{               
    color: red;
    margin-bottom: -10%;
    font-size: 12px;
}
        

input {
    padding: 8px;
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}

.submit-form {
    margin-top: 10%;
    text-align: right;       
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #53af57;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
}

input[type=submit]:hover{
    background-color: #53af57;
    color: white;
    border: 1px solid #53af57;
    font-size: 16px;
}

</style>