<template>
  <div class="contain">
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      rel="stylesheet"
    />
    <div class="alert alert-success justify-content-center" role="alert">
      Consultez votre boite mail pour réinitialiser votre mot de passe.
      {{ this.$route.params.error }}
    </div>
    <div
      class="alert alert-danger justify-content-center"
      role="alert"
      v-if="errors"
    >
      {{ errors }}
    </div>
    <h2 class="text px-4">Réinitialiser Mot de passe</h2>
    <hr />
    <br /><br />
    <div class="container-fluid h-custom">
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div class="d-flex">
          <span class="fas fa-lock px-2 mt-1"></span
          ><label class="form-label">Code reçu par mail</label>
        </div>
          <div class="input-field">
            <input
              type="number"
              id="number"
              class="form-control form-control-lg"
              v-model="form.token"
              placeholder="Entrer le code reçu par email"
            />
          </div>
          <br />
          <div class="form-outline mb-3">
            <div class="d-flex">
            <span class="fas fa-lock px-2 mt-1"></span
            ><label class="form-label">Nouveau Mot de passe</label>
          </div>
            <div class="input-field">
              <input
                type="password"
                id="password"
                class="form-control form-control-lg"
                v-model="form.password"
                placeholder="Entrer un mot de passe"
              /><span
                ><i
                  class="fa fa-eye px-2"
                  id="eye"
                  @click.prevent="changer()"
                ></i
              ></span>
            </div>
          </div>

          <div class="form-outline mb-3">
            <div class="d-flex">
            <span class="fas fa-lock px-2 mt-1"></span
            ><label class="form-label">Confirmer le Mot de passe</label>
          </div>
            <div class="input-field">
              <input
                type="password"
                id="password1"
                class="form-control form-control-lg"
                v-model="form.password_confirmation"
                placeholder="Entrer un mot de passe"
              /><span
                ><i
                  class="fa fa-eye px-2"
                  id="eyes"
                  @click.prevent="change()"
                ></i
              ></span>
            </div>
          </div>
          <br /><br />

          <button
            type="submit"
            class="btn btn-primary"
            v-on:click.prevent="submit()"
          >
            Enregistrer
          </button>

          <br /><br /><br />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  name: "password",
  layout: "public",
  data() {
    return {
      errors: null,
      form: {
        token: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    //modifier le mot de passe
    async submit() {
      await this.$axios
        .post("/reset-password", {
          email: this.$route.params.email,
          token: this.form.token,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        })
        .then((response) => {
          this.status = response.data.status;
          this.errors = response.data.message;

          if (response.data.status == "success") {
            this.$toast("Mot de passe modifié !!!", {
              icon: "fa fa-check-circle",
            });
            this.$router.push({
              name: "login",
              params: { errors: this.errors },
            });
          } else {
          this.errors = response.data.message;
          }
        })
        .catch((error) => console.log(error));
    },

    //afficher et cacher le nouveau de passe
    changer() {
      var pwd = document.getElementById("password");
      var fa = document.getElementById("eye");
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
        fa.class = "fa fa-eye px-2";
      } else {
        pwd.setAttribute("type", "password");
      }
    },


    //afficher et cacher la confirmation du nouveau de passe
    change() {
      var pwd = document.getElementById("password1");
      var fa = document.getElementById("eye");
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
        fa.class = "fa fa-eye px-2";
      } else {
        pwd.setAttribute("type", "password");
      }
    },
  },
};
</script>

<style scoped>
.contain {
  padding: 8% 10%;
}

.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4343ff;
}
</style>