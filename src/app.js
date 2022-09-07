import Don, { Ka, Ballon } from "/src/drums.js";
import Sensor from "/src/sensor.js";
import InputHandlder from "/src/input.js";
import { songs } from "/src/songs.js";
import Game from "/src/game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// set game width and height
const GAME_WIDTH = 1000;
const GAME_HEIGHT = 300;

// Set up Game State
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  STANDBY: 4,
};

// Define starting game state
let currentState = GAMESTATE.MENU;

// get dom sections
let singlePlayerChoice = document.getElementById("player1");
let player1 = document.querySelector(".player1");
let playerSelection = document.querySelector(".playerSelection");

// Menu function
const singlePlayerStart = () => {
  currentState = 4;
};

singlePlayerChoice.addEventListener("click", singlePlayerStart);

// import music
const gameMusic = new Audio("/assets/music/butterflyShort.mp3");
gameMusic.volume = 0.08;
gameMusic.loop = true;

// add input handler

let input = new InputHandlder();

// define my drum

let sensor = new Sensor(GAME_WIDTH, GAME_HEIGHT);

let beatPoints = [];

// game frame
let lastTime = 0;
let gameStart = null;
let progress = null;
let pauseProgress = null;

// -----------------------------------------------start game loop -----------------------------------

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // ---------------------------------------------game menu----------------------------------

  if (currentState === 2) {
    //change background

    document.body.style.backgroundImage = "url('/assets/images/menu.png')";

    // draw menu
  }

  // ---------------------------------------------standby:player1----------------------------------

  if (currentState === 4) {
    //change background
    playerSelection.style.display = "none";

    //change background
    document.body.style.backgroundImage = "url('/assets/images/gamestart.jpg')";

    //show players
    player1.style.display = "block";
    // console.log(beatPoints);

    // draw menu
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("Press Space Bar to Start", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // reset time

    // trigger game start

    if (input.currentPlay === "space") {
      currentState = 1;
      input.currentPlay = "none";
      // reset game start time
      gameStart = timestamp;
      //reset beat
      beatPoints = songs.song1;
    }
  }

  // ---------------------------------------------game pause----------------------------------

  if (currentState === 0) {
    gameMusic.pause();
    // draw menu
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // reset beats
    // beatPoints = songs.song1

    // go back to game
    if (input.currentPlay === "space") {
      currentState = 1;
      input.currentPlay = "none";
      progress = pauseProgress;
      gameStart = timestamp - pauseProgress;
    }
  }

  // ---------------------------------------------game over----------------------------------

  if (currentState === 3) {
    gameMusic.pause();
    gameMusic.currentTime = 0;
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(233,0,0,0.2)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText(
      "Game Over! Press Space Bar to Restart",
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2
    );

    // reset time

    // trigger game start

    if (input.currentPlay === "space") {
      currentState = 1;
      input.currentPlay = "none";
      // reset game start time
      gameStart = timestamp;

      // reset life points
      document.getElementById("lifeNum").innerHTML = 3;
    }
  }
  // ---------------------------------------------game start:one player----------------------------------
  else if (currentState === 1) {
    //music play
    gameMusic.play();
    // game reset
    if (input.currentPlay === "escape") {
      currentState = 2;
      input.currentPlay = "none";
    } else if (input.currentPlay === "space") {
      currentState = 0;
      input.currentPlay = "none";
      pauseProgress = progress;
    }
    progress = timestamp - gameStart;

    // beat tracker ---> to make a new song
    // if (input.currentPlay != "none") {
    //   console.log(progress);
    //   input.currentPlay = "none";
    // }

    //draw my drum(sensor)
    sensor.draw(ctx);

    // loop!

    for (let i = 0; i < beatPoints.length; i++) {
      let drumPlay = "none";
      if (progress >= beatPoints[i].time) {
        beatPoints[i].note.draw(ctx);
        // console.log(beatPoints[i].time);
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
          if (parseInt(document.getElementById("lifeNum").innerHTML) === 0) {
            currentState = 3;
          }
          beatPoints[i].isLock = true;
        }
      }
    }
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
