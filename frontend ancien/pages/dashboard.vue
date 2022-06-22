<template>
<div class="general">
    <div class="font-bold ml-80">
        <div> 
             Dashboard: {{$auth.user.name}}
            <button type="button" class="bg-red-700 text-white rounded p-3 ml-80" @click="logout">Logout</button>
        </div>
        
    </div>
    <SideBar/>
 </div>

</template>

<script>
import SideBar from './nav.vue'
export default {
  components: {
    SideBar,    
  },
    middleware:'auth',
    // auth: false,

    methods:{
        async logout(){
            this.$auth.logout();
            this.$router.push('/login');
        }
        
    }

}
</script>

<style>

</style>