!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){!function(t){e.exports=function(e){const n={};return n.__proto__.bind=function(e){if(!e)throw Error("No $scope defined");t.onload=function(){var n={};n=function(e){return e}(n=function(e,n){var r={},o={},i=[];n.call(o,o);var c=document.body.innerText.match(/{{\w+}}/g);!function(){var e=[];if(c&&c.length)for(let t of c)Array.prototype.indexOf.call(c,t)>-1&&e.push(t);c=e}();var a,l=[];for(let e of c)e=String.prototype.replace.apply(e,["{{",""]),e=String.prototype.replace.apply(e,["}}",""]),Object.prototype.hasOwnProperty.call(o,e)||(o[e]="",l.push(e));for(let n in o)if(Object.prototype.hasOwnProperty.call(o,n)){n=n,function(){if(t.find(`{{${n}}}`)){var e=t.getSelection().getRangeAt(0).commonAncestorContainer.parentElement,r=[];if(e.innerText.match(/{{\w+}}/g)){var o=e.innerText.match(/{{\w+}}/g);for(let e of o)e=String.prototype.replace.apply(e,["{{",""]),e=String.prototype.replace.apply(e,["}}",""]),r.push(e)}e.hasOwnProperty("mx-binded")||Object.defineProperty(e,"mx-binded",{value:r}),e.hasOwnProperty("mx-bind-range")||Object.defineProperty(e,"mx-bind-range",{value:e.cloneNode(!0)}),e.classList.add("mx-binding"),t.getSelection?t.getSelection().empty?t.getSelection().empty():t.getSelection().removeAllRanges&&t.getSelection().removeAllRanges():document.selection&&document.selection.empty()}}(),Object.defineProperty(e,n,{set:function(t){var c,a;!function(){var t=document.querySelectorAll(`[mx-click="${n}()"]`);for(let r of t){if("function"!=typeof o[n])throw Error(`${n} is not a function`);r.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),o[n].apply(e)})}}(),r.hasOwnProperty(n)?r[n]=t:Object.defineProperty(r,n,{value:t,writable:!0}),(c=document.querySelector(`[mx-model="${n}"]`))&&(c.value=t,-1==i.indexOf(n)&&(c.addEventListener("keyup",t=>{e[n]=t.target.value}),c.addEventListener("paste",t=>{e[n]=t.target.value}),i.push(n))),(a=document.querySelector(`[mx-bind="${n}"]`))&&(a.innerText=t),function(){var e=document.querySelectorAll(".mx-binding");for(let i of e)if(i.hasOwnProperty("mx-binded")&&i.hasOwnProperty("mx-bind-range")&&Array.prototype.includes.call(i["mx-binded"],n)){var t=i["mx-bind-range"].innerHTML;for(let e of i["mx-binded"]){var o=new RegExp(`{{${e}}}`,"g");t=String.prototype.replace.apply(t,[o,r[e]])}i.innerHTML=t}}()},get:function(){return r[n]||""}});for(let t of l)document.querySelector(`[mx-model="${t}"]`)?e[t]=document.querySelector(`[mx-model="${t}"]`).value:e[t]=""}return e}(n,e)),e.call(n,n)}},e&&n.bind(e),n}}("undefined"==typeof window?this:window)},function(e,t,n){"use strict";n.r(t);var r=n(0);r().bind(function(e){e.name="Max"})}]);