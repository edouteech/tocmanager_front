<template>
    <div>
        <Nuxt />
    </div>
</template>


<script>
export default{
    middleware:'auth',
    name: 'voir',
} 
</script>