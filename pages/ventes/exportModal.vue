<template>
    <div class="modal-overlay"  @click="$emit('close-modal')">
      <div class="modaler" @click.stop>
        <h6 class="text-center">Cocher les colonnes que vous voudrez exporter !</h6>
        <form action="" class="my-5">
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.date" 
                    true-value="1"
                    false-value="0" @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Date d'édition
                </label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.amount_ht" 
                    true-value="1"
                    false-value="0" @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Prix Hors Taxe
                </label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.tax" 
                    true-value="1"
                    false-value="0" @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Taxe
                </label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.amount_ttc" 
                    true-value="1"
                    false-value="0 " @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Prix Toute Taxe Comprise
                </label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.discount" 
                    true-value="1"
                    false-value="0" @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Réduction
                </label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.amount" 
                    true-value="1"
                    false-value="0" @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Net à payer
                </label>
            </div>
            <div class="form-check">
                <input 
                    class="form-check-input mx-3" 
                    type="checkbox" 
                    v-model="form.client" 
                    true-value="1"
                    false-value="0" @click="exp()">
                <label class="form-check-label" for="flexCheckChecked">
                    Nom du client
                </label>
            </div>
            <vue-excel-xlsx
                class="btn btn-outline-info mx-3 my-4"
                :data="data"
                :columns="columns"
                :file-name="'ventes'"
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
      name: 'exportModal',
      // props: ['identifiant'],
      data () {
        return{
            form: {
                date: 1,
                amount_ht: 1,
                tax: 1,
                amount_ttc: 1,
                discount: 1,
                amount: 1,
                client: 1,
            },
            
          columns : [
            {
                label: "date_sell",
                field: "date_sell",
            },
            {
                label: "amount_ht",
                field: "amount_ht",
            },
            {
                label: "tax",
                field: "tax",
            },
            {
                label: "amount_ttc",
                field: "amount_ttc",
            },
            {
                label: "discount",
                field: "discount",
            },
            {
                label: "amount",
                field: "amount",
            },
            {
                label: "rest",
                field: "rest",
            },
            {
                label: "client",
                field: "client.name",
            },
      ],
      data : [],
        }
      },

      async mounted () {
        await this.exp()
      },

      methods:{
        async exp(){
            // console.log(this.form.balance);
            await this.$axios.get('/sells',{
                params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                is_paginated: 0
                }
            }).then(response =>{
                // console.log(response);
                this.data = response.data.data
                
                if(this.form.date == 0){
                    this.columns.splice(0, 1);
                }

                if(this.form.amount_ht == 0){
                    this.columns.splice(1, 1);
                }

                if(this.form.tax == 0){
                    this.columns.splice(2, 1);
                }

                if(this.form.amount_ttc == 0){
                    this.columns.splice(3, 1);
                }

                if(this.form.discount == 0){
                    this.columns.splice(4, 1);
                }
                
                if(this.form.amount == 0){
                    this.columns.splice(5, 1);
                }
                
                if(this.form.client == 0){
                    this.columns.splice(6, 1);
                }
                
            })   
        },
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