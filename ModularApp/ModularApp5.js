// General Moments at Work

var myButton = app.CreateButton( );

// To determine the number  of arguments that a method expects to receive, its length property is used
alert(myButton.SetSize.length);

// Determine approximate type of arguments, method is accessed without brackets(calling it)
alert(myButton.SetSize);

alert(myButton.SetSize.prototype.constructor);

alert(myButton.SetSize.toString());

// Non-string parameter can be specied as string, which is convenient when we work with JSON data
btn1 = app.CreateButton( "Button1", 0.2, 0.2 );
btn1 = app.CreateButton( "Button1" , "0.2", "0.2");