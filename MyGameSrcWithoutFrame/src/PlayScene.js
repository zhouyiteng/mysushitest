/**
 * Created by neil.zhou on 2015/8/31.
 */
var PlayLayer = cc.Layer.extend({
    SushiSprites:null,

    scoreLabel:null,

    timeoutLabel:null,

    timeout:3,

    score:0,

        ctor:function(){
        this._super();
        this.SushiSprites = [];

        var size = cc.winSize;

        //add bg
        var bgSprite = new cc.Sprite(myRes.BackGround_png);
        bgSprite.x = size.width/2;
        bgSprite.y = size.height/2;

        bgSprite.attr({
            rotation:180,
            anchorX:0.5,
            anchorY:0.5
        });

        this.addChild(bgSprite,0);

        this.schedule(this.update,0.5,16*1024,0);

        this.scoreLabel = new cc.LabelTTF("score:0","Arial",20);
        this.scoreLabel.attr({
            x:size.width/2 +150,
            y:size.height -20
        });

        this.addChild(this.scoreLabel,5);

        this.timeoutLabel = new cc.LabelTTF(""+this.timeout,"Arial",30);
        this.timeoutLabel.attr({
            x:size.width/2 -250,
            y:size.height-20
        });
        this.schedule(this.timer,1,this.timeout,0);
        this.addChild(this.timeoutLabel,5);

        return true;
    },

    addSushi : function() {
        var sushi = new SushiSprite();
        this.addChild(sushi,5);
        var dropAction = new cc.MoveTo(4,cc.p(sushi.x,-30));
        sushi.runAction(dropAction);

        this.SushiSprites.push(sushi);
        sushi.index = this.SushiSprites.length;

    },

    update:function(){
        this.addSushi();
        this.removeSushi();
    },

    removeSushiByIndex:function(dx){
        if(isNaN(dx)||dx>this.SushiSprites.length){return false};
        if(this.SushiSprites[i]!=this[dx])
        {
            cc.log("--------------");
            this.SushiSprites[n++]=this.SushiSprites[i];
        }
        this.SushiSprites.length-=1;
    },

    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            if(30 > this.SushiSprites[i].y) {
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },

    removeSushiAll : function() {
        //gameover 清除是所有的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
        }
    },

    addScore:function(){
        this.score +=1;
        this.scoreLabel.setString("score:" + this.score);
    },

    timer:function(){
        if(0 >= this.timeout){
            var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
            titleLabel.attr({
                x:size.width / 2 ,
                y:size.height / 2
            });

            gameOver.addChild(titleLabel, 5);
            var TryAgainItem = new cc.MenuItemFont(
                "Try Again",
                function () {
                    cc.log("Menu is clicked!");
                    var transition= new  cc.TransitionFade(1, new PlayScene(),cc.color(255,255,255,255));
                    cc.director.runScene(transition);
                }, this);

            TryAgainItem.attr({
                anchorX: 0.5,
                anchorY: 0.5
            });

            var goBack = new cc.MenuItemFont("Go Back",function(){
                var transition= new  cc.TransitionFade(1, new StartScene(),cc.color(255,255,255,255));
                cc.director.runScene(transition);
            },this);

            goBack.attr({
                anchorX:0.5,
                anchorY:0.5
            })

            var menu = new cc.Menu(TryAgainItem,goBack);
            menu.x = size.width/2;
            menu.y = size.height/2 - 100;
            gameOver.addChild(menu, 1);

            menu.alignItemsVertically();

            this.removeSushiAll();
            this.getParent().addChild(gameOver);

            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }
        this.timeout -= 1;
        this.timeoutLabel.setString("" + this.timeout);
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var playLayer = new PlayLayer();
        this.addChild(playLayer);
    }
});
