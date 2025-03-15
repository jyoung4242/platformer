import { Actor, Vector, CollisionType, Engine } from "excalibur";
import { enemyAnimation, Resources } from "../resources";

export class Enemy extends Actor {
  health: number;
  maxHealth: number;
  speed: number;

  constructor() {
    super({
      name: "enemy",
      radius: 16,
      pos: new Vector(600, 0),
      vel: new Vector(0, 0),
      collisionType: CollisionType.Active,
    });

    this.body.useGravity = true;
    this.health = 1;
    this.maxHealth = 1;
    this.speed = 100;
  }

  onInitialize(engine: Engine): void {
    this.graphics.use(enemyAnimation);
  }
}
