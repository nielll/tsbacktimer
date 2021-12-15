var tsBackTiming;(()=>{"use strict";var e={527:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=r(698);t.default=class{constructor(e,t){this.getArrivalDate=e=>{if(!e)return;const t=e.replace(",","").match(/^.*\s/g),r=e.replace(",","").match(/\s.*$/g),a=t[0].trim().split("."),i=r[0].trim().split(":");return n.default.correctTimeOffset(new Date(new Date(Number(a[2]),Number(a[1])-1,Number(a[0]),Number(i[0]),Number(i[1]),Number(i[2])).setMilliseconds(Number(i[3]))))},this.arrival=this.getArrivalDate(e),this.coordinates=t}}},725:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=r(698);t.default=class{constructor(e,t,r){this.attacker=r,this.arrival=this.generateDateFromString(t),this.duration=e,this.durationMs=this.getDurationMs(),this.departure=this.getDeparture(),this.autoReturnAt=this.getAutoReturnAt()}getDurationMs(){return this.generateMsFromRegex(this.duration)}getDeparture(){return new Date(this.arrival.getTime()-this.durationMs)}generateMsFromRegex(e){const t=e.match(/\d+/g);return 60*Number(t[0])*60*1e3+60*Number(t[1])*1e3+1e3*Number(t[2])+(Number(t[3])?Number(t[3]):0)}getAutoReturnAt(){const e=this.attacker.arrival.getTime()-n.default.now.getTime(),t=n.default.now.getTime()-this.departure.getTime();return new Date(n.default.now.getTime()+(e-t)/2)}generateDateFromString(e){const t=e.match(/\d+/g),r=Number(t[0]),n=Number(t[1])-1,a=Number(t[2]),i=Number(t[3]),o=Number(t[4]),s=Number(t[5]),c=Number(t[6])?Number(t[6]):0;return new Date(new Date(a,n,r,i,o,s).setMilliseconds(c))}}},698:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0});class n{constructor(){}static getMsFormated(e){var t=e/60/60/1e3,r=(e-3600*Math.floor(t)*1e3)/60/1e3,n=(e-3600*Math.floor(t)*1e3-60*Math.floor(r)*1e3)/1e3;return`(${Math.floor(t)}:${Math.floor(r)}:${Math.floor(n)})`}static updateTimeDOM(e,t,r){const a=new Date(n.now.getTime()+t.getTime()),i=setInterval((function(){const o=(new Date).getTime();if(console.log(n.getMsFormated(a.getTime()-o),e,t,r),document.getElementById(e).innerHTML=n.getMsFormated(a.getTime()-o),a.getTime()-o<=0){clearInterval(i);let e=r.getElementsByClassName("command-cancel")[0];e&&e.click()}}),1e3)}}t.default=n,r=n,n.now=new Date(Date.now()),n.correctTimeOffset=e=>{const t=60*n.now.getTimezoneOffset()*1e3;return new Date(e.getTime()-t)},n.toString=()=>{const e=r.now.toLocaleString().match(/^.*\s/g),t=r.now.toLocaleString().match(/\s.*$/g),[n,a,i]=e[0].trim().split("."),[o,s,c]=t[0].trim().split(":");return`${n}.${a}.${i} ${o}:${s}:${c}`}}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}var n={};(()=>{var e=n;const t=r(698),a=r(527),i=r(725);e.default=class{constructor(){const e=document.getElementById("commands_outgoings");e?(console.log("tsBackTimer initialized"),this._container=e):alert("Please run on 'game.php?screen=overview_villages&intro'")}static init(e){console.log(`===== Start Initialization: ${t.default.now} =====`);const r=e._container,n=r.getElementsByTagName("tbody")[0].getElementsByTagName("tr");if(r.getElementsByTagName("button").length>0)return console.error("TsBackTimer already running, please refresh and rerun script!");const a=document.createElement("button");a.innerHTML="Start Backtimer",a.setAttribute("id","tsBackTimerActionButton"),a.onclick=function(){e.execution()},r.appendChild(a);for(var i=0;i<n.length;i++){const e=n[i],r=0===i?e.getElementsByTagName("th"):e.getElementsByTagName("td");let a=0===i?document.createElement("th"):document.createElement("td"),o=document.createTextNode(""),s=r[0];if(o&&a&&s){if(a.appendChild(o),0!==i){const e=document.createElement("input");e.setAttribute("id",`input${i}`),e.setAttribute("class","valid"),e.setAttribute("type","checkbox"),a.appendChild(e)}e.insertBefore(a,s)}if(a=0===i?document.createElement("th"):document.createElement("td"),o=0===i?document.createTextNode("Attacker arrival"):document.createTextNode(""),s=r[2],o&&a&&s){if(a.appendChild(o),0!==i){const e=document.createElement("input");e.setAttribute("id",`inputAttack${i}`),e.setAttribute("class","attack"),e.setAttribute("type","text"),e.placeholder=`${t.default.toString()}:313`,a.appendChild(e)}e.insertBefore(a,s)}if(a=0===i?document.createElement("th"):document.createElement("td"),o=0===i?document.createTextNode("Slowest Unit"):document.createTextNode(""),s=r[2],o&&a&&s){if(a.appendChild(o),0!==i){const e=document.createElement("input");e.setAttribute("id",`inputUnit${i}`),e.setAttribute("class","unit"),e.setAttribute("type","text"),e.placeholder="1:05:20",a.appendChild(e)}e.insertBefore(a,s)}}}execution(){const e=this._container.getElementsByTagName("tbody")[0].getElementsByTagName("tr");if(!confirm("Fire BackTiming?"))return console.error("Stopped!"),location.reload();console.log(`===== Start Execution: ${t.default.now} =====`);for(var r=0;r<e.length;r++){const n=e[r];let o=0===r?n.getElementsByTagName("th"):n.getElementsByTagName("td"),s=0===r?document.createElement("th"):document.createElement("td"),c=0===r?document.createTextNode("Autoreturn in"):document.createTextNode(""),u=o[4];if(c&&s&&u&&(s.appendChild(c),0!==r&&s.setAttribute("id",`timer${r}`),n.insertBefore(s,u)),0!==r&&n.getElementsByClassName("valid")[0].checked){const e=n.getElementsByClassName("unit")[0].value,o=n.getElementsByClassName("attack")[0].value,s=n.getElementsByTagName("td")[5].innerHTML,c=new a.default(o),u=new i.default(e,s,c);t.default.updateTimeDOM(`timer${r}`,u.autoReturnAt,n)}}}}})(),tsBackTiming=n.default})();