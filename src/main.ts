// main.ts
import "./style.css";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, vec } from "excalibur";
import { model, template } from "./UI/UI";
import { loader, Resources } from "./resources";
import { Player } from "./Actors/Player";
import { LevelEditor } from "./Lib/LevelEditor";
import { level1, levelsprites } from "./levelData/levelOne";
import { FireRune, Relic } from "./Actors/Relic";
import { Enemy } from "./Actors/enemy";

await UI.create(document.body, model, template).attached;

export const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
  fixedUpdateFps: 60,
});

//game.physics.gravity = vec(0, 400);
await game.start(loader);

game.add(new Player());
game.currentScene.camera.zoom = 2.5;

let levelEditor = new LevelEditor();

let level = levelEditor.createLevel(level1, levelsprites);
level.forEach(tileMap => game.add(tileMap));

let relic1 = new FireRune(vec(290, 0));
game.add(relic1);

game.add(new Enemy());
