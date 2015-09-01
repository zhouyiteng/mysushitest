/**
 * Created by neil.zhou on 2015/8/31.
 */

var SushiSprite = cc.Sprite.extend({
    touchListenser:null,

    clickListenser:null,

    disappearAction:null,

    index:null,

    ctor:function(){
        this._super(myRes.Sushi_png);
        cc.spriteFrameCache.addSpriteFrames(myRes.Sushi_plist);
        var size = cc.winSize;
        var x = this.width +size.width/2*cc.random0To1();
        this.attr({
            x:x,
            y:size.height - 30
        });
    },

    onEnter:function () {
        cc.log("onEnter");
        this._super();
        this.addTouchEventListenser();
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();

    },

    onExit:function () {
        cc.log("onExit");
        this.disappearAction.release();
    },

    addTouchEventListenser:function() {

        if( 'mouse' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                swallowTouches: true,
                onMouseDown: function(event){
                    var pos = event.getLocation(), target = event.getCurrentTarget();
                    if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                        cc.log("touched");
                        target.removeEventListener();

                        target.stopAllActions();
                        var ac = target.disappearAction;
                        var seqAc = new cc.Sequence(ac,new cc.CallFunc(function(){
                            target.getParent().addScore();
                            target.removeFromParent();
                        },target));

                        target.runAction(seqAc);

                        return false;
                    }
                }
            }, this);
        }else{
                this.touchListenser = new cc.EventListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var pos = touch.getLocation();
                    var target = event.getCurrentTarget();
                    if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                        cc.log("touched");
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(this.touchListenser, this);
        }
    },

    createDisappearAction : function() {
        var frames = [];
        for (var i = 0; i < 11; i++) {
            var str = "sushi_1n_"+i+".png"
            //cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.02);
        var action = new cc.Animate(animation);

        return action;
    }
});
