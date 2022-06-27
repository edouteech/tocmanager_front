<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">
    <div class="titre">
      Tableau de Bord
    </div>
     azertyuiohgfdfghjkjhgfdsdfghjjhgfdsdfghjkjhgfdsdfghjjhgfdsdfghjhgfdssdfghgfdssdfg789325225632523025
  </div>
 

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
.contain{
  display: flex;
}

.nav{
  flex-basis: 22%;
}

.zone{
  flex-basis: 77%;
  position: relative;
}

.titre{
  border: 1px solid #202020;
  padding: 3%;
  margin-bottom: 3%;
  margin-left: -5%;
  background-color: #202020;
  color: #fff;
  font-size: 24px;
  letter-spacing: 2px;
}
.custom-btn {

    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
     box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
     7px 7px 20px 0px rgba(0,0,0,.1),
     4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
  }

  
.btn-10 {
  background: rgb(35, 240, 82);
background: linear-gradient(0deg, rgb(53, 246, 56) 0%, rgb(28, 243, 107) 100%);
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-left: 80%;

}
.btn-10:after {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  -webkit-transform: scale(.1);
  transform: scale(.1);
}
.btn-10:hover {
  color: #fff;
  border: none;
  background: transparent;
}
.btn-10:hover:after {
  background: rgb(50, 242, 73);
background: linear-gradient(0deg, rgb(92, 228, 42) 0%,  rgb(100, 243, 56)100%);
  -webkit-transform: scale(1);
  transform: scale(1);
}


</style>