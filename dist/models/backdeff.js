"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./timer");
class BackDeff {
    constructor(duration, arrival, attacker) {
        this.attacker = attacker;
        this.arrival = this.generateDateFromString(arrival);
        this.duration = duration;
        this.durationMs = this.getDurationMs();
        this.departure = this.getDeparture();
        this.autoReturnAt = this.getAutoReturnAt();
    }
    getDurationMs() {
        return this.generateMsFromRegex(this.duration);
    }
    getDeparture() {
        return new Date(this.arrival.getTime() - this.durationMs);
    }
    generateMsFromRegex(time) {
        const regex = /\d+/g;
        const matches = time.match(regex);
        const hours = Number(matches[0]) * 60 * 60 * 1000;
        const minutes = Number(matches[1]) * 60 * 1000;
        const seconds = Number(matches[2]) * 1000;
        const ms = Number(matches[3]) ? Number(matches[3]) : 0;
        return hours + minutes + seconds + ms;
    }
    getAutoReturnAt() {
        const attackersArrival = this.attacker.arrival;
        const msUntilAttack = attackersArrival.getTime() - timer_1.default.now.getTime();
        const msDeffAway = timer_1.default.now.getTime() - this.departure.getTime();
        return new Date(timer_1.default.now.getTime() + (msUntilAttack - msDeffAway) / 2);
    }
    generateDateFromString(date) {
        const regex = /\d+/g;
        const matches = date.match(regex);
        const day = Number(matches[0]);
        const month = Number(matches[1]) - 1;
        const year = Number(matches[2]);
        const hours = Number(matches[3]);
        const minutes = Number(matches[4]);
        const seconds = Number(matches[5]);
        const ms = Number(matches[6]) ? Number(matches[6]) : 0;
        return new Date(new Date(year, month, day, hours, minutes, seconds).setMilliseconds(ms));
    }
}
exports.default = BackDeff;
