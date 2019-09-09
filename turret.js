class Turret {
  constructor(x, y, r, fireRadius, fireRate) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.fireRadius = fireRadius;
    this.fireRate = fireRate;
    this.counter = 0;
    this.laser = 0;
  }

  show() {
    noStroke();
    fill(31, 46, 28);
    rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    fill(161, 28, 232);
    ellipse(this.x, this.y, this.r);
    noFill();
    stroke(168, 168, 168, 200);
    strokeWeight(1);
    ellipse(this.x, this.y, this.fireRadius + 9);
    if (this.laser > 0) {
      this.shoot();
    }
    if (this.counter > 0) {
      this.counter--;
    }
  }

  shoot() {
    noFill();
    stroke(255, 0, 0, 250);
    strokeWeight(2);
    line(this.x, this.y, this.lX, this.lY);
    noStroke();
  }

  timer() {
    this.laser--;
  }

  canShoot() {
    if (this.counter <= 0) {
      return true;
    }
    return false;
  }

  setL(x, y) {
    this.lX = x;
    this.lY = y;
    this.laser = 20;
  }

  getRadius() {
    return this.fireRadius;
  }

  getCounter() {
    return this.counter;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

}
