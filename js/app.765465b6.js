(function(){"use strict";var t={362:function(t,i,n){var s=n(896),e=function(){var t=this,i=t._self._c;return i("div",{staticClass:"app container-fluid",attrs:{id:"app"}},[i("div",{staticClass:"-content"},[i("LoaderComponent"),i("ProfileComponent")],1)])},a=[],o=function(){var t=this;t._self._c;return t._m(0)},r=[function(){var t=this,i=t._self._c;return i("section",{attrs:{id:"loader-container"}},[i("div",{staticClass:"containers"},[i("div",{staticClass:"nes-container is-centered",attrs:{id:"loading-dialog"}},[i("p",{attrs:{id:"loading-message"}},[t._v("Initializing...")])])])])}],c={name:"LoaderComponent"},l=c,d=n(26),p=(0,d.Z)(l,o,r,!1,null,"40c7d5d5",null),u=p.exports,f=function(){var t=this,i=t._self._c;return i("div",{staticClass:"main-screen",attrs:{id:"main-container"}},[i("section",{staticClass:"nes-container animate__animated animate__fadeIn animate__faster",attrs:{id:"profile-container"}},[i("div",{staticClass:"containers"},[i("div",{staticClass:"nes-container is-centered"},[i("img",{attrs:{id:"profile-logo",src:"img/jcc_logo.png",width:"200",alt:"My Logo"}}),i("br"),i("br"),i("p",[t._v("@jcchikikomori")]),i("ul",{staticClass:"profile-list"},[i("li",[t._v(" Lazy Geek & Developer, ")]),i("li",[t._v("and i love "),i("a",{attrs:{href:"#"},on:{click:t.showSpotify}},[t._v(" music")]),t._v("!")]),i("br"),i("li",[i("a",{attrs:{href:"#"},on:{click:t.showProjects}},[t._v("My Career")])])]),i("button",{staticClass:"nes-btn",attrs:{id:"linkedin-btn",type:"button"},on:{click:function(i){return t.goToUrl("https://linkedin.com/in/johncyrillcorsanes")}}},[i("em",{staticClass:"nes-icon linkedin"}),t._v(" "),i("span",[t._v("LinkedIn")])]),i("button",{staticClass:"nes-btn",attrs:{id:"github-btn",type:"button"},on:{click:function(i){return t.goToUrl("https://github.com/jcchikikomori")}}},[i("em",{staticClass:"nes-icon github"}),t._v(" "),i("span",[t._v("GitHub")])]),i("button",{staticClass:"nes-btn",attrs:{id:"youtube-btn",type:"button"},on:{click:function(i){return t.goToUrl("https://www.youtube.com/user/jcstriker1")}}},[i("em",{staticClass:"nes-icon youtube"}),t._v(" "),i("span",[t._v("YouTube")])]),i("br"),i("br"),i("p",[i("span",{staticStyle:{"font-size":"9px"}},[i("a",{attrs:{href:"#"},on:{click:function(i){return t.goToUrl("https://github.com/jcchikikomori/portfolio/releases/tag/v"+t.app_version)}}},[t._v(" v"+t._s(t.app_version)+" ")])])]),i("p",[i("span",{staticStyle:{"font-size":"9px"}},[i("a",{attrs:{href:"#"},on:{click:function(i){return t.goToUrl("https://jcchikikomori.github.io/blog")}}},[t._v("Visit my blog!")])])])])]),i("br"),t._m(0),i("ProjectsComponent"),i("SpotifyComponent"),i("UpdatesComponent")],1)])},m=[function(){var t=this,i=t._self._c;return i("div",{staticClass:"containers"},[i("div",{staticClass:"nes-container",attrs:{id:"post-container"}},[i("div",{attrs:{id:"all-post"}})])])}],h=n(691),v=function(){var t=this,i=t._self._c;return i("div",{attrs:{id:"projects-container"}},[i("dialog",{staticClass:"nes-dialog animate__animated animate__bounceInDown animate__faster",attrs:{id:"dialog-projects"}},[i("form",{attrs:{method:"dialog"}},[i("h1",{staticClass:"title"},[t._v("My Career History")]),i("p",{staticClass:"subtitle"},[t._v(" See more by "),i("a",{on:{click:function(i){return t.goToUrl("https://github.com/jcchikikomori")}}},[t._v("contacting me")]),t._v(" for my CV! ")]),i("div",{staticClass:"card-group"},[i("div",{staticClass:"card"},[i("div",{staticClass:"card-img-top chatgenie",attrs:{alt:"Chatgenie.ph"},on:{click:function(i){return t.goToUrl("https://chatgenie.ph")}}}),t._m(0)]),i("div",{staticClass:"card"},[i("div",{staticClass:"card-img-top hello-php",attrs:{alt:"php7-starter"},on:{click:function(i){return t.goToUrl("https://github.com/jcchikikomori/hello-php")}}}),t._m(1)]),i("div",{staticClass:"card"},[i("div",{staticClass:"card-img-top gcash-miniprogram",attrs:{alt:"GCash Mini Program"},on:{click:function(i){return t.goToUrl("https://miniprogram.gcash.com")}}}),t._m(2)]),i("div",{staticClass:"card"},[i("div",{staticClass:"card-img-top covemanila",attrs:{alt:"Cove Manila"},on:{click:function(i){return t.goToUrl("https://covemanila.com")}}}),t._m(3)]),i("div",{staticClass:"card"},[i("div",{staticClass:"card-img-top mcdelivery",attrs:{alt:"McDelivery PH"},on:{click:function(i){return t.goToUrl("https://mcdelivery.com.ph")}}}),t._m(4)])]),t._m(5)])])])},g=[function(){var t=this,i=t._self._c;return i("div",{staticClass:"card-body"},[i("h6",{staticClass:"card-title"},[t._v("Chatgenie.ph")]),i("p",{staticClass:"card-text"},[t._v(" Developed some integrations for Chatgenie.ph Such as GCash (GLife), Viber, Facebook & Instagram ")]),i("p",{staticClass:"card-text"},[i("small",{staticClass:"text-muted"},[t._v("2019-2022")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"card-body"},[i("h6",{staticClass:"card-title"},[t._v("hello-php")]),i("p",{staticClass:"card-text"},[t._v(" For protyping PHP app with user authentication ")]),i("p",{staticClass:"card-text"},[i("small",{staticClass:"text-muted"},[t._v("2017-present")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"card-body"},[i("h6",{staticClass:"card-title"},[t._v("GCash Mini Program")]),i("p",{staticClass:"card-text"},[t._v(" For serving Chatgenie merchants for GLife"),i("br")]),i("p",{staticClass:"card-text"},[i("small",{staticClass:"text-muted"},[t._v("2020-2022")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"card-body"},[i("h6",{staticClass:"card-title"},[t._v("Cove Manila WordPress Project")]),i("p",{staticClass:"card-text"},[i("small",{staticClass:"text-muted"},[t._v("2019")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"card-body"},[i("h6",{staticClass:"card-title"},[t._v("McDelivery PH for Android")]),i("p",{staticClass:"card-text"},[i("small",{staticClass:"text-muted"},[t._v("2019 - 2021")])])])},function(){var t=this,i=t._self._c;return i("menu",{staticClass:"dialog-menu"},[i("button",{staticClass:"nes-btn is-primary is-block"},[t._v("Okay")])])}],_=n(940),C=n.n(_),b={name:"ProjectsComponent",components:{},methods:{goToUrl:function(t,i=!0){C()("#redirect").attr("href",t),i?C()("#redirect").attr("target","_blank"):C()("#redirect").attr("target",null),C()("#redirect")[0].click()}}},y=b,k=(0,d.Z)(y,v,g,!1,null,null,null),w=k.exports,j=function(){var t=this;t._self._c;return t._m(0)},x=[function(){var t=this,i=t._self._c;return i("div",{attrs:{id:"spotify-container"}},[i("dialog",{staticClass:"nes-dialog animate__animated animate__bounceInUp animate__faster",attrs:{id:"dialog-spotify"}},[i("form",{attrs:{method:"dialog"}},[i("p",{staticClass:"title"},[t._v("My Party Box")]),i("p",{staticClass:"subtitle"},[t._v("powered by Spotify")]),i("iframe",{staticClass:"spotify-iframe",attrs:{title:"My Party Box",src:"https://open.spotify.com/embed/playlist/4Y2LRSUHUvBtO3VEjtnD6x?si=374e9d80a4f34f51",width:"450",height:"450",allow:"encrypted-media"}}),i("menu",{staticClass:"dialog-menu"},[i("button",{staticClass:"nes-btn is-primary"},[t._v("Close")])])])])])}],P={name:"SpotifyComponent",components:{}},T=P,U=(0,d.Z)(T,j,x,!1,null,"4593c8e8",null),M=U.exports,S=function(){var t=this,i=t._self._c;return i("div",{attrs:{id:"update-container"}})},O=[],L={name:"UpdatesComponent",components:{}},Z=L,F=(0,d.Z)(Z,S,O,!1,null,null,null),D=F.exports,I={i8:"2.7.1"};const G=I.i8;var H={name:"ProfileComponent",components:{ProjectsComponent:w,SpotifyComponent:M,UpdatesComponent:D},methods:{goToUrl:function(t,i=!0){C()("#redirect").attr("href",t),i?C()("#redirect").attr("target","_blank"):C()("#redirect").attr("target",null),C()("#redirect")[0].click()},showProjects:function(){let t=document.getElementById("dialog-projects");h.Z.registerDialog(t),t.showModal(),t.classList.add("-is-open"),t.scrollTo({top:0,behavior:"smooth"})},showSpotify:function(){let t=document.getElementById("dialog-spotify");h.Z.registerDialog(t),t.showModal(),t.classList.remove("-is-open")}},data(){return{app_version:G}}},B=H,E=(0,d.Z)(B,f,m,!1,null,null,null),z=E.exports,A={name:"App",components:{LoaderComponent:u,ProfileComponent:z},methods:{}},V=A,q=(0,d.Z)(V,e,a,!1,null,null,null),Y=q.exports,J=n(874);s.ZP.use(J.ZP);var N=new J.ZP.Store({state:{},mutations:{},actions:{}});s.ZP.config.productionTip=!1,window.onload=function(){const t="#212529";window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(C()("body").css("background",t),C()("#profile-logo").attr("src","img/jcc_logo_w.png"),C()(".nes-container").each((function(){C()(this).addClass("is-dark")})),C()(".nes-dialog").each((function(){C()(this).addClass("is-dark")}))):(C()("body").css("background","#FFF"),C()("#profile-logo").attr("src","img/jcc_logo.png"),C()(".nes-container").each((function(){C()(this).removeClass("is-dark")})),C()(".nes-dialog").each((function(){C()(this).removeClass("is-dark")}))),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(i=>{const n=i.matches?"dark":"light";"dark"==n?(C()("body").css("background",t),C()(".nes-container").each((function(){C()(this).addClass("is-dark"),C()("#profile-logo").attr("src","img/jcc_logo_w.png")}))):(C()("body").css("background","#FFF"),C()(".nes-container").each((function(){C()(this).removeClass("is-dark"),C()("#profile-logo").attr("src","img/jcc_logo.png")})))}));const i={init:function(){return C().ajax({url:"https://jcc-portfolio-api.herokuapp.com/graphql",contentType:"application/json",type:"POST",data:JSON.stringify({query:"{\n                  allPost {\n                    id\n                    title\n                    description\n                    createdAt\n                  }\n                }"}),timeout:5e3,success:function(t){let n=t.data,s=n.allPost,e="";for(let i=0;i<s.length;i++){let t=s[i];e+='<div id="post-'+t.id+'" class="post-list is-centered"><p class="post-title">'+t.title+'</p><p class="post-sentence">'+t.description+"</p></div>"}s.length>0?(C()("#all-post").html(e),C()("#update-container").show()):C()("#all-post").parent().hide(),console.log("done loading posts.."),i.finishSetup()},error:function(){C()("#all-post").html(""),C()("#all-post").parent().hide(),console.log("error loading posts.."),C()("#main-container").removeAttr("hidden"),i.finishSetup()}})},finishSetup:function(){C()("#loader-container").hide(),C()("#profile-container").show()}};let n=i;C()("#profile-container").is(":hidden")&&(C()("#loading-message").text("Load shenanigans..."),n.init())},new s.ZP({store:N,render:t=>t(Y)}).$mount("#app")}},i={};function n(s){var e=i[s];if(void 0!==e)return e.exports;var a=i[s]={exports:{}};return t[s].call(a.exports,a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(i,s,e,a){if(!s){var o=1/0;for(d=0;d<t.length;d++){s=t[d][0],e=t[d][1],a=t[d][2];for(var r=!0,c=0;c<s.length;c++)(!1&a||o>=a)&&Object.keys(n.O).every((function(t){return n.O[t](s[c])}))?s.splice(c--,1):(r=!1,a<o&&(o=a));if(r){t.splice(d--,1);var l=e();void 0!==l&&(i=l)}}return i}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[s,e,a]}}(),function(){n.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(i,{a:i}),i}}(),function(){n.d=function(t,i){for(var s in i)n.o(i,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){var t={143:0};n.O.j=function(i){return 0===t[i]};var i=function(i,s){var e,a,o=s[0],r=s[1],c=s[2],l=0;if(o.some((function(i){return 0!==t[i]}))){for(e in r)n.o(r,e)&&(n.m[e]=r[e]);if(c)var d=c(n)}for(i&&i(s);l<o.length;l++)a=o[l],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(d)},s=self["webpackChunkportfolio"]=self["webpackChunkportfolio"]||[];s.forEach(i.bind(null,0)),s.push=i.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(362)}));s=n.O(s)})();
//# sourceMappingURL=app.765465b6.js.map