// Daniele Tabellini @fupete © 2016 MIT License
// 10 print porting to P5js | Firenze, IT | 4.2016
// Educational purpose, made for DSII2016 lab @UniRSM

var x = 0;  // store current x position on the grid
var y = 0;  // store current y position on the grid
var g = 50; // grid size
var colore = 200; // current grid color

function setup() {
   pixelDensity(displayDensity());
   createCanvas(windowWidth, windowHeight);
   //
   background(200);
   //
   url = getURL();
   strokeJoin(ROUND);
 }

function draw() {
  preparaQuadretto();
  // riga proporzionale alla griglia
  strokeWeight(g/10);
  // lancio la monetina e disegno la riga corrispondente
  if (testa()) {
    line(x*g,height-g*y,x*g+g,height-g*y-g);
  } else {
    line(x*g,height-g*y-g,x*g+g,height-g*y);
  }
  // passo alla casella a lato
  x++;
  // se sono in fondo alla riga vado a capo alla riga successiva
  if (x*g >= width) {
    x=0;
    y++;
    preparaRiga();
  }
  // se sono in fondo alla pagina ricomincio con colore e griglia differente
  if (y*g >= height) {
    y=0;
    colore = random(255);
    g = 5+random(width);
    preparaRiga();
  }
}

// riparti se premi il mouse
function mousePressed() {
  x=0;
  y=0;
  colore = random(255);
  g = 5+random(width);
  preparaRiga();
}

// lancio della monetina
function testa() {
  if (random(2) <= 1) {
    return(true); // testa
  } else {
    return(false); // croce
  }
}

// cancella una riga prima di disegnarci
function preparaRiga() {
  /*fill(colore);
  noStroke();
  rect(0,height-g*y-g-1,width,g+1);
  stroke(255-colore);*/
}

// cancella un quadretto prima di disegnarci
function preparaQuadretto() {
  fill(colore);
  noStroke();
  rect(x*g,height-g*(y+1),g-1,g-1);
  //rect(x*g,height-g*(y+1),g-(g/20),g-(g/20));
  stroke(255-colore);
}

// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
