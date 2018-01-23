function Test() {
    var lay = app.CreateLayout("linear", "FillXY");
    var items = ["Вася", "Петя", "Жора"]
    arr = []
    for(var i in items) {
        arr[i] = app.CreateText(items[i]);
        arr[i].SetTextSize(25);
        arr[i].SetOnTouchDown(txtOnTouch);
        lay.AddChild(arr[i]);
        }
    app.AddLayout(lay);
}

function txtOnTouch(obj) {
    var obj = obj.source;
    var index = arr.indexOf(obj);
    var text = obj.GetText();
    app.Alert(text+", index: "+index);
}
    

function OnStart() {Test()}
