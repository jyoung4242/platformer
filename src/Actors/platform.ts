import { Actor, CollisionGroupManager, CollisionType, GraphicsGroup, Shape, Vector } from "excalibur";
import { Resources } from "../resources";

export class Platform extends Actor {
  constructor(x: number, y: number, public cols: number, public rows: number) {
    super({
      name: "Floor",
      pos: new Vector(x, y),
      scale: new Vector(1, 1),
      anchor: Vector.Zero,
      collider: Shape.Box(20 * cols, 15 * rows, Vector.Zero),
      collisionType: CollisionType.Fixed,
      collisionGroup: CollisionGroupManager.groupByName("floor"),
    });

    let gGroup = new GraphicsGroup({
      useAnchor: false,
      members: [],
    });

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let sprite = Resources.block.toSprite().clone();
        gGroup.members.push({ graphic: sprite, offset: new Vector(20 * i, 15 * j) });
      }
    }
    this.graphics.use(gGroup);
  }
}
