<template >
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ventes </h3>
    </nav>

    <div class="contenu">
      <h4>Informations sur la facture</h4>
      <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>Date de la vente</th>
              <th>Client concerné </th>
              <th>Montant </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{date_sell}}</td>
              <td>{{client}}</td>
              <td>{{montant}}</td>
            </tr>
          </tbody>
        </table>  <br><br> <hr>

        <h4>Ajouter des encaissements pour cette facture</h4><br><br>
              <form action="" method="POST">
                  <div class="form-group col-md-6">					
                    <input type="date" class="form-control" placeholder="Entrer la date de l'encaissement " v-model="form.date" autocomplete="off" id="date" required>       
                  </div> <br>
                  <div class="form-group col-md-6">        
                    <input type="number" class="form-control" placeholder="Entrer le montant à encaisser " v-model="form.montant" id="montant" required>
                  </div> <br><br>
                      
                  <button type="submit" class="btn btn-success" @click.prevent="submit()" @conf="AddEncaissement">Ajouter ...</button>          
              </form>  <br><br><hr>
        <div>
          <h4>Liste des encaissements pour cette facture</h4>
          <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>Date encaissement</th>
                <th>Montant </th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(encaissement, i) in encaissements" :key="i">
                <td>{{encaissement.date}}</td>
                <td>{{encaissement.montant}}</td>
              </tr>
            </tbody>
          </table>  <br>
          <nav aria-label="Page navigation example px-8 " v-if="res_data != null">
            <ul class="pagination">
              <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="recupFacture(res_data.current_page - 1)">Précédent</a></li>
              <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="recupFacture(link.label)">{{link.label}}</a></li>
              
              <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="recupFacture(res_data.current_page + 1)">Suivant</a></li>
            </ul>
          </nav>
        </div><br><br> 

    </div>
</div>
</template>


<script>
import Sidebar from '../../sidebar.vue'
export default {
    layout: "empty",
    components: {
        Sidebar,  
    },

    data () {
      return {
        res_data: null,
        date_encaissement: '',
        montant_encaissement: '',
        date_sell: '',
        montant: '',
        client: '',
        encaissements: [],
        form: {
            date: '',
            montant: '',
            phone: '',
            nature:'',
            compagnie_id: ''
        },
      }
    },

    mounted(){
      this.$axios.get('/sells/'+ this.$route.params.id).then(response => {console.log(response.data.data);
        this.date_sell = response.data.data[0].date_sell,
        this.client = response.data.data[0].client_id,
        this.montant = response.data.data[0].amount
      }) 
      this.recupFacture()
    },

    methods: {
        async submit(){
            await  this.$axios.post('/encaissements',{
              montant: this.form.montant,
              date: this.form.date,
              client_id: this.client,
              user_id: this.$auth.user.id,
              sell_id: this.$route.params.id,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                // this.$emit('conf', { date_encaissement: this.form.date, montant_encaissement: this.form.montant })
              
              if(response.data.status == "success"){
                document.getElementById("date").value='';
                document.getElementById("montant").value='';
                this.recupFacture()
                }
                else{
                    this.errors = response.data.data
                    // this.$router.push({path:'/clients/add_client'});
                }
            })
            .catch( err => console.log( err ) )
                //  console.log(this.form.name)                
        },
            
        AddEncaissement(payload) {
            this.recupFacture()
            this.date_encaissement = payload.date_encaissement
            this.montant_encaissement = payload.montant_encaissement
        },

        recupFacture(page){
          this.$axios.get('/encaissements',
            {
                params: {
                  page : page,
                  sell_id: this.$route.params.id
                }
            }
          ).then(response => 
          {
            console.log(response);
            this.encaissements = response.data.data.data
            this.res_data= response.data.data
            // this.links = response.data.data.links
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
          })
        },
    },
}
</script>

<style scoped>

.contenu{
  margin: 5%;
  overflow: auto;
}
.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;
  text-align: center;
  justify-content: center;

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
  width: 180px;
  height: 40px;
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

</style>
