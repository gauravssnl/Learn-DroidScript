function OnStart()
{
	lay = app.CreateLayout( "Linear", "Horizontal", "FillXY" );
	lay.SetBackGradient( "white", "black" );
	scroll = app.CreateScroller( 1.0, 1.0);
	lay.AddChild( scroll );
	layScroll = app.CreateLayout( "Linear", "Vertical" );
	scroll.AddChild( layScroll );
	app.AddLayout( lay );
	title = app.CreateText( "Scroll List" , 1.0, -1, "FillX");
	for(var i = 0; i <= 100; i ++)
	{
	 var layList =  app.CreateLayout( "Linear", "Horizontal, FillX" );
	 var txt = app.CreateText( "DroidScript " + i, 0.5, -1, "Left");
	 txt.SetTextColor( "#ff0000" );
	 layList.AddChild( txt);
	 var btn = app.CreateButton( "Button "+ i, 0.5, -1,"FontAwesome,Custom,Right" );
	 layList.AddChild( btn );
	 btn.SetOnTouch( function ()
{
	app.ShowPopup( this.GetText());
}
);
	 layScroll.AddChild( layList);
	}
}