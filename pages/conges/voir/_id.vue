<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Congés </h3>
          <Userinfo />
        </nav>
    
        <div class="app-main__outer py-5 px-2">
          <h4>Informations sur le congé</h4><hr><br>

          <div class="d-flex align-items-end">
              <NuxtLink :to="'/conges/'+identifiant" v-for="(user, i) in users" :key="i" class="web-btn"><button class="btn btn-outline-dark" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><span>Modifier les informations</span></button></NuxtLink>
          </div>
          <div class="row">
            <div class="col-md-4">
                <v-dalendar
                    />

            </div>
            <div class="col-md-8">
                <div>
                    <table class="table table-hover">
                        <thead>
                        <tr class="table-success">
                                <th>A savoir</th>
                                <th>Congé</th>
                                
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Désignation</td>
                            <td v-if="conge.name">{{conge.name}}</td>
                            <td v-else>----</td>
                        </tr>
                        <tr>
                            <td>Employé concerné</td>
                            <td v-if="conge.vacationer">{{conge.vacationer.first_name}} {{conge.vacationer.last_name}}</td>
                            <td v-else>----</td>
                        </tr>
                        <tr>
                            <td>Employé valideur du congé</td>
                            <td v-if="conge.vacationer">{{conge.authorizer.first_name}} {{conge.authorizer.last_name}}</td>
                            <td v-else>----</td>
                        </tr>
                        <tr>
                            <td>Nombre de jours</td>
                            <td v-if="conge.days_count">{{conge.days_count}}</td>
                            <td v-else>----</td>
                        </tr>
                        <tr>
                            <td>Dates de début</td>
                            <td>{{conge.date_start}}</td>
                        </tr>
                        <tr>
                            <td>Date de fin</td>
                            <td>{{conge.date_end}}</td>
                        </tr>
                        <!-- <tr v-if="type == 'douteux'">
                            <td>Seuil maximal à ne pas excéder</td>
                            <td>{{seuil}}</td>
                        </tr> -->
                        </tbody>
                    </table>
                </div>
              
              <div class="mt-4">    
                    <textarea
                        v-model="conge_comment"
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        class="form-control"
                        placeholder=""
                        disabled
                    ></textarea>
                  </div>
            </div>

          </div>
         


      </div>          <!-- <pre> {{res_data}}</pre> --><br><br> 

    </div>
    
    </template>
    
    <script>
    // import VCalendar from 'v-calendar'
    // import 'v-calendar/lib/v-calendar.min.css'
    import Sidebar from '../../sidebar.vue'
    import Userinfo from '../../user_info.vue'
    export default {
      layout: "empty",
      auth: true,
      components: {
        Sidebar,  
        Userinfo,
        // VCalendar,
        // DatePicker
      },
    
      data () {
        return {
            conge: '',
            conge_comment: '',
            selectedDates: [],
            identifiant: '',
            users: '',
            role: '',
            compagny: '',
            // range:{}
        }
      },
    
      mounted () {
          this.refresh()
          this.identifiant = this.$route.params.id
          this.users = this.$auth.$state.user.roles;
          this.compagny = localStorage.getItem('auth.company_id');
          this.role = localStorage.getItem('auth.roles');
          
      },
    
      methods: {
           
            refresh(){
                this.$axios.get('vacations/'+ this.$route.params.id,{
                    params: {
                    compagnie_id: localStorage.getItem('auth.company_id')
                    }
              }).then(response => {
                // console.log(response.data.data[0]);
                this.conge = response.data.data
                this.conge_comment = response.data.data.comment
                }) 
            },
            
            
        },
       
    }
    </script>
    
    <style scoped>
    
    .nav{
      overflow: auto;
    }
    
    .page{
        display: flex;    
    }
    
    .btn-group{
      display: flex
    }
    
    .nombre{
      margin: 0 ;
    }
    
    .title{
      margin: 0.5% 2% 0 10%;
      font-weight: bold;
    }
    .app-main__outer{
      overflow: auto;
    }
    .fa{
      margin: 2px 10px;
      font-size: 18px;
      cursor: pointer;
    }
    .table{
        margin-top: 2%;
      text-align: center;
    }          
    
    .replace{
      display: flex;
    }
    
    .controler{
      width: 15%;
    }
    
    thead tr{
        background-color: transparent;
    }
    
    
    tbody tr:last-of-type{
        border-bottom: 2px solid rgb(140, 140, 250);
    }
    .action{
       display: flex;
    }
    
    .custom-btn {
      /* width: 180px;
      height: 40px; */
      color: #fff;
      border-radius: 5px;
      padding: 10px 25px;
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
       box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
       7px 7px 20px 0px rgba(0,0,0,.1),
       4px 4px 5px 0px rgba(0,0,0,.1);
      outline: none;
    }
    .btn-3 {
      background: rgb(0,172,238);
    background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
      width: 180px;
      height: 40px;
      line-height: 42px;
      padding: 0;
      border: none;
      
    }
    .btn-3 span {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    .btn-3:before,
    .btn-3:after {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
       background: rgba(2,126,251,1);
      transition: all 0.3s ease;
    }
    .btn-3:before {
      height: 0%;
      width: 2px;
    }
    .btn-3:after {
      width: 0%;
      height: 2px;
    }
    .btn-3:hover{
       background: transparent;
      box-shadow: none;
    }
    .btn-3:hover:before {
      height: 100%;
    }
    .btn-3:hover:after {
      width: 100%;
    }
    .btn-3 span:hover{
       color: rgba(2,126,251,1);
    }
    .btn-3 span:before,
    .btn-3 span:after {
      position: absolute;
      content: "";
      left: 0;
      bottom: 0;
       background: rgba(2,126,251,1);
      transition: all 0.3s ease;
    }
    .btn-3 span:before {
      width: 2px;
      height: 0%;
    }
    .btn-3 span:after {
      width: 0%;
      height: 2px;
    }
    .btn-3 span:hover:before {
      height: 100%;
    }
    .btn-3 span:hover:after {
      width: 100%;
    }
    
    
    @media screen and (max-width: 600px) {
    
      .replace i{
        margin: 5px 2px;
        font-size: 20px;
      }
    
    }
    
    .mobile-btn{
      display: none;
    }
    
    
    
    @media screen and (max-width: 900px) {
      /* .btn_recherche{
        display:none;
      } */
    
      .mobile-btn{
        display: block;
      }
    
      .web-btn{
        display: none;
      }
    
      .btn-group{
        display: inline;
      }
    
      .btn-group .btn{
        margin: 10px 0;
      }
    }
    </style>
    