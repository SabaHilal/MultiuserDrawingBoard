var canavs;
var realtimeDB;

var drawing = []

function setup() {
  realtimeDB = firebase.database();
  console.log(realtimeDB);
  canvas = createCanvas(400, 400);
    canvas.parent('canvascontainer');
  //createCanvas(500,500);
    
    background(51)
    var clearbutton = select('#clearbutton');

    clearbutton.mousePressed(clearDrawing);
    var downloadbutton = select('#downloadbutton');

    downloadbutton.mousePressed(downloadDrawing)

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = realtimeDB.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    realtimeDB.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}


function clearDrawing() {
  db_drawing = [];
  var adaRef=realtimeDB.ref(`drawing/d`).remove()
 background(51) ;
}

function downloadDrawing() {
    var image = document.getElementById("canvascontainer").toDataURL("image/png").replace("image/png", "image/octet-stream");
    console.log(image);

  }