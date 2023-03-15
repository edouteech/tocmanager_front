<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler">
      <h6 class="text-center">
        Cocher les colonnes que vous voudrez exporter !
      </h6>
      <form action="" class="my-5">
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.nom"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Nom du produit
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.categorie"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Id de la catégorie
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.tax_group"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Groupe de Taxation
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.quantity"
            true-value="1"
            false-value="0 "
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Quantité en stock
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.price_sell"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Prix de Vente
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.price_buy"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Prix d'Achat
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.stock_min"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Stock Minimal
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.stock_max"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Stock Maximal
          </label>
        </div>
        <vue-excel-xlsx
          class="btn btn-outline-info mx-3 my-4"
          :data="data"
          :columns="columns"
          :file-name="'produits'"
          :file-type="'xlsx'"
          :sheet-name="'sheetname'"
        >
          Exporter
        </vue-excel-xlsx>
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
        nom: 1,
        categorie: 1,
        tax_group: 1,
        quantity: 1,
        price_sell: 1,
        price_buy: 1,
        stock_min: 1,
        stock_max: 1,
      },
      columns: [
        {
          label: "name",
          field: "name",
        },
        {
          label: "category_id",
          field: "category_id",
        },
        {
          label: "tax_group",
          field: "tax_group",
        },
        {
          label: "quantity",
          field: "quantity",
        },
        {
          label: "price_sell",
          field: "price_sell",
        },
        {
          label: "price_buy",
          field: "price_buy",
        },
        {
          label: "stock_min",
          field: "stock_min",
        },
        {
          label: "stock_max",
          field: "stock_max",
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
        .get("/products", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            is_paginated: 0,
          },
        })
        .then((response) => {
          this.data = response.data.data;

          if (this.form.nom == 0) {
            this.columns.splice(0, 1);
          }

          if (this.form.categorie == 0) {
            this.columns.splice(1, 1);
          }

          if (this.form.tax_group == 0) {
            this.columns.splice(2, 1);
          }

          if (this.form.quantity == 0) {
            this.columns.splice(3, 1);
          }

          if (this.form.price_sell == 0) {
            this.columns.splice(4, 1);
          }

          if (this.form.price_buy == 0) {
            this.columns.splice(5, 1);
          }

          if (this.form.stock_min == 0) {
            this.columns.splice(6, 1);
          }

          if (this.form.stock_max == 0) {
            this.columns.splice(7, 1);
          }
        });
    },
  },
};
</script>
  
  <style scoped>
.modal-overlay {
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
  background-color: rgb(1, 0, 0);
  height: 600px;
  width: 600px;
  margin: auto;
  padding: 60px 0;
  border-radius: 20px;
  color: #fff;
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