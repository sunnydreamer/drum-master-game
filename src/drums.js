let speed = 51.9;

export default class Don {
  constructor() {
    this.name = "Don";
    this.size = 100;
    this.position = {
      x: -100,
      y: 150,
    };
    this.speed = speed;
  }

  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += this.speed / dt;
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
    this.speed = speed;
  }

  draw(ctx) {
    ctx.fillStyle = "#2a9d8f";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += this.speed / dt;
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
    this.speed = speed;
  }

  draw(ctx) {
    ctx.fillStyle = "Purple";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(dt) {
    this.position.x += this.speed / dt;
  }

  reset() {
    this.position.x = -100;
  }
}
