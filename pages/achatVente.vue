<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ordres </h3>
    </nav>

    <div class="contenu">
        <NuxtLink to="/achats/achat">  
            <div class="case1">
                <i class="fa fa-cart-arrow-down" aria-hidden="true"></i><br><br>        
                <p> Effectuer un achat </p>  
            </div>              
        </NuxtLink>
            <hr>      
        <NuxtLink to="/ventes/vente"> 
            <div class="case2">
                <i class="fa fa-share-square" aria-hidden="true"></i><br><br>   
                <p> Effectuer une vente </p>  
            </div>
        </NuxtLink>
    </div>
</div>
</template>

<script>
import Sidebar from './sidebar.vue'
export default {
  layout: "empty",
  components: {
    Sidebar,    
  },


}
</script>

<style scoped>
.contenu{
  margin: 5%;

}
.fa{
    font-size: 55px;
}
.case1{
    margin: 5%;
    padding: 6% 5%;
    border: 2px solid rgb(3, 161, 3);
    cursor: pointer;
    font-size: 14px;
    color: rgb(8, 0, 0);
    text-align: center;
    text-decoration: none;
}

.case1 p{
    position: absolute;
}

.case2 p{
    position: absolute;
}
.case2{
    margin: 5%;
    padding: 6% 5%;
    border: 2px solid rgb(240, 54, 41);
    cursor: pointer;
    font-size: 14px;
    color: rgb(12, 0, 0);
    text-align: center;
    text-decoration: none;
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