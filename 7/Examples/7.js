function Example() {
    layMain = app.CreateLayout("Linear", "FillXY");
    var ttl = app.CreateText("title")
    ttl.SetTextSize(15)
    layMain.AddChild(ttl)
    var scroll = app.CreateScroller(1.0, 0.95); 
    layMain.AddChild( scroll );
    var layScroll = app.CreateLayout("Linear", "Left"); 
    scroll.AddChild( layScroll ); 
    arr = [];
    list = app.ListFolder("/sdcard");
    for(var i in list) {
        var lt = app.CreateLayout("Linear", "Horizontal,FillXY");
        lt.SetMargins(0, 0.01, 0, 0);
        var txt = app.CreateText(list[i], 0.8, -1,"Multiline,FillY,Left");
        txt.SetTextSize(12);
        lt.AddChild(txt)
        arr[i] = app.CreateButton("ok", 0.2 , -1, "FillY");
        arr[i].SetOnTouch(btn_OnTouch); 
        lt.AddChild(arr[i])
        layScroll.AddChild(lt) }
    app.AddLayout(layMain)    
    
}

function btn_OnTouch() {
     var btn = app.GetLastButton();
     var indexTouch = arr.indexOf(btn)
     app.ShowPopup(list[indexTouch])
} 

function OnStart() {
   Example() 
}
