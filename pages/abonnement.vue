<template>
  <div class="contain my-5">
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      rel="stylesheet"
    />
    <div class="col-md-6 mx-auto my-5">
      <h3 class="text-center title-offre">NOS OFFRES</h3>
      <p class="text-center p-offre">
        Prenez connaissance de nos packs d'abonnement
      </p>
    </div>
    <div class="row mx-auto">
      <div class="col-md-4 mx-auto offre">
        <h4 class="text-center">{{ plan1.name }}</h4>
        <hr />
        <p class="text-center">{{ plan1.description }}</p>
        <div class="img">
          <img src="/images/poignee.jpg" alt="" class="img-offer mx-5 w-75" />
        </div>
        <div>
          <div class="liste">
            <div class="number-text">
              <span class="number">1</span
              ><span class="text-liste"
                >{{ plan1.trial_period }} JOURS D'ESSAI</span
              >
            </div>
            <br />
            <div class="number-text">
              <span class="number">2</span
              ><span class="text-liste"
                >{{ plan1.invoice_period }} MOIS D'ABONNEMENT</span
              >
            </div>
            <br />
            <div class="number-text">
              <span class="number">3</span
              ><span class="text-liste">ASSISTANCE TECHNIQUE 24H/24</span>
            </div>
            <br />
            <div class="number-text">
              <span class="number">4</span
              ><span class="text-liste">FORMATION GRATUITE</span>
            </div>
            <br />
          </div>
          <!-- <button class="btn btn-outline-primary btn-offer p-2">Sélectionner</button> -->
          <div class="title-offre col-md-6 mx-auto text-center">
            {{ plan1.price }} {{ plan1.currency }}
          </div>
        </div>
      </div>
      <div class="col-md-4 mx-auto offre">
        <h4 class="text-center">{{ plan2.name }}</h4>
        <hr />
        <p class="text-center">{{ plan2.description }}</p>
        <div class="img">
          <img src="/images/carousel.jpg" alt="" class="img-offer mx-5 w-75" />
        </div>
        <div>
          <div class="liste">
            <div class="number-text">
              <span class="number">1</span
              ><span class="text-liste"
                >{{ plan2.trial_period }} JOURS D'ESSAI</span
              >
            </div>
            <br />
            <div class="number-text">
              <span class="number">2</span
              ><span class="text-liste"
                >{{ plan2.invoice_period }} ANNEE D'ABONNEMENT</span
              >
            </div>
            <br />
            <div class="number-text">
              <span class="number">3</span
              ><span class="text-liste">ASSISTANCE TECHNIQUE 24H/24</span>
            </div>
            <br />
            <div class="number-text">
              <span class="number">4</span
              ><span class="text-liste">FORMATION GRATUITE</span>
            </div>
            <br />
          </div>
          <!-- <button class="btn btn-outline-primary btn-offer p-2">Sélectionner</button> -->
          <div class="title-offre col-md-6 mx-auto text-center">
            {{ plan2.price }} {{ plan2.currency }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      plan1: "",
      plan2: "",
    };
  },

  mounted() {
    //liste des plans
    this.$axios.get("/index/plans").then((response) => {
      console.log(response);
      this.plan1 = response.data.data[0];
      this.plan2 = response.data.data[1];
    });
  },

  methods: {},
};
</script>

<style scoped>
.title-offre {
  border: 1px solid rgb(54, 147, 254);
  padding: 15px;
  background-color: rgb(54, 147, 254);
  color: white;
  font-size: 25px;
  font-weight: 800;
  border-radius: 15px;
  margin: 50px 0;
}

.p-offre {
  font-size: 20px;
}

.offre {
  border: 2px solid black;
  padding: 30px 2px;
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
  margin-bottom: 15px;
}

.btn-offer {
  margin: 0 50px;
}
</style>