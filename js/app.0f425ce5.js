(function(t){function s(s){for(var a,n,o=s[0],c=s[1],l=s[2],u=0,p=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&p.push(i[n][0]),i[n]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(s);while(p.length)p.shift()();return r.push.apply(r,l||[]),e()}function e(){for(var t,s=0;s<r.length;s++){for(var e=r[s],a=!0,o=1;o<e.length;o++){var c=e[o];0!==i[c]&&(a=!1)}a&&(r.splice(s--,1),t=n(n.s=e[0]))}return t}var a={},i={app:0},r=[];function n(s){if(a[s])return a[s].exports;var e=a[s]={i:s,l:!1,exports:{}};return t[s].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=a,n.d=function(t,s,e){n.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:e})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,s){if(1&s&&(t=n(t)),8&s)return t;if(4&s&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var a in t)n.d(e,a,function(s){return t[s]}.bind(null,a));return e},n.n=function(t){var s=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(s,"a",s),s},n.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},n.p="/portfolio/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=s,o=o.slice();for(var l=0;l<o.length;l++)s(o[l]);var d=c;r.push([0,"chunk-vendors"]),e()})({0:function(t,s,e){t.exports=e("56d7")},"04f7":function(t,s,e){"use strict";e("1da6")},"0b48":function(t,s,e){},"0bd1":function(t,s,e){"use strict";e("0b48")},"1da6":function(t,s,e){},"56d7":function(t,s,e){"use strict";e.r(s);e("e675"),e("5bd3"),e("b17c"),e("93ec");var a=e("56ba"),i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"app container-fluid",attrs:{id:"app"}},[e("div",{staticClass:"-content"},[e("Loader"),e("Profile")],1)])},r=[],n=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{attrs:{id:"loader-container"}},[e("div",{staticClass:"containers"},[e("div",{staticClass:"nes-container is-rounded is-centered",attrs:{id:"loading-dialog"}},[e("p",{attrs:{id:"loading-message"}},[t._v("Initializing...")])])])])}],c=(e("0bd1"),e("3583")),l={},d=Object(c["a"])(l,n,o,!1,null,"0e459a24",null),u=d.exports,p=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"main-screen",attrs:{id:"main-container"}},[e("section",{staticClass:"animated fadeIn nes-container",attrs:{id:"profile-container"}},[e("div",{staticClass:"containers"},[e("div",{staticClass:"nes-container is-rounded is-centered"},[e("img",{attrs:{id:"profile-logo",src:"img/jcc_logo.png",width:"200",alt:"My Logo"}}),e("br"),e("br"),e("ul",{staticClass:"profile-list"},[e("li",[t._v("Lazy Geek & "),e("a",{attrs:{href:"#"},on:{click:t.showProjects}},[t._v("Developer")])]),e("li",[t._v(" for Android & Web.")]),e("br"),e("li",[t._v(" I love "),e("a",{attrs:{href:"#"},on:{click:t.showSpotify}},[t._v(" music")]),t._v("! ")]),e("br")]),t._m(0),t._m(1),t._m(2),t._m(3),e("br"),e("br"),e("p",{staticStyle:{"font-size":"11px"}},[t._v(" This page is made with")]),e("p",{staticStyle:{"font-size":"9px"}},[e("button",{staticClass:"used-assets-btn nes-btn",attrs:{onclick:"goToUrl('https://vuejs.org')",type:"button"}},[t._v("VueJS")]),e("button",{staticClass:"used-assets-btn nes-btn",attrs:{onclick:"goToUrl('https://nostalgic-css.github.io/NES.css/')",type:"button"}},[t._v("NES.css")]),e("button",{staticClass:"used-assets-btn nes-btn",attrs:{onclick:"goToUrl('https://graphql.org')",type:"button"}},[t._v("GraphQL")]),e("br"),e("br"),e("span",{staticStyle:{"font-size":"9px"}},[e("a",{attrs:{href:"javascript:goToUrl('https://github.com/jcchikikomori/portfolio/releases')"}},[t._v("v"+t._s(t.app_version))]),t._v(" | "),e("a",{staticStyle:{"font-size":"9px"},attrs:{target:"_blank",href:"v1"}},[t._v("Visit old version")])]),e("br"),e("br")])])]),e("br"),t._m(4),e("Projects"),e("Spotify"),e("Updates")],1)])},f=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"nes-btn",attrs:{onclick:"goToUrl('https://johncyrillcorsanes.medium.com')",id:"medium-btn",type:"button"}},[e("i",{staticClass:"nes-icon medium"}),t._v(" "),e("span",[t._v("Medium")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"nes-btn",attrs:{onclick:"goToUrl('https://linkedin.com/in/johncyrillcorsanes')",id:"linkedin-btn",type:"button"}},[e("i",{staticClass:"nes-icon linkedin"}),t._v(" "),e("span",[t._v("LinkedIn")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"nes-btn",attrs:{onclick:"goToUrl('https://github.com/jcchikikomori')",id:"github-btn",type:"button"}},[e("i",{staticClass:"nes-icon github"}),t._v(" "),e("span",[t._v("GitHub")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"nes-btn",attrs:{onclick:"goToUrl('https://www.youtube.com/user/jcstriker1')",id:"youtube-btn",type:"button"}},[e("i",{staticClass:"nes-icon youtube"}),t._v(" "),e("span",[t._v("YouTube")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"containers"},[e("div",{staticClass:"nes-container is-rounded",attrs:{id:"post-container"}},[e("div",{attrs:{id:"all-post"}})])])}],m=e("c5f4"),v=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},b=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"projects-container"}},[e("dialog",{staticClass:"nes-dialog is-rounded",attrs:{id:"dialog-projects"}},[e("form",{attrs:{method:"dialog"}},[e("h5",{staticClass:"title"},[t._v("Projects & Contributions")]),e("p",{staticClass:"subtitle"},[t._v("See more by "),e("a",{attrs:{href:"javascript:goToUrl('https://github.com/jcchikikomori')"}},[t._v("contacting me")]),t._v(" for my CV!")]),e("div",{staticClass:"card-group"},[e("div",{staticClass:"card"},[e("img",{staticClass:"card-img-top",attrs:{src:"img/projects/placeholder.png",alt:"php7-starter",onclick:"goToUrl('https://github.com/jcchikikomori/php7-starter')"}}),e("div",{staticClass:"card-body"},[e("h6",{staticClass:"card-title"},[t._v("php-starter")]),e("p",{staticClass:"card-text"},[t._v("Pure & naked PHP micro-framework. Perfect for prototypes.")]),e("p",{staticClass:"card-text"},[e("small",{staticClass:"text-muted"},[t._v("2017-present")])])])]),e("div",{staticClass:"card"},[e("img",{staticClass:"card-img-top",attrs:{src:"img/projects/placeholder.png",alt:"PayMaya",onclick:"goToUrl('https://github.com/jcchikikomori?org=PayMaya&year_list=1')"}}),e("div",{staticClass:"card-body"},[e("h6",{staticClass:"card-title"},[t._v("PayMaya")]),e("p",{staticClass:"card-text"},[t._v("Contributed the issues & fixes for their SDKs.")]),e("p",{staticClass:"card-text"},[e("small",{staticClass:"text-muted"},[t._v("2020-present")])])])]),e("div",{staticClass:"card"},[e("img",{staticClass:"card-img-top",attrs:{src:"img/projects/placeholder.png",alt:"GCash",onclick:"goToUrl('https://www.gcash.com')"}}),e("div",{staticClass:"card-body"},[e("h6",{staticClass:"card-title"},[t._v("GCash")]),e("p",{staticClass:"card-text"},[t._v("For online payment integration on several private projects.")])])]),e("div",{staticClass:"card"},[e("img",{staticClass:"card-img-top",attrs:{src:"img/projects/covemanila.png",alt:"Cove Manila",onclick:"goToUrl('https://covemanila.com')"}}),e("div",{staticClass:"card-body"},[e("h6",{staticClass:"card-title"},[t._v("Cove Manila 2019 Project")]),e("p",{staticClass:"card-text"},[e("small",{staticClass:"text-muted"},[t._v("2019")])])])]),e("div",{staticClass:"card"},[e("img",{staticClass:"card-img-top",attrs:{src:"img/projects/mcdelivery.png",alt:"McDelivery PH",onclick:"goToUrl('https://mcdelivery.com.ph')"}}),e("div",{staticClass:"card-body"},[e("h6",{staticClass:"card-title"},[t._v("McDelivery PH for Android")]),e("p",{staticClass:"card-text"},[e("small",{staticClass:"text-muted"},[t._v("2019 - 2021")])])])])]),e("menu",{staticClass:"dialog-menu"},[e("button",{staticClass:"nes-btn is-primary"},[t._v("Okay")])])])])])}],h={name:"Projects",components:{}},g=h,_=(e("04f7"),Object(c["a"])(g,v,b,!1,null,"662378be",null)),y=_.exports,C=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},j=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"spotify-container"}},[e("dialog",{staticClass:"nes-dialog is-rounded",attrs:{id:"dialog-spotify"}},[e("form",{attrs:{method:"dialog"}},[e("p",{staticClass:"title"},[t._v("My Party Box")]),e("p",{staticClass:"subtitle"},[t._v("powered by Spotify")]),e("iframe",{staticClass:"spotify-iframe",attrs:{title:"My Party Box",src:"https://open.spotify.com/embed/playlist/64mrMELI7nTWZWbYAww4Zv",width:"450",height:"250",allow:"encrypted-media"}}),e("menu",{staticClass:"dialog-menu"},[e("button",{staticClass:"nes-btn is-primary"},[t._v("Close")])])])])])}],k={name:"Spotify",components:{}},w=k,x=(e("f21a"),Object(c["a"])(w,C,j,!1,null,"136a60ca",null)),P=x.exports,S=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"update-container"}})},T=[],E={},O=Object(c["a"])(E,S,T,!1,null,null,null),M=O.exports,U=e("9224"),$=U["a"],I={name:"Profile",components:{Projects:y,Spotify:P,Updates:M},methods:{showProjects:function(){var t=document.getElementById("dialog-projects");m["a"].registerDialog(t),t.showModal()},showSpotify:function(){var t=document.getElementById("dialog-spotify");m["a"].registerDialog(t),t.showModal()}},data:function(){return{app_version:$}}},L=I,z=Object(c["a"])(L,p,f,!1,null,null,null),D=z.exports,G={name:"app",components:{Loader:u,Profile:D}},B=G,H=(e("5c0b"),Object(c["a"])(B,i,r,!1,null,null,null)),J=H.exports,A=e("e800");a["a"].use(A["a"]);var N=new A["a"].Store({state:{},mutations:{},actions:{}});e("0dc1");a["a"].config.productionTip=!1,new a["a"]({store:N,render:function(t){return t(J)}}).$mount("#app")},"5c0b":function(t,s,e){"use strict";e("b576")},"785c":function(t,s,e){},9224:function(t){t.exports=JSON.parse('{"a":"2.5.3"}')},b576:function(t,s,e){},f21a:function(t,s,e){"use strict";e("785c")}});
//# sourceMappingURL=app.0f425ce5.js.map