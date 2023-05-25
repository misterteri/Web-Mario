// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Button)
  stage1: cc.Button = null;

  @property(cc.Button)
  stage2: cc.Button = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.stage1.node.on("click", this.loadStage1, this);
    this.stage2.node.on("click", this.loadStage2, this);
  }

  loadStage1() {
    this.loadSceneWithLoadingScreen("stage1");
  }

  loadStage2() {
    this.loadSceneWithLoadingScreen("stage2");
  }

  loadSceneWithLoadingScreen(sceneName) {
    cc.director.loadScene("gameStartLS", () => {
      setTimeout(() => {
        cc.director.loadScene(sceneName);
      }, 1000); // Change the delay as needed
    });
  }

  // update (dt) {}
}
