function sayHello()
{
	alert("Hello");
}

sayHi = function ()
{
	alert("Hi");
}

sayHello();
hiFunc = sayHi;
hiFunc();

// callback functions

function ask(question, yes, no)
{
	if(confirm(question)) 
	  yes();
	else
	 no();
}

ask("Do you agree?",
 function() { alert("You agreed"); },
 function() {alert("You didn't agree");} 
 )
 
 // arrow function
 let add = (x, y) => x + y;
 alert(add(2, 3));
 alert(typeof add);
 alert(add);
 // single argument arrow function
 let add_1 = x => x + 1;
 alert(add_1(5));
 // no argument arrow function
 let show = ( ) => alert("show");
 show();
 
 // calling ask() by using arrow functions
 
 ask("Your age is 18 or more?",
         ( ) => alert("You are allowed"),
         ( ) => alert("You are not allowed")
         );
  
 let func = (a, b) => {
    let x = a + b;
    x = 2 * x;
    return x;
    
 }
alert( func(2, 5));

// default argument
function test(x = 1, y)
{
	 alert(x);
}

test(5, 6);
test();

// Property value shorthand
function makeUser(name, age)
{
  return {
    name: name,
    age: age,
  };
}

let user = makeUser("John", 20);
alert(user.name);
alert(user.age);

// Another style
function setData(x, y)
{
	return {
	  x, // same as x: x
	  y, // same as y: y
  }
}

d = setData(1, 2);
alert(d.x, d.y);