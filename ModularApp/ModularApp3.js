//Example 2. A group operation.

function OnStart ()
{
    function SetTextSize (p_objectList) {
        
        for (var _i = 0, _iMax = p_objectList.length; _i <_iMax; _i ++) {
            
            p_objectList [_i] .SetTextSize (_buttonFontSize, 'sp');
        }
    }

   var _buttonFontSize = 20;
    
	var _lay = app.CreateLayout ("linear", "VCenter, FillXY");	
	
	var _btn1 = (function () {
	    
	    var _object = app.CreateButton ('Button 1');
	    
	    return _object;
	}) ();

	var _btn2 = (function () {
	    
	    var _object = app.CreateButton ('Button 2');
	    
	    return _object;
	}) ();

	var _btn3 = (function () {
	    
	    var _object = app.CreateButton ('Button 3');
	    
	    return _object;
	}) ();

    SetTextSize ([
       _btn1,
       _btn2,
       _btn3
    ]);

    _lay.AddChild (_btn1);
    _lay.AddChild (_btn2);
    _lay.AddChild (_btn3);

	app.AddLayout (_lay);
}