import App from "./core/app.js";
import setup from "./setup.js";

document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("html-canvas")! as HTMLCanvasElement
    var radius = 50;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let context = canvas!.getContext("2d")!;
   

    App.run(setup, context)

  }, false);