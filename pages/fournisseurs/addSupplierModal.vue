<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler my-auto" @click.stop>
        <form action="" method="POST">
          <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
              <i class="fa fa-times-circle" aria-hidden="true"></i>
          </div>
          <h4 class="text-center">Nouveau Fournisseur</h4>
          <div class="form-group ">
          <label class="title">Entrer le nom du fournisseur</label>
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            autocomplete="off"
            required
            placeholder="Jean Doe"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center "
          role="alert"
          v-if="errors && errors.name"
        >
          {{ errors.name }}
        </div>

        <div class="form-group ">
          <label class="title"
            >Entrer le numero de téléphone du fournisseur</label
          >
          <vue-tel-input
            class="form-control form-control-sm"
            v-model="form.phone"
          ></vue-tel-input>
        </div>
        <div
          class="alert alert-danger justify-content-center "
          role="alert"
          v-if="errors && errors.phone"
        >
          {{ errors.phone }}
        </div>

        <div class="form-group ">
          <label class="title">Entrer l'email du fournisseur</label>
          <input
            type="email"
            class="form-control"
            v-model="form.email"
            autocomplete="off"
            required
            placeholder="azerty@azert.com"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center "
          role="alert"
          v-if="errors && errors.email"
        >
          {{ errors.email }}
        </div>

        <div class="form-group ">
          <div class="form-group">
            <label class="title">Nature du fournisseur</label>
            <select class="form-control" v-model="form.nature">
              <option disabled value="">Choisissez...</option>
              <option value="0">Particulier</option>
              <option value="1">Entreprise</option>
            </select>
          </div>
        </div>
  
          <button
            type="submit"
            class="btn btn-outline-primary col-md-12 p-3"
            v-on:click.prevent="submit()"
          >
            ENREGISTRER
          </button>
        </form>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "addSupplierModal",
    data() {
      return {
      form: {
        name: "",
        email: "",
        phone: "",
        nature: 0,
        compagnie_id: "",
      },
      errors: [],
      error: null,
      };
    },
  
    methods: {
      async submit() {
      await this.$axios
        .post("/suppliers", {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          nature: this.form.nature,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$emit("conf");
            (this.form.name = ""),
              (this.form.phone = ""),
              (this.form.email = ""),
              (this.form.nature = ""),
              (this.status = response.data.status);
            this.$emit("close-modal");
            this.$toast("Nouveau fournisseur ajouté !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
            this.$toast.error(this.error, {
                icon: "fa fa-times-circle",
              });
          }
        })
        .catch((error) => console.log(error));
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    padding: 50px;
  }
  
  .title{
      font-weight: 500;
  }
  
  h4{
      margin: 20px 0;
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
  
  
  .btn {
    background-color: white;
    color: black;
    font-weight: 600;
    padding: 10px 15px;
    margin: 30px 0;
    border: 1px solid #0971fa;
    cursor: pointer;
    font-size: 15px;
  }
  
  .btn:hover {
    background-color: #0971fa;
    color: white;
    border: 1px solid #0971fa;
    font-size: 16px;
  }
  
  .form-group {
    margin-top: 4%;
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
    background-color: #f3f3f3da;
    overflow: auto;
  }
  
  .modaler {
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
    height: max-content;
    width: 600px;
    border-radius: 5px;
  }
  .close {
    cursor: pointer;
  }
  .close i{
    font-size : 22px;
    color: rgb(166, 166, 166);
  }
  
  .close i:hover{
    color: rgb(0, 0, 0);
  }
  
  </style>