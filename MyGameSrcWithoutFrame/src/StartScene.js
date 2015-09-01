/**
 * Created by neil.zhou on 2015/8/31.
 */
var StartLayer = cc.LayerColor.extend({
    ctor:function(){
        this._super("#FFFFFF");

        var size = cc.winSize;
        ////var helloLabel = new cc.LabelTTF("Hello World","Arial",38);
        //var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        //helloLabel.x = size.width/2;
        //helloLabel.y = size.height/2;
        //
        //this.addChild(helloLabel,1);

        var bgSprite = new cc.Sprite(myRes.BackGround_png);
        bgSprite.x = size.width/2;
        bgSprite.y = size.height/2;
        this.addChild(bgSprite,0);

        var startMenuItem = new cc.MenuItemImage(myRes.Start_N_png,myRes.Start_S_png,this.onStartMenuClick,this);

        startMenuItem.attr({
            x:size.width/2,
            y:size.height/2,
            anchorX:0.5,
            anchorY:0.5
        });

        var menu = new cc.Menu(startMenuItem);
        menu.x = 0;
        menu.y = 0;

        this.addChild(menu);

        cc.log("this is log");
        return true;
    },
    onStartMenuClick:function(){
        cc.log("start menu click!");
        cc.director.runScene(new cc.TransitionPageTurn(1,new PlayScene(),false));
        //cc.director.runScene(new cc.TransitionFadeUp(2,new PlayScene()));
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});
