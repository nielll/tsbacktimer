import Timer from './timer'

interface IAttacker {
 coordinates?: string,
 arrival: Date,
}

export default class Attacker implements IAttacker {
 public readonly arrivalDate: Date;
 public readonly coordinates?: string;
 public readonly arrival: Date;
 
 constructor(arrival: string, coordinates?: string) {
  this.arrival = this.getArrivalDate(arrival);
  this.coordinates = coordinates;
 }

 private getArrivalDate = (date: string) => {
  const regexDate = /^.*\s/g;
  const regexTime = /\s.*$/g;
  const matchesDate = date.match(regexDate);
  const matchesTime = date.match(regexTime);

  const attackerDateArr = matchesDate[0].trim().split(".");
  const attackTimeArr = matchesTime[0].trim().split(":");

  return this.correctTimeOffset(
    new Date(new Date(
     Number(attackerDateArr[2]), 
     Number(attackerDateArr[1])-1, 
     Number(attackerDateArr[0]), 
     Number(attackTimeArr[0]), 
     Number(attackTimeArr[1]), 
     Number(attackTimeArr[2])
    ).setMilliseconds(
     Number(attackTimeArr[3])
    )));
 }

 private correctTimeOffset = (date: Date) => {
  var timeZoneOffset = Timer.now.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timeZoneOffset);
 }
}