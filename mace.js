class Mace {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 180;
  }

  show() {
    const angle = this.a;
    push();
    translate(this.x, this.y);
    rotate(angle);
    fill(0);
    rectMode(CENTER);
    ellipse(0, 0, this.r);
    fill(130, 55, 18);
    rect(0, -25, 2.5, 30);
    pop();
    this.rotate(0.05);
  }

  update() {
    this.x = mouseX;
    this.y = mouseY;
  }

  rotate(amt) {
    this.a -= amt;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

}
