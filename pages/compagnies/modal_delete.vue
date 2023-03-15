<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal">
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <p>
        Etes vous sur de vouloir supprimer définitivement cette compagnie ???
      </p>
      <div class="reponse">
        <div class="yes" @click="supCompagnie(infos)">Oui</div>
        <div class="no" @click="$emit('close-modal')">Non</div>
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
      compagnie: "",
      error: null,
    };
  },
  methods: {
    //suppression définitive de compagnie
    supCompagnie(infos) {
      this.$axios.delete("/destroy/compagnie/" + infos).then((response) => {
        if (response.data.status == "success") {
          this.compagnie = response.data.data;
          this.$router.push({ path: "/corbeille" });
        } else {
          this.error = response.data.message;
        }
      });
    },

    refresh() {
      this.$axios.get("/get/compagnie").then((response) => {});
    },
  },
};
</script>

<style scoped>
.reponse {
  display: flex;
}

.yes {
  padding: 10px;
  margin: 5%;
  text-align: center;
  border: 1px solid;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 30%;
}
.no {
  padding: 10px;
  margin: 5%;
  text-align: center;
  border: 1px solid;
  cursor: pointer;
  border-radius: 10px;
}

.yes:hover {
  background-color: rgb(201, 220, 251);
}

.no:hover {
  background-color: rgb(201, 220, 251);
}

.modal-overlay {
  z-index: 99;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #fbc9c9da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 250px;
  width: 500px;
  margin-top: 12%;
  padding: 30px 0;
  border-radius: 20px;
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