<template>
<div class="general">
        <div class="haut">
            <div class="user">
                <img src="./images/user.png" alt="logo" srcset="">
                <span class="user_name">{{$auth.user.name}}</span> 
                <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
            </div>
        </div>

        <form action="" method="POST">
            <div class="cadre-vente">
                <h2>Enregistrer une vente</h2><hr>
                <div class="cadre-haut">             
                    <div class="ajout-client">    
                        <i class='bx bxs-user-circle'></i>                                 
                        <select required id="select-client">
                            <option>Choisir le client</option>
                            <option v-for="(client, index) in clients" :key="index" :label="client.name" :value="client.id">
                                {{client.name}}
                            </option>                           
                        </select>          
                        <div class="save-btn">
                            <button @click="showModal = true">Ajouter un client</button>
                        </div>                   
                    </div>
                    <div class="facture-date">
                        Date de création : 
                        <input  type="date"  v-model="form.date_sell"  required />
                    </div>
                </div> <hr>
               
                <button class="ajout-article" @click="addLine()">Ajouter un article</button>
                

                <div class="commande">
                    <table class="tableau">
                        <thead>
                            <tr>
                                <th>Id du produit</th>
                                <th>Quantité voulue</th>
                                <th>Prix unitaire</th>
                                <th>Total</th>                     
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td><input type="number" placeholder="0" min="0" max="100" v-model="form.product_id" autocomplete="off" required></td>
                                <td><input type="number" placeholder="0" min="0" max="100" v-model="form.quantity" autocomplete="off" required></td>
                                <td><input type="num" placeholder="0" min="0" max="100" v-model="form.price" autocomplete="off" required></td>
                                <td><input type="num" placeholder="0" min="0" max="100" v-model="form.amount" autocomplete="off" required></td>
                            </tr>
                        </tbody>
                    </table>     
                </div>
                <div class="submit-form">
                    <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer" name="submit">				          
                </div>  
        
            </div>
            
        </form>

    <SideBar/>
     <ajoutModal v-show="showModal" @close-modal="showModal = false"/>
      
</div>
 
</template>

<script>
import ajoutModal from './ajoutModal.vue'
import SideBar from './nav.vue'
export default {

  components: {
    SideBar, 
    ajoutModal, 
  },

  data () {
      return{
        showModal: false,
        sell_lines: [],
        line: "",
        clients: [],
        client: "",
          form: {
              date_sell: '',
              tax: 0,
              discount: 0,
              amount:0,
              rest: 0,
              user_id: 1,
              client_id: '',
              sell_lines: [
                {
                    product_id: 1,
                    quantity: 1,
                    price: 1,
                    amount: 0
                }
              ]
          
          },
          error_message: "",
          error_champ: [],
      }
  },
    methods: {
        // addLine(){
        //     this.sell_lines = [
        //         {
        //             product_id : 1,
        //             quantity : 0,
        //             price : 0, 
        //             amount : 0
        //     }]
            
        // },
        
        async submit(){
            await  this.$axios.post('/create/vente',{
              date_sell: this.form.date_sell,
              tax: this.form.tax,
              discount: this.form.discount,
              amount: this.form.amount,
              rest: this.form.rest,
              user_id: this.form.user_id,
              client_id: this.form.client_id,     
              product_id: this.form.product_id,
              quantity: this.form.quantity,
              price: this.form.price,
              amount: this.form.amount       
            }).then(response =>{
                    this.$router.push({
                      path:'/vente',
                    })
  
                }).catch( error => console.log( error ) )
                    // console.log('user login')
                 console.log(this.form.name)                
        },


        async logout(){
                this.$auth.logout();
                this.$router.push('/login');
        },

        refresh(){
          this.$axios
        .get('/index/client')
        .then(response => 
            {console.log(response);
            this.clients = response.data.data.data
            }
            )
        }
    },
    mounted () {
      this.refresh()
    }
}
</script>

<style scooped>
.cadre-vente{
    margin-left: 20%;
    padding-top: 5%;
}

.cadre-haut{
    display: flex;
}

.ajout-client{
    margin: 30px 10px;
    border: 1px solid darkblue;
    padding: 50px;
    margin-right: 30%;
  
}

.save-btn button{
    background-color: rgb(121, 161, 255);    
    font-size: 10px;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
}

.facture-date{
    margin-top: 5%;
    text-decoration: underline;
}

.facture-date input{
    margin-left: 30px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 5px;
}

.ajout-article{
    margin: 4%;
    text-align: center;
    width: 90%;
    background-color: rgb(8, 231, 97);
    border-radius: 10px;
    padding: 12px;
}

.commande{
    margin-left: 50px;
}

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


form {
    /* width: 90%; */
    padding: 30x;

}
.modal .input-form {
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
        

.modal input {
    padding: 8px;
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
.modal input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}

.modal .submit-form {
    margin-top: 10%;
    text-align: right;       
}

.modal input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #53af57;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
}

.modal input[type=submit]:hover{
    background-color: #53af57;
    color: white;
    border: 1px solid #53af57;
    font-size: 16px;
}





</style>

