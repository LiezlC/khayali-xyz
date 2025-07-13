// Number of symmetrical sectors (updated via slider)
let symmetry = 6;
let angle;

// UI elements
let saveBtn, clearBtn, symmetrySlider, trailMode;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0);

  // Initial angle per slice
  angle = 360 / symmetry;

  // UI: Save button
  saveBtn = createButton('💾 Save');
  saveBtn.position(10, 10);
  saveBtn.mousePressed(() => saveCanvas('kaleido-doodle', 'png'));

  // UI: Clear button
  clearBtn = createButton('🧽 Clear');
  clearBtn.position(80, 10);
  clearBtn.mousePressed(() => background(0));

  // UI: Symmetry slider
  symmetrySlider = createSlider(2, 20, symmetry, 1);
  symmetrySlider.position(150, 10);
  symmetrySlider.style('width', '100px');

  // UI: Trail mode toggle
  trailMode = createCheckbox('🌈 Trail mode', false);
  trailMode.position(270, 10);
}

function draw() {
  // Update symmetry value from slider
  symmetry = symmetrySlider.value();
  angle = 360 / symmetry;

  // Optional trail mode
  if (trailMode.checked()) {
    // Draw transparent overlay to simulate trail
    noStroke();
    fill(0, 10);
    rect(0, 0, width, height);
  }

  // Shift origin to center
  translate(width / 2, height / 2);

  if (mouseIsPressed) {
    // Use HSB for fun colors
    colorMode(HSB, 255);
    let hue = map(mouseX, 0, width, 0, 255);
    stroke(hue, 255, 255, 100);
    strokeWeight(4);

    // Get current and previous mouse position (relative to center)
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    // Repeat for each slice
    for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1); // mirror
      line(mx, my, pmx, pmy);
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
