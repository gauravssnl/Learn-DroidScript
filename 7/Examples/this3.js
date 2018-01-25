// In the Constructor ( when function is called by using new keyword, the function acts as constructor) , and here this refers to object being created

function f()
{
	this.x = 5
	alert("this:" + this);
	alert(this == window); // false
	
}

var o = f()
alert(this.x==5); // true

