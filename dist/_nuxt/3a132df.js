(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{288:function(t,e,r){t.exports=r.p+"img/logo.3a02bb7.png"},294:function(t,e,r){var content=r(298);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(114).default)("6d62e02b",content,!0,{sourceMap:!1})},295:function(t,e,r){t.exports=r.p+"img/icon2.1689361.png"},297:function(t,e,r){"use strict";r(294)},298:function(t,e,r){var o=r(113)((function(i){return i[1]}));o.push([t.i,"body[data-v-0014c8d1]{background-color:#bfc0c5}.container[data-v-0014c8d1]{border:1px solid transparent;background-color:#fff;width:70%;margin-left:15%;margin-top:4%;border-radius:10px}form img[data-v-0014c8d1]{padding-left:25%;width:250px}.flex[data-v-0014c8d1]{display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;padding:3%}.w-full[data-v-0014c8d1]{flex-basis:50%;min-width:350px}.error-message[data-v-0014c8d1]{border:1px solid transparent;color:red;font-size:15px;text-align:center;font-weight:700;margin-top:5%}",""]),o.locals={},t.exports=o},309:function(t,e,r){"use strict";r.r(e);var o=[function(){var t=this._self._c;return t("div",{staticClass:"w-full"},[t("img",{attrs:{src:r(295),alt:"landing image"}})])}],n=r(11),l=(r(65),{middleware:"auth",data:function(){return{error:"",form:{email:"",password:""}}},methods:{refresh:function(){var t=this;this.$axios.post("/authentifier",{data:this.form}).then((function(e){console.log(e.data.message),"error"==e.data.status&&(t.error=e.data.message)}))},login:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log(t.$auth),console.log("--------------------------uhukh-------------------------------"),e.next=5,t.$auth.loginWith("local",{data:t.form});case 5:r=e.sent,t.$auth.setUserToken(r.data.data.original.access_token).then((function(e){t.$router.push("/dashboard")})),console.log(t.$auth),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),t.refresh();case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()}}}),c=(r(297),r(46)),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("div",{staticClass:"flex items-center justify-center"},[t._m(0),t._v(" "),e("div",{staticClass:"w-full max-w-md mt-10"},[e("form",{ref:"loginform",staticClass:"bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"},[e("img",{attrs:{src:r(288),alt:"logo image"}}),t._v(" "),e("div",{staticClass:"text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"}),t._v(" "),e("div",{staticClass:"mb-4"},[e("label",{staticClass:"block text-gray-700 text-sm font-normal mb-2",attrs:{for:"username"}},[t._v("\r\n                    Email\r\n                  ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",attrs:{name:"email",type:"email",required:"",autofocus:"",placeholder:"Email"},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}})]),t._v(" "),e("div",{staticClass:"mb-6"},[e("label",{staticClass:"block text-gray-700 text-sm font-normal mb-2",attrs:{for:"password"}},[t._v("                \r\n                    Password\r\n                  ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",attrs:{type:"password",placeholder:"Password",name:"password",required:"",autocomplete:"current-password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})]),t._v(" "),e("div",{staticClass:"flex items-center justify-between"},[e("button",{staticClass:"px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.login()}}},[t._v("Connexion")]),t._v(" "),e("a",{staticClass:"inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800",attrs:{href:"#"}},[t._v("               \r\n                  Mot de passe oublié ?\r\n                  ")]),t._v(" "),e("NuxtLink",{staticClass:"inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800 mt-8",attrs:{to:"/register"}},[t._v("               \r\n                  Vous n'avez pas de compte ?\r\n                  ")])],1),t._v(" "),e("div",{staticClass:"error-message"},[t._v("\r\n                    "+t._s(t.error)+"\r\n                ")])]),t._v(" "),e("p",{staticClass:"text-center text-gray-500 text-xs"})])])])}),o,!1,null,"0014c8d1",null);e.default=component.exports}}]);