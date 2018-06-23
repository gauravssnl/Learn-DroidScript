_AddOptions( "NoDom" );
var glob1 = 0, glob2 = 0, text = null;

function OnStart() {
	var lay = app.CreateLayout( "linear", "VCenter,FillXY,Horizontal" );
	app.AddLayout( lay );
	
	var btn = app.CreateButton( "Press Me", 0.3, 0.075 );
	btn.SetOnTouch( btn_OnTouch );
	lay.AddChild( btn );
	
	text = app.CreateText( "", -1, -1, "Multiline,MonoSpace,Left" );
	lay.AddChild( text );
	
	UpdateText();
}

function btn_OnTouch() {
    IncrementGlobal1();
    
    if( typeof( IncrementGlobal2 ) !== "function" )
        app.LoadScript( "test.js", function() { 
            IncrementGlobal2(); UpdateText(); 
        } );
    else IncrementGlobal2();
    
    UpdateText();
}

function IncrementGlobal1() { glob1 += 1; }
function UpdateText() { text.SetText( "glob1: " + glob1 +  "\nglob2: " + glob2 ); }