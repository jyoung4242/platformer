import { Actor, CollisionType, Color, Component, Entity, Flash, MoveTo, ParallelActions } from "excalibur";
import { GiveJobAction, HasJob } from "./Jobs";
import { Relic } from "../Actors/Relic";

export class PickUppable extends Component {
  owner?: Entity<any> | undefined;
  isPickedUp: boolean = false;

  constructor(owner?: Entity) {
    super();
    this.owner = owner;
  }

  onAdd(owner: Entity): void {}

  onRemove(previousOwner: Entity): void {}

  grab(grabber: Actor) {
    this.isPickedUp = true;
    (this.owner as Actor).body.collisionType = CollisionType.Passive;
    let actionSequence = new ParallelActions([
      new Flash(this.owner as Actor, Color.White, 1000),
      new MoveTo(this.owner as Actor, grabber.pos.x, grabber.pos.y - 50, 500),
    ]);
    if (this.owner instanceof Relic && grabber.has(HasJob))
      (this.owner as Actor).actions
        .runAction(actionSequence)
        .meet(grabber, 350)
        .runAction(new GiveJobAction(this.owner, grabber, (this.owner as Relic).givesJob!.job))
        .die();
    else (this.owner as Actor).actions.runAction(actionSequence).meet(grabber, 350).die();
  }
}
