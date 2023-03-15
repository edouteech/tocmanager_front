<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler">
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="status == 'error'"
      >
        {{ error }}
      </div>
      <form action="" method="POST">
        <h4>Ajout rapide de client</h4>
        <div class="input-form">
          <input
            type="text"
            class="form-control"
            placeholder="Entrer le nom du client "
            v-model="form.name"
            autocomplete="off"
            id="name_cli"
            required
          />
        </div>
        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors['name'] != null"
        >
          {{ errors["name"] }}
        </div>

        <div class="input-form">
          <vue-tel-input
            class="form-control form-control-sm"
            v-model="form.phone"
          ></vue-tel-input>
        </div>
        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors['phone'] != null"
        >
          {{ errors["phone"] }}
        </div>

        <div class="input-form">
          <input
            type="email"
            class="form-control"
            placeholder="Entrer l'email du client "
            v-model="form.email"
            autocomplete="off"
            id="email_cli"
            required
          />
        </div>
        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors['email'] != null"
        >
          {{ errors["email"] }}
        </div>

        <div class="input-form">
          <select v-model="form.nature" class="form-control" required>
            <option disabled value="">Choisissez la nature du client</option>
            <option value="0">Particulier</option>
            <option value="1">Entreprise</option>
          </select>
        </div>
        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors['nature'] != null"
        >
          {{ errors["nature"] }}
        </div>

        <div class="input-form">
          <select v-model="form.type_client" class="form-control" required>
            <option disabled value="">Choisissez le type du client</option>
            <option :value="type" v-for="(type, i) in types" :key="i">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="input-form" v-if="form.type_client == 'douteux'">
          <input
            type="number"
            class="form-control"
            placeholder="Entrer le seuil de crédit possible"
            v-model="form.seuil_max"
            autocomplete="off"
            id="email_cli"
            required
          />
        </div>
        <div class="submit-form">
          <input
            type="submit"
            id="submit"
            @click.prevent="submit()"
            value="Enregistrer le client"
            name="submit"
          />
        </div>
      </form>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  name: "ajoutModal",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        nature: 0,
        type_client: "normal",
        seuil_max: 0,
        compagnie_id: "",
      },
      errors: [],
      error: null,
      status: "",
      types: "",
    };
  },

  mounted() {
    //liste des types de client
    this.$axios
      .get("/clients/types", {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        this.types = response.data.data;
      });
  },

  methods: {
    //ajout rapide de client
    async submit() {
      await this.$axios
        .post("/clients", {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          nature: this.form.nature,
          type_client: this.form.type_client,
          seuil_max: this.form.seuil_max,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          this.status = response.data.status;
          if (this.status == "success") {
            this.$emit("conf", {
              message: this.form.name,
              cli_id: response.data.data.id,
            });
            (this.form.name = ""),
              (this.form.phone = ""),
              (this.form.email = ""),
              (this.form.nature = 0),
              (this.form.seuil_max = 0),
              (this.form.type_client = "normal"),
              (this.status = response.data.status);
            this.$emit("close-modal");
            this.$toast("Client ajouté !!! ", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.status = response.data.status;
            this.errors = response.data.data;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
form {
  padding: 50px;
}

.input-form {
  display: flex;
  flex-direction: column-reverse;
  margin-top: 30px;
  height: 50px;
}

input {
  padding: 8px;
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}

input::placeholder {
  font-size: 16px;
  opacity: 0.8;
}

.submit-form {
  margin-top: 10%;
  text-align: center;
}

input[type="submit"] {
  background-color: white;
  color: black;
  padding: 10px 15px;
  margin: 8px 0;
  border: 1px solid #0971fa;
  cursor: pointer;
  width: 60%;
  font-size: 15px;
}

input[type="submit"]:hover {
  background-color: #0971fa;
  color: white;
  border: 1px solid #0971fa;
  font-size: 16px;
}
.modal-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #949292da;
  overflow: auto;
}

.modaler {
  text-align: center;
  background-color: white;
  height: max-content;
  width: 600px;
  margin-top: 5%;
  padding: 30px 0;
  border-radius: 20px;
}
.close {
  margin: 5% 0 0 0;
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