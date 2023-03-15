<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>
      <h6 class="text-center">
        Cocher les colonnes que vous voudrez exporter !
      </h6>
      <form action="" class="my-5">
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.id"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Id de la categorie
          </label>
        </div>
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
            Nom de la catégorie
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input mx-3"
            type="checkbox"
            v-model="form.parent"
            true-value="1"
            false-value="0"
            @click="exp()"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Id de la catégorie parent
          </label>
        </div>

        <vue-excel-xlsx
          class="btn btn-outline-info mx-3 my-4"
          :data="data"
          :columns="columns"
          :file-name="'categories'"
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
        id: 1,
        nom: 1,
        parent: 1,
      },
      columns: [
        {
          label: "id",
          field: "id",
        },
        {
          label: "name",
          field: "name",
        },
        {
          label: "parent",
          field: "parent_id",
        },
      ],
      data: [],
    };
  },

  async mounted() {
    await this.exp();
  },

  methods: {
    async exp() {
      //exportation en excel
      await this.$axios
        .get("/categories", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            is_paginated: 0,
          },
        })
        .then((response) => {
          this.data = response.data.data;

          if (this.form.id == 0) {
            this.columns.splice(0, 1);
          }

          if (this.form.nom == 0) {
            this.columns.splice(1, 1);
          }

          if (this.form.parent == 0) {
            this.columns.splice(2, 1);
          }
        });
    },
  },
};
</script>
  
  <style scoped>
.modal-overlay {
  z-index: 99;
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