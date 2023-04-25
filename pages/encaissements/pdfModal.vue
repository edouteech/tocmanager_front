<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler my-auto" @click.stop>
      <h6 class="text-center">Télécharger la liste des encaissements !</h6>
      <form action="" class="my-5">
        <p>Choississez ou non un intervalle de dates</p>
        <div class="range">
          <input class="form-control" type="date" v-model="form.date_debut" />
          <input class="form-control" type="date" v-model="form.date_fin" />
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-success" @click.prevent="pdf()">
            Télécharger
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  
<script>
export default {
  name: "pdfModal",
  data() {
    return {
      form: {
        date_debut: "",
        date_fin: "",
      },
    };
  },

  methods: {
    //exportation en pdf
    pdf() {
      this.$axios
        .get("/encaissements/download", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            start_at: this.form.date_debut,
            end_at: this.form.date_fin,
          },
          responseType: "blob",
          Accept: "application/pdf",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "encaissements.pdf");
          document.body.appendChild(link);
          link.click();
          this.$toast("Téléchargement", {
            icon: "fa fa-check-circle",
          });
          this.$emit("close-modal");
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
  background-color: #e3e3e3da;
  z-index: 999;
}

.modaler {
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 600px;
  margin: auto;
  padding: 60px 0;
  border-radius: 20px;
  padding: 5px 15px;
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

.range {
  display: flex;
  /* border: 1px solid gainsboro; */
  border-radius: 10px;
  padding: 1% 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  font-size: 18px;
}

.range input {
  margin-right: 2%;
}

@media screen and (max-width: 900px) {
  .range input {
    width: 45%;
  }
}

.range {
  margin: 30px 0;
}
</style>