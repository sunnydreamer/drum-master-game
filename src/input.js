const donSound = new Audio("/assets/music/Don.wav");
donSound.volume = 0.2;
const kaSound = new Audio("/assets/music/Ka.wav");
kaSound.volume = 0.5;
const ballonSound = new Audio("/assets/music/Balloon.wav");
ballonSound.volume = 0.2;

export default class InputHandlder {
  constructor() {
    (this.currentPlay = "none"),
      // key down
      document.addEventListener("keydown", (event) => {
        //   console.log(event.key);
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
        }
      });

    document.addEventListener("keyup", (event) => {
      //   console.log(event.key);
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
        // case "Escape":
        //   console.log("pause");
        //   break;
        case "ArrowUp":
          this.currentPlay = "none";
          ballonSound.pause();
          ballonSound.currentTime = 0;
          break;
      }
    });
  }
}
