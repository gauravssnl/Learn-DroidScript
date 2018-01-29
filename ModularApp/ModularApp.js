// Using a style object
function initStyle(p_object)
{
  var _color;
  var _object = [];
   
  _object.setBackColor = 
  function (p_color)
{
	_color = p_color;
	p_object.SetBackColor(_color);
};

_object.getBackColor = 
  function ()
{
	return _color
};

return _object;

}