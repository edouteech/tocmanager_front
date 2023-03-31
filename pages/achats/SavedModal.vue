<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>
      <img class="check" src="/images/eff.jpg" alt="" />
      <h6>Enregistré!</h6>
      <p>La facture a été sauvegardé</p>
      <NuxtLink to="/achats/achat"><button>Nouvelle facture</button></NuxtLink>
      <NuxtLink to="/dashboard"><button>Tableau de bord</button></NuxtLink>
    </div>
  </div>
</template>


<script>
export default {
  name: "SavedModal",
  layout: 'voir'
};
</script>

<style scoped>
.modal-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modaler {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 5%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>