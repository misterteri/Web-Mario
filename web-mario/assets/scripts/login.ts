// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class login extends cc.Component {
  @property(cc.Button)
  enter: cc.Button = null;

  @property(cc.Button)
  exit: cc.Button = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.enter.node.on("click", this.enterGame, this);
    this.exit.node.on("click", this.exitLogin, this);
  }

  start() {}
  exitLogin() {
    // remove prefab
    this.node.destroy();
  }

  enterGame() {
    cc.director.loadScene("game");
  }

  // update (dt) {}
}
