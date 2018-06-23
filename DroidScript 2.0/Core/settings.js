
//START SETTINGS PAGE

lay.settings = app.CreateLayout("Linear");
lay.content.AddChild(lay.settings);
lay.settings.Hide();

tmp.scr = app.CreateScroller(-1, -1, "ScrollFade");
lay.settings.AddChild(tmp.scr);

//END SETTINGS PAGE