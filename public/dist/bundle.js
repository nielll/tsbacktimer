var tsBackTiming;(()=>{"use strict";var e={527:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=r(698);t.default=class{constructor(e,t){this.getArrivalDate=e=>{const t=e.match(/^.*\s/g),r=e.match(/\s.*$/g),a=t[0].trim().split("."),s=r[0].trim().split(":");return this.correctTimeOffset(new Date(new Date(Number(a[2]),Number(a[1])-1,Number(a[0]),Number(s[0]),Number(s[1]),Number(s[2])).setMilliseconds(Number(s[3]))))},this.correctTimeOffset=e=>{var t=60*a.default.now.getTimezoneOffset()*1e3;return new Date(e.getTime()-t)},this.arrival=this.getArrivalDate(e),this.coordinates=t}}},725:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=r(698);t.default=class{constructor(e,t,r){this.attacker=r,this.arrival=this.generateDateFromString(t),this.duration=e,this.durationMs=this.getDurationMs(),this.departure=this.getDeparture(),this.autoReturnAt=this.getAutoReturnAt()}execute(){}getDurationMs(){return this.generateMsFromRegex(this.duration)}getDeparture(){return new Date(this.arrival.getTime()-this.durationMs)}generateMsFromRegex(e){const t=e.match(/\d+/g);return 60*Number(t[0])*60*1e3+60*Number(t[1])*1e3+1e3*Number(t[2])+(Number(t[3])?Number(t[3]):0)}getAutoReturnAt(){const e=this.attacker.arrival.getTime()-a.default.now.getTime(),t=a.default.now.getTime()-this.departure.getTime();return new Date(a.default.now.getTime()+(e-t)/2)}generateDateFromString(e){const t=e.match(/\d+/g),r=Number(t[0]),a=Number(t[1])-1,s=Number(t[2]),i=Number(t[3]),n=Number(t[4]),o=Number(t[5]),u=Number(t[6])?Number(t[6]):0;return new Date(new Date(s,a,r,i,n,o).setMilliseconds(u))}}},698:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(){}static getMsFormated(e){var t=e/60/60/1e3,r=(e-3600*Math.floor(t)*1e3)/60/1e3,a=(e-3600*Math.floor(t)*1e3-60*Math.floor(r)*1e3)/1e3;return`(${Math.floor(t)}:${Math.floor(r)}:${Math.floor(a)})`}static updateTimeDOM(e,t,r){var a=new Date(this.now.getTime()+t.getTime()),s=setInterval((function(){if((new Date).getTime(),document.getElementById(e).innerHTML=this.getMsFormated(a.getTime()-this.now.getTime()),a.getTime()-this.now.getTime()<=0){clearInterval(s);let e=r.getElementsByClassName("command-cancel")[0];e&&e.click()}}),1e3)}}t.default=r,r.now=new Date(Date.now())}},t={};function r(a){var s=t[a];if(void 0!==s)return s.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,r),i.exports}var a={};(()=>{var e=a;const t=r(698),s=r(527),i=r(725);e.default=class{constructor(){const e=document.getElementById("commands_outgoings");e||alert("Please run on 'die-staemme.de/game.php?screen=overview_villages&intro'"),this._container=e}execution(){const e=this._container.getElementsByTagName("tbody")[0].getElementsByTagName("tr");if(!this._getAttackersArrival||!this._getDistance)return console.error("Eather 'attackersArrival' or 'distance' is not set!");const r=new s.default(this.getAttackersArrival);for(var a=0;a<e.length;a++){const s=e[a],n=0===a?s.getElementsByTagName("th"):s.getElementsByTagName("td"),o=0===a?document.createElement("th"):document.createElement("td"),u=0===a?document.createTextNode("Autoreturn in"):document.createTextNode(""),c=n[2];if(u&&o&&c&&(o.appendChild(u),0!==a&&o.setAttribute("id",`timer${a}`),s.insertBefore(o,c)),0!==a){const e=s.getElementsByTagName("td")[1].innerHTML,n=new i.default(this.getDistance,e,r);t.default.updateTimeDOM(`timer${a}`,n.autoReturnAt,s)}}}set getAttackersArrival(e){this._getAttackersArrival=e}get getAttackersArrival(){return this._getAttackersArrival}set getDistance(e){this._getDistance=e}get getDistance(){return this._getDistance}}})(),tsBackTiming=a.default})();