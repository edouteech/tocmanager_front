<template>
  <div class="contain my-5">
    <div
      class="alert alert-danger justify-content-center"
      role="alert"
      v-if="error"
    >
      {{ error }}
    </div>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      rel="stylesheet"
    />
    <div class="col-md-6 mx-auto my-5">
      <!-- <h3 class="text-center title-offre">NOS OFFRES</h3> -->
      <p class="text-center p-offre">
        Choississez un pack d'abonnement pour bénéficier de nos services...
      </p>
    </div>
    <div class="row mx-auto">
      <div class="col-md-4 mx-auto offre" v-for="(plan, i) in plans" :key="i">
        <h4 class="text-center">{{ plan.name }}</h4>
        <hr />
        <p class="text-center">
          Choississez un {{ plan.description }} et bénéficiez d'<b
            >une période d'éssai de {{ plan.trial_period }} jours</b
          >.
        </p>
        <div class="img">
          <img src="/images/poignee.jpg" alt="" class="img-offer w-50" />
        </div>
        <div>
          <div class="liste">
            <div class="number-text">
              <span class="number">1</span
              ><span class="text-liste"
                >{{ plan.trial_period }} JOURS D'ESSAI</span
              >
            </div>
            <br />
            <div class="number-text">
              <span class="number">2</span
              ><span class="text-liste">ASSISTANCE TECHNIQUE 24H/24</span>
            </div>
            <br />
            <div class="number-text">
              <span class="number">3</span
              ><span class="text-liste">FORMATION GRATUITE</span>
            </div>
            <br />
            <div class="number-text">
              <span class="number">4</span
              ><span class="text-liste"
                >POUR UN MONTANT DE
                <span class="text-primary"
                  >{{ plan.price }} {{ plan.currency }}</span
                ></span
              >
            </div>
            <br />
          </div>
          <button
            class="btn btn-outline-primary btn-offer p-2"
            @click="createAbonnement(plan)"
            id="pay-btn"
          >
            Sélectionner
          </button>
        </div>
      </div>
      <!-- <script src="https://cdn.fedapay.com/checkout.js?v=1.1.7"></script> -->
    </div>
  </div>
</template>

    <script>
export default {
  auth: true,
  layout: "empty",
  data() {
    return {
      plan1: "",
      plan2: "",
      plans: "",
      error: null,
      showModal: false,
      user_email: "",
    };
  },

  mounted() {
    this.user_email = localStorage.getItem("auth.email");
    this.$axios.get("/index/plans").then((response) => {
      console.log(response);
      this.plans = response.data.data;
      this.plan1 = response.data.data[0];
      this.plan2 = response.data.data[1];
    });
  },

  methods: {
    //souscrire à un plan sans payer
    createAbonnement(plan) {
      let identifiant = plan.id;
      this.$axios
        .post("/create/abonnement", {
          compagnie_id: localStorage.getItem("auth.company_id"),
          plan_id: identifiant,
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push("/dashboard");
            this.$toast("Abonnement choisi avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
          }
        });
    },
  },
};
</script>
    
    <style scoped>
.title-offre {
  border: 1px solid rgb(54, 147, 254);
  padding: 5px;
  background-color: rgb(54, 147, 254);
  color: white;
  font-size: 25px;
  font-weight: 800;
  border-radius: 15px;
  margin-top: 20px;
}

.p-offre {
  font-size: 20px;
}

.offre {
  border: 2px solid black;
  padding: 15px 2px;
  cursor: pointer;
  background-color: aliceblue;
}

.liste {
  font-size: 18px;
  font-weight: bold;
}

.number {
  border: 3px solid white;
  background-color: rgb(120, 190, 251);
  border-radius: 100%;
  padding: 5px 10px;
}

.number-text {
  margin: 5px 50px;
}

.img-offer {
  margin: 10px 25%;
}

.btn-offer {
  margin: 0 50px;
}
</style>