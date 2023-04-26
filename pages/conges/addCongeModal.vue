<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler" @click.stop>    
      <div class="alert alert-danger justify-content-center" role="alert" v-if="status == 'error'">
        {{error}}
      </div>                 
              <form action="" method="POST"> 
                <h4>Enregistrer un congé pour un employé</h4>
  
                  <div class="input-form">					
                      <input type="text" class="form-control" placeholder="Entrer la désignation du congé" v-model="form.name" autocomplete="off" id="name_four" required>
                  </div>  
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.name">{{errors.name}}</div>   
                  
                  <div class="input-form">        
                    <v-select 
                        placeholder="Nom de l'employé concerné"
                        v-model="form.vacationer_id"
                        label="last_name"
                        :options="vacationers"
                        :reduce="(vacationer) => vacationer.id"
                    />  
                  </div>
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['vacationer_id'] != null">{{errors['vacationer_id']}}</div> 
   
                  <div class="input-form">       
                    <label class="" for="date_start">Date de début</label> 
                    <input class="form-control"  type="datetime-local"  v-model="form.date_start" id="date_start"/>  
                  </div>
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['date_start'] != null">{{errors['date_start']}}</div> 
  
                  <div class="input-form">        
                    <label class="" for="">Date de fin</label> 
                    <input class="form-control"  type="datetime-local"  v-model="form.date_end"/>  
                  </div>
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['date_end'] != null">{{errors['date_end']}}</div> 

                  <div class="input-form">    
                      <input type="number" class="form-control" placeholder="Entrer le nombre de jours" v-model="form.days_count" autocomplete="off" id="count" required>
                  </div>
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['days_count'] != null">{{errors['days_count']}}</div> 
  
                  <div class="input-form">        
                    <v-select 
                        placeholder="Nom de l'employé autorisateur du congé"
                        v-model="form.authorizer_id"
                        label="last_name"
                        :options="vacationers"
                        :reduce="(vacationer) => vacationer.id"
                    />  
                  </div>
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors['vacationer_id'] != null">{{errors['vacationer_id']}}</div> 
   
                  
                  <div class="input-form">    
                    <textarea
                        v-model="form.comment"
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="4"
                        class="form-control"
                        placeholder="Entrer un commentaire"
                    ></textarea>
                  </div>
                 


                  <div class="submit-form" >
                      <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer" name="submit">				          
                  </div>


                  <!-- <div v-else class="submit-form">
                      <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer" name="submit">				          
                  </div> -->
              </form>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="/images/fermer.png" alt="" />
      </div>
    </div>
  </template>
  
  <script>
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css';
    export default {
      name: 'AddcongeModal',
      components:{
            vSelect
      },
      data () {
      return{
          form: {
              name: '',
              vacationer_id: '',
              date_end: '',
              date_start: '', 
              authorizer_id:'',
              days_count: '',
              comment: '',
              compagnie_id: ''
          },
          errors: [],
          vacationers: [],
          error: null,
          status: '',
      }
      },

        mounted(){
            this.$axios.get('/employees',{params: {
                compagnie_id: localStorage.getItem('auth.company_id'),
                is_paginated: 0
            }
            })
            .then(response => 
            {
                // console.log(response.data);
                this.vacationers = response.data.data
            }
            )
        },
      
      methods: {
          async submit(){
              await  this.$axios.post('/vacations',{
                name: this.form.name,
                vacationer_id: this.form.vacationer_id,
                date_end: this.form.date_end,
                date_start: this.form.date_start,
                authorizer_id: this.form.authorizer_id,
                days_count: this.form.days_count,
                comment: this.form.comment,
                compagnie_id: localStorage.getItem('auth.company_id')
              })
              .then(response =>{
                this.$emit('conf', { message: this.form.name })
                  // console.log( response ) 
                  this.error = response.data.message
                  this.status = response.data.status
                  // console.log(this.error)
                    if(this.status == 'success'){
                      // alert('Nouveau client ajouté avec succès');
                        this.form.name = '',
                        this.form.vacationer_id = '',
                        this.form.date_end = '',
                        this.form.date_start = '',
                        this.form.authorizer_id = '',
                        this.form.days_count = '',
                        this.form.comment = '',
                        this.status = response.data.status
                        this.$emit('close-modal')
                        this.$toast("Congé ajouté !!! ", {
                        icon: 'fa fa-check-circle',
                    })
                    }
                    else{
                      // alert("Echec lors de l'ajout du client ! Veuillez réessayer.");
                      this.status = response.data.status
                        this.errors = response.data.data
                        // this.$router.push({path:'/categorie/add_client'});
                    }
               }).catch( err => console.log( err ) )
              
              },
      }
  }
  </script>
  
  <style scoped>
  form {
      padding: 40px;
  } 
  
  .input-form {
      display: flex;
      flex-direction: column-reverse;
      margin-top: 30px;
      height: 50px;
  }
    
  input {
      padding: 8px;
      border: none; outline: none;
      border-bottom: 2px solid #605050;
  }
  
  input::placeholder {
      font-size: 16px;
      opacity: 0.8;
  }
  
  .submit-form {
      margin-top: 10%;
      text-align: center;       
  }
  
  input[type=submit] {
      background-color: white;
      color: black;
      padding: 10px 15px;
      margin: 8px 0;
      border: 1px solid #0971fa;
      cursor: pointer;
      width: 60%;
      font-size: 15px;
  }
  
  input[type=submit]:hover{
      background-color: #0971fa;
      color: white;
      border: 1px solid #0971fa;
      font-size: 16px;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #949292da;
    overflow: auto;
    z-index: 99;
  }
  
  .modaler {
    text-align: center;
    background-color: white;
    height: max-content;
    width: 650px;
    margin-top: 1%;
    padding: 10px 0;
    border-radius: 20px;
  }
  .close {
    margin: 1% 0 0 0;
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
  
  button {
    background-color: #ac003e;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
  }
  </style>