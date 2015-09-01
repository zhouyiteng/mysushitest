cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(800, 640, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new StartScene());
    }, this);
};
cc.game.run();