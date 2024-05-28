import{c as v,o as B,f as T,k as P,p as y,h as A,J as L,j as H,r as W,K as U,t as z,Y as D,Z as G,_ as w}from"./index-DLwlJdvI.js";import{h as I}from"./index-4Sxdhovw.js";var J=z('<main class="container relative mx-auto flex min-h-[2200px] max-w-5xl flex-col items-center justify-start"><nav><button id=start-button><span id=button-text class="select-none text-base tracking-wide text-neutral-100">Pick Color</span></button></nav><input id=hidden-input hx-trigger=send-color hx-target=#output type=hidden name=colors><section class="mt-12 flex min-h-96 w-full justify-center"><article class="mb-28 mt-12 flex items-center justify-center"id=output>');const V=()=>{v(null);const[l,f]=v("#e8e4da"),[h,p]=v(!1);let u,a,t,m;const R=new AbortController;B(()=>{$(),m.value=l(),a.addEventListener("click",g)}),T(()=>{a.removeEventListener("click",g),_()}),P(()=>{h()?q():K()});const{initHtmx:$,cleanupHtmx:_}=j(),{handleKeys:q,removeKeys:K}=M(p,u),g=async()=>{t.style.opacity="0.4";try{const e=(await new EyeDropper().open({signal:R.signal})).sRGBHex;m.value=e,f(e),window.htmx.trigger("#hidden-input","send-color")}catch{t.style.opacity="1"}},S=s=>{const e=s.target.closest(".add-icon");if(!e)return;e.classList.add("animate"),setTimeout(()=>e.classList.remove("animate"),210),e.parentElement.dataset.color;const o=e.parentElement.dataset.name;!!e.parentElement.dataset.webtone&&D(G(o))};return(()=>{var s=J(),r=s.firstChild,e=r.firstChild,o=r.nextSibling,c=o.nextSibling,n=c.firstChild,x=a;typeof x=="function"?y(x,e):a=e;var d=m;typeof d=="function"?y(d,o):m=o,n.$$click=S;var E=t;return typeof E=="function"?y(E,n):t=n,A(i=>{var b=L("mt-28 flex w-full justify-center"),k=L("relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]"),C=w.api;return b!==i.e&&H(r,i.e=b),k!==i.t&&H(e,i.t=k),C!==i.a&&W(o,"hx-get",i.a=C),i},{e:void 0,t:void 0,a:void 0}),s})();function j(){const s=()=>{window.htmx.process(document.body),window.htmx.config.withCredentials=!0,window.htmx.config.globalViewTransitions=!0,window.htmx.config.methodsThatUseUrlParams=[],addEventListener("htmx:beforeRequest",o),addEventListener("htmx:configRequest",e),addEventListener("htmx:afterSwap",c)},r=()=>{window.htmx.config.withCredentials=!1,removeEventListener("htmx:beforeRequest",o),removeEventListener("htmx:configRequest",e),removeEventListener("htmx:afterSwap",c)},e=n=>{const d=n.detail.parameters.colors.substring(1);if(w.api.includes("localhost")){n.detail.path=w.api+d;return}n.detail.path+=d},o=n=>{n.detail.xhr.setRequestHeader("Authorization","edor-o9e8-f5p7-x85v")},c=n=>{t.style.opacity="1",setTimeout(()=>{},100),I(l(),!0)};return{initHtmx:s,cleanupHtmx:r}}};function M(l,f){const h=()=>{addEventListener("keydown",u),document.getElementById("root").style.filter="blur(5px)",setTimeout(()=>{addEventListener("click",a)},0)},p=()=>{removeEventListener("keydown",u),removeEventListener("click",a),document.getElementById("root").style.filter="none"},u=t=>{(t.key==="Escape"||t.key==="Enter"||t.key==="Backspace")&&l(!1)},a=t=>{t.target!==f&&l(!1)};return{handleKeys:h,removeKeys:p}}U(["click"]);export{V as default};