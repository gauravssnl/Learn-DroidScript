
//Called when application is started.
function OnStart() {
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout("linear", "VCenter,FillXY");	

	//Create image 1/5 of screen width and correct aspect ratio.
	img = app.CreateImage("Img/Hello World.png", 0.2, -1);
	lay.AddChild(img);
	
	//Create a button 1/3 of screen width and 1/10 screen height.
	btn = app.CreateButton("Press Me", 1/3, 0.1);
	btn.SetMargins(0, 0.05, 0, 0);
	lay.AddChild(btn);
	
	//Set function to call when button pressed.
	btn.SetOnTouch(btn_OnTouch);
	
	//Add layout to app.	
	app.AddLayout(lay);
}

//Called when user touches our button.
function btn_OnTouch() {
	//Show a popup message.
	app.ShowPopup("Hello World!");
	
	//Vibrate phone with a pattern (in milliseconds).
	//pause,vibrate,pause,vibrate...
	app.Vibrate("0,100,30,100,50,300");
}
