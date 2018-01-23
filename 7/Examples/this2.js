// simple function call : this refers to global object
function f()
{

	alert(this);
		alert(this == window);  // true
		
}

// Self-invoking function : this refers to global object
function g()
{
(function ()
{
	alert(this == window); // true
}) ( );

}


	f();
	g();