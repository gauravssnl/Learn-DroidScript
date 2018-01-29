function OnStart()
{
  // function for dynamic generation of methods
	function runMethodNot(p_method, p_objectList)
{
	var p_method = 'p_object.' +  p_method;
	var _func = new Function("p_object", p_method);
	for(var _i = 0, _iMax = p_objectList.length;_i < _iMax; _i++) {
	  _func(p_objectList[_i]);
	  
	}
}

function addChild(p_layout, p_elements)
{
	for(var _i = 0, _iMax = p_elements.length; _i < _iMax; _i++) {
	   p_layout.AddChild(p_elements[_i]);
	
	}
}

function addLayout(p_layouts)
{
	for(var _i = 0, _iMax = p_layouts.length; _i < _iMax; _i++){
	  app.AddLayout( p_layouts[_i]);
  }
}


 var _object = new Object();
 var _buttonFontSize = 20;
 var _buttonFontDim =' "sp"';
 var _buttonBackColor = '"red"';
 var _lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
 
 var _btn1 =( function ()
{
	var _object = app.CreateButton( "Button1" );
	return _object;
	
}) ();

var _btn2 =( function ()
{
	var _object = app.CreateButton( "Button2" );
	return _object
}) ();

 var _btn3 =( function ()
{
	var _object = app.CreateButton( "Button3" );
	return _object;
}) ();

runMethodNot('SetTextSize(' + _buttonFontSize  + ',' + _buttonFontDim + ')',
[
  _btn1,
  _btn2,
  _btn3
]);

runMethodNot('SetBackColor(' + _buttonBackColor + ')',
[
  _btn1,
  _btn2,
  _btn3
] );

runMethodNot('SetMargins(0.1,0.1,0.1,0.1)', 
 [
   _btn1,
   _btn2,
   _btn3,
 ]);

addChild(_lay, 
[
  _btn1,
  _btn2,
  _btn3
]);

addLayout( [_lay ]);

runMethodNot('SetBackColor("#ffffff")' , [_lay]);

}