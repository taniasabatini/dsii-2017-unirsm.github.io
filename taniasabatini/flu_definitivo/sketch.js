// Tania Sabatini @taniasabatini © 2017 MIT License
// P5js retrieve data from Google Spreadsheets/JSON | San Marino, RSM | 4.2017
// Educational purpose, made for DSII2017 lab @UniRSM

// example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical

var url = "https://spreadsheets.google.com/feeds/list/19InJuGLdmjh-QpTaXixD3Iy88IZrKoHkOgQVxISTmlU/od6/public/values?alt=json";

 // array per contenere i dati/oggetto
var dati = [];
var scala = 30;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);

  // richiedi i dati in formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  //print("ciao");
  colorMode(HSB);
  rectMode(CENTER);
} // setup()

function draw() {
  // piccolo loop per verificare di avere i dati,
  // stampa su schermo cerchi con i colori presenti nel google doc
  background(0,0,255);
  var padding = width/(dati.length+1);
  for (var i = 0; i < dati.length; i++) {
    fill(dati[i].hue,dati[i].saturation,dati[i].brightness);
    var x_1 = padding + i * padding;
    var y_1 = height/2;
    var d_1 = sqrt(dati[i].raggio/PI)*(scala+random(2));
    ellipse(x_1, y_1, d_1, d_1);
    stroke(90);
    line(padding + (i * padding) + 1, height/6,padding + i * padding, height/2,);
    fill(60);

//REGIONI ITALIANE

    noStroke();
    fill(0);
    push();
    translate(padding + (i * padding) + 1, height/3);
    rotate(-PI/2);
    fill(60);
    textAlign(CENTER, CENTER);
    textFont("Titillium Web");
    textSize(14);
    text(dati[i].colore, 0,0);
    pop();

//CERCHI BLU - casi gravi

    fill(358,dati[i].decessi * 20,83, 100);
    var x_2 = padding + i * padding;
    var y_2 = height/2;
    var d_2 = sqrt(dati[i].decessi/PI)*(scala+random(2));
    ellipse(x_2, y_2, d_2, d_2);


  if (
    // SINISTRA
    mouseX >= x_1 - d_1/2 && mouseX <= x_2 - d_2/2 && mouseY >= y_1 - d_1/2 && mouseY <= y_1 + d_1/2 ||
    // CENTRO SU
    mouseX >= x_2 - d_2/2 && mouseX <= x_2 + d_2/2 && mouseY >= y_1 - d_1/2 && mouseY <= y_2 - d_2/2 ||
    // CENTRO GIU
    mouseX >= x_2 - d_2/2 && mouseX <= x_2 + d_2/2 && mouseY >= y_2 + d_2/2 && mouseY <= y_1 + d_1/2 ||
    // DESTRA
    mouseX >= x_2 + d_2/2 && mouseX <= x_1 + d_1/2 && mouseY >= y_1 - d_1/2 && mouseY <= y_1 + d_1/2
    ) {

    push();
    fill(60);
    textAlign(CENTER, TOP);
    textFont("Titillium Web");
    fill(239,100,78,100);
    textSize(44);
    text(dati[i].raggio, width/2, height*2/3);
    textSize(14);
    text("casi gravi di influenza", width/2, height*2/3+50);
    pop();
  }

//CERCHI ROSSI - decessi

    if (mouseX >= x_2 - d_2/2 && mouseX <= x_2 + d_2/2 && mouseY >= y_2 - d_2/2 && mouseY <= y_2 + d_2/2) {
      push();
      fill(0);
      textAlign(CENTER, TOP);
      textFont("Titillium Web");
      fill(358,94,80,100);
      textSize(44);
      text(dati[i].decessi, width/2, height*2/3);
      textSize(14);
      text("decessi per influenza", width/2, height*2/3+50);
      pop();
    }


  }

  //LEGENDA

  fill(358,94,80,100);
  ellipse (40,height-60, 12, 12);
  fill(239,100,78,100);
  ellipse (40,height-40, 12, 12);
  textFont("Titillium Web");
  fill(60);
  text("LEGENDA", 34, height-80);
  text("decessi", 50,height-56);
  text("casi gravi", 50,height-36);




} // draw()

function gotSpreadsheet(colori) {
  println(colori.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < colori.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var colore = {
                  // dati, nomi delle colonne, i parametri
                  "colore": colori.feed.entry[i].gsx$colore.$t,
                  "hue": colori.feed.entry[i].gsx$hue.$t,
                  "saturation": colori.feed.entry[i].gsx$saturation.$t,
                  "brightness": colori.feed.entry[i].gsx$brightness.$t,
                  "alpha": colori.feed.entry[i].gsx$alpha.$t,
                  "forma": colori.feed.entry[i].gsx$forma.$t,
                  "raggio": colori.feed.entry[i].gsx$raggio.$t,
                  "decessi": colori.feed.entry[i].gsx$decessi.$t,
              }
              println(colore); // < debug, verifica oggetto 1x1
    dati.push(colore); // < inserimento nell'array del dato
  }
} // gotSpreadsheet(colori)

// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
