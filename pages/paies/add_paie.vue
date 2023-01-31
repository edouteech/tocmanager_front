<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Paies </h3>
          <Userinfo />
        </nav>
    
    
        <div class="app-main__outer p-5">
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
                            <input type="datetime-local" class="form-control" v-model="form.date_start" autocomplete="off" required placeholder="Pays">
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if=" errors && errors.date_start">
                            {{errors.date_start}}
                        </div>

                        <div class="form-group ">
                            <label class="title">Entrer la date de date de paie</label>
                            <input type="datetime-local" class="form-control" v-model="form.date_end" autocomplete="off" required placeholder="Pays">
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
                    <div class="title-row ">Informations de paie</div>
                        <div class="table-responsive">
                            <button class="btn btn-outline-success" @click.prevent="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
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
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="ligne.nombre" @change="NumberChange(index)"></td> 
                                        <td v-if="ligne.designation == 'SALAIRE DE BASE MENSUEL'"><input class="form-control" type="number" autocomplete="off" disabled v-model="ligne.base"></td>
                                        <td v-else><input class="form-control" type="number" autocomplete="off" v-model="ligne.base"></td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="ligne.part_salariale.taux" @change="NumberChange(index)"></td>
                                        <td><div><input class="form-control" type="number"  autocomplete="off" disabled v-model="ligne.part_salariale.gain"></div></td>         
                                        <td>
                                            <!-- <input class="form-control" type="number"  autocomplete="off" disabled v-model="ligne.part_salariale.retenue"> -->
                                        </td>       
                                        <td>
                                            <!-- <input class="form-control" type="number"  autocomplete="off" disabled v-model="ligne.part_patronale.taux"> -->
                                        </td>     
                                        <td>
                                            <!-- <input class="form-control" type="number"  autocomplete="off" disabled v-model="ligne.part_patronale.retenue"> -->
                                        </td>
                                        <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger cursor-pointer sup" aria-hidden="true"></i></td>
                                    </tr>

                                </tbody>
                            </table>   
                        </div><br>
                    </div> 
                    
                    <br>
                    <div class="title-row">Recapitulatif</div>
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
                                        <td rowspan="2"><strong>Période</strong>
                                            <strong>Année</strong>
                                        </td>
                                        <td><input class="form-control" type="number"  autocomplete="off"  v-model="form.brut_salary" disabled></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="mx-2"></td>
                                    </tr>
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
                    ipts: '',
                    net_salary: '',
                    brut_salary: '',
                    hour_salary: '',
                    total_hours: '',
                    sup_hours: '',
                    hours: '',
                    bonus: '',
                    contributions: '',
                    retained: '',
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

                        this.form.lignes.push(
                            {
                                designation: "HEURES SUP 112%", 
                                nombre: 0, 
                                base: 3000, 
                                part_salariale: {
                                    taux: 100,
                                    gain: "",
                                }, 
                            },
                            {
                                designation: "HEURES SUP 135%", 
                                nombre: 0, 
                                base: 5000, 
                                part_salariale: {
                                    taux: 100,
                                    gain: "",
                                }, 
                            },
                            {
                                designation: "HEURES SUP 150%", 
                                nombre: 0, 
                                base: 7000, 
                                part_salariale: {
                                    taux: 100,
                                    gain: "",
                                }, 
                            },
                            {
                                designation: "HEURES SUP 200%", 
                                nombre: 0, 
                                base: 10000, 
                                part_salariale: {
                                    taux: 100,
                                    gain: "",
                                }, 
                            }
                        );  
                    }
                    let sum= 0;
                    for (let j = 0; j < this.form.lignes.length; j++) {
                        this.form.lignes[j].part_salariale.gain = (this.form.lignes[j].nombre * this.form.lignes[j].base * this.form.lignes[j].part_salariale.taux)/100;
                        sum += this.form.lignes[j].part_salariale.gain;
                    }
                        this.form.brut_salary = sum
                })
            },

            NumberChange(index){
                let ligne = this.form.lignes[index]
                // ligne.part_salariale.taux = 100
                ligne.part_salariale.gain = (Number(ligne.nombre) * ligne.base * ligne.part_salariale.taux)/100;
                let sum= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum += this.form.lignes[j].part_salariale.gain;
                }
                    this.form.brut_salary = sum
            },


            // TauxChange(index){
            //     let ligne = this.form.lignes[index]
            //     ligne.part_salariale.gain = (Number(ligne.nombre) * ligne.base * ligne.part_salariale.taux)/100;
            // },

            deleteLine(index){
                this.form.lignes.splice(index, 1)
                let sum= 0;
                for (let j = 0; j < this.form.lignes.length; j++) {
                    sum += this.form.lignes[j].part_salariale.gain;
                }
                    this.form.brut_salary = sum
            },


            LigneChange(){
                console.log(e);
                if(e.target) {
                    console.log("ok");
                    // let i = e.target.options[e.target.options.selectedIndex].dataset.i;
                    // let index = e.target.options[e.target.options.selectedIndex].dataset.index;
                    // let product = this.produits[i];
                    // let line = this.form.sell_lines[index]
                    // line.price = product.price_sell;
                    // line.amount = Number(line.price) * Number(line.quantity);
                    // line.amount_after_discount = Number(line.price) * Number(line.quantity);
                        
                    
                    // let sum = 0;
                    // for (let j = 0; j < this.form.sell_lines.length; j++) {
                    //     sum += this.form.sell_lines[j].amount_after_discount;
                    // }
                    // this.form.amount_ht = sum;
                    // this.form.tax =0
                    // this.taxChange()
                } 
                else{
                    console.log("no");
                }
            },

    
            addLine(){
                this.form.lignes.push(
                    {
                        designation: "", 
                        nombre: 0, 
                        base: "", 
                        part_salariale: {
                            taux: "",
                            gain: "",
                            // retenue: ""
                        }, 
                        // part_patronale: {
                        //     taux: "",
                        //     retenue: ""
                        // }, 
                    });           
            },

            async submit(){
                this.load = true
                this.heures_sup = this.form.lignes.filter(ligne => ligne.designation !== "SALAIRE DE BASE MENSUEL")
            await  this.$axios.post('/payslips',{
              date_start: this.form.date_start,
              date_end: this.form.date_end,
              employee_id: this.form.employee_id,
              base_salary: this.employe_concerne.base_salary,
            //   ipts: this.form.ipts,
            //   net_salary: this.form.net_salary,
              brut_salary: this.form.brut_salary,
            //   hour_salary: this.form.hour_salary,
              total_hours: this.form.total_hours,  
              sup_hours: this.heures_sup,
              hours: this.form.hours,
            //   bonus: this.form.bonus,
              contributions: this.form.contributions,
              retained: this.form.retained,
            //   employee_cotisation: this.form.employee_cotisation,
            //   company_cotisation: this.form.company_cotisation,
              comment: this.form.comment,
              compagnie_id: localStorage.getItem('auth.company_id') 
            }).then(response =>{ 
                console.log( response.data ) 
                this.error = response.data.message
                    if(response.data.status == "success"){
                    this.$router.push({path:'/paies/list_paie'});
                        this.$toast("Fiche de paie enregistré !!! ", {
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
    }

    input::placeholder {
        font-size: 15px;
        opacity: 0.5;
    }
    
    </style>