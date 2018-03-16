"use strict"
_AddOptions( "Transparent" );
var txe,svc;
function OnStart()
{
  var theme = myTheme();
  app.SetPosition( 0.1,0.1,0.8,0.4 );
	var lay = app.CreateLayout( "linear", "left,FillXY" );	
	var lay2 = app.CreateLayout( "linear", "horizontal,right,bottom,FillXY,touchthrough" );	
  //if(theme &&  theme.layBackColor)
   // lay2.SetBackColor( theme.layBackColor );
	txe = app.CreateTextEdit( "",0.8,0.3,"multiline" );
	txe.max=140;
	txe.SetOnChange( txe_OnChange );
	lay.AddChild( txe );

	txe.txt = app.CreateText( "0 /  " + txe.max);
  txe.txt.SetPadding( 0.05,0,0,0 );
	lay.AddChild( txe.txt );

	app.AddLayout( lay );
  var btn = app.CreateButton( "[fa-power-off]",-1,-1,"fontawesome" );
  btn.SetOnTouch( appExit );
  lay2.AddChild( btn );
  btn = app.CreateButton( "[fa-copy]",-1,-1,"fontawesome" );
  btn.SetOnTouch( btn_OnTouch );
  lay2.AddChild( btn );
  app.AddLayout( lay2 );
  txe.Focus();
  var	notify = app.CreateNotification();
  notify.SetMessage( "SMS Editot available", "SMS Editor","touch to open");
  notify.Notify( "smsEdit");
  app.ShowKeyboard( txe );
  //svc = app.CreateService( "this","this", null);
}

function txe_OnChange()
{
	var len=this.GetText().length;
	var msg = len + " / " + this.max;
	if(len>this.max)
		this.SetBackColor( "#dd774444" );
	else 	this.SetBackColor( "#dd447744" );
	this.txt.SetText( msg );
}

function btn_OnTouch()
{
	  txe.SetBackColor( "#dd444477" );
    app.SetClipboardText( txe.GetText() );
    setTimeout('txe.SetBackColor("#dd447744")',200);
}

function appExit()
{
    app.Exit();
}

function myTheme()
{
	   var theme = app.CreateTheme( "dark" );
    theme.AdjustColor( -60, 0, 0, 50 );
    theme.layBackColor="#44225522";
    theme.SetBackColor( "#dd447744" );
    theme.SetProgressBackColor("#00000000");
	   theme.SetBtnTextColor( "#aaffaa" );
    theme.SetButtonOptions( "custom,nopad" );
         theme.SetButtonStyle( "#668866","#447744",10,"#999999",0,1,"#33b5e5" );
    theme.SetCheckBoxOptions( "dark" );
    theme.SetDialogColor( "#88224422" );
   	theme.SetDialogBtnColor( "#ff446644" );
       	theme.SetDialogBtnTxtColor( "#ffaaffaa" );
       	theme.SetTitleHeight( 42 );
	       theme.SetTitleColor( "#ffddffdd" ); 
	       theme.SetTitleDividerColor( "#ffddffdd" );
	       theme.SetTextColor( "#ffaaffaa" );
         app.SetTheme( theme );
    return theme
}