
//START HOME PAGE

lay.home = app.CreateLayout("Linear");
lay.content.AddChild(lay.home);
  
scr.home = app.CreateScroller(-1, -1, "ScrollFade");
lay.home.AddChild(scr.home);

//END HOME PAGE