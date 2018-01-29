function OnStart()
{
	var _layMain = (function ()
{
	 var _object = app.CreateLayout( "Linear", "Horizontal" );
	 
	 return _object;
})  ();

var _txtMsg = (function ()
{
	var _object = app.CreateText( "Hello Android!" );
	
	return _object;
}) ();

_layMain.AddChild(_txtMsg);
app.AddLayout( _layMain );
}