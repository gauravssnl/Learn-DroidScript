
function OnStart()
{
	lay = app.CreateLayout( "Linear", "Vertical" );
	layTop = app.CreateLayout( "Linear", "Horizontal" );
	layTop.SetBackGradient("white", "black");
	lay.AddChild( layTop );
	title = app.CreateText( "My App", 1, 0.05);
	title.SetTextColor( "black" );
	title.SetScale( 1, 1.5 );
	title.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	layTop.AddChild( title );
	app.AddLayout( lay );
	//alert(layTop.GetHeight());
	scroll = app.CreateScroller( 1, 1 - layTop.GetHeight(  ));
	lay.AddChild( scroll );
	layScroll = app.CreateLayout( "Linear", "Vertical" );
	layScroll.SetBackGradient( "green", "yellow" );
	scroll.AddChild(layScroll);
	for(var i = 0; i < 100; i ++)
	{
	   text = app.CreateText("DroidScript" + i, 1, 0.05, "FillX,Center");
	   text.SetTextColor( "blue" );
	   layScroll.AddChild( text );
	 }
	 
}