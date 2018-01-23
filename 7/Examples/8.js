function OnStart() {
  var lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
  var lst = [0, 1, 2, 3];
  for(var i in lst) {
    var btn = app.CreateButton("button" + lst[i], 0.5, 0.1);
    btn.SetOnTouch(OnTouch);
    btn.ID = i;
    lay.AddChild(btn);
    }
  app.AddLayout(lay);
}

function OnTouch() {
  var id = this.ID;
  var text = this.GetText();
  app.ShowPopup('I\'m ' + text + ', ID = ' +id);
}