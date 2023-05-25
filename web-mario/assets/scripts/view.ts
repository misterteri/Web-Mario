const { ccclass, property } = cc._decorator;

@ccclass
export default class view extends cc.Component {
  @property(cc.Node)
  target: cc.Node = null;

  @property(cc.Node)
  map: cc.Node = null;

  boundingBox: cc.Rect = null;
  screenMiddle: cc.Vec2 = null;

  minX: number = 0;
  maxX: number = 0;
  minY: number = 0;
  maxY: number = 0;

  isRun: boolean = true;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.boundingBox = this.map.getBoundingBox();
    this.screenMiddle = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
    this.minX = 0;
    this.maxX = this.boundingBox.width;
    this.minY = 0;
    this.maxY = this.boundingBox.height;

    cc.log("boundingBox: " + this.boundingBox);
    cc.log("screenMiddle: " + this.screenMiddle);
    cc.log("minX: " + this.minX);
    cc.log("maxX: " + this.maxX);
    cc.log("minY: " + this.minY);
    cc.log("maxY: " + this.maxY);
    cc.log("target: " + this.target.x + ", " + this.target.y);
  }
}
