<template>
<div class="general">
        <div class="haut">
            <div class="user">
            <img src="./images/user.png" alt="logo" srcset="">
            <span class="user_name">{{$auth.user.name}}</span> 
            <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
            </div>
        </div>
        <!-- <?php  $today_date= date('Y-m-d');?> -->
        <div class="cadre-vente">
            <h2>Enregistrer une vente</h2><hr>
            <div class="ajout-client">
                <form action="" method="POST"> 
                            <h4>Ajout de client</h4>

                    <div class="input-form">					
                        <input type="text" placeholder="Entrer le nom du client " v-model="form.name" autocomplete="off" required>
                        <span class="error">{{error_champ.name}}</span>
                    </div>     
                    <div class="input-form">        
                        <input type="text" placeholder="Entrer le numero de téléphone du client " v-model="form.phone" required>
                        <span class="error">{{error_champ.phone}}</span>
                    </div>
                
                    <div class="input-form">    
                        <input type="email" placeholder="Entrer l'email du client " v-model="form.email" autocomplete="off" required>
                        <span class="error">{{error_champ.email}}</span>
                    </div>
                    <div class="input-form"> 
                        <input type="text" placeholder="Entrer la nature du client " v-model="form.nature" autocomplete="off" required>
                        <span class="error">{{error_champ.nature}}</span>
                    </div>
                    <div class="submit-form">
                        <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer le client" name="submit">				          
                    </div>
                </form>
            </div>
        
        <form action="" method="POST">
            
                <div class="input-form">
                    <input  type="date"  v-model="form.date_sell"  required />
                </div>
                <div class="input-form">					
                    <input type="text" placeholder="Entrer la taxe " v-model="form.tax" autocomplete="off" required>
                    <span class="error">{{error_champ.name}}</span>
                </div> 
                <div class="input-form">        
                    <input type="text" placeholder="Entrer la réduction sur le prix " v-model="form.discount" required>
                    <span class="error">{{error_champ.phone}}</span>
                </div>    
                <div class="input-form">        
                    <input type="text" placeholder="Entrer le montant " v-model="form.amount" required>
                    <span class="error">{{error_champ.phone}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer le reste " v-model="form.rest" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer l'identifiant de l'utilisateur" v-model="form.user_id" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer l'identifiant du client" v-model="form.client_id" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer l'identifiant du produit" v-model="form.product_id" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer la quantité" v-model="form.quantity" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer le prix unitaire" v-model="form.price" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer le montant total" v-model="form.amount" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
        

                <div class="submit-form">
                    <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer le client" name="submit">				          
                </div>
                
            </form>
        </div>

    <SideBar/>
</div>
 
</template>

<script>

import SideBar from './nav.vue'
export default {
  components: {
    SideBar,  
  },
  data () {
      return{
          form: {
              date_sell: '',
              tax: '',
              discount: '',
              amount:'',
              rest: '',
              user_id: '',
              client_id: '',
              product_id: '',
              quantity: '',
              price: '',
              amount: ''
          },
          error_message: "",
          error_champ: [],
      }
  },
    methods: {
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
    }

}
</script>

<style>


.espace{
    padding-top: 5%;
    margin-left: 18%;

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

.ajout-article {
    position: fixed;
    display: none;
    border: 1px solid red;
    color: rgb(11, 0, 0);
    width: 300vh;
    margin-left: -65%;
    top: 60px;
    padding: 20px 50%;
    background-color: white;

}

.cadre-vente{
    display: flex;
    /* position: flex; */
}


</style>

