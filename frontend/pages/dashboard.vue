<template>
<div class="general">
    <div class="haut">
        <div class="user">
            <img src="./images/user.png" alt="logo" srcset="">
            <span class="user_name">{{$auth.user.name}}</span> 
            <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
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
.user{
    display: flex;    
}
.user img{
    width: 30px;
    border: 1px solid transparent;
    border-radius: 100%;
}
.user .user_name{
    font-size: 15px;
    padding: 7px;
}
.haut{
    border: 1px solid transparent;
    border-radius: 15px;
    position: fixed;
    width: 100%;
    padding: 5px 50px;
    padding-left: 85%;
    font-size: 10px;
    color: #fff;
    background-color: #202020;
}
.espace{
    padding-top: 5%;
    margin-left: 18%;
}
</style>