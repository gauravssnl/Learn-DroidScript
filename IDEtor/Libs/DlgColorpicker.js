/********************************************************************
 * ColorPicker
 ====================================================================
 * Creation date: 24-01-2015 by octazid
 * Last update: 24-01-2015 by octazid  
 ====================================================================
 * Simple dialog to create and select a Hex-Colorcode
 * or to change the colors of controls
 ********************************************************************/

var colorTrs   = "FF";
var colorRed   = "FF";
var colorGreen = "FF";
var colorBlue  = "FF";
var trans = 0;


//*** Create Colorpicker Dialog***//
function ColorPicker(Callback, Textfield, Clipboard)
{
  var self = this;
  this.callback = Callback || function(){};
  this.Cpdlg = app.CreateDialog("Colorpicker");
  this.Cptextfield = Textfield || "";
  this.Cpclipboard = Clipboard || false;
  this.Cplay = app.CreateLayout( "Linear", "FillXY" );
  this.color = app.CreateText("",0.9,0.05,"AutoScale");
  this.color.SetText("#" + colorTrs + colorRed + colorGreen + colorBlue);
  this.color.SetTextColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
  this.color.SetTextSize(18);
  this.color.parent = self;
  this.Cplay.AddChild(this.color);
  this.img = app.CreateImage(null, 0.4, 0.05);
  this.img.parent = self;
  this.img.SetColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
  this.img.SetMargins(0.01, 0.0015, 0.01, 0);
  this.Cplay.AddChild(this.img) ;
  this.laySkb = app.CreateLayout("Linear", "VCenter, FillX");
  this.laySkb.SetMargins(0.01, 0.01, 0.01, 0.01);
  this.laySkb.SetBackColor("#FF000000");
  this.txtTrs = app.CreateText( "Transparency: " + trans);
  this.txtTrs.parent = self;
  this.laySkb.AddChild( this.txtTrs );
  this.skbTrs = app.CreateSeekBar( 0.9, -1 );
  this.skbTrs.parent = self;
  this.skbTrs.SetRange( 255 );
  this.skbTrs.SetValue( parseInt(colorTrs, 16) );
  this.skbTrs.SetOnTouch( skbTrs_OnTouch );
  this.skbTrs.SetBackGradientRadial(0, 0, 1.0,"#00FFFFFF", "#AAFFFFFF");
  this.laySkb.AddChild( this.skbTrs );
  this.txtRed = app.CreateText("Red: " + parseInt(colorRed, 16));
  this.txtRed.parent = self;
  this.laySkb.AddChild( this.txtRed );
  this.skbRed = app.CreateSeekBar( 0.9, -1 );
  this.skbRed.parent = self;
  this.skbRed.SetRange( 255 );
  this.skbRed.SetValue( parseInt(colorRed, 16) );
  this.skbRed.SetOnTouch( skbRed_OnTouch );
  this.skbRed.SetBackGradientRadial(0, 0, 1.0,"#00FF0000", "#AAFF0000");
  this.laySkb.AddChild( this.skbRed );
  this.txtGreen = app.CreateText( "Green: " + parseInt(colorGreen, 16));
  this.txtGreen.parent = self;
  this.laySkb.AddChild( this.txtGreen );
  this.skbGreen = app.CreateSeekBar( 0.9, -1 );
  this.skbGreen.parent = self;
  this.skbGreen.SetRange( 255 );
  this.skbGreen.SetValue( parseInt(colorGreen, 16) );
  this.skbGreen.SetOnTouch( skbGreen_OnTouch );
  this.skbGreen.SetBackGradientRadial(0, 0, 1.0,"#0000FF00", "#AA00FF00");
  this.laySkb.AddChild( this.skbGreen );
  this.txtBlue = app.CreateText( "Blue: " + parseInt(colorBlue, 16));
  this.txtBlue.parent = self;
  this.laySkb.AddChild( this.txtBlue );
  this.skbBlue = app.CreateSeekBar( 0.9, -1 );
  this.skbBlue.parent = self;
  this.skbBlue.SetRange( 255 );
  this.skbBlue.SetValue( parseInt(colorBlue, 16) );
  this.skbBlue.SetOnTouch( skbBlue_OnTouch );
  this.skbBlue.SetMargins(0,0,0,0.015);
  this.skbBlue.SetBackGradientRadial(0, 0, 1.0,"#000000FF", "#AA0000FF");
  this.laySkb.AddChild( this.skbBlue ); 
  this.Cplay.AddChild( this.laySkb ) ;
  this.Cpbtnlay = app.CreateLayout( "Linear", "Horizontal,FillXY" );
  this.Cpbtnlay.SetMargins(0.01, 0.01, 0.01, 0.01) ;
  this.Cpbtn = app.CreateButton("OK", 0.45);
  this.Cpbtn.parent = self;
  this.Cpbtn.SetOnTouch(Cpbtn_OnTouch);
  this.Cpbtnlay.AddChild(this.Cpbtn);
  this.CpbtnClose = app.CreateButton("Close",0.45);
  this.CpbtnClose.parent = self;
  this.CpbtnClose.SetOnTouch(Cpbtn_OnTouch);
  this.Cpbtnlay.AddChild(this.CpbtnClose);
  this.Cplay.AddChild(this.Cpbtnlay)
  this.Cpdlg.AddLayout(this.Cplay);
  this.GetColor = function(){return self.color.GetText();}
  this.Show = function(){self.Cpdlg.Show();}
  this.Hide = function(){self.Cpdlg.Hide();}
}//function ColorPicker()



// OnTouch events for color seekbars
//----------Transparency------------
function skbTrs_OnTouch(value)
{
    var par = this.parent;
    colorTrs = ("0"+(Math.round( value ).toString(16))).slice(-2).toUpperCase() ;
    trans = parseInt(Math.round(value)/2.55-100);
    if (trans.toString().length > 1){trans = trans.toString().substring(1);}
    par.txtTrs.SetText("Transparency: " + trans);
    par.color.SetText("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.color.SetTextColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.img.SetColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
}


//----------Color Red------------
function skbRed_OnTouch(value)
{
    var par = this.parent;
    colorRed = ("0"+(Math.round( value ).toString(16))).slice(-2).toUpperCase() ;
    par.txtRed.SetText("Red: " + parseInt(colorRed, 16));
    par.color.SetText("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.color.SetTextColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.img.SetColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
}


//----------Color Green------------
function skbGreen_OnTouch( value )
{
    var par = this.parent;  
    colorGreen = ("0"+(Math.round( value ).toString(16))).slice(-2).toUpperCase() ;
    par.txtGreen.SetText("Green: " + parseInt(colorGreen, 16));
    par.color.SetText("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.color.SetTextColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.img.SetColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
}


//----------Color Blue------------
function skbBlue_OnTouch( value )
{
    var par = this.parent;
    colorBlue = ("0"+(Math.round( value ).toString(16))).slice(-2).toUpperCase() ;
    par.txtBlue.SetText("Blue: " + parseInt(colorBlue, 16));
    par.color.SetText("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.color.SetTextColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
    par.img.SetColor("#" + colorTrs + colorRed + colorGreen + colorBlue);
}


//Called if a button is touched
function Cpbtn_OnTouch()
{
  var par = this.parent;
  var col = par.color.GetText();
  var txtfld = par.Cptextfield;
  var clp = par.Cpclipboard
  par.Hide();
  if(this.GetText() == "OK") par.callback(col, txtfld, clp);
}//function Cpbtn_OnTouch


//-----3 Callback functions - called if Ok is pressed-----
function GetString(color, textfield, clipboard)
{
    if (clipboard) app.SetClipboardText(color);
        if (textfield != "")
        {
            if (textfield.GetType()=="TextEdit")
            {
            textfield.InsertText( "\"" + color + "\"", textfield.GetCursorPos());
            }
        }
}//function GetString


function SetText(color, textfield, clipboard)
//Note: Dont work with list control
{
    if (clipboard) app.SetClipboardText(color);
    textfield.SetTextColor(color);
}//function SetText


function SetBackground(color, textfield, clipboard)
{
    if (clipboard) app.SetClipboardText(color);
    textfield.SetBackColor(color);
}//function SetBackground
