export default class Don {
  constructor() {
    this.name = "Don";
    this.size = 100;
    this.position = {
      x: -100,
      y: 150,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += 50 / dt;
  }

  reset() {
    this.position.x = -100;
  }
}

export class Ka {
  constructor() {
    this.name = "Ka";
    this.size = 100;
    this.position = {
      x: -100,
      y: 150,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += 50 / dt;
  }

  reset() {
    this.position.x = -100;
  }
}

export class Ballon {
  constructor() {
    this.name = "Balloon";
    this.size = 100;
    this.position = {
      x: -100,
      y: 50,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += 50 / dt;
  }

  reset() {
    this.position.x = -100;
  }
}
