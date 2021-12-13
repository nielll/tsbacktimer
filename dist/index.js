"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./models/timer");
const attacker_1 = require("./models/attacker");
const backdeff_1 = require("./models/backdeff");
class tsBackTimerLibrary {
    constructor() {
        const container = document.getElementById("commands_outgoings");
        if (!container)
            alert("Please run on 'die-staemme.de/game.php?screen=overview_villages&intro'");
        this._container = container;
    }
    execution() {
        const tbody = this._container.getElementsByTagName("tbody")[0];
        const trs = tbody.getElementsByTagName("tr");
        if (!this._getAttackersArrival || !this._getDistance) {
            return console.error(`Eather 'attackersArrival' or 'distance' is not set!`);
        }
        const attacker = new attacker_1.default(this.getAttackersArrival);
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
                if (i !== 0)
                    newNode.setAttribute("id", `timer${i}`);
                tr.insertBefore(newNode, childNode);
            }
            if (i !== 0) {
                const arrivingAt = tr.getElementsByTagName("td")[1].innerHTML;
                const backDeffUnit = new backdeff_1.default(this.getDistance, arrivingAt, attacker);
                timer_1.default.updateTimeDOM(`timer${i}`, backDeffUnit.autoReturnAt, tr);
            }
        }
    }
    set getAttackersArrival(arrival) {
        //prompt("Arrival time", "09.12.2021 23:01:56:313")
        this._getAttackersArrival = arrival;
    }
    get getAttackersArrival() {
        return this._getAttackersArrival;
    }
    set getDistance(distance) {
        //prompt("Input walking time","1:09:34")
        this._getDistance = distance;
    }
    get getDistance() {
        return this._getDistance;
    }
}
exports.default = tsBackTimerLibrary;
