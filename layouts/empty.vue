<template>
<div>
    <div class="contenu">
        <div class="alert alert-danger justify-content-center avertissement-abonnement" role="alert" v-if="verifyGrace != null">
          Votre abonnement est expiré !!! Vous bénéficiez d'une période de grace. Veuillez vous réabonnez avant le {{verifyGrace}}.
        </div>
        <Nuxt />
    </div>
    <Footer/>
</div>
</template>


<script>
import Footer from '~/components/inc/footer.vue';
export default{
    middleware:'auth',
    name: 'empty',
    components:{
        Footer,
    },
    data(){
        return {
            verifyGrace : ''
        }
    },

    mounted(){
        this.$axios.get('/compagnies/grace/'+localStorage.getItem('auth.company_id'))
        .then(response =>{
            console.log(response)
            this.verifyGrace = response.data.data.graceEndDate
        })
    }
} 

</script>
<style>
.contenu{
    min-height: 100vh;
}
</style>