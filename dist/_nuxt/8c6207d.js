(window.webpackJsonp=window.webpackJsonp||[]).push([[39,37],{287:function(t,e,r){var content=r(291);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(114).default)("523c5140",content,!0,{sourceMap:!1})},288:function(t,e,r){t.exports=r.p+"img/logo.3a02bb7.png"},289:function(t,e,r){t.exports=r.p+"img/user.4b09569.png"},290:function(t,e,r){"use strict";r(287)},291:function(t,e,r){var o=r(113)((function(i){return i[1]}));o.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap);"]),o.push([t.i,'*[data-v-4e642764]{margin:0;padding:0;box-sizing:border-box;font-family:"Poppins",sans-serif}.nav[data-v-4e642764]{position:relative;min-height:100vh;width:100%;overflow:hidden}.logo_content img[data-v-4e642764]{display:flex;height:50px;width:80%;align-items:center;margin-bottom:3%}.header[data-v-4e642764]{position:absolute;top:0;left:0;height:100%;width:270px;background:#202020;padding:6px 14px;transition:all .5s ease;font-size:12px}.header ul li[data-v-4e642764]{position:relative;height:50px;width:100%;margin:0 5px;list-style:none;line-height:40px}.header input[data-v-4e642764]{position:absolute;height:75%;width:100%;left:0;top:0;border-radius:12px;outline:none;border:none;background:#f3f3ec;padding-left:50px;font-size:12px;color:#565643}.header .bx-search[data-v-4e642764]{position:absolute;z-index:99;color:#565643;margin-top:-2%}.header .rubrique[data-v-4e642764]{color:#fff;display:flex;align-items:center;text-decoration:none;transition:all .4s ease;border-radius:8px}.header.rubrique.active[data-v-4e642764],.header .rubrique[data-v-4e642764]:hover{color:#11101d!important;background:#fff}.header li i[data-v-4e642764]{height:50px;min-width:50px;border-radius:12px;line-height:50px;text-align:center}.bas-page[data-v-4e642764],.recherche[data-v-4e642764]{margin-top:10%}.bas-page[data-v-4e642764]{display:flex;border:1px solid #585757;padding:10px}.bas-page img[data-v-4e642764]{width:45px;border:1px solid transparent;border-radius:100%;cursor:pointer}.bas-page .user_name[data-v-4e642764]{font-size:12px;padding:10px;color:#fff}.bas-page .btn[data-v-4e642764]{margin-left:7%;padding:10px;cursor:pointer;border:1px solid;background-color:red;border-radius:10px;font-size:13px;color:hsla(0,0%,100%,.86)}.bas-page .btn[data-v-4e642764]:hover{background-color:hsla(0,0%,100%,.86);color:red}.btn i[data-v-4e642764]{font-size:18px;padding:3px}.custom-btn[data-v-4e642764]{color:#fff;border-radius:5px;padding:10px 25px;font-family:"Lato",sans-serif;font-weight:500;background:transparent;cursor:pointer;transition:all .3s ease;position:relative;display:inline-block;box-shadow:inset 2px 2px 2px 0 hsla(0,0%,100%,.5),7px 7px 20px 0 rgba(0,0,0,.1),4px 4px 5px 0 rgba(0,0,0,.1);outline:none}.btn-5[data-v-4e642764],.custom-btn[data-v-4e642764]{width:130px;height:40px}.btn-5[data-v-4e642764]{text-align:center;line-height:42px;padding:0;border:none;background:#ff1b00;background:linear-gradient(0deg,#ff1b00,#fb4b02)}.btn-5[data-v-4e642764]:hover{color:#f0094a;background:transparent;box-shadow:none}.btn-5[data-v-4e642764]:after,.btn-5[data-v-4e642764]:before{content:"";position:absolute;top:0;right:0;height:2px;width:0;background:#f0094a;box-shadow:-1px -1px 5px 0 #fff,7px 7px 20px 0 rgba(0,0,0,.2),4px 4px 5px 0 rgba(0,0,0,.13333333333333333);transition:all .4s ease}.btn-5[data-v-4e642764]:after{right:inherit;top:inherit;left:0;bottom:0}.btn-5[data-v-4e642764]:hover:after,.btn-5[data-v-4e642764]:hover:before{width:100%;transition:all .8s ease}@media screen and (max-width:1270px){.header[data-v-4e642764]{width:90px}.bas-page .custom-btn[data-v-4e642764],.bas-page img[data-v-4e642764],.recherche input[data-v-4e642764],.rubrique .links_name[data-v-4e642764]{display:none}}',""]),o.locals={},t.exports=o},292:function(t,e,r){"use strict";r.r(e);r(38);var o=[function(){var t=this._self._c;return t("div",{staticClass:"logo_content"},[t("img",{attrs:{src:r(288),alt:"logo",srcset:""}}),t("hr")])}],n=r(11),l=(r(65),{name:"SideBar",auth:!0,methods:{logout:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$auth.logout(),t.$router.push("/login");case 2:case"end":return e.stop()}}),e)})))()}}}),c=(r(290),r(46)),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return 1==t.$auth.loggedIn?e("div",{staticClass:"nav"},[e("link",{attrs:{href:"https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css",rel:"stylesheet"}}),t._v(" "),e("div",{staticClass:"header"},[t._m(0),t._v(" "),e("ul",{staticClass:"nav_list"},[e("div",{staticClass:"recherche"},[e("li",[e("NuxtLink",{attrs:{to:""}},[e("i",{staticClass:"bx bx-search"}),t._v(" "),e("input",{attrs:{type:"text",placeholder:"Rechercher..."}})])],1)]),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/dashboard"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-grid-alt"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Tableau de bord")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/achatVente"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-cart-add"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Achats & Ventes")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/ventes/list_vente"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-save"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Factures des ventes")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/clients/list_client"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-list-ul"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Liste des clients")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/fournisseurs/list_fournisseur"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-list-ul"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Liste des fournisseurs")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/produits/list_produit"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxl-product-hunt"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Liste des Produits")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/categorie/list_categorie"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-data"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Toutes les Catégories")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/compagnies/list_compagnie"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-shopping-bags"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Compagnies")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/profils/profil"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-group"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Utilisateurs")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/corbeille"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-trash"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Corbeille")])])])],1),t._v(" "),e("div",{staticClass:"bas-page"},[e("img",{attrs:{src:r(289),alt:"logo",srcset:""}}),t._v(" "),e("span",{staticClass:"user_name"},[t._v(t._s(t.$auth.user.name))]),t._v(" "),e("div",{staticClass:"custom-btn btn-5",on:{click:t.logout}},[t._v("\r\n                    Déconnexion")])])])])]):t._e()}),o,!1,null,"4e642764",null);e.default=component.exports},354:function(t,e,r){var content=r(420);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(114).default)("83a8a57e",content,!0,{sourceMap:!1})},419:function(t,e,r){"use strict";r(354)},420:function(t,e,r){var o=r(113)((function(i){return i[1]}));o.push([t.i,".zone p[data-v-7b9603a3]{font-size:18px}form[data-v-7b9603a3]{width:80%;padding-left:100px;padding-right:300px;padding-top:50px}.input-form[data-v-7b9603a3]{display:flex;flex-direction:column-reverse;margin:1.2em 0;height:50px}.error[data-v-7b9603a3]{color:red;margin-bottom:-10%;font-size:12px}input[data-v-7b9603a3]{padding:8px;outline:none;border:none;border-bottom:2px solid #605050}input[data-v-7b9603a3]::-moz-placeholder{font-size:15px;opacity:.5}input[data-v-7b9603a3]::placeholder{font-size:15px;opacity:.5}.submit-form[data-v-7b9603a3]{margin-top:10%;text-align:right}input[type=submit][data-v-7b9603a3]{background-color:#fff;color:#000;padding:10px 15px;margin:8px 0;border:1px solid #53af57;cursor:pointer;width:100%;font-size:15px}input[type=submit][data-v-7b9603a3]:hover{background-color:#53af57;color:#fff;border:1px solid #53af57;font-size:16px}",""]),o.locals={},t.exports=o},472:function(t,e,r){"use strict";r.r(e);r(47),r(39),r(14),r(38);var o=r(11),n=(r(65),{auth:!0,components:{SideBar:r(292).default},data:function(){return{categories:[],categorie:"",form:{category_id:"",name:"",quantity:"",price_sell:"",price_buy:"",stock_min:"",stock_max:"",compagnie_id:""},error_message:"",error_champ:[]}},mounted:function(){this.refresh()},methods:{submit:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/create/product",{category_id:t.form.category_id,name:t.form.name,quantity:t.form.quantity,price_sell:t.form.price_sell,price_buy:t.form.price_buy,stock_min:t.form.stock_min,stock_max:t.form.stock_max,compagnie_id:t.$auth.$storage.getUniversal("company_id")}).then((function(e){t.$router.push({path:"/produits/list_produit"})})).catch((function(t){return console.log(t)}));case 2:case"end":return e.stop()}}),e)})))()},refresh:function(){var t=this;this.$axios.post("/index/categorie",{compagnie_id:this.$auth.$storage.getUniversal("company_id")}).then((function(e){console.log(e),t.categories=e.data.data.data}))}}}),l=(r(419),r(46)),component=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"contain"},[e("SideBar"),t._v(" "),e("div",{staticClass:"zone"},[e("div",{staticClass:"titre"},[t._v("\r\n            Produits\r\n        ")]),t._v(" "),e("p",[t._v("Enregistrer un nouveau produit")]),t._v(" "),e("form",{attrs:{action:"",method:"POST"}},[e("h1",[t._v("Ajout de produit")]),t._v(" "),e("div",{staticClass:"input-form"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.form.category_id,expression:"form.category_id"}],on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.form,"category_id",e.target.multiple?r:r[0])}}},[e("option",{attrs:{disabled:"",value:""}},[t._v("Choisissez la categorie du produit à ajouter")]),t._v(" "),t._l(t.categories,(function(r,i){return e("option",{key:i,domProps:{value:r.id}},[t._v(t._s(r.name))])}))],2),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.nature))])]),t._v(" "),e("div",{staticClass:"input-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"Entrer le nom du produit ",autocomplete:"off",required:""},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value)}}}),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.name))])]),t._v(" "),e("div",{staticClass:"input-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.quantity,expression:"form.quantity"}],attrs:{type:"text",placeholder:"Entrer la quantité ",required:""},domProps:{value:t.form.quantity},on:{input:function(e){e.target.composing||t.$set(t.form,"quantity",e.target.value)}}}),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.phone))])]),t._v(" "),e("div",{staticClass:"input-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.price_sell,expression:"form.price_sell"}],attrs:{type:"email",placeholder:"Entrer le prix de vente ",autocomplete:"off",required:""},domProps:{value:t.form.price_sell},on:{input:function(e){e.target.composing||t.$set(t.form,"price_sell",e.target.value)}}}),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.email))])]),t._v(" "),e("div",{staticClass:"input-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.price_buy,expression:"form.price_buy"}],attrs:{type:"text",placeholder:"Entrer le prix d'achat ",autocomplete:"off",required:""},domProps:{value:t.form.price_buy},on:{input:function(e){e.target.composing||t.$set(t.form,"price_buy",e.target.value)}}}),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.nature))])]),t._v(" "),e("div",{staticClass:"input-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.stock_min,expression:"form.stock_min"}],attrs:{type:"text",placeholder:"Entrer le stock minimal ",autocomplete:"off",required:""},domProps:{value:t.form.stock_min},on:{input:function(e){e.target.composing||t.$set(t.form,"stock_min",e.target.value)}}}),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.nature))])]),t._v(" "),e("div",{staticClass:"input-form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.stock_max,expression:"form.stock_max"}],attrs:{type:"text",placeholder:"Entrer le stock maximal ",autocomplete:"off",required:""},domProps:{value:t.form.stock_max},on:{input:function(e){e.target.composing||t.$set(t.form,"stock_max",e.target.value)}}}),t._v(" "),e("span",{staticClass:"error"},[t._v(t._s(t.error_champ.nature))])]),t._v(" "),e("div",{staticClass:"submit-form"},[e("input",{attrs:{type:"submit",id:"submit",value:"Enregistrer le produit",name:"submit"},on:{click:function(e){return e.preventDefault(),t.submit()}}})])])])],1)}),[],!1,null,"7b9603a3",null);e.default=component.exports}}]);