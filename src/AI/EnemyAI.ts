import { Enemy } from "../Actors/enemy";
import {
  BehaviorNode,
  BehaviorNodeStatus,
  BehaviorStatus,
  BehaviorTreeComponent,
  RootNode,
  SelectorNode,
} from "../Components/BehaviorTree";
import { Actor, Vector, CollisionType, Engine } from "excalibur";

export class WalkLeft extends BehaviorNode {
  colliding: boolean = false;
  constructor(owner: Actor, parent: BehaviorTreeComponent) {
    super("walkLeft", owner, parent);
  }

  precondition(): boolean {
    return this.state.direction == "left";
  }

  collideRight(): void {
    this.status = BehaviorNodeStatus.Complete;
  }

  update(engine: Engine, delta: number): BehaviorStatus {
    if (this.isInterrupted) {
      this.isInterrupted = false;
      this.status = BehaviorNodeStatus.Free;
      return BehaviorStatus.Failure;
    }

    if (!(this.owner as Enemy).isOnGround) return BehaviorStatus.Failure;

    if (this.status == BehaviorNodeStatus.Busy) return BehaviorStatus.Running;
    if (this.status == BehaviorNodeStatus.Complete) {
      this.status = BehaviorNodeStatus.Free;
      return BehaviorStatus.Success;
    }
    this.status = BehaviorNodeStatus.Busy;
    this.parentComponent.state.direction = "left";

    this.owner.vel = new Vector(-40, 0);

    this.status = BehaviorNodeStatus.Complete;
    return BehaviorStatus.Running;
  }
}

export class WalkRight extends BehaviorNode {
  constructor(owner: Actor, parent: BehaviorTreeComponent) {
    super("walkRight", owner, parent);
  }

  precondition(): boolean {
    return this.state.direction == "right";
  }

  update(engine: Engine, delta: number): BehaviorStatus {
    if (this.isInterrupted) {
      this.isInterrupted = false;
      this.status = BehaviorNodeStatus.Free;
      return BehaviorStatus.Failure;
    }

    if (!(this.owner as Enemy).isOnGround) return BehaviorStatus.Failure;
    if (this.status == BehaviorNodeStatus.Busy) return BehaviorStatus.Running;

    if (this.status == BehaviorNodeStatus.Complete) {
      this.status = BehaviorNodeStatus.Free;
      return BehaviorStatus.Success;
    }

    this.owner.vel = new Vector(40, 0);
    this.parentComponent.state.direction = "right";

    this.status = BehaviorNodeStatus.Complete;
    //do the thing here
    return BehaviorStatus.Running;
  }
}
