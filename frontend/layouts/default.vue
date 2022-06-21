<template>
<div>
    <div class="p-5 bg-gray-600 text-white" v-if="$auth.loggedIn != true">
        <!-- <Nuxt-Link to='/' class="p-2 bg-green-600 text-white rounded">Home</Nuxt-Link> -->
        <Nuxt-Link to='/login' class="p-2 m-80 bg-blue-600 text-white rounded" v-if="$auth.loggedIn != true">Login</Nuxt-Link>
        <Nuxt-Link to='/register' class="p-2 ml-80 bg-blue-600 text-white rounded" v-if="$auth.loggedIn != true">Register</Nuxt-Link>        
        <!-- <Nuxt-Link to='/dashboard' class="p-2 bg-green-600 text-white rounded" v-if="$auth.loggedIn == true">Dashboard</Nuxt-Link> -->
    </div>

    <Nuxt/>
 </div>
</template>

<script>
// import SideBar from '../pages/nav.vue'
export default {
  // components: {
  //   SideBar,
    
  // },
  auth:true,
  //  middleware:'auth',
   
}
</script>


<style>

</style>