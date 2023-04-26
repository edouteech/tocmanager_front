<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
            <Sidebar />
            <h3 class="name">Exercices </h3>
            <User_info />
        </nav>

        <div class="app-main__outer p-5">
            <h4>Modifier les informations de cet exercice</h4>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                {{ error }}
            </div>
            <form action="">
                <div class="form-group col-md-6">
                    <label class="title">Entrer le nom de l'exercice</label>
                    <input type="text" class="form-control" v-model="form.name_exercice" autocomplete="off" required
                        placeholder="Nom de l'exercice">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert"
                    v-if="errors && errors.name_exercice">
                    {{ errors.name_exercice }}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Date de début</label>
                    <input type="date" class="form-control" v-model="form.start_at" autocomplete="off"
                        required placeholder="2022-10-05">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert"
                    v-if="errors && errors.start_at">
                    {{ errors.start_at }}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Date de fin</label>
                    <input type="date" class="form-control" v-model="form.end_at" autocomplete="off" required
                        placeholder="2022-10-05">
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Choisissez un statut</label>
                    <select class="form-control" v-model="form.status">
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                        <option value="cloturé">Cloturé</option>
                    </select>
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert"
                    v-if="errors && errors.end_at">
                    {{ errors.end_at }}
                </div>

                <button type="submit"  class="btn btn-success" v-on:click.prevent="submit()">Modifier</button>
            </form>

        </div>

    </div>
</template>
    
<script>
import Sidebar from '../sidebar.vue'
import User_info from "../user_info.vue";
export default {
    layout: "empty",
    auth: true,
    components: {
        Sidebar,
        User_info
    },
    data() {
        return {
            form: {
                name_exercice: '',
                start_at: '',
                end_at: '',
                status: '' 
            },
            error: null,
            errors: [],
        }
    },
    mounted() {
        this.$axios.get('/exercices/' + this.$route.params.id, {
            params: {
                compagnie_id: localStorage.getItem('auth.company_id')
            }
        })
            .then(response => {
                // console.log(response.data)
                let exercice = response.data.data;
                this.form.name_exercice = exercice.name_exercice,
                this.form.start_at = exercice.start_at,
                this.form.end_at = exercice.end_at
                this.form.status = exercice.status

            })
    },

    methods: {
        submit() {
            this.$axios.put('/exercices/' + this.$route.params.id, {
                name_exercice: this.form.name_exercice,
                start_at: this.form.start_at,
                end_at: this.form.end_at,
                status: this.form.status,
                compagnie_id: localStorage.getItem('auth.company_id')

            })
                .then(response => {
                    // console.log(response.data);
                    if (response.data.status == 'success') {
                        this.$router.push({ path: '/exercices/list_exercice', })
                        this.$toast('Modification éffectuée avec succès !!!', {
                            icon: 'fa fa-check-circle',
                        })
                    }
                    else {
                        this.error = response.data.message
                        this.errors = response.data.data
                    }
                })
        },
    }

}
</script>
    
<style scoped>
form {
    margin-left: 10%;
    margin-top: 5%;
}

.form-group {
    margin-top: 2%;
}

.title {
    margin: 1% 0;
}

.btn {
    margin-top: 5%;
}

.app-main__outer {
    overflow: auto;
}

input {
    border: none;
    outline: none;
    border-bottom: 2px solid #605050;
}
</style>
    