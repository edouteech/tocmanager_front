<template>
<div class="contenu">
{{error_message}}
    
  <form action="" method="POST">
        <h1>Ajout d'un nouveau produit</h1>

        
        <div class="input-form">					
            <input type="text" placeholder="Entrer l'id de la catégorie " v-model="form.category_id" autocomplete="off" required>
            <span class="error">{{error_champ.category_id}}</span>
        </div>     
        <div class="input-form">					
            <input type="text" placeholder="Entrer le nom du produit " v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div> 
        <div class="input-form">        
            <input type="text" placeholder="Entrer la quantité ajoutée" v-model="form.quantity" required>
            <span class="error">{{error_champ.quantity}}</span>
        </div>
       
        <div class="input-form">    
            <input type="email" placeholder="Entrer le prix d'achat" v-model="form.price_sell" autocomplete="off" required>
            <span class="error">{{error_champ.price_sell}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le prix de vente" v-model="form.price_buy" autocomplete="off" required>
            <span class="error">{{error_champ.price_buy}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le stock minimal" v-model="form.stock_min" autocomplete="off" required>
            <span class="error">{{error_champ.stock_min}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le stock maximal" v-model="form.stock_max" autocomplete="off" required>
            <span class="error">{{error_champ.stock_max}}</span>
        </div>
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Ajouter le produit" name="submit">				          
        </div>

    </form>

    
    <SideBar/>
</div>

</template>

<script>
import axios from "axios";
import bootstrap from "bootstrap"
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'AjoutProduit',
  components: {
    SideBar,
    
  },
  data () {
      return{
          form: {
              category_id: '',
              name: '',
              quantity: '',
              price_sell: '',
              price_buy:'',
              stock_min:'',
              stock_max:'',
          },
          error_message: "",
          error_champ: [],
      }
  },
  methods: {
        submit(){    
      var that = this;       
            axios.post('http://localhost:8000/api/create/product', this.form)
            .then(function(response){ 
                console.log(response.data)
                if (response.data.status == "error") {
                    that.error_message = response.data.message
                    that.error_champ  = response.data.data

                } 
            })
        
        }
  },
  
}
</script>

<style lang="scss">
body{
    background-color: rgb(233, 250, 252) ;
}
.contenu{
    .demo-alert-box{
        border:  2px solid #5608f4 ;
        color:  white;
        padding: 20px;
        text-align: center;
        background-color: #5608f4;
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 3%;
    }
    h1{
        padding-bottom: 85px;
    }
    form {
        width: 80%;
        padding-left: 100px;
        padding-right: 300px;
        padding-top: 50px;
        
        .input-form {
            display: flex;
            flex-direction: column-reverse;
            margin: 1.2em 0;
            height: 50px;

            .error{               
                color: red;
                margin-bottom: -10%;
                font-size: 12px;
            }
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

            &:hover{
                background-color: #53af57;
                color: white;
                border: 1px solid #53af57;
                font-size: 16px;
            }
        }
    }

}
</style>