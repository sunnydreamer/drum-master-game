import Don, { Ka, Ballon } from "/src/drums.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// let note = new Don();

// let note1 = new Ka();
// let note2 = new Ballon();

// let notes = [note, note1];

let beatPoints = [
  { time: 1000, play: new Don() },
  { time: 5000, play: new Ka() },
  { time: 8000, play: new Ballon() },
];

// game frame
let lastTime = 0;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, 1000, 1000);

  console.log(timestamp);
  console.log(beatPoints[0].time);

  // loop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  for (let i = 0; i < beatPoints.length; i++) {
    if (timestamp >= beatPoints[i].time) {
      beatPoints[i].play.draw(ctx);
      beatPoints[i].play.update(dt);
    }
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
