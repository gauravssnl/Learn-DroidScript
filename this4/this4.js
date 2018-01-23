// In the object method, this refers to object 

var o = {f: function ()
{
	return this;
 }
 }

alert( o.f() == o);  // true

/* If the function is started as an object property,
 then this will reference this object.
  It does not matter where this function came from in the object, the main thing is how it is called, namely what object is before the function is called:
  */
  
var o2 = {f : o.f}
alert(o2.f() == o2); // true