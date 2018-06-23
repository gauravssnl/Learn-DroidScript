
function OnStart()
{
  //Create the main layout.
  lay = app.CreateLayout("linear", "FillXY,TouchSpy");
  lay.SetOnTouchDown(lay_OnTouchDown);
  lay.SetOnTouchUp(lay_OnTouchUp);
  lay.SetTouchable(true);

  //Create a full screen scroller
  scroll = app.CreateScroller(1.0, 1.0);
  lay.AddChild(scroll);

  //Create a layout inside scroller.
  layScroll = app.CreateLayout("Linear", "Left");
  scroll.AddChild(layScroll);

  layMain = app.CreateLayout("Linear", "Horizontal");
  layMain.SetSize(3, 1);
  layScroll.AddChild(layMain);

  lay1 = app.CreateLayout("Linear", "VCenter");
  lay1.SetBackColor("#ffaaaa");
  lay1.SetSize(1, 1);
  txt1 = app.CreateText("Page 1");
  txt1.SetTextColor("#000000");
  txt1.SetTextSize(32);
  lay1.AddChild(txt1);
  layMain.AddChild(lay1);

  lay2 = app.CreateLayout("Linear", "VCenter");
  lay2.SetBackColor("#aaffaa");
  lay2.SetSize(1, 1);
  txt2 = app.CreateText("Page 2");
  txt2.SetTextColor("#000000");
  txt2.SetTextSize(32);
  lay2.AddChild(txt2);
  layMain.AddChild(lay2);

  lay3 = app.CreateLayout("Linear", ",VCenter");
  lay3.SetBackColor("#aaaaff");
  lay3.SetSize(1, 1);
  txt3 = app.CreateText("Page 3");
  txt3.SetTextColor("#000000");
  txt3.SetTextSize(32);
  lay3.AddChild(txt3);
  layMain.AddChild(lay3);

  //Add layout to app.    
  app.AddLayout(lay);

  //Initially scroll to page1.
  scroll.ScrollTo(0, 0);
}

function lay_OnTouchDown()
{
  //Current scroll position 
  var x = scroll.GetScrollX();
}

function lay_OnTouchUp()
{
  // pause to let scroll finish
  setTimeout(dock, 100)
}

function dock()
{
  // scroll to nearest page
  var x = scroll.GetScrollX();
  if(x < 0.5) scroll.ScrollTo(0, 0);
  else if(x < 1.5) scroll.ScrollTo(1, 0);
  else if(x < 2.5) scroll.ScrollTo(2, 0);
}