import { Actor, CollisionType, Color, Engine, vec, Vector } from "excalibur";
import { Resources } from "../resources";

const fireball1speed = 300;
const fireballLifetime = 5000;

export class Fireball1 extends Actor {
  lifetime: number = fireballLifetime;
  constructor(startingPos: Vector, direction: "left" | "right") {
    let myvel = vec(0, 0);
    if (direction == "left") myvel = vec(-fireball1speed, 0);
    else myvel = vec(fireball1speed, 0);

    let myPos = vec(0, 0);
    if (direction == "left") myPos = startingPos.clone().add(vec(-12, 6));
    else myPos = startingPos.clone().add(vec(20, 6));

    super({
      pos: myPos,
      vel: myvel,
      radius: 16,
      rotation: direction == "left" ? Math.PI : 0,
      scale: vec(0.5, 0.5),
      collisionType: CollisionType.Passive,
    });

    this.graphics.use(Resources.fireball.toSprite());
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    this.lifetime -= elapsed;
    if (this.lifetime < 0) this.kill();
  }
}

export class Fireball2 extends Actor {
  currentRotation: number = 0;
  angVel: number = 0.05;
  distanceToCenter: number = 35;
  lifetime: number = fireballLifetime;

  constructor(public owner: Actor, startingPos: Vector, startingAngle: number) {
    super({
      pos: vec(0, 0),
      vel: vec(0, 0),
      radius: 16,
      rotation: startingAngle + Math.PI / 2,
      scale: vec(0.5, 0.5),
      collisionType: CollisionType.Passive,
    });

    this.graphics.use(Resources.fireball.toSprite());
    this.currentRotation = startingAngle;
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    this.currentRotation += this.angVel;
    this.getNextPoint();
    this.rotation = this.currentRotation + Math.PI / 2;
    this.lifetime -= elapsed;
    if (this.lifetime < 0) this.kill();
  }

  getNextPoint() {
    this.pos.x = this.owner.pos.x + this.distanceToCenter * Math.cos(this.currentRotation);
    this.pos.y = this.owner.pos.y + this.distanceToCenter * Math.sin(this.currentRotation);
  }
}
