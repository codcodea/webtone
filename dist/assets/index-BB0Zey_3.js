import{c as q,o as S,f as _,A as j,p as m,h as A,J as b,j as y,r as T,K as P,t as W,V as B,X as K,Y as f}from"./index-CUI6JL9v.js";import{h as U}from"./index-4Sxdhovw.js";var V=W('<main class="container relative mx-auto flex min-h-[2200px] max-w-5xl flex-col items-center justify-start"><nav><button id=start-button><span id=button-text class="select-none text-base tracking-wide text-neutral-100">Pick Color</span></button></nav><input id=hidden-input hx-trigger=send-color hx-target=#output type=hidden name=colors><section class="mt-12 flex min-h-96 w-full justify-center"><article class="mb-28 mt-12 flex items-center justify-center"id=output>');const G=()=>{const[h,E]=q("#e8e4da");let i,r,d;const k=new AbortController;S(()=>{L(),d.value=h(),i.addEventListener("click",x),addEventListener("keydown",C)});const C=t=>{if(t.key==="s"){const n=document.querySelector(".add-icon");if(!n)return;n.click()}else t.key==="d"&&i.click()};_(()=>{i.removeEventListener("click",x),H()});const{initHtmx:L,cleanupHtmx:H}=$(),x=async()=>{r.style.opacity="0.4";try{const e=(await new EyeDropper().open({signal:k.signal})).sRGBHex;d.value=e,E(e),window.htmx.trigger("#hidden-input","send-color"),j.addAction(e)}catch{r.style.opacity="1"}},R=t=>{const e=t.target.closest(".add-icon");if(!e)return;e.classList.add("animate"),setTimeout(()=>e.classList.remove("animate"),210);const s=e.parentElement.dataset.name;!!e.parentElement.dataset.webtone&&B(K(s))};return(()=>{var t=V(),n=t.firstChild,e=n.firstChild,s=n.nextSibling,l=s.nextSibling,o=l.firstChild,u=i;typeof u=="function"?m(u,e):i=e;var c=d;typeof c=="function"?m(c,s):d=s,o.$$click=R;var p=r;return typeof p=="function"?m(p,o):r=o,A(a=>{var v=b("mt-28 flex w-full justify-center"),w=b("relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]"),g=f.api;return v!==a.e&&y(n,a.e=v),w!==a.t&&y(e,a.t=w),g!==a.a&&T(s,"hx-get",a.a=g),a},{e:void 0,t:void 0,a:void 0}),t})();function $(){const t=()=>{window.htmx.process(document.body),window.htmx.config.withCredentials=!0,window.htmx.config.globalViewTransitions=!0,window.htmx.config.methodsThatUseUrlParams=[],addEventListener("htmx:beforeRequest",s),addEventListener("htmx:configRequest",e),addEventListener("htmx:afterSwap",l)},n=()=>{window.htmx.config.withCredentials=!1,removeEventListener("htmx:beforeRequest",s),removeEventListener("htmx:configRequest",e),removeEventListener("htmx:afterSwap",l)},e=o=>{const c=o.detail.parameters.colors.substring(1);if(f.api.includes("localhost")){o.detail.path=f.api+c;return}o.detail.path+=c},s=o=>{o.detail.xhr.setRequestHeader("Authorization","edor-o9e8-f5p7-x85v")},l=o=>{r.style.opacity="1",setTimeout(()=>{},100),U(h(),!0)};return{initHtmx:t,cleanupHtmx:n}}};P(["click"]);export{G as default};
