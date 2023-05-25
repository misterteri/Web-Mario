// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemy extends cc.Component {
  private anim: cc.Animation;
  start() {
    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100, 0);
    this.anim = this.getComponent(cc.Animation);
  }
  onload() {
    cc.director.getPhysicsManager().enabled = true;
    this.anim = this.getComponent(cc.Animation);
  }
  onBeginContact(contact, self, other) {
    // cc.log("onBeginContact");
    cc.log("other.node.name", other.node.name, other.node.y);
    cc.log("testse", self.node.name, self.node.y);
    if (
      other.node.name == "rightBound" ||
      other.node.name == "leftBound" ||
      other.node.name == "obstacle"
    ) {
      this.node.scaleX = -this.node.scaleX;
      cc.log("this.node.scaleX", this.node.scaleX);

      this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(
        -this.node.getComponent(cc.RigidBody).linearVelocity.x,
        0
      );
    } else if (other.node.name == "ori_mario" && other.node.y < self.node.y) {
      // keep the speed of the goomba, and not slow down after collision
      this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(
        this.node.getComponent(cc.RigidBody).linearVelocity.x,
        0
      );
    }
    // only if self is touched at the top by ori_mario, then the goomba dies
    if (contact.getWorldManifold().normal.y > 0) {
      if (other.node.name == "ori_mario") {
        cc.log("goodbye player");
        this.anim.play("goomba_die");
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        this.scheduleOnce(() => {
          self.node.destroy();
        }, 0.2);
      }
    }
  }
}
