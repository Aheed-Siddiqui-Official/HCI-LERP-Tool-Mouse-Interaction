let shapeA = [];
let shapeB = [];

let drawingA = true;
let animating = false;

let t = 0;
let speed = 0.008;

function setup() {
  let canvas = createCanvas(1000, 650);
  canvas.parent("canvasContainer");
}

function draw() {
  background(245);

  // Update UI counters
  document.getElementById("countA").innerText = shapeA.length;
  document.getElementById("countB").innerText = shapeB.length;

  // Mode text
  fill(0);
  textSize(16);
  textStyle(BOLD);

  if (drawingA && !animating) {
    text("MODE: Drawing Shape A", 20, 25);
  } else if (!drawingA && !animating) {
    text("MODE: Drawing Shape B", 20, 25);
  } else if (animating) {
    text("MODE: Animating (t = " + nf(t, 1, 2) + ")", 20, 25);
  }

  textStyle(NORMAL);

  // Draw Shape A
  noFill();
  stroke(0, 80, 255);
  strokeWeight(4);
  drawShape(shapeA);

  // Draw Shape B
  stroke(255, 60, 80);
  strokeWeight(4);
  drawShape(shapeB);

  // Animation
  if (animating && shapeA.length > 1 && shapeA.length === shapeB.length) {
    stroke(0, 180, 80);
    strokeWeight(5);
    noFill();

    beginShape();

    for (let i = 0; i < shapeA.length; i++) {
      let interX = lerp(shapeA[i].x, shapeB[i].x, t);
      let interY = lerp(shapeA[i].y, shapeB[i].y, t);

      vertex(interX, interY);

      // Connection lines
      push();
      stroke(180, 180, 180, 100);
      strokeWeight(1);
      line(shapeA[i].x, shapeA[i].y, shapeB[i].x, shapeB[i].y);
      pop();
    }

    endShape();

    // Animation progress
    t += speed;

    if (t > 1 || t < 0) {
      speed *= -1;
    }
  }
}

function drawShape(points) {
  if (points.length < 2) return;

  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape();
}

function mousePressed() {
  if (mouseButton === LEFT && !animating) {
    if (drawingA) {
      shapeA.push({ x: mouseX, y: mouseY });
    } else if (shapeB.length < shapeA.length) {
      shapeB.push({ x: mouseX, y: mouseY });
    }
  }
}

function keyPressed() {
  if (key === "a" || key === "A") {
    drawingA = true;
  }

  if (key === "b" || key === "B") {
    drawingA = false;
  }

  if (key === " ") {
    if (shapeA.length > 2 && shapeA.length === shapeB.length) {
      animating = !animating;
    }
  }

  if (key === "r" || key === "R") {
    shapeA = [];
    shapeB = [];

    drawingA = true;
    animating = false;

    t = 0;
    speed = 0.008;
  }
}
