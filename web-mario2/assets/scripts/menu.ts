// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class menu extends cc.Component {
  @property(cc.AudioClip)
  bgm: cc.AudioClip = null;

  @property(cc.Button)
  signupButton: cc.Button = null;

  @property(cc.Prefab)
  signupPrefab: cc.Prefab = null;

  @property(cc.Button)
  loginButton: cc.Button = null;

  @property(cc.Prefab)
  loginPrefab: cc.Prefab = null;

  onLoad() {
    this.signupButton.node.on("click", this.onSignup, this);
    this.loginButton.node.on("click", this.onLogin, this);
  }

  start() {
    cc.audioEngine.playMusic(this.bgm, true);
  }

  onLogin() {
    // load loginPrefab
    let login = cc.instantiate(this.loginPrefab);
    login.parent = this.node;
    // set position in the middle
    login.setPosition(0, 20);
  }
  onSignup() {
    // load signupPrefab
    let signup = cc.instantiate(this.signupPrefab);
    signup.parent = this.node;
    // set position in the middle
    signup.setPosition(0, 20);
  }

  // update (dt) {}
}
