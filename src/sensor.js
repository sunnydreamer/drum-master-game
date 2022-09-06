export default class Sensor {
  constructor(game_width, game_height) {
    this.width = 20;
    this.height = game_height;
    this.position = {
      x: game_width - 200,
      y: 0,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
