import{K as S,O as w,t as u,c as x,o as D,A as j,k as I,Q as K,R as O,H as b,T as P,i as r,d as l,U as C,W as T,I as q,V as W,S as B,h as M,r as N,X as R,M as F,L as H,B as Q}from"./index-D16_X-e9.js";var U=u('<div class=oswald-spectrum><div data-index=0 class="dot dot-1"></div><div data-index=1 class="dot dot-1-1"></div><div data-index=2 class="dot dot-1-2"></div><div data-index=3 class="dot dot-1-3"></div><div data-index=4 class="dot dot-1-4"></div><div data-index=5 class="dot dot-2"></div><div data-index=6 class="dot dot-2-1"></div><div data-index=7 class="dot dot-2-2"></div><div data-index=8 class="dot dot-2-3"></div><div data-index=9 class="dot dot-2-4"></div><div data-index=10 class="dot dot-3"></div><div data-index=11 class="dot dot-3-1"></div><div data-index=12 class="dot dot-3-2"></div><div data-index=13 class="dot dot-3-3"></div><div data-index=14 class="dot dot-3-4"></div><div data-index=15 class="dot dot-4"></div><div data-index=16 class="dot dot-4-1"></div><div data-index=17 class="dot dot-4-2"></div><div data-index=18 class="dot dot-4-3"></div><div data-index=19 class="dot dot-4-4"></div><div data-index=20 class="dot dot-5"></div><div data-index=21 class="dot dot-5-1"></div><div data-index=22 class="dot dot-5-2"></div><div data-index=23 class="dot dot-5-3"></div><div data-index=24 class="dot dot-5-4"></div><div data-index=25 class="dot dot-6"></div><div data-index=26 class="dot dot-6-1"></div><div data-index=27 class="dot dot-6-2"></div><div data-index=28 class="dot dot-6-3"></div><div data-index=29 class="dot dot-6-4"></div><div data-index=30 class="dot dot-7"></div><div data-index=31 class="dot dot-7-1"></div><div data-index=32 class="dot dot-7-2"></div><div data-index=33 class="dot dot-7-3"></div><div data-index=34 class="dot dot-7-4"></div><div data-index=35 class="dot dot-8"></div><div data-index=36 class="dot dot-8-1"></div><div data-index=37 class="dot dot-8-2"></div><div data-index=38 class="dot dot-8-3"></div><div data-index=39 class="dot dot-8-4">');const V=c=>(()=>{var n=U();return w(n,"click",c.handleOswaldClick,!0),n})();S(["click"]);const[s,X]=x(12);var z=u('<main class="container mx-auto mb-28 min-h-screen max-w-7xl"><section class="mt-28 flex flex-col items-center justify-center"><div class="mt-10 flex items-center justify-center "><button class="border border-neutral-700 uppercase hover:shadow px-3 py-1 text-xs">Clear</button></div></section><section class="mt-12 flex w-full flex-col items-center justify-center"><section class=w-11/12><h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800"></h1><article class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1">'),G=u('<footer class="h-96 w-full bg-white">');const Z=()=>{let c;const[n,$]=x(null),[m,v]=x(!1),y=R($,v);D(()=>{j.addPage("ps")}),I(()=>{m()?(K(),_()):(O(),L()),(s()||b())&&(f(),A(s()))});const{addKeys:_,removeKeys:L}=P(v,c),f=()=>{document.querySelectorAll(".dot").forEach(t=>{t.classList.remove("active")})},A=d=>{const t=document.querySelectorAll(".dot");t[d].classList.add("active"),b().forEach(e=>{var i,a;e.index!=d?(i=t[e.index])==null||i.classList.add("has-selected"):(a=t[e.index])==null||a.classList.remove("has-selected")})},k=d=>{const t=d.target;f(),t.classList.add("active");const e=Number(t.getAttribute("data-index"));X(e)},E=()=>{F(),H([]),Q([]);const d=document.querySelectorAll(".dot"),t=s(),e=Array.from(d);[...e.slice(t+1),...e.slice(0,t+1)].forEach((a,o)=>{setTimeout(()=>{a.classList.add("effect"),a.classList.remove("has-selected")},7*o),setTimeout(()=>{a.classList.remove("effect")},7*o+70)})};return[(()=>{var d=z(),t=d.firstChild,e=t.firstChild,i=e.firstChild,a=t.nextSibling,o=a.firstChild,h=o.firstChild,g=h.nextSibling;return r(t,l(V,{handleOswaldClick:k}),e),i.$$click=E,r(h,()=>C()[s()].name),w(g,"click",y,!0),r(g,l(q,{get each(){return C()[s()].arr},children:(p,J)=>l(T,{get code(){return p.code},get rgb(){return p.rgbString},i:s})})),r(d,l(B,{get when(){return m()},get children(){return l(W,{portal:c,active:n,setPortal:v})}}),null),M(()=>N(o,"data-palette",s())),d})(),G()]};S(["click"]);export{Z as default};