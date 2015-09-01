var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png"

};

var myRes = {
    BackGround_png : "res/background.png",
    Start_N_png : "res/start_N.png",
    Start_S_png : "res/start_S.png",
    Sushi_png : "res/sushi_1n/sushi_1n.png",
    Sushi_plist : "res/sushi_1n/sushi.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i in myRes) {
    g_resources.push(myRes[i]);
}