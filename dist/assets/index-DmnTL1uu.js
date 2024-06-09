import{c as $,o as B,f as D,A as K,p as b,i as U,d as z,h as R,J as w,j as g,S as G,r as J,K as V,t as _,X,Y,Z as E}from"./index-CmTQ9jXQ.js";import{h as Z}from"./index-4Sxdhovw.js";var F=_('<nav><button id=start-button><span id=button-text class="select-none text-base tracking-wide text-neutral-100">Train Model'),I=_('<main class="container relative mx-auto flex min-h-[2200px] max-w-5xl flex-col items-center justify-start"><nav><button id=start-button><span id=button-text class="select-none text-base tracking-wide text-neutral-100">Pick Color</span></button></nav><input id=hidden-input hx-trigger=send-color hx-target=#output type=hidden name=colors><section class="mt-12 flex min-h-96 w-full justify-center"><article class="mb-28 mt-12 flex items-center justify-center"id=output>');const te=()=>{const[k,q]=$("#e8e4da"),[L,C]=$(0),[N,u]=$("");let f,h,v,S;const j=new AbortController;B(()=>{A(),v.value=k(),f.addEventListener("click",H),addEventListener("keydown",T)});const T=r=>{if(r.key==="s"){const o=document.querySelector(".add-icon");if(!o)return;o.click()}else r.key==="d"&&f.click()};D(()=>{f.removeEventListener("click",H),M()});const{initHtmx:A,cleanupHtmx:M}=W(),H=async()=>{h.style.opacity="0.4";try{const n=(await new EyeDropper().open({signal:j.signal})).sRGBHex;v.value=n,q(n),window.htmx.trigger("#hidden-input","send-color"),K.addAction(n)}catch{h.style.opacity="1"}},P=r=>{const n=r.target.closest(".add-icon");if(!n)return;n.classList.add("animate"),setTimeout(()=>n.classList.remove("animate"),210);const i=n.parentElement.dataset.name;!!n.parentElement.dataset.webtone&&X(Y(i))};return(()=>{var r=I(),o=r.firstChild,n=o.firstChild,i=o.nextSibling,p=i.nextSibling,m=p.firstChild,l=f;typeof l=="function"?b(l,n):f=n,U(r,z(G,{when:!1,get children(){var s=F(),c=s.firstChild,a=S;return typeof a=="function"?b(a,c):S=c,R(e=>{var x=w("mt-28 flex w-full justify-center"),y=w("relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]");return x!==e.e&&g(s,e.e=x),y!==e.t&&g(c,e.t=y),e},{e:void 0,t:void 0}),s}}),i);var t=v;typeof t=="function"?b(t,i):v=i,m.$$click=P;var d=h;return typeof d=="function"?b(d,m):h=m,R(s=>{var c=w("mt-28 flex w-full justify-center"),a=w("relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]"),e=E.api;return c!==s.e&&g(o,s.e=c),a!==s.t&&g(n,s.t=a),e!==s.a&&J(i,"hx-get",s.a=e),s},{e:void 0,t:void 0,a:void 0}),r})();function W(){const r=()=>{window.htmx.process(document.body),window.htmx.config.withCredentials=!0,window.htmx.config.globalViewTransitions=!0,window.htmx.config.methodsThatUseUrlParams=[],addEventListener("htmx:beforeRequest",i),addEventListener("htmx:configRequest",n),addEventListener("htmx:afterSwap",p),addEventListener("htmx:afterSettle",m)},o=()=>{window.htmx.config.withCredentials=!1,removeEventListener("htmx:beforeRequest",i),removeEventListener("htmx:configRequest",n),removeEventListener("htmx:afterSwap",p),removeEventListener("htmx:afterSettle",m)},n=l=>{const d=l.detail.parameters.colors.substring(1);if(E.api.includes("localhost")){l.detail.path=E.api+d;return}l.detail.path+=d},i=l=>{l.detail.xhr.setRequestHeader("Authorization","edor-o9e8-f5p7-x85v")},p=l=>{h.style.opacity="1",Z(k(),!0)},m=async l=>{const t=window.jsonData.conversions.web,d=t.hueClass,s=t.shadeClass,c=t.chromaClass;let a=null;if(d===0&&s===0&&c===0){const e=/\d+/,x=t.code.match(e);x?a=`[-1,${x[0]},-1]`:console.log("No number found in the input string.")}L()==0?(C(e=>e+1),u(a?`[${a},`:`[[${t.hueClass},${t.shadeClass},${t.chromaClass}],`)):L()==1?(C(e=>e+1),u(a?e=>e+`${a},`:e=>e+`[${t.hueClass},${t.shadeClass},${t.chromaClass}],`)):(u(a?e=>e+`${a}]`:e=>e+`[${t.hueClass},${t.shadeClass},${t.chromaClass}]]`),C(0),console.log(N()))};return{initHtmx:r,cleanupHtmx:o}}};V(["click"]);export{te as default};
