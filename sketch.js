
var g_viewMultiplier = 8;
var g_width = 60;
var g_height = 40;

var g_pointSize = 4;

let A;
let B;
let C;
let D;
let S;

var borderPoints;
var step = 0.5;
var heatMap;
var low = 100000;
var high = 0;
let lowPos;
let highPos;


function setup() {
  createCanvas(800,600);
  background(0);
  noLoop()

  A = createVector(0,30);
  B = createVector(15,0);
  C = createVector(60,8);
  D = createVector(40,40);

  S = createVector(0,0);
  borderPoints = [A,B,C,D];


  // Calculate!
  heatMap = []
  var i = 0;
  var j = 0;

  lowPos = createVector(0,0);
  highPos = createVector(0,0);

  for (x = 0; x <= g_width; x += step) {
    var heightArray = []
    for (y = 0; y <= g_height; y += step) {
      S.x = x;
      S.y = y;
      d = calcTotalDistance()
      heightArray[j] = d

      if (d > high) {
        high = d;
        highPos.x = x;
        highPos.y = y;
      }
      if (d < low) {
        low = d;
        lowPos.x = x;
        lowPos.y = y;
      }

      j += 1
    }
    heatMap.push(heightArray)

    i += 1
  }





  stroke(1);
  noFill()


  
}

function draw() {
  
  background(0)



  
  // Offset and scale
  let xScaler = (width - (g_width * g_viewMultiplier))/2
  let yScaler = (height - (g_height * g_viewMultiplier))/2
  translate(xScaler,yScaler - 50);
  scale(g_viewMultiplier, g_viewMultiplier);
  



  // Draw the heat map.
  var i = 0;
  var j = 0;

  for (x = 0; x <= g_width; x += step) {
    for (y = 0; y <= g_height; y += step) {
      // Scale this from 0 to 1
      let v = (heatMap[i][j] - low) / (high - low)
      let c = lerp(255,0, v)
      noStroke()
      fill(0,0,c)
      rect(x,y,step,step)

      j += 1
    }

    i += 1
  }


  // Draw the main shape.
  stroke(200)
  strokeWeight(1)
  noFill()
  rect(0,0, g_width, g_height)

  // Draw the four lines (high)
  stroke(200,0,0)
  strokeWeight(0.5)
  line(A.x, A.y, highPos.x, highPos.y);
  line(B.x, B.y, highPos.x, highPos.y);
  line(C.x, C.y, highPos.x, highPos.y);
  line(D.x, D.y, highPos.x, highPos.y);

    // Draw the four lines (low)
    stroke(0,200,0)
    strokeWeight(0.5)
    line(A.x, A.y, lowPos.x, lowPos.y);
    line(B.x, B.y, lowPos.x, lowPos.y);
    line(C.x, C.y, lowPos.x, lowPos.y);
    line(D.x, D.y, lowPos.x, lowPos.y);


  // Draw the border points:
  stroke(100)
  strokeWeight(0.5)
  fill(150)
  for (i in borderPoints) {
    p = borderPoints[i];
    ellipse(p.x, p.y, g_pointSize, g_pointSize);
  }

  // Draw LOWEST
  stroke(0,200,0)
  strokeWeight(0.5)
  fill(0,255,0)
  ellipse(lowPos.x, lowPos.y, g_pointSize, g_pointSize)

  // Draw HIGHEST
  stroke(200,0,0)
  strokeWeight(0.5)
  fill(255,0,0)
  ellipse(highPos.x, highPos.y, g_pointSize, g_pointSize)

  // Text
  fill(100);
  noStroke();
  textSize(4);
  textAlign(CENTER);
  fill(0,200,0);
  text(`Shortest Distance: ${low.toFixed(2)}, x: ${lowPos.x.toFixed(2)} , y: ${lowPos.y.toFixed(2)}.`, 
    g_width / 2, 
    g_height + 10);
  fill(200,0,0);
  text(`Longest Distance: ${high.toFixed(2)}, x: ${highPos.x.toFixed(2)} , y: ${highPos.y.toFixed(2)}.`,
    g_width / 2, 
    g_height + 16);


  // Origin
  textSize(2);
  fill(100);
  text(`(0,0)`, -3, -2)

  // Distances
  textSize(2.5);
  fill(150);
  text("30", -3, 15);
  text("10", -3, 36.5);
  text("8", g_width + 3, 4);
  text("32", g_width + 3, 24);
  text("15", 7.5, -2);
  text("45", 38, -2);
  text("40", 20, g_height + 3.5);
  text("20", 50, g_height + 3.5);

  // Points
  textSize(2.5);
  fill(220);
  text("A", A.x, A.y+0.8);
  text("B", B.x, B.y+0.8);
  text("C", C.x, C.y+0.8);
  text("D", D.x, D.y+0.8);
  fill(20);
  text("S", lowPos.x, lowPos.y+0.8);



  // Save out to image!
  // saveCanvas("result", "png");
}

function calcTotalDistance() {
  let distance = p5.Vector.dist(S,A) + p5.Vector.dist(S,B) + p5.Vector.dist(S,C) + p5.Vector.dist(S,D)
  return distance
}

