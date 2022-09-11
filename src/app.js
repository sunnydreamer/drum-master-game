import Sensor from "/src/sensor.js";
import InputHandlder from "/src/input.js";
import { songs } from "/src/songs.js";

let canvas = document.getElementById("gameScreen");
let canvas2 = document.getElementById("gameScreen2");
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");

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
  STANDBY2: 6,
  RUNNING2: 7,
  PAUSED2: 8,
  SUMMARY2: 9,
};

// Define starting game state
let currentState = GAMESTATE.MENU;

// get dom sections
let singlePlayerChoice = document.getElementById("player1");
let twoPlayersChoice = document.getElementById("player2");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let leaderBoard = document.querySelector(".leaderBoard");
let menuBtn = document.getElementById("menuBtn");
let winP1 = document.getElementById("winP1");
let lostP1 = document.getElementById("lostP1");
let winP2 = document.getElementById("winP2");
let lostP2 = document.getElementById("lostP2");
let drawP1 = document.getElementById("drawP1");
let drawP2 = document.getElementById("drawP2");

let scoreNum = document.getElementById("scoreNum");
let scoreNum2 = document.getElementById("scoreNum2");
let lifeNum = document.getElementById("lifeNum");
let lifeNum2 = document.getElementById("lifeNum2");

let tryAgainBtn = document.getElementById("tryAgainBtn");
let tryAgainBtn2 = document.getElementById("tryAgainBtn2");

// functions

const playClick = () => {
  click.play();
};

const singlePlayerStart = () => {
  currentState = 4;
  playClick();
};

const twoPlayersStart = () => {
  currentState = 6;
  playClick();
};

singlePlayerChoice.addEventListener("click", singlePlayerStart);
twoPlayersChoice.addEventListener("click", twoPlayersStart);

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

const tryAgain2 = () => {
  currentState = 6;
  playClick();
};
tryAgainBtn2.addEventListener("click", tryAgain2);

const player1Win = () => {
  lostP1.style.display = "none";
  winP1.style.display = "block";
  drawP1.style.display = "none";
  lostP2.style.display = "block";
  winP2.style.display = "none";
  drawP2.style.display = "none";
  console.log("player1 wins");
};

const player2Win = () => {
  console.log("player2 wins");
  lostP1.style.display = "block";
  winP1.style.display = "none";
  drawP1.style.display = "none";
  lostP2.style.display = "none";
  winP2.style.display = "block";
  drawP2.style.display = "none";
};

const draw = () => {
  console.log("draw");
  lostP1.style.display = "none";
  winP1.style.display = "none";
  lostP2.style.display = "none";
  winP2.style.display = "none";
  drawP1.style.display = "block";
  drawP2.style.display = "block";
};

const bothDie = () => {
  console.log("both die!");
  lostP1.style.display = "block";
  winP1.style.display = "none";
  drawP1.style.display = "none";
  lostP2.style.display = "block";
  winP2.style.display = "none";
  drawP2.style.display = "none";
};

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
let beatPoints2 = [];

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
  beatPoints2 = songs.song2;

  // reset beatPoints lock
  for (let i = 0; i < beatPoints.length; i++) {
    beatPoints[i].isLock = false;
    beatPoints[i].note.size = 100;
  }

  for (let i = 0; i < beatPoints2.length; i++) {
    beatPoints2[i].isLock = false;
    beatPoints2[i].note.size = 100;
  }
  //clear canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};

//set up best score

let bestScore = 0;
let bestScore2 = 0;

// -----------------------------------------------start game loop -----------------------------------

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

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
    document.getElementById("lifeNum").innerHTML = 5;
    document.getElementById("scoreNum").innerHTML = 0;

    // trigger game start

    gameMusic.currentTime = 0;

    if (input.currentPlay === "space") {
      currentState = 1;
      resetGame(timestamp);
    }
  }

  // ---------------------------------------------standby:player2----------------------------------

  if (currentState === 6) {
    //change background
    document.querySelector(".menu").style.display = "none";
    leaderBoard.style.display = "none";

    //show players
    player1.style.display = "block";
    player2.style.display = "block";

    // draw game frame
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("Press Space Bar to Start", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // draw second game frame
    ctx2.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx2.fillStyle = "rgba(0,0,0,0.2)";
    ctx2.fill();

    ctx2.font = "30px Arial";
    ctx2.fillStyle = "White";
    ctx2.textAlign = "center";
    ctx2.fillText("Press Space Bar to Start", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // reset life points and score
    document.getElementById("lifeNum").innerHTML = 5;
    document.getElementById("scoreNum").innerHTML = 0;
    document.getElementById("lifeNum2").innerHTML = 5;
    document.getElementById("scoreNum2").innerHTML = 0;

    // trigger game start

    gameMusic.currentTime = 0;

    if (input.currentPlay === "space") {
      currentState = 7;
      resetGame(timestamp);
    }
  }

  // ---------------------------------------------game pause:player1----------------------------------

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

  // ---------------------------------------------game pause:player2----------------------------------

  if (currentState === 8) {
    gameMusic.pause();
    // draw menu
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", GAME_WIDTH / 2, GAME_HEIGHT / 2);
    // draw second canvas
    ctx2.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx2.fillStyle = "rgba(0,0,0,0.4)";
    ctx2.fill();

    ctx2.font = "30px Arial";
    ctx2.fillStyle = "White";
    ctx2.textAlign = "center";
    ctx2.fillText("PAUSE", GAME_WIDTH / 2, GAME_HEIGHT / 2);

    // reset beats
    // beatPoints = songs.song1

    // go back to game
    if (input.currentPlay === "space") {
      currentState = 7;
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

    beatPoints2.forEach((element) => {
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
      for (let i = 0; i < beatPoints2.length; i++) {
        beatPoints2[i].isLock = false;
      }
    }
  }
  // ---------------------------------------------game summary:player1----------------------------------

  if (currentState === 5) {
    //stop music
    gameMusic.pause();
    gameMusic.currentTime = 0;

    // hide player2 section
    document.getElementById("player2Score").style.display = "none";
    document.getElementById("tryAgainBtn").style.display = "block";
    document.getElementById("tryAgainBtn2").style.display = "none";

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

    beatPoints2.forEach((element) => {
      element.note.isLock = false;
      element.note.position.x = -100;
    });

    leaderBoard.style.display = "block";
  }

  // ---------------------------------------------game summary:player2----------------------------------

  if (currentState === 9) {
    //stop music
    gameMusic.pause();
    gameMusic.currentTime = 0;

    // show player2 section
    document.getElementById("player2Score").style.display = "block";
    document.getElementById("tryAgainBtn").style.display = "none";
    document.getElementById("tryAgainBtn2").style.display = "block";

    //show score in dom
    document.querySelector(".currentScore").innerHTML = scoreNum.innerHTML;
    document.querySelector(".currentScore2").innerHTML = scoreNum2.innerHTML;

    //set up best scores

    if (lifeNum.innerHTML > 0) {
      if (parseInt(scoreNum.innerHTML) > bestScore) {
        bestScore = parseInt(scoreNum.innerHTML);
        document.querySelector(".bestScoreNum").innerHTML = bestScore;
      }
    }

    if (lifeNum2.innerHTML > 0) {
      if (parseInt(scoreNum2.innerHTML) > bestScore2) {
        bestScore2 = parseInt(scoreNum2.innerHTML);
        document.querySelector(".bestScoreNum2").innerHTML = bestScore2;
      }
    }

    //judge who wins

    if (lifeNum.innerHTML <= 0) {
      document.querySelector(".currentScore").innerHTML = "YOU LOSE";
      if (lifeNum2.innerHTML > 0) {
        player2Win();
      } else {
        document.querySelector(".currentScore2").innerHTML = "YOU LOSE";
        bothDie();
      }
    } else if (lifeNum.innerHTML > 0) {
      if (lifeNum2.innerHTML <= 0) {
        document.querySelector(".currentScore2").innerHTML = "YOU LOSE";
        player1Win();
      } else if (lifeNum2.innerHTML > 0) {
        if (scoreNum.innerHTML > scoreNum2.innerHTML) {
          player1Win();
        } else if (scoreNum.innerHTML < scoreNum2.innerHTML) {
          player2Win();
        } else if (scoreNum.innerHTML === scoreNum2.innerHTML) {
          draw();
        }
      }
    }

    //reset beatPoints

    beatPoints.forEach((element) => {
      element.note.isLock = false;
      element.note.position.x = -100;
    });

    beatPoints2.forEach((element) => {
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

  // --------------------------------------game start:two players----------------------------------------------------
  if (currentState === 7) {
    // console.log(beatPoints);
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    //music play
    gameMusic.play();
    // game reset

    if (input.currentPlay === "escape") {
      currentState = 2;
      input.currentPlay = "none";
    } else if (input.currentPlay === "space") {
      currentState = 8;
      input.currentPlay = "none";
      pauseProgress = progress;
    }
    progress = timestamp - gameStart;

    //draw my drum(sensor)
    sensor.draw(ctx);
    sensor.draw(ctx2);

    // loop!

    for (let i = 0; i < beatPoints.length; i++) {
      let drumPlay = "none";
      if (progress >= beatPoints[i].time) {
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
          if (parseInt(document.getElementById("lifeNum").innerHTML) <= 0) {
            document.getElementById("lifeNum").innerHTML = 0;
            //lock the blocks
            beatPoints.forEach((element) => {
              element.note.isLock = true;
              element.note.size = 0;
            });

            if (parseInt(document.getElementById("lifeNum2").innerHTML) <= 0) {
              currentState = 9;
              gameover.play();
            }
          }
          beatPoints[i].isLock = true;
        }
      }
    }

    // -------------------------------------------------------------------repeat the same thing for player 2

    for (let i = 0; i < beatPoints2.length; i++) {
      let drumPlay2 = "none";
      if (progress >= beatPoints2[i].time) {
        beatPoints2[i].note.draw(ctx2);
        // console.log(beatPoints[i].time);
        beatPoints2[i].note.update(dt);

        if (
          beatPoints2[i].note.position.x + 100 >= sensor.position.x &&
          beatPoints2[i].note.position.x <= sensor.position.x + sensor.width
        ) {
          if (beatPoints2[i].note.name === "Don") {
            drumPlay2 = "drumSkin2";
          } else if (beatPoints2[i].note.name === "Ka") {
            drumPlay2 = "drumEdge2";
          } else if (beatPoints2[i].note.name === "Balloon") {
            drumPlay2 = "balloon2";
          }

          // hit the right drum!
          if (input.currentPlay2 === drumPlay2 && drumPlay2 != "none") {
            if (beatPoints2[i].isLock === false) {
              console.log("you hit right!");
              drumPlay2 = "none";
              // make correct hit disappear
              beatPoints2[i].note.size = 0;
              document.getElementById("scoreNum2").innerHTML =
                parseInt(document.getElementById("scoreNum2").innerHTML) + 1;

              beatPoints2[i].isLock = true;
            }
          }
        }

        // miss the drum
        if (
          beatPoints2[i].note.position.x >= GAME_WIDTH &&
          beatPoints2[i].isLock === false
        ) {
          console.log("miss2");
          document.getElementById("lifeNum2").innerHTML =
            parseInt(document.getElementById("lifeNum2").innerHTML) - 1;
          if (parseInt(document.getElementById("lifeNum2").innerHTML) <= 0) {
            //lock the blocks
            beatPoints2.forEach((element) => {
              element.note.isLock = true;
              element.note.size = 0;
            });

            document.getElementById("lifeNum2").innerHTML = 0;
            console.log("player 2 died");
          }
          beatPoints2[i].isLock = true;
        }
      }
    }
    // ------------------------------------------------------------------repeat over

    if (beatPoints[beatPoints.length - 1].isLock === true) {
      setTimeout(() => {
        console.log("gameover!");
        currentState = 9;
        win.play();
      }, 2000);
    } else if (beatPoints[beatPoints.length - 1].isLock === true) {
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
