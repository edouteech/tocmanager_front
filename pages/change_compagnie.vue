<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler">  
                         
              <form action="" method="POST"> 
                <h4>Changer de compagnie </h4>
                  <div class="input-form"> 
                     <select v-model="form.compagny_id" class="form-control">
                          <option value="">Choisissez une compagnie</option>
                          <option  v-for="(compagnie, i) in compagnies" :key="i" :value="compagnie.id">{{compagnie.name}}</option>
                      </select>
                  </div>
                  <div class="submit-form" >
                    <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Se connecter</button>				          
                  </div>
              </form>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="/images/fermer.png" alt="" />
      </div>
  
    </div>
  </template>
  
  <script>
    export default {
      auth:true,
      name: 'changeCompagnie',
      props: ['compagnies'],
      data () {
        return{
            form: {
              compagny_id: '',
            },
            error: null,
            status: '',
        }
      },
  
      methods: {
          async submit(){
            this.$auth.$storage.setUniversal('company_id', this.form.compagny_id)
            this.$router.push({path:'/mon_profil'})
            this.$emit("close-modal");
          },
  
      }
  }
  </script>
  
  <style scoped>
  form {
      padding: 50px;
  } 
  
  .input-form {
      display: flex;
      flex-direction: column-reverse;
      margin: 1.2em 0;
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
  
  .modal-overlay {
  z-index: 99;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #949292da;
    overflow: auto;
    
  }
  
  .modaler {
    text-align: center;
    background-color: white;
    height: 250px;
    width: 500px;
    margin-top: 15%;
    border-radius: 20px;
  }
  .close {
    margin: 15% 0 0 0;
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