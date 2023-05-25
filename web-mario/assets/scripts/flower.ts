// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class flower extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {}

  start() {
    // make the node to be behind the background on the z axis
    this.node.zIndex = -1;
    // use tween to make the node move up and down but stays in the same z position
    cc.tween(this.node)
      .repeatForever(
        cc
          .tween()
          .to(2, { position: cc.v2(this.node.x, this.node.y + 68) })
          .to(2, { position: cc.v2(this.node.x, this.node.y) })
      )
      .start();
  }
}
