<template>
    <div class="contain my-5">
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
        <div class="col-md-6 mx-auto my-5">
            <h3 class="text-center title-offre">NOS OFFRES</h3>
            <p class="text-center p-offre">Choississez un pack d'abonnement pour bénéficier de nos services...</p>
        </div>
        <div class="row mx-auto" v-for="(plan, i) in plans" :key="i">
            <div class="col-md-4 mx-auto offre">
                <h4 class="text-center">{{plan.name}}</h4><hr>
                <p class="text-center">{{plan.description}}</p>
                <div class="img">
                    <img src="/images/poignee.jpg" alt="" class="img-offer mx-5  w-75">
                </div>
                <div>
                    <!-- <div class="liste">
                        <div class="number-text"><span class="number">1</span><span class="text-liste">{{plan1.trial_period}} JOURS D'ESSAI</span></div><br>
                        <div class="number-text"><span class="number">2</span><span class="text-liste">{{plan1.invoice_period}} MOIS D'ABONNEMENT</span></div><br>
                        <div class="number-text"><span class="number">3</span><span class="text-liste">ASSISTANCE TECHNIQUE 24H/24</span></div><br>
                        <div class="number-text"><span class="number">4</span><span class="text-liste">FORMATION GRATUITE</span></div><br>
                    </div> -->
                    <div class="d-flex"><button class="btn btn-outline-primary btn-offer p-2" @click.prevent="createAbonnement()">Sélectionner</button><nuxt-link to="/abonnement" class="btn btn-outline-dark btn-offer p-2">En savoir plus</nuxt-link></div>
                    <div class="title-offre col-md-6 mx-auto text-center">{{plan.price}} {{plan.currency}}</div>
                </div>
            </div>
            <!-- <div class="col-md-4 mx-auto offre">
                <h4 class="text-center">{{plan2.name}}</h4><hr>
                <p class="text-center">{{plan2.description}}</p>
                <div class="img">
                    <img src="/images/carousel.jpg" alt="" class="img-offer mx-5  w-75">
                </div>
                <div>
                    <button class="btn btn-outline-primary btn-offer p-2">Sélectionner</button>
                    <div class="title-offre col-md-6 mx-auto text-center">{{plan2.price}} {{plan2.currency}}</div>
                </div>
            </div> -->
        </div>
<modalEmail :identifiant= 'key' v-show="showModal" @close-modal="showModal = false" @conf="setMessage"/> 
    </div>
    </template>
    
    <script>
    import modalEmail from './modalEmail.vue'
    export default {
      auth: false,
    components: {
        modalEmail
    },
      data() {
        return{
            plan1: '',
            plan2: '',
            plans: '',
            error: null,
            showModal: false,
        }
      },
    
      mounted(){
                this.$axios.get('/index/plans')        
                .then(response => 
                {
                  console.log(response);
                  this.plans = response.data.data
                  this.plan1 = response.data.data[0]
                  this.plan2 = response.data.data[1]
    
                })  
              },
    
      methods:{
            createAbonnement(){
                this.$axios.post('/create/abonnement',{
                compagnie_id: localStorage.getItem('auth.company_id'),
                plan_id: this.plan.id
                })        
                .then(response => 
                {
                    if(response.data.status == "success"){
                        this.$toast('Abonnement choisi avec succès !!!', {
                            icon: 'fa fa-check-circle',
                        })
                        if(verification == null){
                            this.showModal = true
                        } 
                        else{
                            // this.$auth.setUserToken(response.data.data.original.access_token)         
                            //   .then(response =>{
                                this.role = localStorage.getItem('auth.roles');
                                if(this.role == 'super_admin'){
                                    this.$auth.setUserToken(response.data.data.original.access_token)         
                                    .then(response =>{
                                        this.$router.push( '/admin/admin',)
                                    })
                                }
                                else if(this.role == 'admin'){
                                    this.$auth.$storage.setUniversal('company_id', response.data.data.original.compagnies[0].id)
                                    this.$auth.setUserToken(response.data.data.original.access_token)         
                                    .then(response =>{
                                        // console.log(response)
                                        this.$router.push( '/dashboard',)
                                    })
                                }
                                else{
                                    this.$auth.$storage.setUniversal('company_id', response.data.data.original.compagnies[0].id)
                                    this.$auth.setUserToken(response.data.data.original.access_token)         
                                    .then(response =>{
                                        this.$router.push( '/ventes/vente',)
                                    })
                                }
                                // })
                        } 
                        }
                    })  
            },
            
            setMessage(){
                this.role = localStorage.getItem('auth.roles');
                    if(this.role == 'super_admin'){
                        this.$auth.setUserToken(response.data.data.original.access_token)         
                        .then(response =>{
                            this.$router.push( '/admin/admin',)
                        })
                    }
                    else if(this.role == 'admin'){
                        this.$auth.$storage.setUniversal('company_id', response.data.data.original.compagnies[0].id)
                        this.$auth.setUserToken(response.data.data.original.access_token)         
                        .then(response =>{
                            // console.log(response)
                            this.$router.push( '/dashboard',)
                        })
                    }
                    else{
                        this.$auth.$storage.setUniversal('company_id', response.data.data.original.compagnies[0].id)
                        this.$auth.setUserToken(response.data.data.original.access_token)         
                        .then(response =>{
                            this.$router.push( '/ventes/vente',)
                        })
                    }
            },
        
      }
    }
    </script>
    
    <style scoped>
    
    .title-offre{
        border: 1px solid rgb(54, 147, 254);
        padding: 15px;
        background-color: rgb(54, 147, 254);
        color: white;
        font-size: 25px;
        font-weight: 800;
        border-radius: 15px;
        margin: 50px 0;
    }
    
    .p-offre{
        font-size: 20px;
    }
    
    .offre{
        border: 2px solid black;
        padding: 30px 2px;
        cursor: pointer;
        background-color: aliceblue;
    }
    
    .liste{
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
    
    .img-offer{
        margin-bottom: 15px;
    }
    
    .btn-offer{
        margin: 0 50px;
    }
    </style>