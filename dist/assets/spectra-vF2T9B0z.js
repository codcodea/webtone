import{K as I,Q as g,t as w,c as C,o as F,A as f,k as H,H as p,i as n,d as i,R as h,W as j,I as E,T as M,S as Q,h as U,r as V,U as z,V as G,N as J}from"./index-BlsQh2vi.js";var X=w('<div class=oswald-spectrum><div data-index=0 class="dot dot-1"></div><div data-index=1 class="dot dot-1-1"></div><div data-index=2 class="dot dot-1-2"></div><div data-index=3 class="dot dot-1-3"></div><div data-index=4 class="dot dot-1-4"></div><div data-index=5 class="dot dot-2"></div><div data-index=6 class="dot dot-2-1"></div><div data-index=7 class="dot dot-2-2"></div><div data-index=8 class="dot dot-2-3"></div><div data-index=9 class="dot dot-2-4"></div><div data-index=10 class="dot dot-3"></div><div data-index=11 class="dot dot-3-1"></div><div data-index=12 class="dot dot-3-2"></div><div data-index=13 class="dot dot-3-3"></div><div data-index=14 class="dot dot-3-4"></div><div data-index=15 class="dot dot-4"></div><div data-index=16 class="dot dot-4-1"></div><div data-index=17 class="dot dot-4-2"></div><div data-index=18 class="dot dot-4-3"></div><div data-index=19 class="dot dot-4-4"></div><div data-index=20 class="dot dot-5"></div><div data-index=21 class="dot dot-5-1"></div><div data-index=22 class="dot dot-5-2"></div><div data-index=23 class="dot dot-5-3"></div><div data-index=24 class="dot dot-5-4"></div><div data-index=25 class="dot dot-6"></div><div data-index=26 class="dot dot-6-1"></div><div data-index=27 class="dot dot-6-2"></div><div data-index=28 class="dot dot-6-3"></div><div data-index=29 class="dot dot-6-4"></div><div data-index=30 class="dot dot-7"></div><div data-index=31 class="dot dot-7-1"></div><div data-index=32 class="dot dot-7-2"></div><div data-index=33 class="dot dot-7-3"></div><div data-index=34 class="dot dot-7-4"></div><div data-index=35 class="dot dot-8"></div><div data-index=36 class="dot dot-8-1"></div><div data-index=37 class="dot dot-8-2"></div><div data-index=38 class="dot dot-8-3"></div><div data-index=39 class="dot dot-8-4">');const Y=x=>(()=>{var v=X();return g(v,"click",x.handleOswaldClick,!0),v})();I(["click"]);const[r,D]=C(12);var Z=w('<main class="container mx-auto mb-28 min-h-screen max-w-7xl"><section class="mt-28 flex flex-col items-center justify-center"><div class="mt-10 flex items-center justify-center "><button class="border border-neutral-700 px-3 py-1 text-xs uppercase hover:shadow">Clear</button></div></section><section class="mt-12 flex flex-col items-center justify-center"><p class="text-sm italic">Click wheel the select a hue-family.</p><p class="text-sm italic">Below, click individual chip for details or the checkbox to add it to the Canvas.</p></section><section class="mt-12 flex w-full flex-col items-center justify-center"><section class=w-11/12><h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800"></h1><article class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1"></article></section></section><section class="mt-12 flex w-full flex-col items-center justify-center"><section class=w-11/12 data-palette=40><h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800"></h1><article class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1">'),tt=w('<footer class="h-96 w-full bg-white">');const dt=()=>{let x;const[v,y]=C(null),[u,m]=C(!1),$=z(y,m),{addKeys:K,removeKeys:P}=G(m,v,y);F(()=>{T(),f.addPage("ps")}),H(()=>{u()?K():P(),(r()||p())&&(b(),W(r())),u()&&f.addAction("po")});const T=()=>{const e=p().map(t=>t.index).sort((t,d)=>t-d);e.length&&D(e[0])},q=e=>{const t=e.target;b(),t.classList.add("active");const d=Number(t.getAttribute("data-index"));D(d),f.addAction("os"+d)},N=()=>{J(),O(),f.addAction("cl")},O=()=>{const e=document.querySelectorAll(".dot"),t=r(),d=Array.from(e);[...d.slice(t+1),...d.slice(0,t+1)].forEach((s,a)=>{setTimeout(()=>{s.classList.add("effect"),s.classList.remove("has-selected")},7*a),setTimeout(()=>{s.classList.remove("effect")},7*a+70)})},W=e=>{const t=document.querySelectorAll(".dot");t[e].classList.add("active"),p().forEach(d=>{var s,a;const l=Number(d.index);l!=e?(s=t[l])==null||s.classList.add("has-selected"):(a=t[l])==null||a.classList.remove("has-selected")})},b=()=>{document.querySelectorAll(".dot").forEach(t=>{t.classList.remove("active")})};return[(()=>{var e=Z(),t=e.firstChild,d=t.firstChild,l=d.firstChild,s=t.nextSibling,a=s.nextSibling,_=a.firstChild,A=_.firstChild,S=A.nextSibling,R=a.nextSibling,B=R.firstChild,k=B.firstChild,L=k.nextSibling;return n(t,i(Y,{handleOswaldClick:q}),d),l.$$click=N,n(A,()=>h()[r()].name),g(S,"click",$,!0),n(S,i(E,{get each(){return h()[r()].arr},children:(c,o)=>i(j,{chip:c,get index(){return o()},hasSelect:!0})})),n(k,()=>h()[40].name),g(L,"click",$,!0),n(L,i(E,{get each(){return h()[40].arr},children:(c,o)=>i(j,{chip:c,get index(){return o()},hasSelect:!0})})),n(e,i(Q,{get when(){return u()},get children(){return i(M,{ref(c){var o=x;typeof o=="function"?o(c):x=c},active:v,setPortal:m})}}),null),U(()=>V(_,"data-palette",r())),e})(),tt()]};I(["click"]);export{dt as default};
