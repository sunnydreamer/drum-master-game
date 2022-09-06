export default class Don {
  constructor() {
    this.name = "Don";
    this.size = 100;
    this.position = {
      x: -100,
      y: 20,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += 50 / dt;
  }
  disappear(ctx) {}
}

export class Ka {
  constructor() {
    this.name = "Ka";
    this.size = 100;
    this.position = {
      x: -100,
      y: 20,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += 50 / dt;
  }
}

export class Ballon {
  constructor() {
    this.name = "Balloon";
    this.size = 100;
    this.position = {
      x: -100,
      y: 20,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += 50 / dt;
  }
}
