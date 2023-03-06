<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
            <Sidebar />
            <h3 class="name">Ecritures </h3>
            <User_info />
        </nav>

        <div class="app-main__outer p-5">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                {{ error }}
            </div>
            <h4>Enregistrer une écriture</h4>
            <form action="" method="POST">
                <div class="cadre-haut">
                    <div class="ajout-client">
                        <div class="form-group">
                            <label class="title">Entrer le nom de l'écriture"</label>
                            <input type="text" class="form-control" v-model="form.name_ecriture" autocomplete="off"
                                required placeholder="Nom de l'écriture">
                        </div>
                    </div>
                    <div class="facture-date position-absolute end-0">
                        <span class="creation"> Date :</span> <input class="form-control" type="datetime-local"
                            v-model="form.date" />
                    </div>
                </div>
                <hr>

                <div class="add_buttons d-flex flex-row-reverse">
                    <!-- <div class="col-md-5"><button class="btn-ajout" @click.prevent="showProduit = true"><i
                                class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</button></div> -->
                    <button class="ajout-article col-md-6" @click.prevent="addLine()"><i class="fa fa-plus-circle"
                            aria-hidden="true"></i> Ajouter une ligne écriture</button>
                </div>

                <div class="commande table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Compte</th>
                                <th>Montant</th>
                                <th>Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(line, index) in form.ligne_ecritures" :key="index">
                                <td style="width: 35%;">
                                    <select class="form-control " v-model="line.compte_id">
                                        <option disabled value="">Choisissez...</option>
                                        <option v-for="(compte, i) in comptes" :key="i" :value="compte.id" :data-i="i"
                                            :data-index="index">{{ compte.name }}</option>
                                    </select>
                                </td>
                                <td><input class="form-control" type="number" v-model="line.amount" autocomplete="off"
                                        required></td>
                                <td>
                                    <select class="form-control " v-model="line.side">
                                        <option value="0">Débit</option>
                                        <option value="1">Crédit</option>
                                    </select>
                                </td>
                                <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger "
                                        aria-hidden="true"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div><br>

                <div class="d-flex">
                    <!-- <div class="form-group1 col-md-4"> Montant: <input class="form-control received" type="tex"
                            v-model="form.amount" autocomplete="off" required></div> -->
                    <div class="form-group col-md-6 mx-5">
                        <div class="form-group ">
                            Commentaire
                            <textarea name="" id="" cols="30" autocomplete="off" rows="10" class="form-control" v-model="form.comment" required></textarea>
                        </div>
                    </div>
                </div>
                <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="amount_error">
                    {{ amount_error }}
                </div> -->
                <br><br><br><br><br>
                <button class="custom-btn btn-5" v-on:click.prevent="submit()">Enregistrer l'écriture<span
                        v-if="this.form.amount != ''"> pour <span class="text-dark mx-3">{{ this.form.amount }} F
                            CFA</span></span></button>
                <!-- <div class="submit">
                    <input type="submit" id='submit'  value="Enregistrer la facture " name="submit">{{this.form.amount}}		          
                </div>   -->

            </form>
        </div>
    </div>
</template>
    
<script>
import Sidebar from '../sidebar.vue'
import User_info from '../user_info.vue'
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
                name_ecriture: '',
                date: '',
                amount: 0,
                comment: '',
                ligne_ecritures: []
            },
            errors: [],
            error: null,
            comptes: ''
        }
    },
    mounted() {
        this.recupComptes()
        // console.log( this.$route.query.exercice ) 
    },
    methods: {
        async submit() {
            await this.$axios.post('/ecritures', {
                name_ecriture: this.form.name_ecriture,
                date: this.form.date,
                amount: this.form.amount,
                comment: this.form.comment,
                exercice_id: this.$route.query.exercice,
                compagnie_id: localStorage.getItem('auth.company_id'),
                ligne_ecritures: this.form.ligne_ecritures
            }).then(response => {
                this.error = response.data.message
                // console.log(this.error)

                if (response.data.status == "success") {
                    this.$router.push({ path: '/exercices/voir/1' });
                    this.$toast('Nouvelle écriture ajoutée !!!', {
                        icon: 'fa fa-check-circle',
                    })
                }
                else {
                    this.errors = response.data.data
                    // this.$router.push({path:'/clients/add_client'});
                }
            })
                .catch(error => console.log(error))
            //  console.log(this.form.name)                
        },
        addLine() {
            this.form.ligne_ecritures.push({ compte_id: "", side: "", amount: 0, compagnie_id: localStorage.getItem('auth.company_id') });
        },
        deleteLine(index){
        //   console.log(index);
          this.form.ligne_ecritures.splice(index, 1)
        },
        recupComptes() {
            this.$axios.get('/comptes',{
                params: {
                    compagnie_id: localStorage.getItem('auth.company_id'),
                    is_paginated: 0
                }
            })
            .then(response => {
                console.log(response)
                this.comptes = response.data.data
            })
        },

    },

}
</script>
    
<style scoped>
.select2-cli {
    border: 1px solid;
    width: 14%;
    position: absolute;
    z-index: 99;
    background-color: #fefefe;
}

.select2-cli a {
    color: #605050;
    text-decoration: none;
}

.select2-cli ul {
    list-style: none;
    overflow: auto;
    padding: 0;
    height: 200px;
    text-align: left;
}

.select2-cli li {
    padding: 2px 10px;
}

.select2-cli li:hover {
    background-color: rgb(103, 180, 247);
}

.select2-prod {
    border: 1px solid;
    width: 10%;
    position: absolute;
    z-index: 99;
    background-color: #fefefe;
}

.select2-prod a {
    color: #605050;
    text-decoration: none;
}

.select2-prod ul {
    list-style: none;
    overflow: auto;
    padding: 0;
    height: 200px;
    text-align: left;
}

.select2-prod li {
    padding: 2px 10px;
}

.select2-prod li:hover {
    background-color: rgb(103, 180, 247);
}

/* .list_produit{
    overflow: scroll;
} */
.received {
    border: none;
    outline: none;
    border-bottom: 2px solid #605050;
}

.app-main__outer {
    overflow: auto;
    margin: 0 5%;
}

.commande {
    margin: 5%;
}

.cadre-haut {
    display: flex;
}

.ajout-client {
    margin: 30px 10px;
    /* border: 1px solid darkblue; */
    padding: 30px 20px;
    /* margin-right: 50%; */
}

.btn-ajout {
    margin-top: 9%;
    border: 1px solid #53af57;
    padding: 10px;
    /* width: 100px; */
    font-size: 10px;
    border-radius: 15px;
    text-align: center;
    background-color: #53af57;
    color: #fff;
    cursor: pointer;
}

.btn-ajout i {
    font-size: 14px;
}


.facture-date {
    margin-top: 5%;
    font-size: 18px;
    margin-right: 10%;
}

.btn-ajout:hover {
    background-color: #fefefe;
    color: rgb(0, 0, 0);
}

.facture-date .creation {
    text-decoration: underline;
    font-weight: bold;
    padding-right: 1%;
}

.facture-date input {
    border: none;
    outline: none;
}

.ajout-article .bx {
    font-size: 18px;
    margin-right: 10px;
}

.ajout-article {
    margin: 4%;
    text-align: center;
    background-color: rgb(8, 231, 97);
    border-radius: 10px;
    padding: 12px;
    cursor: pointer;
}

.modal .input-form {
    display: flex;
    flex-direction: column-reverse;
    margin: 1.2em 0;
    height: 50px;
}

.modal input {
    padding: 8px;
    border: none;
    outline: none;
    border-bottom: 2px solid #605050;
}

.modal input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}

.modal .submit-form {
    margin-top: 10%;
    text-align: right;
}

.modal input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #53af57;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
}

.modal input[type=submit]:hover {
    background-color: #53af57;
    color: white;
    border: 1px solid #53af57;
    font-size: 16px;
}

.submit {
    margin-top: 10%;
    text-align: right;
    margin-right: 10px;
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #3c05f1;
    cursor: pointer;
    width: 60%;
    font-size: 15px;
}

input[type=submit]:hover {
    background-color: #b8a5f6;
    color: white;
    border: 1px solid #b8a5f6;
    font-size: 16px;
}


.table {
    margin-top: 5%;
    text-align: center;
}

thead tr {
    background-color: transparent;
}

tbody tr:last-of-type {
    border-bottom: 2px solid rgb(140, 140, 250);
}

button {
    margin: 25px;

}

.custom-btn {
    /* width: 130px;
  height: 40px; */
    color: #fff;
    border-radius: 5px;
    padding: 20px 35px;
    font-weight: bold;
    font-size: 20px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
    outline: none;
}

/* 5 */
.btn-5 {
    /* width: 130px;
  height: 40px; */
    line-height: 42px;
    padding: 20px;
    border: none;
    background: rgb(121, 161, 255);
    background: linear-gradient(0deg, rgb(121, 161, 255) 0%, rgb(121, 161, 255) 100%);
}

.btn-5:hover {
    color: #0909f0;
    background: transparent;
    box-shadow: none;
}

.btn-5:before,
.btn-5:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: rgb(121, 161, 255);
    box-shadow:
        -1px -1px 5px 0px #fff,
        7px 7px 20px 0px #0003,
        4px 4px 5px 0px #0002;
    transition: 400ms ease all;
}

.btn-5:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
}

.btn-5:hover:before,
.btn-5:hover:after {
    width: 100%;
    transition: 800ms ease all;
}

@media screen and (max-width: 900px) {
    .add_buttons {
        margin: 50% 0;
    }

    .cadre-haut {
        display: inline;
        margin: 0;
    }

    .ajout-client {
        margin-right: 0;
        margin: 10px 5px;
        border: 1px solid darkblue;
        padding: 5px;
    }

    .facture-date {
        position: fixed;
    }

    .table {
        overflow: auto;
    }

    .commande {
        margin: 15% 0;
    }

    .ajout-article {
        margin: 0;
    }
}
</style>