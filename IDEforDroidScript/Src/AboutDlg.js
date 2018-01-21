/********************************************************************
 * About Dialog =====================================================================
 * Creation date: 22-01-2015 by octazid
 * Last update: 22-01-2015 by octazid =====================================================================
 * Simple dialog to show some things about the app ********************************************************************/


//*** AboutDialog class ***//
function AboutDialog(information, infowidth, infoheight, backcolor)
{
  var self = this;
  this.dlgAbout = app.CreateDialog("About:");
  this.layAb = app.CreateLayout( "linear", "FillXY" );
  this.Abtxt = app.CreateWebView(infowidth, infoheight);
  this.Abtxt.SetBackColor(backcolor);
  this.Abtxt.LoadHtml(information);
  this.Abtxt.SetMargins(0,0.01,0,0);
  this.Abtxt.parent = self;
  this.layAb.AddChild(this.Abtxt);
  this.btnlayAb = app.CreateLayout( "Linear", "Horizontal,FillXY" );
  this.dlgbtnAb = app.CreateButton("OK", 0.45,-1);
  this.dlgbtnAb.parent = self;
  this.dlgbtnAb.SetOnTouch(dlgbtnAb_OnTouch);
  this.btnlayAb.AddChild(this.dlgbtnAb);
  this.layAb.AddChild(this.btnlayAb);
  this.dlgAbout.AddLayout(this.layAb);
  this.Show = function(){self.dlgAbout.Show();}
  this.Hide = function(){self.dlgAbout.Hide();}
}//function AboutDialog()


// Called if button is touched
function dlgbtnAb_OnTouch()
{
    var Abpar = this.parent;
    Abpar.Hide();
}//function dlgbtnAb_OnTouch



