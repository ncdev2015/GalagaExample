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
    duration:number = 1;
    @property
    moveAmountX:number = 320;
    @property
    moveAmountY:number =65;
    moveEnemy:cc.ActionInterval;

    @property(cc.Prefab)
    YellowBullet:cc.Prefab  = null;
    @property
    ShootFrequency:number = 3.0;

    enemyLife:number = 3;

    setMovements(){
        var moveLeft = cc.moveBy(this.duration,cc.v2(-this.moveAmountX,-this.moveAmountY)).easing(cc.easeCircleActionInOut());
        var moveRight = cc.moveBy(this.duration,cc.v2(this.moveAmountX,-this.moveAmountY)).easing(cc.easeCircleActionInOut());
        return cc.repeatForever(cc.sequence(moveLeft,moveRight));
    }

    spawnBullets(){
        var Bullet = cc.instantiate(this.YellowBullet);
        Bullet.setPosition(this.node.position.x,this.node.position.y);
        this.node.parent.addChild(Bullet);
    }

    onCollisionEnter(otherCollider,selfCollider){
        if(otherCollider.name == "greenbullet<PolygonCollider>"){
            this.enemyLife -=1;
            if(this.enemyLife<=0){
                this.node.destroy();
            }
        }
        if(otherCollider.name == "alienship3<PolygonCollider>"){
            cc.director.loadScene('Menu');
        }
    }

    onLoad () {
        this.moveEnemy = this.setMovements();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullets,this.ShootFrequency,cc.macro.REPEAT_FOREVER,3.0);

        cc.director.preloadScene('Menu');
    }

    start () {

    }

    update (dt) {
        if(this.node.position.y<= -(this.node.parent.getContentSize().height)){
            this.node.destroy();
            cc.director.loadScene('Menu');
        }
    }
}
