function OnStart()
{
	lay = app.CreateLayout( "Linear", "Vertical" );
	scroll = app.CreateScroller( 1.0, 1.0 );
	lay.AddChild( scroll );
	app.AddLayout( lay );
	layScroll = app.CreateLayout( "Linear", "Vertical,FillX" );
	scroll.AddChild( layScroll );
	internalFolder = app.GetInternalFolder();
	externalFolder = app.GetExternalFolder();
	list = app.CreateListView([internalFolder, externalFolder], "GS File Manager" );
	layScroll.AddChild( list );
	list.Show();
	list.SetOnTouch( list_OnTouch );
	
}

function list_OnTouch(item)
{
	
}