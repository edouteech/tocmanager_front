<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
    <Sidebar /><h3 class="name_side">Abonnement </h3>
    <Userinfo />
    </nav>
  
    <div class="app-main__outer py-5 px-2">
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
        </div>
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
        <div class="col-md-6 mx-auto my-5">
            <!-- <h3 class="text-center title-offre">NOS OFFRES</h3> -->
            <p class="text-center p-offre">Veuillez procéder au paiement de votre pack d'abonnement pour continuer à bénéficier de nos services...</p>
        </div>
        <div class="row mx-auto" >
            <div class="col-md-4 mx-auto offre">
                <h4 class="text-center">{{plan.name}}</h4><hr>
                <p class="text-center">{{plan.description}}</p>
                <div class="img">
                    <img src="/images/poignee.jpg" alt="" class="img-offer w-50">
                </div>
                <div>
                    <!-- <div class="my-2">
                        <button class="btn btn-outline-primary btn-offer p-2" >Sélectionner</button>
                        <nuxt-link to="/abonnement" class="btn btn-outline-dark btn-offer my-4">En savoir plus</nuxt-link></div> -->
                    <button class="btn btn-outline-primary btn-offer p-2 my-4" @click="createAbonnement(plan)"
                        id="pay-btn"
                    >
                        Payer pour un montant de <span class="text-success">{{plan.price}} {{plan.currency}}</span>
                    </button>
                </div>
            </div>
        <script src="https://cdn.fedapay.com/checkout.js?v=1.1.7"></script>
        </div>
    </div>
</div>
</template>

<script>
  import Sidebar from './sidebar.vue'
  import Userinfo from './user_info.vue'
    export default {
      auth: true,
      layout : 'empty',
      components: {
        Sidebar,
        Userinfo,
      },
      data() {
        return{
            plan: '',
            error: null,
            showModal: false,
            user_email: ''
        }
      },
    
    mounted(){
        this.user_email = localStorage.getItem('auth.email')      

        this.$axios.get('/compagnie/suscribed/plan/'+localStorage.getItem('auth.company_id'),{
            params: {
                compagnie_id: localStorage.getItem('auth.company_id')
            }
        })        
        .then(response => 
        {
            console.log(response);
            this.plan = response.data.data

        })  
    },
    
      methods:{
            
            createAbonnement(plan){
                FedaPay.init('#pay-btn', {
                    public_key: 'pk_live_cUgIfSpT8tSIWG07zgn2t31z',
                    transaction: {
                    amount: plan.price,
                    description: "Payer l'abonnement"
                    },
                    customer: {
                    email: this.user_email,
                    },
                    onComplete: (result => {
                        console.log(result);
                        if (result.transaction.status == "approved" ) {
                            this.$toast('Paiement effectué avec succès !!!', {
                                icon: 'fa fa-check-circle',
                            })
                                this.$axios.post('/abonnement/renew',{ compagnie_id: localStorage.getItem('auth.company_id'),
                                    params: {
                                        compagnie_id: localStorage.getItem('auth.company_id')
                                    }
                                })         
                                .then(response => 
                                {
                                    // console.log(response)
                                    if(response.data.status == "success"){
                                        this.$router.push( '/dashboard',)
                                        this.$toast("Votre abonnement vient d'etre renouvelé !!!", {
                                            icon: 'fa fa-check-circle',
                                        })
                                    }else{
                                        this.error = response.data.message
                                    }
                                })
                        }
                        else{
                            console.log("erreur");
                        }
                    })
                });
                
            },
            
        
      }
    }
    </script>
    
    <style scoped>
    
    .title-offre{
        border: 1px solid rgb(54, 147, 254);
        padding: 5px;
        background-color: rgb(54, 147, 254);
        color: white;
        font-size: 25px;
        font-weight: 800;
        border-radius: 15px;
        margin-top: 20px;
    }
    
    .p-offre{
        font-size: 20px;
    }
    
    .offre{
        border: 2px solid black;
        padding: 15px 2px;
        cursor: pointer;
        background-color: aliceblue;
    }
    
    /* .liste{
        font-size: 18px;
        font-weight: bold;
    }
    
    .number{
        border: 3px solid white;
        background-color: rgb(120, 190, 251);
        border-radius: 100%;
        padding: 5px 10px;
    }
    
    .number-text{
        margin: 5px 50px;
    }
     */
    .img-offer{
        margin: 10px 25%;

    }
    
    .btn-offer{
        margin: 0 50px;
    }
    </style>