import { Actor, vec, Engine, CollisionType, Collider, CollisionContact, Side, TileMap, CollisionGroup } from "excalibur";
import { AnimationComponent } from "../Components/AnimationComponent";
import { KeyboardControl } from "../Components/KeyboardControl";
import {
  playerAnimation,
  flipPlayerRunningAnimation,
  playerRunningAnimation,
  flipPlayerAnimation,
  jumpRight,
  jumpLeft,
} from "../resources";
import { game } from "../main";
import { Relic } from "./Relic";

const playerCollisionGroup = new CollisionGroup("player", 0b0001, 0b0010);

export class Player extends Actor {
  groundColliders: Collider[] = [];
  km: KeyboardControl = new KeyboardControl(game);
  am: AnimationComponent<"run" | "runleft" | "idle" | "idleleft" | "jump" | "jumpleft"> = new AnimationComponent({
    idle: playerAnimation,
    idleleft: flipPlayerAnimation,
    run: playerRunningAnimation,
    runleft: flipPlayerRunningAnimation,
    jump: jumpRight,
    jumpleft: jumpLeft,
  });
  isOnGround: boolean = false;
  isJumping: boolean = false;
  jumpHoldCount: number = 0;
  maxJumpVelocity: number = -175;

  facingDirection: "left" | "right" = "right";

  constructor() {
    super({
      pos: vec(96, 0),
      width: 24,
      height: 32,
      collisionType: CollisionType.Active,
      collisionGroup: playerCollisionGroup,
    });
    this.body.useGravity = true;
  }
  onInitialize(engine: Engine): void {
    this.scene!.camera.strategy.lockToActor(this);
    this.addComponent(this.am);
    this.addComponent(this.km);
    this.am.set("idle");
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    this.km.update(engine, elapsed);

    if (this.vel.y < -10 && this.vel.y > 5) engine.physics.gravity = vec(0, 300);
    else engine.physics.gravity = vec(0, 400);

    if (!this.isOnGround) {
      if (this.facingDirection == "left") this.am.set("jumpleft");
      else this.am.set("jump");
    }

    if (this.km.directions.length > 0) {
      if (this.km.directions[0] == "left") {
        this.vel.x = -100;
        this.facingDirection = "left";
        if (this.isOnGround) this.am.set("runleft");
      }
      if (this.km.directions[0] == "right") {
        this.vel.x = 100;
        this.facingDirection = "right";
        if (this.isOnGround) this.am.set("run");
      }
      if (this.km.directions.includes("up")) {
        if (this.facingDirection == "left") this.am.set("jumpleft");
        else this.am.set("jump");

        if (this.isOnGround) {
          this.vel.y -= 25;
          this.isOnGround = false;
          this.isJumping = true;
        }

        if (this.isJumping && this.vel.y >= this.maxJumpVelocity) {
          this.jumpHoldCount++;
          this.vel.y -= 25;
        } else {
          this.jumpHoldCount = 0;
          this.isJumping = false;
        }
      }
      return;
    } else {
      if (this.isOnGround) {
        this.vel.x = 0;
        if (this.facingDirection == "left") this.am.set("idleleft");
        else this.am.set("idle");
      } else {
        if (this.facingDirection == "left") this.am.set("jumpleft");
        else this.am.set("jump");
      }
    }
  }

  onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    if (other.owner instanceof TileMap && side == Side.Bottom) {
      if (this.groundColliders.includes(other)) this.groundColliders.splice(this.groundColliders.indexOf(other), 1);
      if (this.groundColliders.length == 0) this.isOnGround = false;
    }
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner instanceof TileMap && side == Side.Bottom) {
      if (this.groundColliders.includes(other)) return;
      this.groundColliders.push(other);
      this.isOnGround = true;
    }
    if (other.owner instanceof Relic) {
      if (!(other.owner as Relic).pu.isPickedUp) (other.owner as Relic).pu.grab(this);
    }
  }
}
