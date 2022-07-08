<template>
<div class="contain">
     <SideBar/>
  <div class="zone">
    <div class="titre">
      Factures Ventes
    </div>
    <form action="" method="POST">

        <p>Modifier les informations de la vente</p>	
        <div class="input-form">			
            <input type="text" placeholder='Entrer la date de facturation' v-model="form.date_sell" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>     
        <div class="input-form">
            <select  v-model="form.client_id">
                <option disabled value="">Choisir le client</option>
                <option v-for="(client, index) in clients" :key="index" :label="client.name" :value="client.id">
                    {{client.name}}
                </option>                           
            </select>
        </div>
        <div class="input-form">			
            <input type="number" placeholder='Entrer le montant' v-model="form.amount" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>  

        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Modifier la facture" name="submit">				          
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
            vente: "",
            clients: [],
            client: "",
            form:{
                date_sell: '',
                client_id: '',
                amount: '', 
                tax: '0',
                discount: '0',
                rest: '0',   
                user_id: '',   
            },
            error_message: "",
            error_champ: [],
        }
    },

    mounted() {
        this.refresh()
        this.$axios.get('/index/vente/'+ this.$route.params.id)
          .then(response => {console.log(response.data.data[0] )
            let vente = response.data.data[0];
            // this.categories = response.data.data
            this.form.date_sell = vente.date_sell,
            this.form.client_id = vente.client_id,
            this.form.amount = vente.amount       
          }        
        )          
    },

    methods: {
        submit(){          
            this.$axios.put('/update/vente', {
                id: this.$route.params.id,            
                date_sell: this.form.date_sell, 
                client_id: this.form.client_id,
                amount: this.form.amount, 
                tax: this.form.tax,
                discount: this.form.discount,
                rest: this.form.rest,
                user_id: this.$auth.user.id, 
            }).then(response =>{ console.log(response)
                this.$router.push({ path:'/ventes/list_vente',})})

        },
        refresh(){
            this.$axios.post('/index/client',{
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response => {console.log(response);
            this.clients = response.data.data.data})
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
