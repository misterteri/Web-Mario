// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import player from "./player";

const { ccclass, property } = cc._decorator;
// player.ts

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  restartButton: cc.Node = null;

  @property(cc.Node)
  menuButton: cc.Node = null;

  @property(player)
  player: player = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.restartButton.on("click", this.onRestart, this);
    this.menuButton.on("click", this.onMenu, this);
  }

  start() {}

  onRestart() {
    const currentScene = cc.director.getScene().name;
    cc.director.loadScene(currentScene);
  }

  onMenu() {
    cc.director.loadScene("gameSelection");
  }
  // update (dt) {}
}
