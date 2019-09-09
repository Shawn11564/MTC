class Child {
  constructor(x, y, r, s, red, green, blue) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.initX = x;
    this.initY = y;
    this.endX = width / 2;
    this.endY = height / 2;
    this.exp = 2;
    this.pct = 0.0;
    this.distX = this.endX - this.initX;
    this.distY = this.endY - this.initY;
  }

  show() {
    fill(this.red, this.green, this.blue);
    ellipse(this.x, this.y, this.r);
  }

  update(x, y) {
    this.pct += this.s;
    if (this.pct < 1.0) {
      this.x = this.initX + this.pct * this.distX;
      this.y = this.initY + pow(this.pct, this.exp) * this.distY;
    }
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getR() {
    return this.r;
  }

  setColor(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }

}
