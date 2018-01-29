var  x = 5;
function f()
{
	alert(x);
	var x = 9;
	alert(x);
}

f();
alert(x);

function g()
{
	alert(x);
	x = 6;
	alert(x);
}
g();
alert(x);
