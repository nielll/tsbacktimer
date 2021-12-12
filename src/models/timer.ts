abstract class StaticTiming {
 static now: Date;
}

interface ITimer {}

export default class Timer implements ITimer, StaticTiming {
 public static readonly now: Date = new Date(Date.now());
 
 constructor() {}

 public static getMsFormated(time) {
  var hours = time / 60 / 60 / 1000;
  var minutes = (time - (Math.floor(hours) * 3600 * 1000)) / 60 / 1000;
  var seconds = (time - (Math.floor(hours) * 3600 * 1000) - (Math.floor(minutes) * 60 * 1000)) / 1000;

  return `(${Math.floor(hours)}:${Math.floor(minutes)}:${Math.floor(seconds)})`;
 }

 public static updateTimeDOM(id: string, autoReturnAt: Date, element: HTMLTableRowElement) {
  var elapsingTime = new Date(this.now.getTime() + autoReturnAt.getTime());
  var x = setInterval(function() {
    var now = new Date().getTime();

    document.getElementById(id).innerHTML = this.getMsFormated(elapsingTime.getTime() - this.now.getTime());

    // If the count down is finished, click button
    if (elapsingTime.getTime() - this.now.getTime() <= 0) {
      clearInterval(x);
      let button: HTMLElement = element.getElementsByClassName("command-cancel")[0] as HTMLElement;
      if (button) button.click();
    }
  }, 1000);
 }
}