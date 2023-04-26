<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler my-auto" @click.stop>
      <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </div>
      <p>
        Etes vous sur de vouloir supprimer définitivement cette catégorie ???
      </p>
      <hr>
      <div class="d-flex my-4">
        <button class="btn btn-outline-danger mx-auto" @click="supCategorie(infos)">Oui</button>
        <button class="btn btn-outline-success mx-auto" @click="$emit('close-modal')">Non</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  name: "deleteModal",
  props: ["infos"],
  data() {
    return {
      categorie: "",
      error: null,
    };
  },
  methods: {
    //supression définitive de la catégorie
    supCategorie(infos) {
      this.$axios
        .delete("/categories/" + infos, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/corbeille" });
            this.$toast("Suppression... ", {
              icon: "fa fa-check-circle",
            });
            this.$emit("close-modal");
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
  background-color: rgba(239, 239, 239, 0.803);
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