import { Actor, CollisionGroup, CollisionType, Color, Engine, Entity, Flash, MoveTo, ParallelActions, Scene, Vector } from "excalibur";
import { PickUppable } from "../Components/PickUppable";
import { fireRuneAnimation } from "../resources";
import { GivesJob, jobs } from "../Components/Jobs";
import { Player } from "./Player";
import { Fireball1, Fireball2 } from "./fireball";

const PickUppableCollisionGroup = new CollisionGroup("pickup", 0b010, 0b001);

export class Relic extends Actor {
  primaryCooldown: number = -1;
  secondaryCooldown: number = -1;
  primaryAction: (parent: Actor, scene: Scene) => void = () => {};
  secondaryAction: (parent: Actor, scene: Scene) => void = () => {};
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
    this.tintColor = Color.fromHex("#ff4500A0");
    this.primaryAction = (parent: Actor, scene: Scene) => this.fireball(parent, scene);
    this.secondaryAction = (parent: Actor, scene: Scene) => this.shield(parent, scene);
    this.primaryCooldown = 0;
    this.secondaryCooldown = 5000;
  }

  onInitialize(engine: Engine): void {}

  fireball = (parent: Actor, scene: Scene) => {
    if (!(parent as Player).primaryEnableFlag) return;
    scene.add(new Fireball1((parent as Player).pos, (parent as Player).facingDirection));
  };

  shield = (parent: Actor, scene: Scene) => {
    if (!(parent as Player).secondaryEnableFlag) return;

    scene.add(new Fireball2(parent, (parent as Player).globalPos, 0));
    scene.add(new Fireball2(parent, (parent as Player).globalPos, Math.PI / 2));
    scene.add(new Fireball2(parent, (parent as Player).globalPos, Math.PI));
    scene.add(new Fireball2(parent, (parent as Player).globalPos, (3 * Math.PI) / 2));
  };
}
