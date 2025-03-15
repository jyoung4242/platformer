// resources.ts
import { ImageSource, Loader, Sprite, SpriteSheet, Animation, AnimationStrategy, Graphic } from "excalibur";
import playerImage from "./Assets/player assets/player.png"; // replace this
import block from "./Assets/block.png";
import fireRune from "./Assets/fire rune-Sheet.png";
import fireball from "./Assets/fireball.png";
import enemy from "./Assets/enemy.png";

export const Resources = {
  player: new ImageSource(playerImage),
  block: new ImageSource(block),
  fireRune: new ImageSource(fireRune),
  fireball: new ImageSource(fireball),
  enemy: new ImageSource(enemy),
};

export const enemySS = SpriteSheet.fromImageSource({
  image: Resources.enemy,
  grid: {
    rows: 1,
    columns: 3,
    spriteWidth: 24,
    spriteHeight: 32,
  },
});

export const enemyAnimation = new Animation({
  strategy: AnimationStrategy.Loop,
  frames: [
    { graphic: enemySS.getSprite(0, 0), duration: 200 },
    { graphic: enemySS.getSprite(1, 0), duration: 200 },
    { graphic: enemySS.getSprite(0, 0), duration: 200 },
    { graphic: enemySS.getSprite(2, 0), duration: 200 },
  ],
});

export const rightEnemyAnimation = enemyAnimation.clone();
rightEnemyAnimation.flipHorizontal = true;

export const fireRuneSS = SpriteSheet.fromImageSource({
  image: Resources.fireRune,
  grid: {
    rows: 1,
    columns: 3,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const playerSS = SpriteSheet.fromImageSource({
  image: Resources.player,
  grid: {
    rows: 5,
    columns: 6,
    spriteWidth: 24,
    spriteHeight: 32,
  },
});

export const playerRunningSS = SpriteSheet.fromImageSource({
  image: Resources.player,
  grid: {
    rows: 2,
    columns: 3,
    spriteWidth: 48,
    spriteHeight: 32,
  },
  spacing: {
    originOffset: { x: 0, y: 32 },
    margin: { x: 0, y: 0 },
  },
});

export const fireRuneAnimation = new Animation({
  strategy: AnimationStrategy.Loop,
  frames: [
    {
      graphic: fireRuneSS.getSprite(0, 0),
      duration: 100,
    },
    {
      graphic: fireRuneSS.getSprite(1, 0),
      duration: 100,
    },
    {
      graphic: fireRuneSS.getSprite(2, 0),
      duration: 100,
    },
  ],
});

export const playerAnimation = new Animation({
  strategy: AnimationStrategy.Loop,
  frames: [
    {
      graphic: playerSS.getSprite(0, 0),
      duration: 500,
    },
    {
      graphic: playerSS.getSprite(1, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(2, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(3, 0),
      duration: 300,
    },
    {
      graphic: playerSS.getSprite(2, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(1, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(0, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(4, 0),
      duration: 150,
    },
    {
      graphic: playerSS.getSprite(0, 0),
      duration: 350,
    },
    {
      graphic: playerSS.getSprite(1, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(2, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(3, 0),
      duration: 300,
    },
    {
      graphic: playerSS.getSprite(2, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(1, 0),
      duration: 100,
    },
    {
      graphic: playerSS.getSprite(0, 0),
      duration: 100,
    },
  ],
});
export let flipPlayerAnimation = playerAnimation.clone();
flipPlayerAnimation.flipHorizontal = true;

export const playerRunningAnimation = new Animation({
  strategy: AnimationStrategy.Loop,
  frames: [
    {
      graphic: playerRunningSS.getSprite(2, 0),
      duration: 150,
    },
    {
      graphic: playerRunningSS.getSprite(0, 0),
      duration: 150,
    },
    {
      graphic: playerRunningSS.getSprite(2, 0),
      duration: 150,
    },
    {
      graphic: playerRunningSS.getSprite(1, 0),
      duration: 150,
    },
  ],
});
export let flipPlayerRunningAnimation = playerRunningAnimation.clone();
flipPlayerRunningAnimation.flipHorizontal = true;

export const jumpRight = new Animation({
  frames: [
    {
      graphic: playerRunningSS.getSprite(0, 1),
      duration: 100,
    },
  ],
});

export let jumpLeft = jumpRight.clone();
jumpLeft.flipHorizontal = true;

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
