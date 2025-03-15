import { Actor, Vector, CollisionType, Engine, TileMap, CollisionGroup, Side } from "excalibur";
import { enemyAnimation, rightEnemyAnimation } from "../resources";
import { BehaviorTreeComponent, BTConfig, RootNode, SelectorNode } from "../Components/BehaviorTree";
import { WalkLeft, WalkRight } from "../AI/EnemyAI";

const EnemyCollisionGroup = new CollisionGroup("pickup", 0b100, 0b001);

export class Enemy extends Actor {
  health: number;
  maxHealth: number;
  speed: number;
  bt: BehaviorTreeComponent;
  direction: "left" | "right";
  isOnGround: boolean = false;

  constructor() {
    super({
      name: "enemy",
      radius: 16,
      pos: new Vector(600, 0),
      vel: new Vector(15, 0),
      collisionType: CollisionType.Active,
      collisionGroup: EnemyCollisionGroup,
    });

    this.body.useGravity = true;
    this.health = 1;
    this.maxHealth = 1;
    this.speed = 100;
    this.direction = "right";

    const btConfig: BTConfig = {
      owner: this,
      state: {
        direction: "right" as "left" | "right",
      },
    };
    this.bt = new BehaviorTreeComponent(btConfig);
    const myrootnode = this.bt.createRoot();
    myrootnode.addChild(new WalkLeft(this, this.bt));
    myrootnode.addChild(new WalkRight(this, this.bt));

    console.log(this.bt);
    console.log(myrootnode);

    this.addComponent(this.bt);
  }

  onCollisionStart(self: Actor, other: Actor, side: string, contact: any): void {
    if (other.owner instanceof TileMap && side == "Right" && this.direction == "right") {
      this.bt.state.direction = "left";
      this.direction = "left";
      this.graphics.use(enemyAnimation);
    } else if (other.owner instanceof TileMap && side == "Left" && this.direction == "left") {
      this.bt.state.direction = "right";
      this.graphics.use(rightEnemyAnimation);
      this.direction = "right";
    }

    if (other.owner instanceof TileMap && side == "Bottom") {
      console.log("on ground");

      this.isOnGround = true;
    }
  }

  onCollisionEnd(self: Actor, other: Actor, side: string, contact: any): void {}

  onInitialize(engine: Engine): void {
    this.graphics.use(enemyAnimation);
  }
}
