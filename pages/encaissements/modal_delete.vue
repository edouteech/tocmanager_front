<template>
  <div class="modal-overlay">
    <div class="modaler my-auto" @click.stop>
      <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </div>
      <!-- <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div> -->
      <p>
        Etes vous sur de vouloir supprimer définitivement cet encaissement ???
      </p>
      <div class="d-flex">
        <button class="btn btn-outline-danger mx-auto" @click="supEncaissement(infos)">Oui</button>
        <button class="btn btn-outline-success mx-auto" @click="$emit('close-modal')">Non</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteModal",
  props: ["infos"],
  data() {
    return {
      encaissement: "",
      error: null,
    };
  },
  methods: {
    //suppression de l'encaissement
    supEncaissement(infos) {
      this.$axios
        .delete("/encaissements/" + infos, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Suppression...", {
              icon: "fa fa-check-circle",
            });
            this.encaissement = response.data.data;
            this.$router.push({ path: "/corbeille" });
          } else {
            this.error = response.data.message;
          }
        });
    },

    refresh() {
      this.$axios.get("/get/encaissement").then((response) => {
        console.log(response);
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
  background-color: rgba(255, 228, 228, 0.803);
}

.modaler {
  text-align: center;
  background-color: rgb(255, 255, 255);
  border: 2px solid red;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 600px;
  border-radius: 5px;
  padding: 50px 20px;
}

.close {
  cursor: pointer;
}

.close i {
  font-size: 22px;
  color: rgb(166, 166, 166);
}

.close i:hover {
  color: rgb(0, 0, 0);
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