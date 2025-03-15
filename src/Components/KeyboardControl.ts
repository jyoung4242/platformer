import { Component, Engine, Entity, Keys } from "excalibur";
import { Player } from "../Actors/Player";

export class KeyboardControl extends Component {
  _directions: string[] = [];
  engine: Engine;

  constructor(engine: Engine) {
    super();
    this.engine = engine;
  }

  onAdd(owner: Entity): void {
    console.log("keyboard control added: ", owner);

    this.owner?.scene!.input.keyboard.on("press", (event: any) => {
      switch (event.key) {
        case "ArrowLeft":
          this._directions.push("left");
          break;
        case "ArrowRight":
          this._directions.push("right");
          break;
        case "ArrowUp":
          this._directions.push("up");
          break;
        case "ArrowDown":
          this._directions.push("down");
          break;
        case "KeyA":
          (owner as Player).primaryAction(owner as Player, owner.scene!);
          (owner as Player).isAttacking = true;
          break;
        case "KeyS":
          (owner as Player).secondaryAction(owner as Player, owner.scene!);
          (owner as Player).isAttacking = true;
          break;
      }
    });

    this.owner?.scene!.input.keyboard.on("release", (event: any) => {
      switch (event.key) {
        case "ArrowLeft":
          this._directions.splice(this._directions.indexOf("left"), 1);
          break;
        case "ArrowRight":
          this._directions.splice(this._directions.indexOf("right"), 1);
          break;
        case "ArrowUp":
          this._directions.splice(this._directions.indexOf("up"), 1);
          break;
        case "ArrowDown":
          this._directions.splice(this._directions.indexOf("down"), 1);
          break;
        case "KeyA":
          (owner as Player).isAttacking = false;
          break;
        case "KeyS":
          (owner as Player).isAttacking = false;
          break;
      }
    });
  }

  get directions(): string[] {
    return this._directions;
  }

  update(engine: Engine, delta: number): void {
    //console.log(this._directions);
  }
}
