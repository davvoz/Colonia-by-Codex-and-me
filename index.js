/* no scroll */
//document.body.style.overflow = 'hidden';
/* /* 2 bottoni start e stop */
var start = document.createElement('button');
start.innerHTML = 'Start';
document.body.appendChild(start);
var stop = document.createElement('button');
stop.innerHTML = 'Stop';
document.body.appendChild(stop);
/* /* sotto i bottoni una canvas grigia lunga tutto lo schermo */
var canvas = document.createElement('canvas');
canvas.style.backgroundColor = '#ccc';
canvas.style.width = '100%';
canvas.style.height = '100%';
document.body.appendChild(canvas);
/* classe personaggio ,implementa un array di personaggi chiamato colonia : è di colore random , la sua salute è rappresentata dalla dimensione , il sesso dal colore , l'età da una scritta , cerca il partner , si riproduce, muore , viene disegnato su una canvas . */

class Personaggio {
  constructor(x, y, sesso, eta, salute) {
    this.x = x;
    this.y = y;
    this.sesso = sesso;
    this.eta = eta;
    this.salute = salute;
  }
  cercaPartner() {
    for (var i = 0; i < colonia.length; i++) {
      if (colonia[i].sesso != this.sesso) {
        return colonia[i];
      }
    }
  }
  riproduzione(partner) {
    var figlio = new Personaggio(
      this.x,
      this.y,
      Math.random() > 0.5 ? 'm' : 'f',
      0,
      this.salute
    );
    colonia.push(figlio);
  }
  muore() {
    if (colonia.length > 1) {
      colonia.splice(colonia.indexOf(this), 1);
    }
  }
  disegna() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.salute / 800, 0, 2 * Math.PI);
    ctx.fillStyle = this.sesso == 'm' ? 'blue' : 'red';
    ctx.fill();
    // ctx.font = '10px Arial';
    // ctx.fillStyle = 'black';
    // ctx.fillText(this.salute, this.x - 5, this.y + 5);
  }
}
var colonia = [];
/* crea una colonia di 20 e disegnala sulla canvas */
for (var i = 0; i < 20; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var sesso = Math.random() > 0.5 ? 'm' : 'f';
  var eta = Math.floor(Math.random() * 10000);
  var salute = Math.floor(Math.random() * 900);
  var p = new Personaggio(x, y, sesso, eta, salute);
  colonia.push(p);
}
/* crea un animazione simpatica */
var animazione;
/* l'animazione parte on start e si ferma on stop */
var numeroGiri = 0;
var treshOldValue = 20;
var contatore = document.createElement('div');
document.body.appendChild(contatore);
var ths = document.createElement('div');
document.body.appendChild(ths);
var titolo = document.createElement('h1');
titolo.innerHTML = 'La colonia';
document.body.appendChild(titolo);
start.onclick = function () {
  animazione = setInterval(function () {
    contatore.innerHTML = colonia.length;
    ths.innerHTML = treshOldValue;
    for (var i = 0; i < colonia.length; i++) {
      if (colonia[i]) {
        colonia[i].x += Math.random() * 10 - 5;
        colonia[i].y += Math.random() * 10 - 5;
        colonia[i].eta++;
        colonia[i].salute--;
        if (colonia[i].salute <= 0) {
          colonia[i].muore();
        }
        if (colonia[i].eta > 50) {
          var partner = colonia[i].cercaPartner();
          if (partner) {
            colonia[i].riproduzione(partner);
          }
        }
      }
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < colonia.length; i++) {
      colonia[i].disegna();
    }
    numeroGiri++;
    if (numeroGiri % treshOldValue == 0) {
      for (var i = 0; i < colonia.length; i++) {
        let indi = Math.floor(Math.random() * colonia.length);
        if (colonia[indi]) {
          colonia[indi].muore();
        }
      }
    }
    if (numeroGiri == 500) {
      numeroGiri = 0;
    }
  }, 100);
};
stop.onclick = function () {
  clearInterval(animazione);
};

var thold = document.createElement('button');
thold.innerHTML = 'treshold + 1 ';
document.body.appendChild(thold);
thold.onclick = function () {
  treshOldValue += 1;
};
var thold2 = document.createElement('button');
thold2.innerHTML = 'treshold - 1 ';
document.body.appendChild(thold2);
thold2.onclick = function () {
  treshOldValue -= 1;
};
