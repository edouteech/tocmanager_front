<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Ordres </h3>
    </nav>

    <div class="app-main__outer p-5">
        <!-- <button @click="generatePdf()" >Print !</button> -->
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
import {jsPDF} from 'jspdf'
import Sidebar from './sidebar.vue'
export default {
  layout: "empty",
  components: {
    Sidebar,    
  },
//   data() {
//         return {
//              margins : {  top: 80,   bottom: 60, left: 40,  width: 522  }  }
//     },
//     methods: {
//         generatePdf() {
//             window.print();
//         }
//     }

}
</script>

<style scoped>
.app-main__outer{
  overflow: auto;
}
.fa{
    font-size: 35px;
}
.case1{
    margin: 5% 25%;
    padding: 4% 3%;
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
    margin: 5% 25%;
    padding: 4% 3%;
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