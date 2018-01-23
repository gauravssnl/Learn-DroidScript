var f = function ()
{
	this.x = 5;
	//Self-Invoking function
	(function ()
{
	this.x = 3;
}) ();

	alert(this.x);
}

var obj = {x:4, m: function ()
{
	alert( this.x);
}};


	f(); // 3
	new f(); // 5
	obj.m(); // 4
	new obj.m();  // undefined
	f.call(f); // 5
	obj.m.call(f); // 5