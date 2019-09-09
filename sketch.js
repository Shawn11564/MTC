let children = [];
let turrets = [];
let timer = 0;
let mace;
let maceX, maceY;
let speed = 0.001;
let red = 0, green = 0, blue = 255;
let dead = 0, coins = 0;
let wave = 0;
let smashSize = 100, smashX, smashY, counter, maxCounter = 75;
let turretSize = 10, fireRadius = 100, fireRate = 100, turretCost = 50;
let waveTimer, maxWaveTimer = 50, warnTimer;
let starting = false;
let running = true, placing = false;

function setup() {
  createCanvas(600, 600);
  noStroke();
  makeChildren(20, speed);
  mace = new Mace(width / 2, height / 2, 20);
  waveTimer = maxWaveTimer;
  textAlign(CENTER);
}

function draw() {
  if (running && !placing) {
    gameLogic();
    drawGame();
    showStats();
    shopButton();
  } else if (running && placing) {
    drawGame();
  } else {
    drawShop();
  }
}

function drawGame() {
  noStroke();
  background(131, 92, 59);
  if (counter > 0) {
    fill(235, 159, 52);
    ellipse(smashX, smashY, smashSize);
  }
  fill(255);
  ellipse(width / 2, height / 2, 10);
  mace.show();
  for (var i = 0; i < children.length; i++) {
    children[i].show();
  }
  if (warnTimer > 0) {
    textSize(50);
    fill(255, 0, 0);
    text('New Wave Approaching!', width / 2, height / 5 - 20);
  }
  updateTurrets();
  noStroke();
}

function drawShop() {
  drawGame();
  fill(181, 177, 168, 100);
  rect(0, 0, width, height);
  fill(219, 219, 217);
  rect(width / 2 - 50, height - 150, 100, 100);
  fill(0);
  triangle(width / 2 - 35, height - 60, width / 2 - 35, height - 140, width / 2 + 40, height - 100);
  fill(219, 219, 217);
  rect(width / 2 - 50, height / 7 - 50, 100, 100);
  fill(31, 46, 28);
  rect(width / 2 - 50 + (25 / 2), height / 7 - 50 + (25 / 2), 75, 75);
  fill(161, 28, 232);
  ellipse(width / 2, height / 7, 25);
  fill(255, 215, 13);
  textSize(20);
  textAlign(CENTER);
  text('Turret: ' + turretCost + ' Gold', width / 2, height / 7 + 75);
}

function shopButton() {
  fill(145, 151, 161, 100);
  rect(10, 10, 100, 40);
  fill(247, 181, 12);
  textSize(30);
  textSize(20);
  text('SHOP', 60, 40);
}

function gameLogic() {
  maceX = mace.getX();
  maceY = mace.getY();
  mace.update();
  showSmash();
  for (var i = 0; i < children.length; i++) {
    children[i].update(width / 2, height / 2);
    if (collideCircleCircle(maceX, maceY, 20, children[i].getX(), children[i].getY(), children[i].getR())) {
      children.splice(i, 1);
      dead++;
      coins++;
      i--;
    }
  }
  if (children.length <= 0 && starting == false) {
    waveTimer = 10;
    starting = true;
  }
  if (warnTimer > 0) {
    warnTimer--;
  }
  if (waveTimer <= 0) {
    starting = false;
    if (round(timer / 1000) >= 1) {
      makeChildren(wave * 2, speed * (wave / 10));
      waveTimer = maxWaveTimer;
      warnTimer = 100;
    }
  }
  waveTimer--;
  timer++;
}

function smash(x, y) {
  if (counter > 0) {
    return;
  }
  counter = maxCounter;
  smashX = maceX;
  smashY = maceY;
}

function showSmash() {
  if (counter > 0) {
    for (var i = 0; i < children.length; i++) {
      if (collideCircleCircle(smashX, smashY, smashSize, children[i].getX(), children[i].getY(), children[i].getR())) {
        children[i].setColor(255, 0, 0);
        children.splice(i, 1);
        dead++;
        coins++;
        i--;
      }
    }
    counter--;
  }
}

function showStats() {
  fill(0);
  textSize(20);
  text('Kills: ' + dead, width / 2, height / 4);
  text('Wave: ' + wave, width / 2, height / 4 + 25);
  text('Alive: ' + children.length, width / 2, height / 4 + 50);
}

function updateTurrets() {
  for (var i = 0; i < turrets.length; i++) {
    turrets[i].show();
    if (running) {
      turrets[i].timer();
    }
    if (turrets[i].canShoot()) {
      for (var j = 0; j < children.length; j++) {
        if (collideCircleCircle(turrets[i].getX(), turrets[i].getY(), turrets[i].getRadius(), children[j].getX(), children[j].getY(), children[j].getR())) {
            turrets[i].setL(children[j].getX(), children[j].getY());
            children.splice(j, 1);
            dead++;
            coins++;
            break;
        }
      }
    }
  }
}

function makeChildren(count, spd) {
  for (var i = 0; i < round(count); i++) {
    var j = round(random(5));
    if (j == 1) {
      children.push(new Child(random(-50, -10), random(height), 10, spd, red, green, blue));
    } else if (j == 2) {
      children.push(new Child(random(width + 10, width + 50), random(height), 10, spd, red, green, blue));
    } else if (j == 3) {
      children.push(new Child(random(width), random(-50, -10), 10, spd, red, green, blue));
    } else if (j == 4) {
      children.push(new Child(random(width), random(height + 10, height + 50), 10, spd, red, green, blue));
    }
  }
  wave++;
}

function mousePressed() {
  if (running && !placing) {
    if (collidePointRect(mouseX, mouseY, 10, 10, 100, 40)) {
      running = false;
    } else {
      smash();
    }
  } else if (running && placing) {

  } else {
    if (collidePointRect(mouseX, mouseY, width / 2 - 50, height - 150, 100, 100)) {
      running = true;
    }
    if (collidePointRect(mouseX, mouseY, width / 2 - 50, height / 7 - 50, 100, 100)) {
      console.log('Pressed');
    }
  }
}

function keyPressed() {
  if (keyCode === 50) {
    if (running == true) {
      running = false;
    } else {
      running = true;
    }
  }
  if (keyCode === 49) {
    turrets.push(new Turret(maceX, maceY, turretSize, fireRadius, fireRate));
  }
}
