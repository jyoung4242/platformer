import { Actor, CollisionGroup, CollisionType, Color, Entity, Flash, MoveTo, ParallelActions, Vector } from "excalibur";
import { PickUppable } from "../Components/PickUppable";
import { fireRuneAnimation } from "../resources";
import { GivesJob, jobs } from "../Components/Jobs";

const PickUppableCollisionGroup = new CollisionGroup("pickup", 0b010, 0b001);

export class Relic extends Actor {
  pu: PickUppable;
  givesJob: GivesJob | undefined;
  tintColor: Color | undefined;
  constructor(pos: Vector, vel: Vector = Vector.Zero) {
    super({
      pos,
      vel,
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
  constructor(pos: Vector, vel: Vector = Vector.Zero) {
    super(pos, vel);
    this.graphics.use(fireRuneAnimation);
    this.givesJob = new GivesJob(this, jobs.FIRE);
    this.addComponent(this.givesJob);
    this.tintColor = Color.fromHex("#ff450080");
  }
}
