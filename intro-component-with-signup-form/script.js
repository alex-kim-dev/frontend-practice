!function e(r,t,n){function i(a,u){if(!t[a]){if(!r[a]){var l="function"==typeof require&&require;if(!u&&l)return l(a,!0);if(o)return o(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var s=t[a]={exports:{}};r[a][0].call(s.exports,(function(e){return i(r[a][1][e]||e)}),s,s.exports,e,r,t,n)}return t[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(e,r,t){"use strict";const n=document.querySelector(".signupForm"),i=[...n.querySelectorAll(".field")].map(e=>({field:e,input:e.querySelector(".textInput_input"),feedback:e.querySelector(".field_feedback")})),o=({value:e,placeholder:r})=>""===e.trim()?"".concat(r," cannot be empty"):"",a={firstName:[o],lastName:[o],email:[o,({value:e})=>/^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/.test(e.trim())?"":"Looks like this is not an email"],password:[o]},u=e=>{const{input:r}=e,t=a[r.name].map(e=>e(r)).find(e=>""!==e)||null;return{...e,error:t}},l=e=>(e.error?(({input:e,field:r,feedback:t,error:n})=>{t.textContent=n,r.classList.add("field-error"),e.setAttribute("aria-invalid",!0)})(e):(({input:e,field:r,feedback:t})=>{t.textContent="",r.classList.remove("field-error"),e.removeAttribute("aria-invalid")})(e),e),f=({error:e})=>Boolean(e);n.addEventListener("submit",e=>{e.preventDefault();const r=i.map(u).map(l).filter(f);0===r.length?console.log("Signup form validation passed."):r[0].input.focus()})},{}]},{},[1]);
//# sourceMappingURL=script.js.map
