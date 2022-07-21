<template>
<div>
    <Nuxt />
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