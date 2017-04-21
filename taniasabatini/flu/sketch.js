// Daniele Tabellini @fupete © 2017 MIT License
// P5js retrieve data from Google Spreadsheets/JSON | Firenze, IT | 4.2017
// Educational purpose, made for DSII2017 lab @UniRSM

// example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical

// link del doc google spreasheets, deve essere pubblico su web,
// va copiato la parte di indice nell'url nel formato sotto:
// https://spreadsheets.google.com/feeds/list/
// + KEY_URL + /od6/public/values?alt=json
//

//var url = "https://spreadsheets.google.com/feeds/list/1yhy6cM59YdNsU22tNpWQHGkziLC7EzlMl_vcjFE4lJo/od6/public/values?alt=json";
var url = "https://spreadsheets.google.com/feeds/list/19InJuGLdmjh-QpTaXixD3Iy88IZrKoHkOgQVxISTmlU/od6/public/values?alt=json";

 // array per contenere i dati/oggetto
var dati = [];
var scala = 30;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);

  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
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
    ellipse(padding + i * padding, height/2, sqrt(dati[i].raggio/PI)*scala, sqrt(dati[i].raggio/PI)*scala);
    stroke(90);
    line(padding + (i * padding) + 1, height/6,padding + i * padding, height/2,);
    fill(60);
  // function mousePressed() { ellipse(padding + i * padding, height/2, sqrt(dati[i].raggio/PI)*scala, sqrt(dati[i].raggio/PI)*scala); }


    noStroke();
    fill(0);
    //textAlign(CENTER, CENTER);
    //text(dati[i].colore, padding + (i * padding),height/3);
    push();
    translate(padding + (i * padding) + 1, height/3);
    rotate(-PI/2);
    fill(60);
    text(dati[i].colore, 0,0);
    textAlign(LEFT, CENTER);
    pop();
  }
  for (var i = 0; i < dati.length; i++) {
    fill(358,dati[i].decessi * 20,83, 100);
    ellipse(padding + i * padding, height/2, sqrt(dati[i].decessi/PI)*scala, sqrt(dati[i].decessi/PI)*scala);
    // if (dati[i].raggio < "15") {
  //  ellipse(padding + i * padding, height/2, dati[i].raggio * dati[i].raggio * PI);
//  } else if (dati[i].raggio > "20") {
  //  ellipse(padding + i * padding, height/2, (dati[i].raggio * dati[i].raggio) * PI, );
  //  }
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textFont ("Titillium Web");
    textSize ("14");
  //  text(dati[i].colore, padding + (i * padding),height/3);



  }

  fill(358,94,80,100);
  ellipse (80,690, 15, 15);
  fill(60);
  text("decessi", 115, 690);
  fill(60);
  text("LEGENDA", 100, 660);


  fill(239,100,78,100);
  ellipse (80,710, 15, 15);
  fill(60);
  text("casi gravi", 120, 710);



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
