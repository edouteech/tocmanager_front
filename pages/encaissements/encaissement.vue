<template>
<div class="contain">
     <SideBar/>

    <div class="zone">
        <div class="titre">
            Encaissements
        </div>
        <p>Enregistrer un encaissement</p>
       
        <form action="" method="POST">
            <h1>Ajout d'encaissement</h1>

            <div class="input-form">					
                <input type="number" placeholder="Entrer le montant " v-model="form.montant" autocomplete="off" required>
                <span class="error">{{error_champ.name}}</span>
            </div>     
            <!-- <div class="input-form">       
                <input type="number" placeholder="Entrer le montant " v-model="form.facture" autocomplete="off" required> -->
                <!-- <select v-model="form.facture" required>
                    <option disabled value="">Choisissez la facture à encaisser</option>
                    <option v-for="(vente, i) in ventes" :key="i" :value="facture">{{categorie.name}}</option>
                </select> -->
            <!-- </div> -->
            <div class="input-form">    
                <input type="datetime-local" placeholder="Entrer la date de l'encaissement " v-model="form.date" autocomplete="off" required>
                <span class="error">{{error_champ.email}}</span>
            </div>
            <div class="input-form"> 
                    <select v-model="form.client_id" required>
                        <option disabled value="">Sélectionner le client</option>
                        <option v-for="(client, i) in clients" :key="i" :value="client.id">{{client.name}}</option>
                    </select>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
            <div class="submit-form">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer le client" name="submit">				          
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
            clients: [],
            client: "",
            form: {
                montant: '',
                facture: '',
                date: '',
                client_id:'',
                compagnie_id: ''
            },
            error_message: "",
            error_champ: [],
        }
    },

    mounted(){
        this.$axios.post('/index/client',{
        compagnie_id: this.$auth.$storage.getUniversal('company_id')})
        .then(response => {console.log(response.data.data.data);
        this.clients = response.data.data.data })
    },

    methods: {
        async submit(){
            await  this.$axios.post('/create/encaissement',{
              montant: this.form.montant,
              facture: 1,
              date: this.form.date,
              client_id: this.form.client_id,
            //   compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.$router.push({path:'/encaissements/list_encaissement',})})
            .catch( error => console.log( error ) )
                //  console.log(this.form.name)                
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