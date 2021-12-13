"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./timer");
class Attacker {
    constructor(arrival, coordinates) {
        this.getArrivalDate = (date) => {
            if (!date)
                return;
            const regexDate = /^.*\s/g;
            const regexTime = /\s.*$/g;
            const matchesDate = date.replace(',', '').match(regexDate);
            const matchesTime = date.replace(',', '').match(regexTime);
            const attackerDateArr = matchesDate[0].trim().split(".");
            const attackTimeArr = matchesTime[0].trim().split(":");
            console.log(attackerDateArr, attackTimeArr);
            return timer_1.default.correctTimeOffset(new Date(new Date(Number(attackerDateArr[2]), Number(attackerDateArr[1]) - 1, Number(attackerDateArr[0]), Number(attackTimeArr[0]), Number(attackTimeArr[1]), Number(attackTimeArr[2])).setMilliseconds(Number(attackTimeArr[3]))));
        };
        this.arrival = this.getArrivalDate(arrival);
        this.coordinates = coordinates;
    }
}
exports.default = Attacker;
