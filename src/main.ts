// main.ts
import "./style.css";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, vec } from "excalibur";
import { model, template } from "./UI/UI";
import { loader, Resources } from "./resources";
import { Player } from "./Actors/Player";
import { LevelEditor } from "./Lib/LevelEditor";
import { level1, levelsprites } from "./levelData/levelOne";

await UI.create(document.body, model, template).attached;

export const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
});

//game.physics.gravity = vec(0, 400);
await game.start(loader);

game.add(new Player());
game.currentScene.camera.zoom = 1.5;

let levelEditor = new LevelEditor();

let level = levelEditor.createLevel(level1, levelsprites);
console.log(level);

level.forEach(tileMap => game.add(tileMap));
