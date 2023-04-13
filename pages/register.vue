<template>
  <div class="contain">
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      rel="stylesheet"
    />

    <div class="container-fluid h-custom">
      <div class="row d-flex h-100">
        <div class="img col-md-9 col-lg-6 col-xl-5">
          <img src="/images/1.png" class="img-fluid" alt="Sample image" />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-4">
          <div
            class="alert alert-danger justify-content-center"
            role="alert"
            v-if="error"
          >
            {{ error }}
          </div>
          <form>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">
                Informations personnelles
              </p>
            </div>
            <div class="form-outline mb-4">
              <span class="fa fa-address-book px-2"></span
              ><label class="form-label">Nom Complet</label>
              <div class="input-field">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.name"
                  required
                  placeholder="Entrer votre nom"
                />
              </div>

              <div
                class="alert alert-danger justify-content-center"
                role="alert"
                v-if="errors && errors.name"
              >
                {{ errors.name[0] }}
              </div>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <span class="fa fa-envelope px-2"></span>
              <label class="form-label">Adresse Email</label>
              <div class="input-field">
                <input
                  type="email"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  required
                  placeholder="Entrer une addresse email valide"
                />
              </div>

              <div
                class="alert alert-danger justify-content-center"
                role="alert"
                v-if="errors && errors.email"
              >
                {{ errors.email[0] }}
              </div>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <span class="fas fa-lock px-2"></span
              ><label class="form-label">Mot de passe</label>
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

              <div
                class="alert alert-danger justify-content-center"
                role="alert"
                v-if="errors && errors.password"
              >
                {{ errors.password[0] }}
              </div>
            </div>

            <div class="form-outline mb-3">
              <span class="fas fa-lock px-2"></span
              ><label class="form-label">Confirmer le Mot de passe</label>
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

              <div
                class="alert alert-danger justify-content-center"
                role="alert"
                v-if="errors && errors.password_confirmation"
              >
                {{ errors.password_confirmation[0] }}
              </div>
            </div>

            <div class="form-outline mb-4">
              <span class="fa fa-mobile px-2"></span>
              <label class="form-label">Téléphone</label>
              <div class="input-field">
                <vue-tel-input
                  class="form-control form-control-sm"
                  v-model="form.phone"
                  autocomplete="off"
                ></vue-tel-input>
              </div>

              <div
                class="alert alert-danger justify-content-center"
                role="alert"
                v-if="errors && errors.phone"
              >
                {{ errors.phone[0] }}
              </div>
            </div>

            <div class="form-outline mb-4">
              <span class="fa fa-briefcase px-2"></span
              ><label class="form-label">Nom de l'entreprise</label>
              <div class="input-field">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.compagnie.name"
                  required
                  placeholder="Entrer le nom de votre entreprise"
                />
              </div>
            </div>

            <div class="text-center text-lg-start mt-6 pt-2">
              <button
                type="button"
                @click.prevent="register()"
                class="btn btn-primary btn-lg"
                style="padding-left: 1rem; padding-right: 1rem"
              >
                S'inscrire</button
              ><br /><br />
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Vous avez déjà un compte ?
                <NuxtLink to="/login" class="link-primary px-2">
                  Connexion
                </NuxtLink>
              </p>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "public",
  data() {
    return {
      user: "",
      errors: "",
      error: null,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        // country: '',
        compagnie: {
          name: "",
        },
      },
    };
  },

  methods: {
    async register() {
      await this.$axios
        .post("/register", {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          phone: this.form.phone,
          // country: this.form.country,
          compagnie: this.form.compagnie,
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Inscription réussie !!!", {
              icon: "fa fa-check-circle",
            });
            this.$router.push({ path: "/registerSuccess" });
          } else {
            this.errors = response.data.data;
            this.error = response.data.message;
          }
        })
        .catch((err) => console.log(err));
    },

    //afficher et cacher le mot de passe
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

    //afficher et cacher la confirmation du mot de passe
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
* {
  font-size: 12px;
}
.img-fluid {
  /* width: 400px; */
  height: 100vh;
}
.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4343ff;
}

/* .alert{
  margin-top: -10px;
} */

.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

@media screen and (max-width: 700px) {
  .img {
    display: none;
  }
}
</style>