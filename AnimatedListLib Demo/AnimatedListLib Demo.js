
app.LoadScript("AnimatedListLib.js");
longStr = "Very long test string";

function OnStart(){
  main = app.CreateLayout("Linear", "FillXY");
  app.AddLayout(main); //Important!
  
  scr = app.CreateScroller(1, 1, "ScrollFade");
  main.AddChild(scr);
  
  lay = app.CreateLayout("Linear");
  scr.AddChild(lay);
  
  for(var i = 0; i<longStr.length; i++){
    var title = app.CreateText(i+" [fa-caret-down]", 1, -1, "FontAwesome");
    title.SetTextSize(40);
    lay.AddChild(title);
    title.i = i
    title.SetOnTouchUp(function(){
      var self = this;
      self.SetText(self.i+(self.content.IsActive()? " [fa-caret-down]": " [fa-caret-up]"))
      self.content.Animate(500, function(){
        if(this.IsActive()) scr.ScrollTo(0, self.GetTop());
      });
    });
    
    title.content = app.CreateListItem(1);
    title.content.SetCalcFun(function(hgt){
      return (hgt -= 1) * hgt * (2.715 * hgt + 1.70158) + 1
    })
    title.content.SetBackColor("#CDDC39");
    lay.AddChild(title.content);
    
    test = app.CreateText(longStr.substring(0,i+1).split("").join("\n"), -1, -1, "Multiline");
    test.SetTextColor("#333333");
    test.SetTextSize(25);
    title.content.AddChild(test);
    
    test = app.CreateText(longStr.substring(0,i+1).split("").join("\n"), -1, -1, "Multiline");
    test.SetTextColor("#333333");
    test.SetTextSize(25);
    title.content.AddChild(test);
    
    title.content.Done();
  }
}