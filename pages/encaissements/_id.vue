<template>
<div class="contain">
     <SideBar/>

    <div class="zone">    
        <div class="titre">
            Encaissements
        </div>    
          <form action="" method="POST">
              <p>Modifier les informations de l'encaissement</p>	
              <div class="input-form">			
                  <input type="text" placeholder='Entrer le montant encaissé' v-model="form.montant" autocomplete="off" required>
                  <span class="error">{{error_champ.name}}</span>
              </div>     
              <div class="input-form">        
                  <input type="text" placeholder="Entrer la date de l'enregistrement " v-model="form.date" required>
                  <span class="error">{{error_champ.phone}}</span>
              </div>
                <div class="input-form"> 
                    <select v-model="form.client_id" required>
                        <option disabled value="">Sélectionner le client</option>
                        <option v-for="(client, i) in clients" :key="i" :value="client.id">{{client.name}}</option>
                    </select>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
              <div class="submit-form">
                  <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer les modifications" name="submit">				          
              </div>
          </form> 
      </div>
</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
    auth:true,
    components: {
        SideBar,  
    },
    data () {
        return{
            encaissement: "",
            encaissements: [],
            client: "",
            clients: [],
            form: {
                id: '',
                montant: '',
                date: '',
                client_id: '',
                facture:'',
                // compagnie_id: '',
            },
            error_message: "",
            error_champ: [],
        }
        },
    mounted() {
        this.refresh()
        this.$axios.get('/index/encaissement/'+ this.$route.params.id)
         .then(response => {console.log(response.data.data[0] )
            let encaissement = response.data.data[0];
            // this.clients = response.data.data
            this.form.montant = encaissement.montant,
            this.form.date = encaissement.date,
            this.form.facture = encaissement.facture,
            this.form.client_id = encaissement.client_id
            
          }      
        )            
    },

    methods: {
        submit(){          
            this.$axios.put('/update/encaissement', {
            id: this.$route.params.id,
            montant: this.form.montant,
            date: this.form.date,
            facture: this.form.facture,
            client_id: this.form.client_id,
        //    compagnie_id: this.$auth.$storage.getUniversal('company_id')

            })
            .then(response =>{
                this.$router.push({
                  path:'/encaissements/list_encaissement',})
            })          
        },

        refresh(){
            this.$axios.get('/index/client',{params: {
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            })
            .then(response => {console.log(response.data.data.data);
            this.clients = response.data.data.data })
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
