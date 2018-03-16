"use strict";
//Called when application is started.
// x = 6;  //error
let x = 6;
function OnStart()
{
	//Create a layout with objects vertically centered.
let 	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
let name = "Gaurav";
let msg = `I am ${name}. Is your name ${name} ??Value: ${1 +5}` ;
let 	txt = app.CreateText(msg, -1, -1, "Multiline" );
	txt.SetTextSize( 32 );
	lay.AddChild( txt );
	
	//Add layout to app.	
	app.AddLayout( lay );
	alert(Symbol);
	alert(typeof Symbol);
	alert(typeof Symbol("id"));
	alert(6 / "3");
	alert( "4" + 1 +2);
	alert(1 +2 + "4");
	alert( +true);
	prompt("name:", "gaurav");
	confirm("Are you sure?");
	alert(Boolean(-1));
	let sayHi = function ()
{
	alert("Hi");
}

alert(sayHi);
	
}