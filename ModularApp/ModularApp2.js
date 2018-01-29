window.controls = [ ];

function OnStart()
{
	_layMain = (function ()
{
 var 	_object = app.CreateLayout( "Linear", "Vcenter,FillXY" );
	
	return _object;
}) ();

var _img =( function ()
{
	var  _object = app.CreateImage( "/Sys/Img/Hello.png");
	 
	 return _object;
}) ();

var _btn  =( function ()
{
	var _object = app.CreateButton( "" );
	_object.SetText("Button");
	_object.SetTextSize(32);
	_object.SetSize( 0.2, 0.2 );
	
	return _object;
}) ();

_layMain.AddChild(_img);
_layMain.AddChild(_btn);

alert("The width of  button before display: " + _btn.GetWidth());
app.AddLayout( _layMain );
alert("The width of button after display: " + _btn.GetWidth());

window.controls.button =  _btn;
alert(window.controls.button);


}