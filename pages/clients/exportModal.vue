<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler my-auto" @click.stop>
      <h6 class="text-center">
        Cocher les colonnes que vous voudrez exporter !
      </h6>
      <form action="" class="my-5">
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.client"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Nom du client
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.phone"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Numéro de téléphone
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.email"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked"> Email </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.nature"
            true-value="1"
            false-value="0 "
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Nature
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.balance"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Balance
          </label>
        </div>
        <div class="d-flex justify-content-end">
        <vue-excel-xlsx
          class="btn btn-outline-info mx-3 my-4"
          :data="data"
          :columns="columns"
          :file-name="'clients'"
          :file-type="'xlsx'"
          :sheet-name="'sheetname'"
        >
          Exporter
        </vue-excel-xlsx>
        </div>
      </form>
    </div>
  </div>
</template>
  
  
  <script>
export default {
  name: "exportModal",
  data() {
    return {
      form: {
        client: 1,
        phone: 1,
        nature: 1,
        email: 1,
        balance: 1,
      },
      columns: [
        {
          label: "name",
          field: "name",
        },
        {
          label: "email",
          field: "email",
        },
        {
          label: "phone",
          field: "phone",
        },
        {
          label: "nature(particulier ou entreprise)",
          field: "nature",
        },
        {
          label: "balance",
          field: "balance",
        },
      ],
      data: [],
    };
  },

  async mounted() {
    await this.exp();
  },

  methods: {
    //exportation en excel
    async exp() {
      await this.$axios
        .get("/clients", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            is_paginated: 0,
          },
        })
        .then((response) => {
          this.data = response.data.data;

          if (this.form.client == 0) {
            this.columns.splice(0, 1);
          }

          if (this.form.email == 0) {
            this.columns.splice(1, 1);
          }

          if (this.form.phone == 0) {
            this.columns.splice(2, 1);
          }

          if (this.form.nature == 0) {
            this.columns.splice(3, 1);
          }

          if (this.form.balance == 0) {
            this.columns.splice(4, 1);
          }
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
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  width: 600px;
  margin: auto;
  padding: 60px 0;
  border-radius: 10px;
  color: #000000;
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
</style>