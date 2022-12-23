<template>
  <div class="modal-overlay"  @click="$emit('close-modal')">
    <div class="modaler" @click.stop>
      <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
        </div>
      <img class="check" src="/images/eff.jpg" alt="" />
      <h6>Enregistré!</h6>
      <p>La facture a été sauvegardé</p><br>
      <form action="">
        <div class="form-group">
            <strong>Entrer l'email auquel il faut envoyer la facture</strong>
            <input type="email" class="form-control w-75 mx-auto" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
        </div><br>
        <button class="btn btn-success" @click.prevent="submit()">Envoyer facture</button>
      </form>
      <!-- <NuxtLink to="/ventes/vente"><button>Nouvelle facture</button></NuxtLink>
      <NuxtLink to="/dashboard"><button>Tableau de bord</button></NuxtLink> -->
    </div>
  </div>
</template>


<script>
  export default {
    name: 'ajoutModal',
    props: ['identifiant'],
    data () {
    return{
        form: {
            email: '',
        },
        error: null,
        error_champ: [],
    }
    },
    methods:{
      submit() {
      this.$axios.post('/sells/'+this.identifiant+'/notify', {
        email:this.form.email,
        compagnie_id: localStorage.getItem('auth.company_id')
      })
        .then(response => {
          console.log(response);
          if(response.data.status = "success"){
            this.$router.push({path:'/ventes/list_vente'});
          }
          else{
            this.error= response.data.message
          }
        })
    },
    }
    
   
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modaler {
  text-align: center;
  background-color: white;
  height: 600px;
  width: 600px;
  margin-top: 5%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

</style>