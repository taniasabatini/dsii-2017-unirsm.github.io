// Daniele Tabellini @fupete © 2016 MIT License
// OOP example in P5js | Firenze, IT | 4.2016
// Educational purpose, made for DSII2016 lab @UniRSM

var W = []; // < array di camminatori
var n = 10; // < numero camminatori iniziali
var minV = .1; // < velocità minima
var deltaV = 10; // < variazione velocità possibile

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  noStroke();
  fill(255);

  // gruppo iniziale di camminatori
  for (var i=0; i<n; i++) {
    W.push(new Walker(i));
  }
}

function draw() {
  background(30);
  fill(255);

  textAlign(LEFT);
  text("OBJECTS : " + W.length, 10,20);

  // muove e mostra tutti i camminatori del gruppo
  for (var i=0; i<W.length; i++) {
      W[i].move();
      W[i].display();
    }
}



// aggiungi camminatori se premi il mouse
function mousePressed() {
  W.push(new Walker(W.length));
}

// togli ultimo camminatore se premi un tasto
function keyPressed() {
  W.pop();
}




// definizione della classe Walker
function Walker(_id) {

  // dati e costruttore
  this.id = _id;
  this.x = width/2 + random (-width/5,width/5);
  this.y = height/2 + random (-height/5,height/5);
  this.diameter = random(10, width/10);
  this.speed = random(minV, minV+deltaV);
  this.colore = random(45, 255);

  // funzionalità

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    fill(this.colore, 200);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    fill(0);
    textAlign(CENTER);
    text(this.id, this.x, this.y+5);
  }
};



//da inserire sempre utilizzando windoWidth
// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
