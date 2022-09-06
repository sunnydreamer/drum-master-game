import Don, { Ka, Ballon } from "/src/drums.js";
import Sensor from "/src/sensor.js";
import InputHandlder from "/src/input.js";
import Game from "/src/game.js";

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
  { time: 1000, note: new Don(), isLock: false },
  { time: 5000, note: new Ka(), isLock: false },
  { time: 8000, note: new Ballon(), isLock: false },
];

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

// game frame
let lastTime = 0;
let currentState = GAMESTATE.MENU;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // ---------------------------------------------game menu----------------------------------

  if (currentState === 2) {
    // draw menu
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("Press Space Bar to Start", GAME_WIDTH / 2, GAME_HEIGHT / 2);
    // trigger game start

    if (input.currentPlay === "space") {
      currentState = 1;
    }
  }

  // ---------------------------------------------game start----------------------------------
  else if (currentState === 1) {
    //draw my drum(sensor)
    sensor.draw(ctx);

    //   console.log(timestamp);
    //   console.log(beatPoints[0].time);

    // loop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    for (let i = 0; i < beatPoints.length; i++) {
      let drumPlay = "none";
      if (timestamp >= beatPoints[i].time) {
        beatPoints[i].note.draw(ctx);
        beatPoints[i].note.update(dt);

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

          // hit the right drum!
          if (input.currentPlay === drumPlay && drumPlay != "none") {
            if (beatPoints[i].isLock === false) {
              console.log("you hit right!");
              drumPlay = "none";
              // make correct hit disappear
              beatPoints[i].note.size = 0;
              document.getElementById("scoreNum").innerHTML =
                parseInt(document.getElementById("scoreNum").innerHTML) + 1;

              beatPoints[i].isLock = true;
            }
          }
        }

        // miss the drum
        if (
          beatPoints[i].note.position.x >= GAME_WIDTH &&
          beatPoints[i].isLock === false
        ) {
          console.log("miss");
          document.getElementById("lifeNum").innerHTML =
            parseInt(document.getElementById("lifeNum").innerHTML) - 1;
          beatPoints[i].isLock = true;
        }
      }
    }
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
