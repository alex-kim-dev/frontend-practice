!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const e=[{views:1e4,price:8},{views:5e4,price:12},{views:1e5,price:16},{views:5e5,price:24},{views:1e6,price:36}],t=e.length-1,r=document.getElementById("pricing-widget"),i=r.querySelector(".slider"),o=r.querySelector(".slider__bar"),n=r.querySelector(".slider__thumb"),s=r.querySelector(".pricing__views"),c=r.querySelector(".pricing__value"),d=r.querySelector(".switch__checkbox"),a=e=>Math.round((e-n.clientWidth/2)/(o.clientWidth-n.clientWidth)*t),l=new Intl.NumberFormat("en",{style:"currency",currency:"USD",minimumFractionDigits:2}),u=new Intl.NumberFormat("en",{notation:"compact"}),m=({sliderPosition:t,yearlyBilling:r})=>{const{price:o,views:d}=e[t],a=u.format(d).concat(" pageviews");s.textContent=a,c.textContent=l.format(o*(r?.75:1)),i.style.setProperty("--position",t),n.setAttribute("aria-valuenow",d),n.setAttribute("aria-valuetext",a)},v=new Proxy(Object.seal({sliderPosition:Math.floor(t/2),yearlyBilling:!1}),{set:(e,r,i,o)=>{switch(r){case"sliderPosition":{const n=Math.min(Math.max(i,0),t);e[r]!==n&&(e[r]=n,m(o));break}case"yearlyBilling":e[r]!==i&&(e[r]=i,m(o))}return!0}}),g=e=>{e.preventDefault(),e.stopPropagation(),n.focus(),document.body.classList.add("dragging");const t=e=>{const{pageX:t}=e instanceof MouseEvent?e:e.touches[0],{left:r}=o.getBoundingClientRect();v.sliderPosition=a(t-r)},r=()=>{document.body.classList.remove("dragging"),document.removeEventListener("mousemove",t),document.removeEventListener("touchmove",t),document.removeEventListener("mouseup",r),document.removeEventListener("touchend",r)};document.addEventListener("mousemove",t),document.addEventListener("touchmove",t),document.addEventListener("mouseup",r),document.addEventListener("touchend",r)};n.addEventListener("keydown",(e=>{switch(e.key){case"ArrowLeft":case"ArrowDown":v.sliderPosition-=1;break;case"ArrowRight":case"ArrowUp":v.sliderPosition+=1;break;case"Home":v.sliderPosition=0;break;case"End":v.sliderPosition=t;break;case"PageUp":v.sliderPosition+=2;break;case"PageDown":v.sliderPosition-=2}})),n.addEventListener("mousedown",g),n.addEventListener("touchstart",g),o.addEventListener("click",(({offsetX:e})=>{n.focus(),v.sliderPosition=a(e)})),d.addEventListener("change",(e=>{v.yearlyBilling=e.currentTarget.checked}));
//# sourceMappingURL=index.5736aaa8.js.map
