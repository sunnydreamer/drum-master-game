import Don, { Ka, Ballon } from "/src/drums.js";
import Sensor from "/src/sensor.js";
import InputHandlder from "/src/input.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// add input handler

let input = new InputHandlder();

// set game width and height

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 300;

// define my drum

let sensor = new Sensor(GAME_WIDTH, GAME_HEIGHT);

let beatPoints = [
  { time: 1000, note: new Don() },
  { time: 5000, note: new Ka() },
  { time: 8000, note: new Ballon() },
];

// game frame
let lastTime = 0;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  //draw my drum(sensor)
  sensor.draw(ctx);

  //   console.log(timestamp);
  //   console.log(beatPoints[0].time);

  // loop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let drumPlay = "none";
  for (let i = 0; i < beatPoints.length; i++) {
    if (timestamp >= beatPoints[i].time) {
      //   console.log(beatPoints[0].note.position.x);
      beatPoints[i].note.draw(ctx);
      beatPoints[i].note.update(dt);

      //   console.log(sensor.position.x);
      //   console.log(beatPoints[0].note.position.x);

      if (
        beatPoints[i].note.position.x + 100 >= sensor.position.x &&
        beatPoints[i].note.position.x <= sensor.position.x + sensor.width
      ) {
        if (beatPoints[i].note.name === "Don") {
          drumPlay = "drumSkin";
        } else if (beatPoints[i].note.name === "Ka") {
          drumPlay = "drumEdge";
        } else if (beatPoints[i].note.name === "Balloon") {
          drumPlay = "balloon";
        }
      }
    }

    // hit right

    if (input.currentPlay === drumPlay && drumPlay != "none") {
      console.log("you hit right!");
    }
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
