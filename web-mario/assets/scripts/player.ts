// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

// declare playerSpeed variable in the player class

@ccclass
export default class player extends cc.Component {
  @property(cc.Prefab)
  gameoverPrefab: cc.Prefab = null;

  @property()
  rebornPos: cc.Vec2 = cc.v2();

  @property()
  live: number = 3;

  @property(cc.AudioClip)
  jumpAudio: cc.AudioClip = null;

  @property(cc.AudioClip)
  deadAudio: cc.AudioClip = null;

  @property(cc.AudioClip)
  gameoverAudio: cc.AudioClip = null;

  private anim: cc.Animation = null;
  private onGround: boolean = false;
  private zDown: boolean = false;
  private xDown: boolean = false;
  private kDown: boolean = false;

  private isDead: boolean = false;
  private isReborn: boolean = false;
  private rebornTime: number = 0.5;

  private fallDown: boolean = false;
  private idleFrame: cc.SpriteFrame = null;
  private playerSpeed: number = 300;

  onLoad() {
    // enable physics collision
    cc.director.getPhysicsManager().enabled = true;

    // keyboard input
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown(event) {
    //cc.log("Key Down: " + event.keyCode);
    if (event.keyCode == cc.macro.KEY.z) {
      // press key z to turn left
      this.zDown = true;
      this.xDown = false;
    } else if (event.keyCode == cc.macro.KEY.x) {
      // press key x to turn right
      this.xDown = true;
      this.zDown = false;
    } else if (event.keyCode == cc.macro.KEY.k) {
      // press key k to jump
      this.kDown = true;
      cc.audioEngine.playEffect(this.jumpAudio, false);
    }
  }

  onKeyUp(event) {
    //cc.log("Key Up: " + event.keyCode);
    if (event.keyCode == cc.macro.KEY.z) {
      this.zDown = false;
    } else if (event.keyCode == cc.macro.KEY.x) {
      this.xDown = false;
    } else if (event.keyCode == cc.macro.KEY.k) {
      this.kDown = false;
    }
  }

  private playerMovement(dt) {
    // declare initial player speed
    this.playerSpeed = 0;
    if (this.zDown) {
      this.playerSpeed = -300;
      this.node.scaleX = -1; // modify node’s X scale value to change facing direction
    } else if (this.xDown) {
      this.playerSpeed = 300;
      this.node.scaleX = 1; // modify node’s X scale value to change facing direction
    }

    this.node.x += this.playerSpeed * dt; // moving the object

    if (this.kDown && this.onGround) this.jump(); // handle the jump action
    if (this.isDead && !this.isReborn && this.live > 0) {
      this.resetPos(); // reset the enemy’s position when it dies
      this.isReborn = true;
      this.live--;
      cc.log("live: " + this.live);
      if (this.live > 0) {
        cc.audioEngine.playEffect(this.deadAudio, false);
      }

      // reset the player’s reborn state in a period (invisible period)
      this.scheduleOnce(function () {
        this.isDead = false;
        this.isReborn = false;
      }, this.rebornTime);
      return;
    } else if (this.live == 0) {
      // no respawn
      this.node.destroy();
      // deploy gameoverPrefab in the middle of the screen
      let gameover = cc.instantiate(this.gameoverPrefab);
      let canvas = cc.find("Canvas");
      gameover.parent = canvas;
      gameover.setPosition(0, 0);
      cc.log("game over");
      cc.audioEngine.playEffect(this.gameoverAudio, false);
    }
  }
  private jump() {
    this.onGround = false;

    // add an up force directly to the mass of the rigid body
    this.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(0, 22500), true);
  }

  update(dt) {
    this.playerMovement(dt);
    // if self is below the camera’s bottom bound, then game over
    if (this.node.y < 0) {
      this.isDead = true;
      cc.log("outside");
    }
    // detects if player is falling down or no
    if (this.getComponent(cc.RigidBody).linearVelocity.y < 0) {
      this.fallDown = true;
    } else {
      this.fallDown = false;
    }

    this.playerAnimation();
  }

  onBeginContact(contact, self, other) {
    cc.log(other.node.group);
    if (other.node.group == "ground") {
      this.onGround = true;
      // cc.log("onGround: " + onGround);
    } else if (other.node.group == "obstacle") {
      this.onGround = true;
      // cc.log("obs hit ");
    } else if (other.node.group == "flower" && !this.isReborn) {
      cc.log(this.live);
      this.isDead = true;
    } else if (other.node.group == "turtle" && !this.isReborn) {
      // if the player touches turtle, at the top of its head, then kill the turtle
      if (this.fallDown) {
      } else {
        cc.log(this.live);
        this.isDead = true;
      }
    }
  }

  public resetPos() {
    this.node.position = this.rebornPos;
    this.node.scaleX = 1;
    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
  }

  start() {
    this.rebornPos = this.node.position;
    this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
    this.anim = this.getComponent(cc.Animation);
    // player dont
  }

  playerAnimation() {
    if (this.playerSpeed) {
      if (!this.anim.getAnimationState("mario_move").isPlaying) {
        this.anim.play("mario_move");
      }
    } else if (this.kDown) {
      this.anim.play("mario_jump");
    } else if (this.fallDown) {
      this.anim.play("mario_fall");
    } else {
      this.anim.stop();
      this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
    }
  }
}
