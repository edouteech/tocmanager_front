<template>
  <div class="contain">
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      rel="stylesheet"
    />
    <div
      class="alert alert-success justify-content-center"
      role="alert"
      v-if="status == 'success'"
    >
      Consultez votre boite mail pour réinitialiser votre mot de passe.
      {{ error }}
    </div>
    <div
      class="alert alert-danger justify-content-center"
      role="alert"
      v-if="status == 'error'"
    >
      {{ error }}
    </div>
    <h2 class="text px-4">Mot de passe oublié</h2>
    <hr />
    <br /><br />
    <div class="container-fluid h-custom">
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <div class="d-flex">
              <span class="fa fa-envelope px-2 mt-1"></span>
              <label class="form-label">Entrez votre adresse email</label>
            </div>
            <div class="input-field">
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="form.email"
                required
                placeholder="Entrer votre addresse email "
              />
            </div>
            <br /><br />

            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="submit()"
            >
              Envoyer
            </button>
          </div>
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
  data() {
    return {
      status: "",
      error: null,
      form: {
        email: "",
      },
    };
  },
  methods: {
    //verification de l'email de l'utilisateur
    async submit() {
      await this.$axios
        .post("/forgot-password", {
          email: this.form.email,
          //   compagnie_id: localStorage.getItem('auth.company_id')
        })
        .then((response) => {
          this.status = response.data.status;
          this.error = response.data.message;

          if (response.data.status == "success") {
            this.$router.push({
              name: "password2",
              params: { email: this.form.email, error: this.error },
            });
          } else {
            this.error = response.data.message;
          }
        })
        .catch((error) => console.log(error));
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