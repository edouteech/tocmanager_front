<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Paies </h3>
          <Userinfo />
        </nav>
    
    
        <div class="app-main__outer py-5 px-2">
            <h4>Enregistrer un bulletin de paie</h4><hr>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                {{error}}
            </div>

            <form action="">
                <div class="p-3">
                    <div class="col-md-7 mx-auto">
                        <div class="title-row">Generalites</div>
                        <div class="form-group ">
                            <label class="title">Entrer la date de début de paie</label>
                            <input type="date" class="form-control" v-model="form.date_start" autocomplete="off" required placeholder="Pays">
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if=" errors && errors.date_start">
                            {{errors.date_start}}
                        </div>

                        <div class="form-group ">
                            <label class="title">Entrer la date de fin de paie</label>
                            <input type="date" class="form-control" v-model="form.date_end" autocomplete="off" required placeholder="Pays">
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.date_end">
                            {{errors.date_end}}
                        </div>

                        <div class="form-group ">
                            <label class="title">Employé concerné</label>
                            <v-select 
                                placeholder="Choississez l'employé"
                                v-model="form.employee_id"
                                label="last_name"
                                :options="employes"
                                :reduce="(employe) => employe.id"
                                @input="choix(form.employee_id)"
                            />
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.employee_id">
                            {{errors.employee_id}}
                        </div>
                    </div> 
                    <br><br>
                    <div class="col">
                    <div class="title-row ">Informations generales de paie</div>
                        <div class="table-responsive">
                            <!-- <button class="btn btn-outline-success" @click.prevent="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i></button> -->
                            <table class="table table-bordered paie">
                                <thead>
                                    <tr>
                                        <!-- <th rowspan="2" class="col_percen">N°</th> -->
                                        <th rowspan="2" class="col_percents">Désignation</th>
                                        <th rowspan="2" class="col_percent">Nombre</th>
                                        <th rowspan="2" class="col_percente">Base</th>  
                                        <th colspan="3">Part salariale</th>
                                        <th colspan="2">Part patronale</th>                    
                                    </tr>
                                    <tr>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percen">Gain</th>
                                        <th class="col_percent">Retenue</th>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Retenue</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="(ligne, index) in form.lignes" :key="index">
                                        <!-- <td></td> -->
                                        <td>
                                            <input class="form-control" type="text"  autocomplete="off"  v-model="ligne.designation">
                                        </td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="ligne.nombre" @change="LigneChange(index)"></td> 
                                        <td v-if="ligne.designation == 'SALAIRE DE BASE MENSUEL'"><input class="form-control" type="number" autocomplete="off" disabled v-model="ligne.base"></td>
                                        <td v-else><input class="form-control" type="number" autocomplete="off" v-model="ligne.base" disabled></td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="ligne.part_salariale.taux" disabled></td>
                                        <td><div><input class="form-control" type="number"  autocomplete="off" disabled v-model="ligne.part_salariale.gain"></div></td>         
                                        <td></td>       
                                        <td></td>     
                                        <td></td>
                                        <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger cursor-pointer sup" aria-hidden="true"></i></td>
                                    </tr>

                                </tbody>
                            </table>   
                        </div><br>
                    </div> 
                    
                    <div class="col">
                    <div class="title-row ">Bonus</div>
                        <div class="table-responsive">
                            <button class="btn btn-outline-success" @click.prevent="addBonus()"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                            <table class="table table-bordered paie">
                                <thead>
                                    <tr>
                                        <!-- <th rowspan="2" class="col_percen">N°</th> -->
                                        <th rowspan="2" class="col_percents">Désignation</th>
                                        <th rowspan="2" class="col_percent">Nombre</th>
                                        <th rowspan="2" class="col_percente">Base</th>  
                                        <th colspan="3">Part salariale</th>
                                        <th colspan="2">Part patronale</th>                    
                                    </tr>
                                    <tr>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percen">Gain</th>
                                        <th class="col_percent">Retenue</th>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Retenue</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="(bonus, i) in form.Bonus" :key="i">
                                        <!-- <td></td> -->
                                        <td>
                                            <input class="form-control" type="text"  autocomplete="off" placeholder="INDEMNITE" v-model="bonus.designation">
                                        </td>
                                        <td><input class="form-control" type="number"  autocomplete="off" v-model="bonus.nombre" @change="BonusChange(i)"></td> 
                                        <!-- <td v-if="bonus.designation == 'SALAIRE DE BASE MENSUEL'"><input class="form-control" type="number" autocomplete="off" disabled v-model="bonus.base"></td> -->
                                        <td><input class="form-control" type="number" autocomplete="off" placeholder="875" v-model="bonus.base" @change="BonusChange(i)"></td>
                                        <td><input class="form-control" type="number"  autocomplete="off" placeholder="100" v-model="bonus.part_salariale.taux" @change="BonusChange(i)"></td>
                                        <td><div><input class="form-control" type="number"  autocomplete="off" disabled v-model="bonus.part_salariale.gain"></div></td>         
                                        <td>
                                            <!-- <input class="form-control" type="number"  autocomplete="off" disabled v-model="bonus.part_salariale.retenue"> -->
                                        </td>       
                                        <td>
                                            <!-- <input class="form-control" type="number"  autocomplete="off" disabled v-model="bonus.part_patronale.taux"> -->
                                        </td>     
                                        <td>
                                            <!-- <input class="form-control" type="number"  autocomplete="off" disabled v-model="bonus.part_patronale.retenue"> -->
                                        </td>
                                        <td @click="deleteBonus(i)"><i class="fa fa-trash-o text-danger cursor-pointer sup" aria-hidden="true"></i></td>
                                    </tr>

                                </tbody>
                            </table>   
                        </div><br>
                    </div> 
                    <br>

                    
                    <div class="col">
                    <div class="title-row ">Retenues salariales</div>
                        <div class="table-responsive">
                            <button class="btn btn-outline-success" @click.prevent="addRetain()"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                            <table class="table table-bordered paie">
                                <thead>
                                    <tr>
                                        <th rowspan="2" class="col_percents">Désignation</th>
                                        <th rowspan="2" class="col_percent">Nombre</th>
                                        <th rowspan="2" class="col_percente">Base</th>  
                                        <th colspan="3">Part salariale</th>
                                        <th colspan="2">Part patronale</th>                    
                                    </tr>
                                    <tr>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Gain</th>
                                        <th class="col_percen">Retenue</th>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Retenue</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="(retain, j) in form.retains" :key="j">
                                        <td>
                                            <input class="form-control" type="text"  autocomplete="off" placeholder="RETENUE" v-model="retain.designation">
                                        </td>
                                        <td></td>
                                        <td><input class="form-control" type="number" autocomplete="off" placeholder="875" v-model="retain.base" disabled></td>                 
                                        <td><input class="form-control" type="number"  autocomplete="off" placeholder="100" v-model="retain.part_salariale.taux" @change="RetainChange(j)"></td>
                                        <td></td>       
                                        <td><input class="form-control" type="number"  autocomplete="off" disabled v-model="retain.part_salariale.retenue"></td>     
                                        <td></td>
                                        <td></td>
                                        <td @click="deleteRetain(j)"><i class="fa fa-trash-o text-danger cursor-pointer sup" aria-hidden="true"></i></td>
                                    </tr>

                                </tbody>
                            </table>   
                        </div><br>
                    </div> 
                    <br>

                    <div class="col">
                    <div class="title-row ">Retenues patronales</div>
                        <div class="table-responsive">
                            <button class="btn btn-outline-success" @click.prevent="addCotisation()"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                            <table class="table table-bordered paie">
                                <thead>
                                    <tr>
                                        <th rowspan="2" class="col_percents">Désignation</th>
                                        <th rowspan="2" class="col_percent">Nombre</th>
                                        <th rowspan="2" class="col_percente">Base</th>  
                                        <th colspan="3">Part salariale</th>
                                        <th colspan="2">Part patronale</th>                    
                                    </tr>
                                    <tr>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Gain</th>
                                        <th class="col_percen">Retenue</th>
                                        <th class="col_percent">Taux</th>
                                        <th class="col_percent">Retenue</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="(cotisation, k) in form.cotisations" :key="k">
                                        <td>
                                            <input class="form-control" type="text"  autocomplete="off" placeholder="COTISATION" v-model="cotisation.designation">
                                        </td>
                                        <td></td>
                                        <td><input class="form-control" type="number" autocomplete="off" placeholder="875" v-model="cotisation.base" disabled></td>
                                        <td></td>
                                        <td></td>       
                                        <td></td>     
                                        <td><input class="form-control" type="number"  autocomplete="off" placeholder="100" v-model="cotisation.part_patronale.taux" @change="CotisationChange(k)"></td>
                                        <td><input class="form-control" type="number"  autocomplete="off" disabled v-model="cotisation.part_patronale.retenue"></td>
                                        <td @click="deleteCotisation(k)"><i class="fa fa-trash-o text-danger cursor-pointer sup" aria-hidden="true"></i></td>
                                    </tr>

                                </tbody>
                            </table>   
                        </div><br>
                    </div> 
                    <br>

                    <div class="titles-row">Recapitulatif</div>
                    <div class="d-flex align-items-end">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2">Cumuls</th>
                                        <th rowspan="2">Salaire brut</th>
                                        <th rowspan="2">Charges salariales</th>
                                        <th rowspan="2">Charges patronales</th>  
                                        <th rowspan="2">Avantages en nature</th>
                                        <th rowspan="2">Net imposable</th>   
                                        <th rowspan="2">Heures travaillées</th> 
                                        <th rowspan="2">Heures supplémentaires</th>   
                                        <th></th>
                                        <th class="mx-2">NET A PAYER</th>               
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr>
                                        <td><strong>Période</strong></td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="form.brut_salary" disabled></td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="form.employee_cotisation" disabled></td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="form.company_cotisation" disabled></td>
                                        <td></td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="form.net_salary" disabled></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="mx-2"><input class="form-control" type="number"  autocomplete="off"  v-model="form.net_salary" disabled></td>
                                    </tr>
                                    <!-- <tr>
                                        <td><strong>Année</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr> -->
                                </tbody>
                            </table>   
                        </div>
                    </div>

                    <div class="d-flex align-items-end">
                        <div class="col-md-6 table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2">Compteurs</th>
                                        <th rowspan="2">Pris</th>
                                        <th rowspan="2">Restant</th>
                                        <th rowspan="2">Acquis</th>               
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr>
                                        <td><strong>Congés <br> 
                                            Repos compensateur</strong> 
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>

                        <!-- <div class="col-md-3">
                            <strong>Dates de congés</strong>
                            <div></div>
                        </div>

                        <div class="col-md-4">
                            <div class="row">
                                    <div class="col-md-8">ABSENCES INJUST</div>
                                    <div class="col-md-4"></div>
                            </div>
                            <div class="row">
                                    <div class="col-md-8">ABSENCES PAYEES</div>
                                    <div class="col-md-4"></div>
                            </div>
                            <div class="row">
                                    <div class="col-md-8">ABSENCES TOTALES</div>
                                    <div class="col-md-4"></div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="col-md-6 mx-auto mt-4">
                    <button type="submit" class="btn btn-outline-primary col-md-12 p-3 " v-on:click.prevent="submit()" :disabled="load">Valider la fiche de paie</button>
                </div>
            </form>

        </div>
    
    </div>
    </template>
    
    <script>
    import vSelect from 'vue-select'
    import 'vue-select/dist/vue-select.css';
    import Sidebar from '../sidebar.vue'
    import Userinfo from '../user_info.vue'
    export default {
        layout: "empty",
        auth:true,
        components: {
            Sidebar,
            Userinfo,
            vSelect
            
        },
        data () {
            return{
                form: {
                    date_start: '',
                    date_end: '',
                    employee_id: '',
                    brut_salary: '',
                    lignes: [],
                    irppts: '',
                    net_salary: '',
                    brut_salary: '',
                    hour_salary: '',
                    total_hours: '',
                    sup_hours: '',
                    hours: '',
                    retains: [],
                    cotisations: [],
                    Bonus: [],
                    employee_cotisation: '',
                    company_cotisation: '',
                    comment: '',
                    
                },
                load: false,
                employes: "",
                employe_concerne: "",
                types: '',
                errors: null,
                error: null,
                heures_sup: ''
            }
        },
    
        mounted(){
            this.$axios.get('/employees',{params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                is_paginated: 0
                }
            })
            .then(response => {
            // console.log(response.data.data);
            this.employes = response.data.data 
            })
        },
    
        methods: {

            async choix(id_employe){
                this.$axios.get('/employees/'+ id_employe,{
                    params: {
                        compagnie_id: localStorage.getItem('auth.company_id')
                    }
                })
                .then(response => {
                    // console.log(response.data.data);
                    this.employe_concerne = response.data.data 
                    let salaire = this.employe_concerne.base_salary
                    let unit_hour = Math.floor(salaire / 173)
                    
                    if(this.form.lignes.length > 0){
                        this.form.lignes[0].base = salaire
                    }
                    else{
                        this.form.lignes.unshift(
                        {
                            designation: "SALAIRE DE BASE MENSUEL", 
                            nombre: 1, 
                            base: salaire, 
                            part_salariale: {
                                taux: 100,
                                gain: "",
                            }, 
                        });

                        this.addIrppts()

                        this.form.lignes.push(
                            {
                                designation: "HEURES SUP 112%", 
                                nombre: 0, 
                                base: unit_hour, 
                                part_salariale: {
                                    taux: 112,
                                    gain: "",
                                }, 
                            },
                            {
                                designation: "HEURES SUP 135%", 
                                nombre: 0, 
                                base: unit_hour, 
                                part_salariale: {
                                    taux: 135,
                                    gain: "",
                                }, 
                            },
                            {
                                designation: "HEURES SUP 150%", 
                                nombre: 0, 
                                base: unit_hour, 
                                part_salariale: {
                                    taux: 150,
                                    gain: "",
                                }, 
                            },
                            {
                                designation: "HEURES SUP 200%", 
                                nombre: 0, 
                                base: unit_hour, 
                                part_salariale: {
                                    taux: 200,
                                    gain: "",
                                }, 
                            }
                        );  
                    }
                    let sum_lignes= 0;
                    for (let j = 0; j < this.form.lignes.length; j++) {
                        this.form.lignes[j].part_salariale.gain = (this.form.lignes[j].nombre * this.form.lignes[j].base * this.form.lignes[j].part_salariale.taux)/100;
                        sum_lignes += this.form.lignes[j].part_salariale.gain;
                    }
                    
                    let sum_retains= 0;
                    for (let j = 0; j < this.form.retains.length; j++) {
                        sum_retains += this.form.retains[j].part_salariale.retenue;
                    }

                    let sum_Bonus= 0;
                    for (let j = 0; j < this.form.Bonus.length; j++) {
                        sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                    }

                    let sum_cotisations= 0;
                    for (let j = 0; j < this.form.cotisations.length; j++) {
                        sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                    }
                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains
                })
            },

            addIrppts(){
                this.form.irppts = this.employe_concerne.irppts
                this.form.retains.unshift(
                {
                    designation: "IRPP/TS", 
                    part_salariale: {
                        retenue: this.employe_concerne.irppts
                    }, 
                });
            },


            LigneChange(index){
                let ligne = this.form.lignes[index]
                ligne.part_salariale.gain = Math.floor((Number(ligne.nombre) * ligne.base * ligne.part_salariale.taux)/100);
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }

                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }

                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains
            },

            
            BonusChange(index){
                // this.form.cotisations = []
                // this.form.retains = []
                // this.addIrppts()
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let bonus = this.form.Bonus[index]
                bonus.part_salariale.gain = Math.floor((Number(bonus.nombre) * bonus.base * bonus.part_salariale.taux)/100);
                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }

                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }

                
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains
            },

            
            RetainChange(index){
                // this.form.cotisations = []
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }

                let retain = this.form.retains[index]
                retain.part_salariale.retenue = Math.floor((retain.base * retain.part_salariale.taux)/100);
                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
                    
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains
            },

            
            
            
            CotisationChange(index){
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }

                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }

                let cotisation = this.form.cotisations[index]
                cotisation.part_patronale.retenue = Math.floor((cotisation.base * cotisation.part_patronale.taux)/100);
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                    this.form.brut_salary = (sum_lignes + sum_Bonus)
                    this.form.employee_cotisation = sum_retains
                    this.form.company_cotisation = sum_cotisations
                    this.form.net_salary = this.form.brut_salary - sum_retains
            },
            

            deleteLine(index){
                this.form.lignes.splice(index, 1)
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
                
                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }   

                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                    
                    this.form.brut_salary = (sum_lignes + sum_Bonus)
                    this.form.employee_cotisation = sum_retains
                    this.form.company_cotisation = sum_cotisations
                    this.form.net_salary = this.form.brut_salary - sum_retains
            },

            
            deleteBonus(index){
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }
                
                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
                
                this.form.Bonus.splice(index, 1)
                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }   
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                
                    this.form.brut_salary = (sum_lignes + sum_Bonus)
                    this.form.employee_cotisation = sum_retains
                    this.form.company_cotisation = sum_cotisations
                    this.form.net_salary = this.form.brut_salary - sum_retains
            },

            
            deleteRetain(index){
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }
                
                this.form.retains.splice(index, 1)
                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
                
                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }   
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                
                    this.form.brut_salary = (sum_lignes + sum_Bonus)
                    this.form.employee_cotisation = sum_retains
                    this.form.company_cotisation = sum_cotisations
                    this.form.net_salary = this.form.brut_salary - sum_retains
            },

            
            deleteCotisation(index){
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }
                
                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
                
                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                } 
                
                this.form.cotisations.splice(index, 1)
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                
                    this.form.brut_salary = (sum_lignes + sum_Bonus)
                    this.form.employee_cotisation = sum_retains
                    this.form.company_cotisation = sum_cotisations
                    this.form.net_salary = this.form.brut_salary - sum_retains
            },



    
            addBonus(){
                // this.form.retains = []
                // this.form.cotisations = []
                this.form.Bonus.push(
                    {
                        designation: "", 
                        nombre: 0, 
                        base: "", 
                        part_salariale: {
                            taux: "",
                            gain: "",
                        }, 
                    });        
                    let sum_lignes= 0;
                    for (let j = 0; j < this.form.lignes.length; j++) {
                        sum_lignes += this.form.lignes[j].part_salariale.gain;
                    }

                    let sum_Bonus= 0;
                    for (let j = 0; j < this.form.Bonus.length; j++) {
                        sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                    }

                    let sum_retains= 0;
                    for (let j = 0; j < this.form.retains.length; j++) {
                        sum_retains += this.form.retains[j].part_salariale.retenue;
                    }
                    
                    let sum_cotisations= 0;
                    for (let j = 0; j < this.form.cotisations.length; j++) {
                        sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                    }
                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains 
            },

            
            addRetain(){
                this.form.retains.push(
                    {
                        designation: "", 
                        base: this.form.brut_salary, 
                        part_salariale: {
                            taux: "",
                            retenue: ""
                        }, 
                    }); 
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }

                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
             
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains       
            },


            addCotisation(){
                this.form.cotisations.push(
                    {
                        designation: "", 
                        base: this.form.brut_salary, 
                        part_patronale: {
                            taux: "",
                            retenue: ""
                        }, 
                    });    
                let sum_lignes= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum_lignes += this.form.lignes[j].part_salariale.gain;
                }

                let sum_Bonus= 0;
                for (let j = 0; j < this.form.Bonus.length; j++) {
                    sum_Bonus += this.form.Bonus[j].part_salariale.gain;
                }

                let sum_retains= 0;
                for (let j = 0; j < this.form.retains.length; j++) {
                    sum_retains += this.form.retains[j].part_salariale.retenue;
                }
                    
                let sum_cotisations= 0;
                for (let j = 0; j < this.form.cotisations.length; j++) {
                    sum_cotisations += this.form.cotisations[j].part_patronale.retenue;
                }
                    
                        this.form.brut_salary = (sum_lignes + sum_Bonus)
                        this.form.employee_cotisation = sum_retains
                        this.form.company_cotisation = sum_cotisations
                        this.form.net_salary = this.form.brut_salary - sum_retains         
            },


            async submit(){
                // console.log(this.form.Bonus);
                this.load = true
                this.heures_sup = this.form.lignes.filter(ligne => ligne.designation !== "SALAIRE DE BASE MENSUEL")
              await  this.$axios.post('/payslips',{
                date_start: this.form.date_start,
                date_end: this.form.date_end,
                employee_id: this.form.employee_id,
                base_salary: this.employe_concerne.base_salary,
                ipts: this.form.irppts,
                net_salary: this.form.net_salary,
                brut_salary: this.form.brut_salary,
                //   hour_salary: this.form.hour_salary,
                total_hours: this.form.total_hours,  
                sup_hours: this.heures_sup,
                hours: this.form.hours,
                //   bonus: this.form.bonus,
                bonus: this.form.Bonus,
                retained: this.form.retains,
                patronal_retained: this.form.cotisations,
                employee_cotisation: this.form.employee_cotisation,
                company_cotisation: this.form.company_cotisation,
                comment: this.form.comment,
                compagnie_id: localStorage.getItem('auth.company_id') 
            }).then(response =>{ 
                console.log( response.data ) 
                this.error = response.data.message
                    if(response.data.status == "success"){
                    this.$router.push({path:'/paies/list_paie'});
                        this.$toast("Fiche de paie enregistrée !!! ", {
                            icon: 'fa fa-check-circle',
                        })
                    }
                    else{
                        this.load = false
                        this.errors = response.data.data
                    }
                
            }).catch( err => console.log( err ) )
            }
            
        },
      
    }
    </script>
    
    <style scoped>
    .col_percent{
        width: 10%;
    }

    .col_percente{
        width: 13%;
    }

    .col_percen{
        width: 13%;
    }

    .col_percents{
        width: 24%;
    }

    .title-row{
        margin: 15px 0;
        border: 2px dotted rgb(236, 236, 236);
        text-align: center;
        padding: 10px;
        font-weight: 700;
        text-transform: uppercase;
        background-color: rgb(236, 236, 236);
    }

    
    .titles-row{
        margin: 15px 0;
        border: 2px dotted rgb(205, 255, 205);
        text-align: center;
        padding: 10px;
        font-weight: 700;
        text-transform: uppercase;
        background-color: rgb(205, 255, 205);
    }

    /* form{
        margin-left: 10%;
        margin-top: 5%;
    } */
    
    .form-group{
        margin-top: 2%;
    }
    
    .title{
        margin: 1% 0;
    }
    
    
    .app-main__outer{
      overflow: auto;
    }
    
    .fa{
      margin: 0 5px;
      font-size: 22px;
      cursor: pointer;
    }
    .table{
        margin-top: 2%;
        text-align: center;
        justify-content: center;
        font-size: 13px;
    
    }    
    
    .sup{
        font-size: 12px;
    }

    .paie input{
        font-size: 14px;
        text-transform: uppercase;
    }

    input::placeholder {
        font-size: 15px;
        opacity: 0.5;
    }
    
    </style>