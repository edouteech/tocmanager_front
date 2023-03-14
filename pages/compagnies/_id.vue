<template>
  <div>
    <div class="zone">
      <div class="titre">
        <Sidebar />
        <p class="name">Compagnies</p>
        <Userinfo />
      </div>
      <form action="" method="POST">
        <p>Modifier les informations de la compagnie</p>
        <div class="input-form">
          <input
            type="text"
            placeholder="Entrer le nom de la compagnie"
            v-model="form.name"
            autocomplete="off"
            required
          />
          <span class="error">{{ error_champ.name }}</span>
        </div>
        <div class="input-form">
          <input
            type="text"
            placeholder="Entrer le numero de téléphone de la compagnie "
            v-model="form.phone"
            required
          />
          <span class="error">{{ error_champ.phone }}</span>
        </div>

        <div class="input-form">
          <input
            type="email"
            placeholder="Entrer l'email de la compagnie "
            v-model="form.email"
            autocomplete="off"
            required
          />
          <span class="error">{{ error_champ.email }}</span>
        </div>
        <div class="submit-form">
          <input
            type="submit"
            id="submit"
            v-on:click.prevent="submit()"
            value="Modifier"
            name="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  components: {
    Sidebar,
    Userinfo,
  },
  data() {
    return {
      compagnie: "",
      compagnies: [],
      form: {
        id: "",
        name: "",
        email: "",
        phone: "",
      },
      error_message: "",
      error_champ: [],
    };
  },
  mounted() {
    this.$axios
      .get("/index/compagnie/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data.data[0]);
        let compagnie = response.data.data[0];
        // this.clients = response.data.data
        (this.form.name = compagnie.name),
          (this.form.phone = compagnie.phone),
          (this.form.email = compagnie.email);
      });
  },

  methods: {
    submit() {
      this.$axios
        .put("/update/compagnie", {
          id: this.$route.params.id,
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          nature: this.form.nature,
        })
        .then((response) => {
          this.$router.push({
            path: "/compagnies/list_compagnie",
          });
        });
    },
  },
};
</script>

<style scoped>
.zone p {
  font-size: 18px;
}

form {
  width: 80%;
  padding-left: 100px;
  padding-right: 300px;
  padding-top: 50px;
}
.input-form {
  display: flex;
  flex-direction: column-reverse;
  margin: 1.2em 0;
  height: 50px;
}

.error {
  color: red;
  margin-bottom: -10%;
  font-size: 12px;
}

input {
  padding: 8px;
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}

input::placeholder {
  font-size: 15px;
  opacity: 0.5;
}

.submit-form {
  margin-top: 10%;
  text-align: right;
}

input[type="submit"] {
  background-color: white;
  color: black;
  padding: 10px 15px;
  margin: 8px 0;
  border: 1px solid #53af57;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
}

input[type="submit"]:hover {
  background-color: #53af57;
  color: white;
  border: 1px solid #53af57;
  font-size: 16px;
}
</style>
