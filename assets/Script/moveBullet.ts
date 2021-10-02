// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    BulletSpeed:number = 800;

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(otherCollider,selfCollider){
        if(otherCollider.name == "alienship3<PolygonCollider>" && selfCollider.name == "Bullet<PolygonCollider>"){
            cc.director.loadScene('Menu');
        }
        if(otherCollider.name == "triangle<PolygonCollider>"){
            this.node.destroy();
        }
    }

    onLoad () {
        cc.director.preloadScene('Menu');
    }

    start () {

    }

    update (dt) {
        this.node.setPosition(this.node.position.x,this.node.position.y -= this.BulletSpeed*dt);
        if(this.node.position.y <= -(this.node.parent.getContentSize().height)){
            this.node.destroy();
        }
    }
}
