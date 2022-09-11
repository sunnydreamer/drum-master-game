const donSound = new Audio("./assets/music/Don.wav");
donSound.volume = 0.2;
const kaSound = new Audio("./assets/music/Ka.wav");
kaSound.volume = 0.5;
const ballonSound = new Audio("./assets/music/Balloon.wav");
ballonSound.volume = 0.2;

export default class InputHandlder {
  constructor() {
    (this.currentPlay = "none"),
      (this.currentPlay2 = "none"),
      // key down
      document.addEventListener("keydown", (event) => {
        console.log(event.key);
        switch (event.key) {
          case "ArrowLeft":
            this.currentPlay = "drumSkin";
            donSound.play();
            break;
          case "ArrowRight":
            this.currentPlay = "drumEdge";
            kaSound.play();
            break;
          case "Escape":
            this.currentPlay = "escape";
            break;
          case " ":
            this.currentPlay = "space";
            break;
          case "ArrowUp":
            this.currentPlay = "balloon";
            ballonSound.play();
            break;

          // add player2 control
          case "a":
            this.currentPlay2 = "drumSkin2";
            donSound.play();
            break;
          case "d":
            this.currentPlay2 = "drumEdge2";
            kaSound.play();
            break;
          case "w":
            this.currentPlay2 = "balloon2";
            ballonSound.play();
            break;
        }
      });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.currentPlay = "none";
          donSound.pause();
          donSound.currentTime = 0;

          break;
        case "ArrowRight":
          this.currentPlay = "none";
          kaSound.pause();
          kaSound.currentTime = 0;
          break;

        case "ArrowUp":
          this.currentPlay = "none";
          ballonSound.pause();
          ballonSound.currentTime = 0;
          break;

        // add player2 control
        case "a":
          this.currentPlay2 = "none";
          donSound.pause();
          donSound.currentTime = 0;
          break;
        case "d":
          this.currentPlay2 = "none";
          kaSound.pause();
          kaSound.currentTime = 0;
          break;
        case "w":
          this.currentPlay2 = "none";
          ballonSound.pause();
          ballonSound.currentTime = 0;
          break;
      }
    });
  }
}
