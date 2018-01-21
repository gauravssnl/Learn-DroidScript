app.LoadScript('debugger.js');


//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	var lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	var txt = app.CreateText( "Тест дебаггера" );
	txt.SetTextSize( 32 );
	lay.AddChild( txt );
	var btn = app.CreateButton('Иммитировать баг');

	//иммитация бага:
	btn.SetOnTouch(
		function(){
			var x=null; 
			alert(x[0]);
		}
	);
	lay.AddChild( btn );
	app.AddLayout( lay );
}

