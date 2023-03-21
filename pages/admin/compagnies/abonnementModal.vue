<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler" @click.stop>    
      <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
        {{error}}
      </div>                 
              <form action="" method="POST"> 
                <h4 class="text-center">Abonnement d'entreprise</h4><br>
                
                <div class="alert alert-warning justify-content-center" role="alert"  v-if="this.plan_souscris == 1">
                  Votre type d'abonnement en cours est la <strong>Formule Basique</strong>
                </div>
                <div class="alert alert-warning justify-content-center" role="alert"  v-if="this.plan_souscris == 2">
                  Votre type d'abonnement en cours est la <strong>Formule Premium</strong>
                </div>
                <div class="input-form">					
                    <label class="title">Type d'abonnement</label>
                    <select class="form-control" v-model="form.plan" required>
                        <option  value="">Sélectionner un type d'abonnement...</option>
                        <option v-for="(plan, i) in plans" :key="i" :value="plan.id">{{plan.name}}</option>
                    </select>
                </div>  
                <div class="input-form my-4">					
                    <label class="title">Nombre d'abonnement</label>
                    <input type="number" class="form-control" v-model="form.number" autocomplete="off" required placeholder="Exemple: 1">
                </div>  
                
                <div class="submit-form" @click="$emit('close-modal')" >
                    <button class="btn btn-outline-primary" @click.prevent="submit()">Enregistrer</button>				          
                </div>
              </form>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="/images/fermer.png" alt="" />
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'abonnementModal',
      props : ['compagnie', 'plan_souscris'],
      data () {
        return{
            form: {
                plan: this.plan_souscris,
                number: ''
            },
            plans: '',
            error: null
        }
      },

      mounted(){
        this.listPlan()
        this.abonnementEnCours()
      },
      
      methods: {
        async submit(){
          this.$axios.post('/admin/abonnement/add',{
            compagnie_id: this.compagnie,
            plan_id: this.form.plan,
            number: this.form.number
          })        
            .then(response => 
            {
                // console.log(response);
                if(response.data.status == "success"){
                    this.$router.push({path:'/admin/compagnies/list_compagnie', })
                    this.$toast('Abonnement ajouté !!!', {
                        icon: 'fa fa-check-circle',
                    })
                }
                else{
                    this.error = response.data.message
                }
            })  
              
        },

        abonnementEnCours(){
          this.$axios.get('/compagnie/suscribed/plan/'+this.compagnie)
              .then(response => 
                {
                  console.log(response.data);
                })
        },

        listPlan(){
          this.$axios.get('/index/plans')        
          .then(response => 
          {
              // console.log(response);
              this.plans = response.data.data

          })  
        }
      }
  }
  </script>
  
  <style scoped>
  form {
      padding: 50px;
  } 
  
  input::placeholder {
      font-size: 16px;
      opacity: 0.8;
  }
  
  .modal-overlay {
  z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #949292da;
    overflow: auto;
    z-index: 99;
  }
  
  .modaler {
    background-color: white;
    height: 600px;
    width: 600px;
    margin-top: 5%;
    padding: 30px 0;
    border-radius: 20px;
  }
  .close {
    margin: 5% 0 0 0;
    cursor: pointer;
  }
  
  .close-img {
    width: 25px;
  }


  button {
  margin: 20px;
}
  </style>