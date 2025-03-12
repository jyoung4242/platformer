import { Actor, CollisionGroup, CollisionType, Color, Entity, Flash, MoveTo, ParallelActions, Vector } from "excalibur";
import { PickUppable } from "../Components/PickUppable";
import { fireRuneAnimation } from "../resources";

const PickUppableCollisionGroup = new CollisionGroup("pickup", 0b010, 0b001);

export class Relic extends Actor {
  pu: PickUppable;
  constructor(pos: Vector) {
    super({
      pos,
      radius: 8,
      color: Color.Red,
      collisionType: CollisionType.Active,
    });
    this.body.useGravity = true;
    this.pu = new PickUppable();
    this.addComponent(this.pu);
  }
}

export class FireRune extends Relic {
  constructor(pos: Vector) {
    super(pos);
    this.graphics.use(fireRuneAnimation);
  }
}
