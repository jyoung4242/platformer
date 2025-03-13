import { Action, Actor, Component, Entity, Scene, vec, nextActionId } from "excalibur";
import { FireRune, Relic } from "../Actors/Relic";
import { Player } from "../Actors/Player";

export const jobs = {
  NONE: "NONE",
  FIRE: "FIRE",
} as const;

export class HasJob extends Component {
  owner?: Entity<any> | undefined;
  currentJob: keyof typeof jobs = jobs.NONE;
  scene: Scene;

  constructor(owner: Entity) {
    super();
    this.owner = owner;
    this.scene = owner.scene!;
  }

  switchJob(newJob: keyof typeof jobs) {
    if (this.currentJob != jobs.NONE) {
      //drop current job
      let ejectedRune: Relic;
      const ownerPos = (this.owner as Actor).pos.clone();
      switch (this.currentJob) {
        case jobs.FIRE:
          //spawn fire rune
          ejectedRune = new FireRune(ownerPos, vec(-20, -20));
          break;
      }
      this.scene.add(ejectedRune);
    }

    this.currentJob = newJob;
  }
}

export class GivesJob extends Component {
  job: keyof typeof jobs;
  constructor(owner: Entity, job: keyof typeof jobs) {
    super();
    this.job = job;
  }
}

export class GiveJobAction implements Action {
  id: number = nextActionId();
  _started: boolean = false;
  _stopped: boolean = false;

  isComplete(entity: Entity): boolean {
    return this._stopped;
  }

  constructor(public owner: Entity, public receiver: Entity, public job: keyof typeof jobs) {}

  execute(delta: number) {}

  reset() {}

  stop(): void {}

  update(elapsed: number): void {
    if (!this._started) {
      //init
      this._started = true;
      if (this.receiver.has(HasJob)) {
        (this.receiver.get(HasJob) as HasJob).switchJob(this.job);
        if (this.owner instanceof Relic && this.owner.tintColor) {
          (this.receiver as Player).tintColor = this.owner.tintColor;
        }
      }
      this._stopped = true;
    }

    //do stuff each update

    if (this.isComplete(this.owner)) {
      //cleanup
    }
  }
}
