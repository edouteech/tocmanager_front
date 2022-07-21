<template>
<div>
    <Nuxt />
    <Footer />
</div>
</template>


<script>
import Footer from '~/components/inc/footer.vue';
export default{
    name: 'empty',
    components:{
        Footer,
    }
} 
</script>