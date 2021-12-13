"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaticTiming {
}
class Timer {
    constructor() { }
    static getMsFormated(time) {
        var hours = time / 60 / 60 / 1000;
        var minutes = (time - (Math.floor(hours) * 3600 * 1000)) / 60 / 1000;
        var seconds = (time - (Math.floor(hours) * 3600 * 1000) - (Math.floor(minutes) * 60 * 1000)) / 1000;
        return `(${Math.floor(hours)}:${Math.floor(minutes)}:${Math.floor(seconds)})`;
    }
    static updateTimeDOM(id, autoReturnAt, element) {
        var elapsingTime = new Date(this.now.getTime() + autoReturnAt.getTime());
        var x = setInterval(function () {
            var now = new Date().getTime();
            document.getElementById(id).innerHTML = this.getMsFormated(elapsingTime.getTime() - this.now.getTime());
            // If the count down is finished, click button
            if (elapsingTime.getTime() - this.now.getTime() <= 0) {
                clearInterval(x);
                let button = element.getElementsByClassName("command-cancel")[0];
                if (button)
                    button.click();
            }
        }, 1000);
    }
}
exports.default = Timer;
Timer.now = new Date(Date.now());
