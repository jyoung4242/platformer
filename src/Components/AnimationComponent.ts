import { Component, Entity, Frame, GraphicsComponent, Animation, Color } from "excalibur";

export class AnimationComponent<Keys extends string> extends Component {
  declare owner: Entity & { graphics: GraphicsComponent };
  type = "animation";

  private _currentAnimationName: Keys | null = null;
  private _animations: Record<Keys, Animation>;
  private _speed = 1;
  private _frameDuration = new WeakMap<Frame, number>();
  constructor(animations: Record<Keys, Animation>) {
    super();
    this._animations = animations;
  }

  set(name: Keys, startFromFrame: number = 0, durationLeft?: number) {
    const prevAnim = this.owner.graphics.current;
    const anim = this._animations[name];

    // return if the animation is already playing
    if (this.is(name)) return;

    /* if (startFromFrame) {
      anim.goToFrame(startFromFrame, durationLeft);
    } else {
      anim.reset();
    } */

    // carry over scale from the previous graphic
    if (prevAnim) {
      anim.scale.setTo(prevAnim.scale.x, prevAnim.scale.y);
      anim.opacity = prevAnim.opacity;
    }

    this.owner.graphics.use(anim);
  }

  tint(color: Color | null) {
    debugger;
    if (this.current === undefined) return;
    if (color === null) this.current.tint = Color.White;
    else this.current.tint = color;
  }

  get(name: Keys) {
    return this._animations[name];
  }

  get current() {
    return this.owner.graphics.current;
  }
  is(animation: Keys) {
    return this.get(this._currentAnimationName as Keys) === this.get(animation);
  }

  set speed(speed: number) {
    this._speed = speed;
  }

  get speed() {
    return this._speed;
  }
}
