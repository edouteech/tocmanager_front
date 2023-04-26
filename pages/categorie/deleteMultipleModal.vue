<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler text-center my-auto" @click.stop>

      <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </div>
      <strong>Voulez vous supprimer ces factures ???</strong>
      <hr>
      <div class="d-flex my-4">
        <button class="btn btn-danger mx-auto" @click.prevent="sup()">
          Oui
        </button>
        <button class="btn btn-dark mx-auto" @click="$emit('close-modal')">
          Non
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  auth: true,
  props: ["ids"],
  name: "deleteMultipleModal",
  data() {
    return {
      error: null,
    };
  },

  methods: {
    sup() {
      //   console.log(this.ids);
      this.$axios
        .post("/categories/multipleDelete", {
          categorie_ids: this.ids,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          this.$emit("conf", { message: this.ids });
          if (response.data.status == "success") {
            this.$toast("Suppression...", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
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
  width: 600px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 1%;
  box-shadow: 50px;
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