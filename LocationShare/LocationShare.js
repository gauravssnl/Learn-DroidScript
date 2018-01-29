function OnStart()
{
	width = app.GetScreenWidth(  );
	height = app.GetScreenHeight(  );
	//alert(width);
//	alert(height);
layMain = app.CreateLayout( "Linear", "Vertical" );
layT = app.CreateLayout( "Linear", "Horizontal," );
layMain.AddChild( layT );
layT.SetBackColor( "#ffff00" );
btn1 = app.CreateButton( "Home" , 1/3, -1);
btn1.SetTextColor( "#22ff22" );
layT.AddChild( btn1 );
btn2 = app.CreateButton( "About", 1/3, -1 );
btn2.SetTextColor( "#22ff22" );
layT.AddChild( btn2 );
btn3 = app.CreateButton( "Thanks" , 1/3, -1);
btn3.SetTextColor( "#22ff22" );
layT.AddChild( btn3 );
layM = app.CreateLayout( "Linear", "Vertical" );
layM.SetBackColor( "#00ffff" );
layMain.AddChild( layM );
txtEdit = app.CreateText( "Learning DroidScript" ,1.0,0.8);
txtEdit.SetSize( 32 );
txtEdit.SetTextColor( "#ff0000" );
layM.AddChild( txtEdit );
layM.SetMargins( 0.01, 0.01, 0.01, 0.01 );
layB = app.CreateLayout( "Linear", "Horizontal" );
layB.SetBackColor( "#ff00ff" );
layMain.AddChild( layB );
btnA = app.CreateButton( "Refresh", 1.0/3, -1);
layB.AddChild( btnA );
//btnA.SetBackColor( "#ff0000" );
btnB = app.CreateButton( "Settings" , 1.0/3, -1);
layB.AddChild( btnB );
btnC = app.CreateButton( "Exit" , 1.0/3, -1);
layB.AddChild( btnC );
app.AddLayout( layMain);
}