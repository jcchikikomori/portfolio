if(!self.define){let o,i={};const e=(e,r)=>(e=new URL(e+".js",r).href,i[e]||new Promise((i=>{if("document"in self){const o=document.createElement("script");o.src=e,o.onload=i,document.head.appendChild(o)}else o=e,importScripts(e),i()})).then((()=>{let o=i[e];if(!o)throw new Error(`Module ${e} didn’t register its module`);return o})));self.define=(r,l)=>{const f=o||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let s={};const c=o=>e(o,f),n={module:{uri:f},exports:s,require:c};i[f]=Promise.all(r.map((o=>n[o]||c(o)))).then((o=>(l(...o),s)))}}define(["./workbox-79d57327"],(function(o){"use strict";o.setCacheNameDetails({prefix:"portfolio"}),self.addEventListener("message",(o=>{o.data&&"SKIP_WAITING"===o.data.type&&self.skipWaiting()})),o.precacheAndRoute([{url:"/portfolio/css/animate.css",revision:"8dbef457c728dd154ff30186b0dc0455"},{url:"/portfolio/css/app.d5bed609.css",revision:null},{url:"/portfolio/css/bootstrap.min.css",revision:"8a7442ca6bedd62cec4881040b9a9e83"},{url:"/portfolio/css/chunk-vendors.a6dc97ec.css",revision:null},{url:"/portfolio/css/dialog-polyfill.css",revision:"25ed5309ec766a20117e71237ae2cdf1"},{url:"/portfolio/css/jquery.fancybox.css",revision:"0f01f9661df1a7465116439eaf1f176c"},{url:"/portfolio/css/theme.min.css",revision:"0a0f3e77aa72fb599a15ccda3517054b"},{url:"/portfolio/css/variables.less",revision:"7b24f108d07f11447380f1029fcd55be"},{url:"/portfolio/fonts/glyphicons-halflings-regular.eot",revision:"7ad17c6085dee9a33787bac28fb23d46"},{url:"/portfolio/fonts/glyphicons-halflings-regular.svg",revision:"32941d6330044744c02493835b799e90"},{url:"/portfolio/fonts/glyphicons-halflings-regular.ttf",revision:"e49d52e74b7689a0727def99da31f3eb"},{url:"/portfolio/fonts/glyphicons-halflings-regular.woff",revision:"68ed1dac06bf0409c18ae7bc62889170"},{url:"/portfolio/img/chatgenie.3ec22b00.png",revision:null},{url:"/portfolio/img/covemanila.433e8993.png",revision:null},{url:"/portfolio/img/jcc_logo.png",revision:"dcc4e2a39073d8bdce7bf4ef5a95271d"},{url:"/portfolio/img/jcc_logo_og.jpg",revision:"a5a6c63a737a02438ce179d5cbbbb03c"},{url:"/portfolio/img/jcc_logo_w.png",revision:"c901a3a092bc3f4d68458bd8ecd1dfec"},{url:"/portfolio/img/large/01.jpg",revision:"d8c1b01976c7ea6e24931b9379f1c4c7"},{url:"/portfolio/img/large/02.jpg",revision:"f8197b70e8f08087b7795693d5d42dc1"},{url:"/portfolio/img/large/03.jpg",revision:"075542e6293eacb6abe83f806654dc3c"},{url:"/portfolio/img/large/04.jpg",revision:"45c1fd47776399d657ed25112b1710ad"},{url:"/portfolio/img/large/05.jpg",revision:"e3e92a90558a8b15bd4b3605b107f165"},{url:"/portfolio/img/large/06.jpg",revision:"1318146789351e34112657721680ff28"},{url:"/portfolio/img/large/07.jpg",revision:"781c2bb0c1f230c4d4ea7339f84132d9"},{url:"/portfolio/img/large/08.jpg",revision:"29f2304751f932a1ed2b80e9004b448c"},{url:"/portfolio/img/large/jccworld-banner.png",revision:"84f5e2e18f6a7fa77821d22cee882e04"},{url:"/portfolio/img/mcdelivery.faf9ccba.png",revision:null},{url:"/portfolio/img/miniprogram.814b345b.png",revision:null},{url:"/portfolio/img/myavatar.jpg",revision:"451a5751e754bf3050ff6dcdb8078817"},{url:"/portfolio/img/placeholder.dfcd55e3.png",revision:null},{url:"/portfolio/img/projects/chatgenie.png",revision:"9104f500af9607a8a506e9133d28ca83"},{url:"/portfolio/img/projects/covemanila.png",revision:"5c7888af0e340fc408cf9430b50d4506"},{url:"/portfolio/img/projects/mcdelivery.png",revision:"ceeeeda78c91eb5824d24dd1b458e4f3"},{url:"/portfolio/img/projects/miniprogram.png",revision:"16f8b0af9062d3d4652c2edcb0f2fd08"},{url:"/portfolio/img/projects/placeholder.png",revision:"dfb47be057bf89292539bca2f2bd8aff"},{url:"/portfolio/index.html",revision:"05b5dff8e90758dbb34bba6b2fb35eec"},{url:"/portfolio/js/app.01f378fa.js",revision:null},{url:"/portfolio/js/chunk-vendors.a98fe15d.js",revision:null},{url:"/portfolio/js/modernizr.custom.js",revision:"65c9d60169b469ada1e5efd542c3f82e"},{url:"/portfolio/manifest.json",revision:"1770c2524b653c4741436956a1f7f256"},{url:"/portfolio/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
