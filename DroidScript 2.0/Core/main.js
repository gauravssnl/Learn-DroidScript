
//START MAIN PAGE
lay.main = app.CreateLayout("Linear", "FillXY");
lay.main.SetBackColor("#444444");
lay.main.Hide();
app.AddLayout(lay.main);

tmp.nav = app.CreateLayout("Linear", "Horizontal,FillX,VCenter");
tmp.nav.SetSize(-1, api.dpi(50), "px");
tmp.nav.SetBackColor("#333333");
lay.main.AddChild(tmp.nav);

tmp.bar = api.CreateText("[fa-book]", -1, -1, "FontAwesome");
tmp.bar.SetSize(api.dpi(35), -1, "px");
tmp.bar.SetTextSize(25, "dpi");
tmp.bar.SetTextColor("#ffffff");
tmp.nav.AddChild(tmp.bar);

tmp.bar = api.CreateText(APPNAME, "100vw-dpi(100)", -1);
tmp.bar.SetArray();
tmp.bar.SetEllipsize("End");
tmp.bar.SetTextSize(25, "dpi");
tmp.bar.SetTextColor("#ffffff");
tmp.nav.AddChild(tmp.bar);

tmp.bar = app.CreateText("[fa-ellipsis-v]", -1, -1, "FontAwesome");
tmp.bar.SetSize(api.dpi(35), -1, "px");
tmp.bar.SetTextSize(25, "dpi");
tmp.bar.SetTextColor("#ffffff");
tmp.nav.AddChild(tmp.bar);
tmp.bar.SetOnTouch(OnMenu);

lay.content = app.CreateLayout("Frame");
lay.main.AddChild(lay.content);

//END MAIN PAGE
//START SHADOW

tmp.shadow = api.CreateLayout("Linear", "FillX", "100vw", api.dpi(5));
tmp.shadow.SetArray();
tmp.shadow.SetBackGradient("#55000000", "#00000000");
lay.content.AddChild(tmp.shadow);

//END SHADOW