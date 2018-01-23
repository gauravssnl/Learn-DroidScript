/*
Methods:  apply, call

The apply and call methods allow you to specify the context for the function to be executed.
 The difference between apply and call is only in the way that parameters are passed to the function. 
 The first parameter of both functions sets the context of the function (ie, what will be equal to the this ). */
 
 function f()
{
	f.call(window); // this inside the function f will refer to the window object
	
	f.call(f); // this inside of f will refer to f
	
	
}

// more cunning
function g()
{
	alert(this.toString() ); // 123
	
}
f.call(123); // this inside the function f will refer to a Number object with a value of 123
