const { ccclass, property } = cc._decorator;

@ccclass
export default class world extends cc.Component {
  @property()
  Gravity: number = 0;

  @property()
  Acceleration: number = 0;

  static G = 0;
  static A = 0;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    world.G = this.Gravity;
    world.A = this.Acceleration;
  }

  start() {
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
    cc.director.getCollisionManager().enabledDrawBoundingBox = true;
  }

  // update (dt) {}
}
