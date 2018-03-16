var start = 0;
var cols = 6;
var count = cols*12;
var lastfa  = "";
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	app.SetDebugEnabled( false );
	thm = app.CreateTheme( "Dark" );
	app.SetTheme( thm );
	lay = app.CreateLayout( "linear", "FillXY" );	
	title = app.CreateText( "Font Awesome", null, 0.08);
	title.SetTextSize( 40 );
	lay.AddChild( title );
	
	layM = app.CreateLayout( "Linear" );
	layM.SetSize( 1, 0.84);
	lay.AddChild( layM );
	ratio = app.GetScreenWidth(  ) / app.GetScreenHeight(  );
	var data = app.ReadFile( "Misc/fa.txt" );
  fa = data.split("\n");
  len = fa.length;
  
  addButton();
  
	layB = app.CreateLayout( "Linear", "Horizontal");
	layB.SetSize( 1, 0.1 );
	pref = app.CreateButton( "[fa-reply]", 0.25, null, "FontAwesome,Custom" );
	pref.SetTextSize( 30 );
	pref.SetOnTouch( pref_OnTouch );
	pref.SetMargins( 0.01, 0.01, 0.5, 0.01 );
	layB.AddChild( pref );
	next = app.CreateButton( "[fa-share]", 0.25, null, "FontAwesome,Custom" );
	next.SetTextSize( 30 );
	next.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	next.SetOnTouch( next_OnTouch );
	layB.AddChild( next );
	lay.AddChild( layB );
	
	//Add layout to app.	

	app.AddLayout( lay );
}

function addButton() {
  end = Math.min(len, start+count);
  try {
      layM.RemoveChild( layF );
  }
  catch(e) {}
  layF= app.CreateLayout( "Linear" , "left");
  for (var i = start; i < end; i++) {
      if ( i%cols == 0) {
          layH = app.CreateLayout( "Linear", "Horizontal,center" );
          layH.SetMargins( 0,0,0, -0.01 );
          layF.AddChild( layH );
      }
      btn = app.CreateButton( "" );
      btn = app.CreateButton( "["+fa[i]+"]", 1/(cols*0.91), 0.08,  "FontAwesome" );
      btn.SetTextSize(34,"px");
      btn.text = "["+fa[i]+"]";
      btn.SetOnTouch( btn_OnTouch );
      if (i%cols < cols-1 && i < len-1)
          btn.SetMargins( 0, 0, -0.02, 0);
      layH.AddChild( btn );
      
  }
  layM.AddChild( layF);
}

function btn_OnTouch(ev) {
    lastfa = this.text;
    //app.ShowPopup( lastfa );
    dlgTxt = app.CreateDialog( lastfa);
    
    //Create a layout for dialog.
    layDlg = app.CreateLayout( "linear", "vertical,fillxy" );
    layDlg.SetSize( 0.8, 0.4 );
    layDlg.SetPadding( 0.02, 0, 0.02, 0.01);
    dlgTxt.AddLayout( layDlg );

    //Create a list control.
    textD = app.CreateText( lastfa, null, null, "FontAwesome");
    textD.SetTextSize( 256, "px" );
    textD.SetMargins( 0.01, 0.01, 0.01, 0.01 );
    layDlg.AddChild( textD );
    btnD = app.CreateButton( "[fa-copy] Copy", 1, 0.1, "FontAwesome,custom");
    btnD.SetTextSize( 24 );
    btnD.SetOnTouch( function() {
        app.SetClipboardText( lastfa );
        dlgTxt.Dismiss();
    } );
    layDlg.AddChild( btnD );
    
    //Show dialog.
    dlgTxt.Show();
}

function pref_OnTouch() {
    if (start == 0) app.ShowPopup( "This is first page" );
    else {
        start = Math.max(0, start-count);
        addButton();
    }
}

function next_OnTouch() {
    if (start+count>=len) app.ShowPopup( "This is last page" );
    else {
        start = Math.min(len, start+count);
        addButton();
    }
}