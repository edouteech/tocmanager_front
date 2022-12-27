<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modaler" @click.stop>
            <h4>Informations sur l'écriture</h4><br>

            <div class="">
                <div class="row">
                    <div class="col-6">
                        <!-- <p class="text-center">Débit</p>
                        <table class="table table-hover">
                            <thead>
                                <tr class="table-success">
                                    <th>Compte</th>
                                    <th>Montant</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ligne_ecriture, i) in ligne_ecritures" :key="i">
                                    <td>{{ ligne_ecriture.compte.name }}</td>
                                    <td>{{ ligne_ecriture.side }}</td>
                                </tr>
                            </tbody>
                        </table> -->
                    </div>
                    <div >
                        <!-- <p class="text-center">Crédit</p> -->
                        <table class="table table-hover">
                            <thead>
                                <tr class="table-success">
                                    <th>Compte</th>
                                    <th>Montant</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ligne_ecriture, i) in ligne_ecritures" :key="i">
                                    <td>{{ ligne_ecriture.compte.name }}</td>
                                    <td>{{ ligne_ecriture.amount }}</td>
                                    <td>{{ ligne_ecriture.side }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="close" @click="$emit('close-modal')">
            <img class="close-img" src="/images/fermer.png" alt="" />
        </div>
    </div>
</template>
  
<script>
export default {
    auth: true,
    props: ['ligne_ecritures'],
    name: 'voirFournisseur',
    mounted() {
        console.log(this.ligne_ecritures)
    }
}

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
    background-color: #ebebfcda;
}

.modaler {
    background-color: white;
    height: 600px;
    width: 1200px;
    margin-top: 5%;
    padding: 5%;
    border-radius: 20px;
}

.close {
    margin: 5% 0 0 16px;
    cursor: pointer;
}

.close-img {
    width: 25px;
}

.titre {
    border: 1px solid black;
    background-color: black;
    color: #ffff;
    padding: 10px;
    text-align: center;
}

tbody tr:nth-child(even) {
    background-color: rgb(228, 239, 245);
}

tbody tr:last-of-type {
    border-bottom: 2px solid rgb(92, 237, 8);
}



.input-form .mode {
    font-size: 20px;
    font-weight: bold;
}

.input-form .resp {
    font-size: 22px;
    margin-left: 3%;
    color: rgb(11, 7, 40);
}
</style>