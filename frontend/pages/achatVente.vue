<template>
<div class="contain">
     <SideBar/>
    <div class="zone">
        <div class="titre">
            Achats & Ventes
        </div>
        
            <NuxtLink to="/achats/achat">  
                <div class="case1">
                    <i class='bx bx-cart-add'></i><br><br>        
                    Effectuer un achat   
                </div>              
            </NuxtLink>
                <hr>      
            <NuxtLink to="/ventes/vente"> 
                <div class="case2">
                    <i class='bx bx-export'></i><br><br>   
                    Effectuer une vente
                </div>
            </NuxtLink>

    
  </div>
 

</div>
</template>

<script>
import SideBar from './nav.vue'
export default {
  components: {
    SideBar,    
  },


}
</script>

<style scoped>
.bx{
    font-size: 55px;
}
.case1{
    margin: 5%;
    padding: 6% 5%;
    border: 2px solid rgb(3, 161, 3);
    cursor: pointer;
    font-size: 12px;
    color: rgb(8, 0, 0);
    text-align: center;
}
.case2{
    margin: 5%;
    padding: 6% 5%;
    border: 2px solid rgb(240, 54, 41);
    cursor: pointer;
    font-size: 12px;
    color: rgb(12, 0, 0);
    text-align: center;
}

.case1:hover{
    background-color: rgb(146, 241, 135);
    border: 1px solid transparent;
    color: black;
}

.case2:hover{
    background-color: rgb(255, 98, 98);
    border: 1px solid transparent;
    color: black;
}

</style>