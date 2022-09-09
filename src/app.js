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
  SUMMARY: 5,
};

// Define starting game state
let currentState = GAMESTATE.MENU;

// get dom sections
let singlePlayerChoice = document.getElementById("player1");
let player1 = document.querySelector(".player1");
let playerSelection = document.querySelector(".playerSelection");
let leaderBoard = document.querySelector(".leaderBoard");
let menuBtn = document.getElementById("menuBtn");
let winP1 = document.getElementById("winP1");
let lostP1 = document.getElementById("lostP1");
let scoreNum = document.getElementById("scoreNum");
let tryAgainBtn = document.getElementById("tryAgainBtn");

// functions

const playClick = () => {
  click.play();
};

const singlePlayerStart = () => {
  currentState = 4;
  playClick();
};

singlePlayerChoice.addEventListener("click", singlePlayerStart);

const gotoMenu = () => {
  currentState = 2;
  playClick();
};

menuBtn.addEventListener("click", gotoMenu);

const tryAgain = () => {
  currentState = 4;
  playClick();
};
tryAgainBtn.addEventListener("click", tryAgain);

// import music and effect
const gameMusic = new Audio("/assets/music/butterflyShort.mp3");
gameMusic.volume = 0.08;
gameMusic.loop = true;
const gameover = new Audio("/assets/music/gameover.mp3");
gameover.volume = 0.1;
const win = new Audio("/assets/music/win.wav");
win.volume = 0.1;
const click = new Audio("/assets/music/click.wav");
click.volume = 0.1;

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

//reset game function
const resetGame = (t) => {
  input.currentPlay = "none";
  // reset game start time
  gameStart = t;
  progress = 0;
  //reset beat
  beatPoints = songs.song1;

  // reset beatPoints lock
  for (let i = 0; i < beatPoints.length; i++) {
    beatPoints[i].isLock = false;
    beatPoints[i].note.size = 100;
  }
  //clear canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};

//set up best score

let bestScore = 0;

// -----------------------------------------------start game loop -----------------------------------

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // ---------------------------------------------game menu----------------------------------

  if (currentState === 2) {
    //change background
    // draw menu
    document.querySelector(".menu").style.display = "block";
    leaderBoard.style.display = "none";
  }

  // ---------------------------------------------standby:player1----------------------------------

  if (currentState === 4) {
    //change background
    document.querySelector(".menu").style.display = "none";
    leaderBoard.style.display = "none";

    //show players
    player1.style.display = "block";

    // draw game frame
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("Press Space Bar to Start", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // reset life points and score
    document.getElementById("lifeNum").innerHTML = 100;
    document.getElementById("scoreNum").innerHTML = 0;

    // trigger game start

    gameMusic.currentTime = 0;

    if (input.currentPlay === "space") {
      currentState = 1;
      resetGame(timestamp);
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

    //reset beatPoints

    beatPoints.forEach((element) => {
      element.note.isLock = false;
      element.note.position.x = -100;
    });
    // console.log(beatPoints);

    // trigger game start

    if (input.currentPlay === "space") {
      currentState = 1;
      input.currentPlay = "none";
      // reset game start time
      gameStart = timestamp;
      // reset life points
      document.getElementById("lifeNum").innerHTML = 5;
      //clear canvas
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // reset beatPoints lock
      for (let i = 0; i < beatPoints.length; i++) {
        beatPoints[i].isLock = false;
      }
    }
  }
  // ---------------------------------------------game summary----------------------------------

  if (currentState === 5) {
    //stop music
    gameMusic.pause();
    gameMusic.currentTime = 0;

    //set up score

    if (parseInt(document.getElementById("lifeNum").innerHTML) === 0) {
      document.querySelector(".currentScore").innerHTML = "YOU LOSE";
      lostP1.style.display = "block";
      winP1.style.display = "none";
    } else {
      document.querySelector(".currentScore").innerHTML = scoreNum.innerHTML;
      if (parseInt(scoreNum.innerHTML) > bestScore) {
        bestScore = parseInt(scoreNum.innerHTML);
        document.querySelector(".bestScoreNum").innerHTML = bestScore;
      }
      lostP1.style.display = "none";
      winP1.style.display = "block";
    }

    //reset beatPoints

    beatPoints.forEach((element) => {
      element.note.isLock = false;
      element.note.position.x = -100;
    });

    leaderBoard.style.display = "block";
  }
  // ---------------------------------------------game start:one player----------------------------------
  else if (currentState === 1) {
    // console.log(beatPoints);
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
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
            gameover.play();
            currentState = 5;
          }
          beatPoints[i].isLock = true;
        }
      }
    }

    // detect lose

    if (beatPoints[beatPoints.length - 1].isLock === true) {
      setTimeout(() => {
        console.log("gameover!");
        currentState = 5;
        win.play();
      }, 2000);
    }
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
