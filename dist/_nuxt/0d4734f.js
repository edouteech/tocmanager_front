(window.webpackJsonp=window.webpackJsonp||[]).push([[5,37],{287:function(t,e,r){var content=r(291);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(114).default)("523c5140",content,!0,{sourceMap:!1})},288:function(t,e,r){t.exports=r.p+"img/logo.3a02bb7.png"},289:function(t,e,r){t.exports=r.p+"img/user.4b09569.png"},290:function(t,e,r){"use strict";r(287)},291:function(t,e,r){var n=r(113)((function(i){return i[1]}));n.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap);"]),n.push([t.i,'*[data-v-4e642764]{margin:0;padding:0;box-sizing:border-box;font-family:"Poppins",sans-serif}.nav[data-v-4e642764]{position:relative;min-height:100vh;width:100%;overflow:hidden}.logo_content img[data-v-4e642764]{display:flex;height:50px;width:80%;align-items:center;margin-bottom:3%}.header[data-v-4e642764]{position:absolute;top:0;left:0;height:100%;width:270px;background:#202020;padding:6px 14px;transition:all .5s ease;font-size:12px}.header ul li[data-v-4e642764]{position:relative;height:50px;width:100%;margin:0 5px;list-style:none;line-height:40px}.header input[data-v-4e642764]{position:absolute;height:75%;width:100%;left:0;top:0;border-radius:12px;outline:none;border:none;background:#f3f3ec;padding-left:50px;font-size:12px;color:#565643}.header .bx-search[data-v-4e642764]{position:absolute;z-index:99;color:#565643;margin-top:-2%}.header .rubrique[data-v-4e642764]{color:#fff;display:flex;align-items:center;text-decoration:none;transition:all .4s ease;border-radius:8px}.header.rubrique.active[data-v-4e642764],.header .rubrique[data-v-4e642764]:hover{color:#11101d!important;background:#fff}.header li i[data-v-4e642764]{height:50px;min-width:50px;border-radius:12px;line-height:50px;text-align:center}.bas-page[data-v-4e642764],.recherche[data-v-4e642764]{margin-top:10%}.bas-page[data-v-4e642764]{display:flex;border:1px solid #585757;padding:10px}.bas-page img[data-v-4e642764]{width:45px;border:1px solid transparent;border-radius:100%;cursor:pointer}.bas-page .user_name[data-v-4e642764]{font-size:12px;padding:10px;color:#fff}.bas-page .btn[data-v-4e642764]{margin-left:7%;padding:10px;cursor:pointer;border:1px solid;background-color:red;border-radius:10px;font-size:13px;color:hsla(0,0%,100%,.86)}.bas-page .btn[data-v-4e642764]:hover{background-color:hsla(0,0%,100%,.86);color:red}.btn i[data-v-4e642764]{font-size:18px;padding:3px}.custom-btn[data-v-4e642764]{color:#fff;border-radius:5px;padding:10px 25px;font-family:"Lato",sans-serif;font-weight:500;background:transparent;cursor:pointer;transition:all .3s ease;position:relative;display:inline-block;box-shadow:inset 2px 2px 2px 0 hsla(0,0%,100%,.5),7px 7px 20px 0 rgba(0,0,0,.1),4px 4px 5px 0 rgba(0,0,0,.1);outline:none}.btn-5[data-v-4e642764],.custom-btn[data-v-4e642764]{width:130px;height:40px}.btn-5[data-v-4e642764]{text-align:center;line-height:42px;padding:0;border:none;background:#ff1b00;background:linear-gradient(0deg,#ff1b00,#fb4b02)}.btn-5[data-v-4e642764]:hover{color:#f0094a;background:transparent;box-shadow:none}.btn-5[data-v-4e642764]:after,.btn-5[data-v-4e642764]:before{content:"";position:absolute;top:0;right:0;height:2px;width:0;background:#f0094a;box-shadow:-1px -1px 5px 0 #fff,7px 7px 20px 0 rgba(0,0,0,.2),4px 4px 5px 0 rgba(0,0,0,.13333333333333333);transition:all .4s ease}.btn-5[data-v-4e642764]:after{right:inherit;top:inherit;left:0;bottom:0}.btn-5[data-v-4e642764]:hover:after,.btn-5[data-v-4e642764]:hover:before{width:100%;transition:all .8s ease}@media screen and (max-width:1270px){.header[data-v-4e642764]{width:90px}.bas-page .custom-btn[data-v-4e642764],.bas-page img[data-v-4e642764],.recherche input[data-v-4e642764],.rubrique .links_name[data-v-4e642764]{display:none}}',""]),n.locals={},t.exports=n},292:function(t,e,r){"use strict";r.r(e);r(38);var n=[function(){var t=this._self._c;return t("div",{staticClass:"logo_content"},[t("img",{attrs:{src:r(288),alt:"logo",srcset:""}}),t("hr")])}],o=r(11),l=(r(65),{name:"SideBar",auth:!0,methods:{logout:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$auth.logout(),t.$router.push("/login");case 2:case"end":return e.stop()}}),e)})))()}}}),d=(r(290),r(46)),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return 1==t.$auth.loggedIn?e("div",{staticClass:"nav"},[e("link",{attrs:{href:"https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css",rel:"stylesheet"}}),t._v(" "),e("div",{staticClass:"header"},[t._m(0),t._v(" "),e("ul",{staticClass:"nav_list"},[e("div",{staticClass:"recherche"},[e("li",[e("NuxtLink",{attrs:{to:""}},[e("i",{staticClass:"bx bx-search"}),t._v(" "),e("input",{attrs:{type:"text",placeholder:"Rechercher..."}})])],1)]),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/dashboard"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-grid-alt"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Tableau de bord")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/achatVente"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-cart-add"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Achats & Ventes")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/ventes/list_vente"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-save"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Factures des ventes")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/clients/list_client"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-list-ul"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Liste des clients")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/fournisseurs/list_fournisseur"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bx-list-ul"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Liste des fournisseurs")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/produits/list_produit"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxl-product-hunt"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Liste des Produits")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/categorie/list_categorie"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-data"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Toutes les Catégories")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/compagnies/list_compagnie"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-shopping-bags"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Compagnies")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/profils/profil"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-group"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Utilisateurs")])])])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/corbeille"}},[e("div",{staticClass:"rubrique"},[e("i",{staticClass:"bx bxs-trash"}),t._v(" "),e("span",{staticClass:"links_name"},[t._v("Corbeille")])])])],1),t._v(" "),e("div",{staticClass:"bas-page"},[e("img",{attrs:{src:r(289),alt:"logo",srcset:""}}),t._v(" "),e("span",{staticClass:"user_name"},[t._v(t._s(t.$auth.user.name))]),t._v(" "),e("div",{staticClass:"custom-btn btn-5",on:{click:t.logout}},[t._v("\r\n                    Déconnexion")])])])])]):t._e()}),n,!1,null,"4e642764",null);e.default=component.exports},334:function(t,e,r){var content=r(379);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(114).default)("32f0c52c",content,!0,{sourceMap:!1})},378:function(t,e,r){"use strict";r(334)},379:function(t,e,r){var n=r(113)((function(i){return i[1]}));n.push([t.i,".bx[data-v-0d1c2790]{font-size:55px}.case1[data-v-0d1c2790]{border:2px solid #03a103;color:#080000}.case1[data-v-0d1c2790],.case2[data-v-0d1c2790]{margin:5%;padding:6% 5%;cursor:pointer;font-size:12px;text-align:center}.case2[data-v-0d1c2790]{border:2px solid #f03629;color:#0c0000}.case1[data-v-0d1c2790]:hover{background-color:#92f187}.case1[data-v-0d1c2790]:hover,.case2[data-v-0d1c2790]:hover{border:1px solid transparent;color:#000}.case2[data-v-0d1c2790]:hover{background-color:#ff6262}",""]),n.locals={},t.exports=n},450:function(t,e,r){"use strict";r.r(e);var n={components:{SideBar:r(292).default}},o=(r(378),r(46)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"contain"},[e("SideBar"),t._v(" "),e("div",{staticClass:"zone"},[e("div",{staticClass:"titre"},[t._v("\r\n            Achats & Ventes\r\n        ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/achats/achat"}},[e("div",{staticClass:"case1"},[e("i",{staticClass:"bx bx-cart-add"}),e("br"),e("br"),t._v("        \r\n                    Effectuer un achat   \r\n                ")])]),t._v(" "),e("hr"),t._v(" "),e("NuxtLink",{attrs:{to:"/ventes/vente"}},[e("div",{staticClass:"case2"},[e("i",{staticClass:"bx bx-export"}),e("br"),e("br"),t._v("   \r\n                    Effectuer une vente\r\n                ")])])],1)],1)}),[],!1,null,"0d1c2790",null);e.default=component.exports}}]);