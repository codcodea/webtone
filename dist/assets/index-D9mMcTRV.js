import{c as m,o as F,k as J,f as Q,M as X,p as g,i as L,d as y,h as D,Z as C,j as k,S,a0 as Y,a8 as ee,I as te,v as se,t as P,aa as ne,ab as re,ac as K,ad as H}from"./index-DcDCOZx7.js";import{h as oe}from"./index-BQffvJJV.js";var ae=P('<nav><button id=start-button><span id=button-text class="select-none text-base tracking-wide text-neutral-100">Train Model'),ie=P('<article class="mt-20 w-4/5 bg-neutral-50 px-10 py-8 text-neutral-800 shadow-md"><ul class="list-inside list-disc"><p class="my-2 text-base">The Color Picker select and match WEBTONE colors from an image or reference.</p><li class=text-base><strong>Pick a Color:</strong> Pick any color on the screen, not just within the browser window.</li><li class=""><strong>View Details:</strong> Click color for details.</li><li class=""><strong>Add Color:</strong> Click the plus symbol or the ADD-button to save.</li><li class=""><strong>Refine:</strong> If needed, use arrow keys inside the details view to refine.</li><li class=""><strong>Keyboard Shortcuts:</strong> <code class="rounded-md border border-neutral-500 px-2 py-1 text-xs">d</code> to open the picker. <code class="rounded-md border border-neutral-500 px-2 py-1 text-xs">s</code> to save. <code class="rounded-md border border-neutral-500 px-2 py-1 text-xs">esc</code> to abort.'),le=P(`<main class="container relative mx-auto flex min-h-[2200px] max-w-5xl flex-col items-center justify-start"><nav><button id=start-button title="Press 'd' to open, 's' to save, and escape to close."><span id=button-text class="select-none text-base tracking-wide text-neutral-100">Pick Color</span></button></nav><input id=hidden-input hx-trigger=send-color hx-target=#output type=hidden name=colors><section class="mt-12 flex min-h-96 w-full justify-center"><article class="mb-28 mt-12 flex items-center justify-center"id=output>`);const fe=()=>{const[R,M]=m("#e8e4da"),[_,$]=m(0),[ce,h]=m("");m([[0,0],[0,0],[0,0]]);const[j,E]=m(!1),[q,N]=m(),W=m();let x,v,w,T;const B=new AbortController,{addKeys:I,removeKeys:U}=ne(E,q,N);F(()=>{z(),w.value=R(),x.addEventListener("click",A),addEventListener("keydown",V)}),J(()=>{j()?I():U()});const V=n=>{if(n.key==="s"){const a=document.querySelector(".add-icon");if(!a)return;a.click()}else n.key==="d"&&x.click()};Q(()=>{x.removeEventListener("click",A),G()});const{initHtmx:z,cleanupHtmx:G}=Z(),A=async()=>{v.style.opacity="0.4";try{const t=(await new EyeDropper().open({signal:B.signal})).sRGBHex;w.value=t,M(t),window.htmx.trigger("#hidden-input","send-color"),X.addAction(t)}catch{v.style.opacity="1"}},O=n=>{const t=n.target.closest(".add-icon");if(!t){E(!0);return}t.classList.add("animate"),setTimeout(()=>t.classList.remove("animate"),210);const i=t.parentElement.dataset.name;!!t.parentElement.dataset.webtone&&re(K(i))};return(()=>{var n=le(),a=n.firstChild,t=a.firstChild,i=a.nextSibling,f=i.nextSibling,p=f.firstChild,l=x;typeof l=="function"?g(l,t):x=t,L(n,y(S,{when:!1,get children(){var r=ae(),d=r.firstChild,o=T;return typeof o=="function"?g(o,d):T=d,D(c=>{var s=C("mt-28 flex w-full justify-center"),b=C("relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]");return s!==c.e&&k(r,c.e=s),b!==c.t&&k(d,c.t=b),c},{e:void 0,t:void 0}),r}}),i);var e=w;typeof e=="function"?g(e,i):w=i,L(n,y(S,{get when(){return Y()},get children(){return ie()}}),f),p.$$click=O;var u=v;return typeof u=="function"?g(u,p):v=p,L(n,y(S,{get when(){return j()},get children(){return y(ee,{ref:W,active:q,setPortal:E})}}),null),D(r=>{var d=C("mt-28 flex w-full justify-center"),o=C("relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]"),c=H.api;return d!==r.e&&k(a,r.e=d),o!==r.t&&k(t,r.t=o),c!==r.a&&te(i,"hx-get",r.a=c),r},{e:void 0,t:void 0,a:void 0}),n})();function Z(){const n=()=>{window.htmx.process(document.body),window.htmx.config.withCredentials=!0,window.htmx.config.globalViewTransitions=!0,window.htmx.config.methodsThatUseUrlParams=[],addEventListener("htmx:beforeRequest",i),addEventListener("htmx:configRequest",t),addEventListener("htmx:afterSwap",f),addEventListener("htmx:afterSettle",p)},a=()=>{window.htmx.config.withCredentials=!1,removeEventListener("htmx:beforeRequest",i),removeEventListener("htmx:configRequest",t),removeEventListener("htmx:afterSwap",f),removeEventListener("htmx:afterSettle",p)},t=l=>{const u=l.detail.parameters.colors.substring(1);if(H.api.includes("localhost")){l.detail.path=H.api+u;return}l.detail.path+=u},i=l=>{l.detail.xhr.setRequestHeader("Authorization","edor-o9e8-f5p7-x85v")},f=l=>{v.style.opacity="1",oe(R(),!0)},p=async l=>{const e=window.jsonData.conversions.web,u=e.hueClass,r=e.shadeClass,d=e.chromaClass;let o=null;if(u===0&&r===0&&d===0){const s=/\d+/,b=e.code.match(s);b&&(o=`[-1,${b[0]},-1]`)}_()==0?($(s=>s+1),h(o?`[${o},`:`[[${e.hueClass},${e.shadeClass},${e.chromaClass}],`)):_()==1?($(s=>s+1),h(o?s=>s+`${o},`:s=>s+`[${e.hueClass},${e.shadeClass},${e.chromaClass}],`)):(h(o?s=>s+`${o}]`:s=>s+`[${e.hueClass},${e.shadeClass},${e.chromaClass}]]`),$(0));const c=K(e.code);N(c)};return{initHtmx:n,cleanupHtmx:a}}};se(["click"]);export{fe as default};