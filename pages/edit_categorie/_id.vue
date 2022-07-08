<template>
<div class="contain">
     <SideBar/>
  <div class="zone">
    <div class="titre">
      Catégories de produits
    </div>
    <form action="" method="POST">

        <p>Modifier les infos de la catégorie</p>	
        <div class="input-form">			
            <input type="text" placeholder='Entrer le nom de la categorie' v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>     
        <div class="input-form">
            <select v-model="form.parent_id" required>
                <option disabled value="">Choisissez la catégorie parente associée</option>
                <option v-for="(liste, i) in listes" :key="i" :value="liste.id">{{liste.name}}</option>
            </select>
        </div>
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Modifier la categorie" name="submit">				          
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
            categorie: "",
            categories: [],
            liste: "",
            listes: [],
            form: {
                id: '',
                name: '',   
                parent_id: '',
                compagnie_id:'',          
            },
            error_message: "",
            error_champ: [],
        }
    },

    mounted() {
        this.refresh()
        this.$axios.get('/index/categorie/'+ this.$route.params.id)
          .then(response => {console.log(response.data.data[0] )
            let categorie = response.data.data[0];
            // this.categories = response.data.data
            this.form.name = categorie.name,
            this.form.name = categorie.parent_id        
          }        
        )          
    },

    methods: {
        submit(){          
            this.$axios.put('/update/categorie', {
                id: this.$route.params.id,            
                name: this.form.name, 
                parent_id: this.form.parent_id,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')      
            }).then(response =>{this.$router.push({ path:'/categorie/list_categorie',})})

        },
        refresh(){
            this.$axios.post('/index/categorie',{
            compagnie_id: this.$auth.$storage.getUniversal('company_id')})        
            .then(response =>{console.log(response.data.data.data);
                this.listes = response.data.data.data
                })     
        },
    }

    
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
