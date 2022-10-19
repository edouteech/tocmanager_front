<template>
<div>
    <div class="contenu">
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
    }
} 

</script>
<style>
.contenu{
    height: 100%;
}
</style>