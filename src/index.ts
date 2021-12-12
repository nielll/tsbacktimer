import Timer from './models/timer';
import Attacker from './models/attacker';
import BackDeff from './models/backdeff';

export default class tsBackTimerLibrary {
 private _container;
 private _getAttackersArrival: string;
 private _getDistance: string;

 constructor() {
  const container = document.getElementById("commands_outgoings");

  if (!container) alert("Please run on 'die-staemme.de/game.php?screen=overview_villages&intro'");

  this._container = container;
 }

 public execution() {
  const tbody = this._container.getElementsByTagName("tbody")[0];
  const trs = tbody.getElementsByTagName("tr");

  if (!this._getAttackersArrival || !this._getDistance) {
   return console.error(`Eather 'attackersArrival' or 'distance' is not set!`);
  }

  const attacker = new Attacker(this.getAttackersArrival);

  for (var i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const el = i === 0 ? 
      tr.getElementsByTagName("th") : tr.getElementsByTagName("td");
    const newNode = i === 0 ? 
      document.createElement("th") : document.createElement("td");
    const text = i === 0 ? 
      document.createTextNode("Autoreturn in") : document.createTextNode("");
    const childNode = el[2];

    if (text && newNode && childNode) {
      newNode.appendChild(text);
      if (i !== 0) newNode.setAttribute("id", `timer${i}`);
      tr.insertBefore(newNode, childNode);
    }


    if (i !== 0) {
     const arrivingAt = tr.getElementsByTagName("td")[1].innerHTML;
     const backDeffUnit = new BackDeff(this.getDistance, arrivingAt, attacker);
     Timer.updateTimeDOM(`timer${i}`, backDeffUnit.autoReturnAt, tr);
    }
  }
 }

 set getAttackersArrival(arrival: string) {
  //prompt("Arrival time", "09.12.2021 23:01:56:313")
  this._getAttackersArrival = arrival;
 }

 get getAttackersArrival() {
  return this._getAttackersArrival;
 }

 set getDistance(distance: string) {
  //prompt("Input walking time","1:09:34")
  this._getDistance = distance;
 }

 get getDistance(): string {
  return this._getDistance;
 }
}