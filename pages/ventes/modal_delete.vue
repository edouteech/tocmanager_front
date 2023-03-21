<template>
  <div class="modal-overlay">
    <div class="modaler">
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <p>Etes vous sur de vouloir supprimer définitivement cette facture ???</p>
      <div class="d-flex">
        <button class="btn btn-outline-danger mx-auto" @click="supVente(infos)">Oui</button>
        <button class="btn btn-outline-success mx-auto" @click="$emit('close-modal')">Non</button>
      </div>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteModal",
  props: ["infos"],
  data() {
    return {
      vente: "",
      error: null,
    };
  },
  methods: {
    //suppression
    supVente(infos) {
      this.$axios
        .delete("/sells/" + infos, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Suppression...", {
              icon: "fa fa-check-circle",
            });
            this.vente = response.data.data;
            this.$router.push({ path: "/corbeille" });
          } else {
            this.error = response.data.message;
          }
        });
    },
  },
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
  background-color: rgba(239, 239, 239, 0.803);
}

.modaler {
  text-align: center;
  color: #fff;
  background-color: rgb(46, 46, 46);
  height: max-content;
  width: 600px;
  margin-top: 12%;
  border-radius: 15px;
  padding: 50px 20px;
}


.close {
  margin: 12% 0 0 16px;
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
  font-size: 18px;
  font-weight: bold;
  margin: 20px 5px;
}


</style>