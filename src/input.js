export default class InputHandlder {
  constructor() {
    (this.currentPlay = "none"),
      // key down
      document.addEventListener("keydown", (event) => {
        //   console.log(event.key);
        switch (event.key) {
          case "ArrowLeft":
            this.currentPlay = "drumSkin";

            // console.log(this.currentPlay);

            break;
          case "ArrowRight":
            this.currentPlay = "drumEdge";
            break;
          // case "Escape":
          //   console.log("pause");
          //   break;
          case "ArrowUp":
            this.currentPlay = "balloon";
            break;
        }
      });

    document.addEventListener("keyup", (event) => {
      //   console.log(event.key);
      switch (event.key) {
        case "ArrowLeft":
          this.currentPlay = "none";
          // console.log(this.currentPlay);

          break;
        case "ArrowRight":
          this.currentPlay = "none";
          break;
        // case "Escape":
        //   console.log("pause");
        //   break;
        case "ArrowUp":
          this.currentPlay = "none";
          break;
      }
    });
  }
}
