<template>
  <div class="modal-overlay">
    <div class="modaler text-center py-5">
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <strong>Voulez vous supprimer cette catégorie ???</strong><br /><br />
      <div class="d-flex">
        <button class="btn btn-danger mx-auto" @click.prevent="sup()">
          Oui
        </button>
        <button class="btn btn-dark mx-auto" @click="$emit('close-modal')">
          Non
        </button>
      </div>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>
  
  <script>
export default {
  auth: true,
  props: ["identifiant"],
  name: "deleteModal",
  data() {
    return {
      error: null,
    };
  },

  methods: {
    sup() {
      this.$axios
        .delete("/categories/" + this.identifiant, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$emit("conf", { message: this.identifiant });
            this.$toast("Suppression !!! ", {
              icon: "fa fa-check-circle",
            });
            this.$emit("close-modal");
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
  background-color: #dbdbdbda;
}

.modaler {
  background-color: rgb(197, 239, 251);
  overflow: auto;
  width: 600px;
  margin-top: 15%;
  /* border-radius: 20px; */
  height: 200px;
  padding: 1%;
  box-shadow: 50px;
}
.close {
  margin: 14% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.input-form .mode {
  font-size: 16px;
  font-weight: bold;
}

.input-form .resp {
  font-size: 18px;
  margin-left: 3%;
  color: rgb(11, 7, 40);
}
</style>