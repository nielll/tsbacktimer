"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./timer");
class Attacker {
    constructor(arrival, coordinates) {
        this.getArrivalDate = (date) => {
            const regexDate = /^.*\s/g;
            const regexTime = /\s.*$/g;
            const matchesDate = date.match(regexDate);
            const matchesTime = date.match(regexTime);
            const attackerDateArr = matchesDate[0].trim().split(".");
            const attackTimeArr = matchesTime[0].trim().split(":");
            return this.correctTimeOffset(new Date(new Date(Number(attackerDateArr[2]), Number(attackerDateArr[1]) - 1, Number(attackerDateArr[0]), Number(attackTimeArr[0]), Number(attackTimeArr[1]), Number(attackTimeArr[2])).setMilliseconds(Number(attackTimeArr[3]))));
        };
        this.correctTimeOffset = (date) => {
            var timeZoneOffset = timer_1.default.now.getTimezoneOffset() * 60 * 1000;
            return new Date(date.getTime() - timeZoneOffset);
        };
        this.arrival = this.getArrivalDate(arrival);
        this.coordinates = coordinates;
    }
}
exports.default = Attacker;
