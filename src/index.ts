import Timer from './models/timer';
import Attacker from './models/attacker';
import BackDeff from './models/backdeff';

declare global {
 interface Window { tsBackTimer: any; }
}

export default class TsBackTimerLibrary {
 private _container;

 constructor() {
   const container = document.getElementById("commands_outgoings");

   if (!container) {
    alert("Please run on 'game.php?screen=overview_villages&intro'");
   } else {
    console.log('tsBackTimer initialized');
 
    this._container = container;
  }
 }

 public static init(tsBackTimer: TsBackTimerLibrary) {
  console.log(`===== Start Initialization: ${Timer.now} =====`);
  const container = tsBackTimer._container;
  const tbody = container.getElementsByTagName("tbody")[0];
  const trs = tbody.getElementsByTagName("tr");

  if (container.getElementsByTagName('button').length > 0)
   return console.error('TsBackTimer already running, please refresh and rerun script!');

  // Create Button
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Start Backtimer";
  btn.setAttribute("id", "tsBackTimerActionButton");
  btn.onclick = function() {
   tsBackTimer.execution();
  };
  container.appendChild(btn);

  for (var i = 0; i < trs.length; i++) {
   const tr = trs[i];

   const el = i === 0 ? 
    tr.getElementsByTagName('th') : tr.getElementsByTagName('td');
   let newNode = i === 0 ? 
    document.createElement('th') : document.createElement('td');
   let text = i === 0 ? 
    document.createTextNode('') : document.createTextNode('');
   let childNode = el[0];

   // Create Inputs:Checkbox
   if (text && newNode && childNode) {
    newNode.appendChild(text);
    if (i !== 0) {
     const newInput = document.createElement('input');
     newInput.setAttribute('id', `input${i}`);
     newInput.setAttribute('class', `valid`);
     newInput.setAttribute('type', 'checkbox');
     newNode.appendChild(newInput);
    }
    tr.insertBefore(newNode, childNode);
   }

   // Create Inputs:Text => Attacker arrival
   newNode = i === 0 ? 
    document.createElement('th') : document.createElement('td');
   text = i === 0 ? 
    document.createTextNode('Attacker arrival') : document.createTextNode('');
   childNode = el[2];

   if (text && newNode && childNode) {
    newNode.appendChild(text);
    if (i !== 0) {
     const newInputAttackArr = document.createElement('input');
     newInputAttackArr.setAttribute('id', `inputAttack${i}`);
     newInputAttackArr.setAttribute('class', `attack`);
     newInputAttackArr.setAttribute('type', 'text');
     newInputAttackArr.placeholder = `${Timer.toString()}:313`;
     newNode.appendChild(newInputAttackArr);
    }
    tr.insertBefore(newNode, childNode);
   }

   // Create Inputs:Text => Slowest Unit
   newNode = i === 0 ? 
    document.createElement('th') : document.createElement('td');
   text = i === 0 ? 
    document.createTextNode('Slowest Unit') : document.createTextNode('');
   childNode = el[2];

   if (text && newNode && childNode) {
    newNode.appendChild(text);
    if (i !== 0) {
     const newInputDuration = document.createElement('input');
     newInputDuration.setAttribute('id', `inputUnit${i}`);
     newInputDuration.setAttribute('class', `unit`);
     newInputDuration.setAttribute('type', 'text');
     newInputDuration.placeholder = '1:05:20';
     newNode.appendChild(newInputDuration);
    }
    tr.insertBefore(newNode, childNode);
   }
  }
 }

 private execution() {
  const tbody = this._container.getElementsByTagName('tbody')[0];
  const trs = tbody.getElementsByTagName('tr');

  if (!confirm('Fire BackTiming?')) {
   console.error(`Stopped!`);
   return location.reload();
  }

  console.log(`===== Start Execution: ${Timer.now} =====`);

  for (var i = 0; i < trs.length; i++) {
   const tr = trs[i];

   let el = i === 0 ? 
     tr.getElementsByTagName('th') : tr.getElementsByTagName('td');
   let newNode = i === 0 ? 
     document.createElement('th') : document.createElement('td');
   let text = i === 0 ? 
     document.createTextNode('Autoreturn in') : document.createTextNode('');
   let childNode = el[4];

   if (text && newNode && childNode) {
     newNode.appendChild(text);
     if (i !== 0) newNode.setAttribute('id', `timer${i}`);
     tr.insertBefore(newNode, childNode);
   }

   if (i !== 0 && tr.getElementsByClassName('valid')[0].checked) {
    const distance = tr.getElementsByClassName('unit')[0].value;
    const attackerTime = tr.getElementsByClassName('attack')[0].value;
    const arrivingAt = tr.getElementsByTagName('td')[5].innerHTML;
    const attacker = new Attacker(attackerTime);
    const backDeffUnit = new BackDeff(distance, arrivingAt, attacker);
    Timer.updateTimeDOM(`timer${i}`, backDeffUnit.autoReturnAt, tr);
   }
  }
 }
}