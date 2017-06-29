// 10PRINT - PACMAN by taniasabatini - Tania Sabatini
// 2017 © taniasabatini, Daniele @fupete and the course DSII2017 @UniRSM
// github.com/fupete — github.com/dsii-2017-unirsm
// Educational purposes, MIT License, 2017, San Marino

// Credits to Daniel Shiffman / Original code inspired on https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_10_Maze_DFS_p5.js


var cols, rows;
var canvasx, canvasy;
var w = 50; //dimensione cella
var grid = [];

var up, right, bottom, left; //il top l'ho denominato "up", perchè inspiegabilmente dava problemi

// si definisce l'esistenza delle variabili
var current;
var pacman, pacman_next;

// stack = raccolta di elementi, pila
var stack = [];

// boolean
var d_top, d_right, d_bottom, d_left, pieno;


function setup() { // setup del foglio

pixelDensity(displayDensity());

//per centrare la griglia al centro dello schermo
var canvas = createCanvas(1001, 601);
canvasx = (windowWidth - 1000)/2;
canvasy = (windowHeight - 600)/3;
canvas.position(canvasx,canvasy);
//createCanvas(800, 800);
cols = floor(width/w);
rows = floor(height/w);
frameRate(5);

//per ogni riga e ogni colonna, crea una cella
for (var j = 0; j < rows; j++) {
  for (var i = 0; i < cols; i++) {
    var cell = new Cell(i,j);
    grid.push(cell);
  }
}

current = grid[0]; //pacman parte da (0,0)

}

function draw() { // disegna
background(0);
for (var i = 0; i < grid.length; i++) { //disegna le celle per tutta la lunghezza dell'array
  grid[i].show(); //grid è un array a 1 dimensione, quindi ogni cella è contraddistinta da un determinato numero
}

current.visited = true;  //se è current allora l'hai visitato
current.highlight(); // do a current la funzione highlight quando è visitato

  //step 1
var next = current.randomNeighbors(); //randomNeighbors mi restituisce un vicino in cui andare

if (next == up) { d_top = true; console.log("TOP"); } else { d_top = false; }
if (next == right) { d_right = true; console.log("RIGHT"); } else { d_right = false; }
if (next == bottom) { d_bottom = true; console.log("BOTTOM"); } else { d_bottom = false; }
if (next == left) { d_left = true; console.log("LEFT"); } else { d_left = false; }

if (!next) { pieno = true; } else { pieno = false; }

if (next) {
  next.visited = true;

  //step 2
  stack.push(current);

  //step 3
  removeWalls(current, next);
  //step 4
  current = next;
} else if (stack.length > 0) {
  current = stack.pop();
}

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }

  return i + j * cols;
}

//i corrispondono alle colonne, j alle righe
//costruisco delle celle.
function Cell (i, j) {
this.i = i;
this.j = j;
this.walls = [true, true, true, true]; //creo un array che dice che ogni parete è in quella determinata  posizione
this.visited = false;

this.randomNeighbors = function() {
    var neighbors = []; //array

    up    = grid[index(i, j - 1)]; //index è la funzione che mi restituisce il numero corrispondente alla cella
    right  = grid[index(i+1, j)];
    bottom = grid[index(i, j+1)];
    left   = grid[index(i - 1, j)];

    if (up && !up.visited) { //se top  è reale e non è stato visitato
      neighbors.push(up); //allora aggiungilo all'array dei vicini possibili in cui andare
    }

    if (right &&!right.visited) { //se right è reale e non è stato visitato
      neighbors.push(right); //allora aggiungilo all'array dei vicini possibili in cui andare
    }

    if (bottom && !bottom.visited) { //se bottom è reale e non è stato visitato
      neighbors.push(bottom); //allora aggiungilo all'array dei vicini possibili in cui andare
    }

    if (left && !left.visited) { //se left è reale e non è stato visitato
      neighbors.push(left); //allora aggiungilo all'array dei vicini possibili in cui andare
    }

    if (neighbors.length > 0 ) {
        var r = floor(random(0, neighbors.length));
        return neighbors[r];

     } else {
       return undefined;
     }



}


this.highlight = function() {
  var x = this.i*w;
  var y = this.j*w;
  noStroke();
  fill(255,255,0,255);
  if (pieno == true) { ellipse(x+w/2,y+w/2,30,30); }
  if (d_top == true) { arc(x+w/2,y+w/2,30,30, -HALF_PI/2, PI+HALF_PI/2);  } else
  if (d_right == true) { arc(x+w/2,y+w/2,30,30, HALF_PI/2, -HALF_PI/2);  } else
  if (d_bottom == true) { arc(x+w/2,y+w/2,30,30, HALF_PI+HALF_PI/2, HALF_PI/2);  } else
  if (d_left == true) { arc(x+w/2,y+w/2,30,30, PI+HALF_PI/2, HALF_PI+HALF_PI/2);  } else
  { ellipse(x+w/2,y+w/2,30,30); }
}


this.show = function() { //attribuisco ad ogni cella il colore blu e uno stroke di 1
  var x = this.i*w;
  var y = this.j*w;

  noStroke();
  fill(255,0,0, 0);
  rect(x,y,w,w);
  fill(255,255,255,255);
  ellipse(x+w/2,y+w/2,7,7);

  stroke(0,0,255,255);
  strokeWeight(1);

  //costruisco i 4 muri
if (this.walls[0]) {
  //top
  line(x,y,x+w,y);
  }
if (this.walls[1]) {
  //right
  line(x+w,y,x+w,y+w);
  }
if (this.walls[2]) {
  //bottom
  line(x+w,y+w,x,y+w);
  }
if (this.walls[3]) {
  //left
  line(x,y+w,x,y);
  }

//se sei già passato sulla cella, cambia colore della cella in nero
    if (this.visited) {
      var x = this.i*w;
      var y = this.j*w;
      noStroke();
      fill(0,0,0,255);
      rect(x+1,y+1,w-1,w-1);
    }
  }
}

function removeWalls(a,b) { //(a,b rispettivamente current, next)


  //rimuovere muro tra a e b
  var x = a.i - b.i;
  if(x === 1) {
    a.walls[3] = false; //muro di sinistra tra righe
    b.walls[1] = false;
    // console.log(a);
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if(y === 1) {
    a.walls[0] = false; //muro in alto tra colonne
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
