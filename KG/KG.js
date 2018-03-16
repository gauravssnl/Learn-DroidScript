'use strict';
// Construct : use of new operator
// we use functions beginning with capital letter for conatructor
function User(name, admin=false)
{
	// this is implicit 
	this.name = name;
	this.isAdmin = admin
	// return this is implicit
}

let john = new User("John", true);
alert(john.name);
alert(john.isAdmin);

// Another way
let user = new function ()
{
	this.name = "Mary"
	this.isAdmin = false;
}

alert(user.name);