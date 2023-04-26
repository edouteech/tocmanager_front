<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modaler my-auto" @click.stop>
            <form action="" method="POST">
                <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                </div>
                <h4 class="text-center">Ajouter Décaissement</h4>
                <div class="form-group">
                    <label class="title">Entrer le montant</label>
                    <input type="number" class="form-control" v-model="form.montant" autocomplete="off" required
                        placeholder="10000" />
                </div>
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors_montant">
                    {{ errors_montant }}
                </div>
                <div class="form-group">
                    <label class="title">Entrer la date du décaissement </label>
                    <input type="date" class="form-control" v-model="form.date" autocomplete="off" required />
                </div>
                <div class="form-group">
                    <div class="form-group">
                        <label class="title">Sélectionner le fournisseur</label>
                        <select class="form-control" v-model="form.supplier_id" required>
                            <option disabled value="">Choisissez...</option>
                            <option v-for="(fournisseur, i) in fournisseurs" :key="i" :value="fournisseur.id">
                                {{ fournisseur.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors_supplier_id">
                    {{ errors_supplier_id }}
                </div>
                <div class="form-group">
                    <label class="title">Méthode de paiement</label>
                    <select class="form-control" v-model="form.payment">
                        <option value="">Choississez</option>
                        <option v-for="(methode, j) in methodes" :key="j" :value="methode">
                            {{ methode }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-outline-primary col-md-12 p-3" @click.prevent="submit()">
                    ENREGISTRER
                </button>
            </form>

        </div>
    </div>
</template>
  
<script>
import moment from "moment";
export default {
    name: "addDecaissementModal",
    data() {
        return {
            fournisseurs: [],
            fournisseur: "",
            form: {
                montant: "",
                facture: "",
                date: moment().format("YYYY-MM-DD"),
                supplier_id: "",
                compagnie_id: "",
                payment: "ESPECES",
            },
            errors: [],
            error: null,
            user: "",
            methodes: "",
            errors_montant: "",
            errors_supplier_id: "",
        };
    },

    mounted() {
        this.payment();
        this.user = localStorage.getItem("auth.user_id");

        //liste des fournisseurs
        this.$axios
            .get("/suppliers", {
                params: {
                    compagnie_id: localStorage.getItem("auth.company_id"),
                },
            })
            .then((response) => {
                this.fournisseurs = response.data.data.data;
            });
    },

    methods: {
        //ajouter un décaissement
        async submit() {
            await this.$axios
                .post("/decaissements", {
                    montant: this.form.montant,
                    date: this.form.date,
                    supplier_id: this.form.supplier_id,
                    user_id: this.user,
                    compagnie_id: localStorage.getItem("auth.company_id"),
                    payment: this.form.payment,
                })
                .then((response) => {
                    console.log(response);
                    if (response.data.status == "success") {
                        this.$emit("conf");
                        (this.form.montant = ""),
                            (this.form.date = ""),
                            (this.form.supplier_id = ""),
                            (this.form.payment = ""),
                            this.$emit("close-modal");
                        this.$toast("Décaissement ajouté !!!", {
                            icon: "fa fa-check-circle",
                        });
                    } else {
                        this.error = response.data.message;
                        this.errors = response.data.data;
                        this.errors_montant = response.data.data.montant;
                        this.errors_supplier_id = response.data.data.supplier_id;
                        this.$toast.error(this.error, {
                            icon: "fa fa-times-circle",
                        });
                    }
                })
                .catch((err) => console.log(err));
        },

        //liste des moyens de paiement
        payment() {
            this.$axios
                .get("/invoice/payments", {
                    params: {
                        compagnie_id: localStorage.getItem("auth.company_id"),
                    },
                })
                .then((response) => {
                    this.methodes = response.data.data;
                });
        },
    },
};
</script>
  
<style scoped>
form {
    padding: 50px;
}

.title {
    font-weight: 500;
}

h4 {
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
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    width: 600px;
    border-radius: 5px;
}

.close {
    cursor: pointer;
}

.close i {
    font-size: 22px;
    color: rgb(166, 166, 166);
}

.close i:hover {
    color: rgb(0, 0, 0);
}
</style>