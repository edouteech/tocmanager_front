<template>
    <div class="contain my-5">
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
        </div>
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
        <div class="col-md-6 mx-auto my-5">
            <!-- <h3 class="text-center title-offre">NOS OFFRES</h3> -->
            <p class="text-center p-offre">Choississez un pack d'abonnement pour bénéficier de nos services...</p>
        </div>
        <div class="row mx-auto" >
            <div class="col-md-4 mx-auto offre" v-for="(plan, i) in plans" :key="i">
                <h4 class="text-center">{{plan.name}}</h4><hr>
                <p class="text-center">{{plan.description}}</p>
                <div class="img">
                    <img src="/images/poignee.jpg" alt="" class="img-offer w-50">
                </div>
                <div>
                    <div class="my-2">
                        <!-- <button class="btn btn-outline-primary btn-offer p-2" >Sélectionner</button> -->
                        <nuxt-link to="/abonnement" class="btn btn-outline-dark btn-offer my-4">En savoir plus</nuxt-link></div>
                    <div class="title-offre col-md-6 mx-auto text-center" @click.prevent="createAbonnement(plan.id)">{{plan.price}} {{plan.currency}}</div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
      auth: true,
      layout : 'empty',
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
            createAbonnement(id){
                // console.log(id)
                this.$axios.post('/create/abonnement',{
                    compagnie_id: localStorage.getItem('auth.company_id'),
                    plan_id: id
                })        
                .then(response => 
                {
                    console.log(response)
                    if(response.data.status == "success"){
                        this.$toast('Abonnement choisi avec succès !!!', {
                            icon: 'fa fa-check-circle',
                        })
                      this.$router.push( '/dashboard',)
                    }else{
                        this.error = response.data.message
                    }
                })  
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