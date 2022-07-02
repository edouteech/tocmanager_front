<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">     
        <div class="titre">
            Fournisseurs
        </div>
      <form action="" method="POST">
          <p>Modifier les infos du fournisseur</p>	
          <div class="input-form">			
              <input type="text" placeholder='Entrer le nom du fournisseur' v-model="form.name" autocomplete="off" required>
              <span class="error">{{error_champ.name}}</span>
          </div>     
          <div class="input-form">        
              <input type="text" placeholder="Entrer le numero de téléphone du fournisseur " v-model="form.phone" required>
              <span class="error">{{error_champ.phone}}</span>
          </div>
        
          <div class="input-form">    
              <input type="email" placeholder="Entrer l'email du fournisseur " v-model="form.email" autocomplete="off" required>
              <span class="error">{{error_champ.email}}</span>
          </div>
          <div class="input-form"> 
              <input type="text" placeholder="Entrer la nature du fournisseur " v-model="form.nature" autocomplete="off" required>
              <span class="error">{{error_champ.nature}}</span>
          </div>
          <div class="submit-form">
              <input type="submit" id='submit' v-on:click.prevent="submit()" value="Modifier les informations" name="submit">				          
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
                fournisseur: "",
                fournisseurs: [],
                form: {
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                    nature:'', 
                    compagnie_id: ''
                },
                error_message: "",
                error_champ: [],
            }
    },
    mounted() {
        this.$axios
            .get('/index/fournisseur/'+ this.$route.params.id)
            .then(response => 
        {console.log(response.data.data )
        // this.fournisseurs = response.data.data
        let fournisseur = response.data.data[0];
            this.form.name = fournisseur.name,
            this.form.phone = fournisseur.phone,
            this.form.email = fournisseur.email,
            this.form.nature = fournisseur.nature
        }
        )
            
    },

    methods: {
        submit(){          
                this.$axios.put('/update/fournisseur', {
                id: this.$route.params.id,
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                nature: this.form.nature,
                nature: this.form.nature,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }).then(response =>{
                    this.$router.push({
                    path:'/fournisseurs/list_fournisseur',})
                })  
        }
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
