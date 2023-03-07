<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
            <Sidebar />
            <h3 class="name">Comptes </h3>
            <User_info />
        </nav>

        <div class="app-main__outer p-5">
            <h4>Modifier les informations de ce compte</h4>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                {{ error }}
            </div>
            <form action="">
                <div class="form-group col-md-6">
                    <label class="title">Entrer le code du compte</label>
                    <input type="text" class="form-control" v-model="form.code" autocomplete="off" required
                        placeholder="Code du compte">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert"
                    v-if="errors && errors.code">
                    {{ errors.code }}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Libellé du coompte</label>
                    <input type="text" class="form-control" v-model="form.name" autocomplete="off"
                        required placeholder="Libellé du compte">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert"
                    v-if="errors && errors.name">
                    {{ errors.name }}
                </div>

                <div class="form-group col-md-6">
                    <label class="title">Groupe</label>
                    <input type="text" class="form-control" v-model="form.group" autocomplete="off" required
                        placeholder="Groupe">
                </div>
                <div class="alert alert-danger justify-content-center col-md-6" role="alert"
                    v-if="errors && errors.group">
                    {{ errors.group }}
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
                code: '',
                name: '',
                group: '',
            },
            error: null,
            errors: [],
        }
    },
    mounted() {
        this.$axios.get('/comptes/' + this.$route.params.id, {
            params: {
                compagnie_id: localStorage.getItem('auth.company_id')
            }
        })
            .then(response => {
                // console.log(response.data)
                let compte = response.data.data;
                this.form.code = compte.code,
                this.form.name = compte.name,
                this.form.group = compte.group
                console.log(compte)

            })
    },

    methods: {
        submit() {
            this.$axios.put('/comptes/' + this.$route.params.id, {
                code: this.form.code,
                name: this.form.name,
                group: this.form.group,
                compagnie_id: localStorage.getItem('auth.company_id')

            })
                .then(response => {
                    // console.log(response.data);
                    if (response.data.status == 'success') {
                        this.$router.push({ path: '/comptes/list_compte', })
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
    