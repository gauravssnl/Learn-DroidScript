function OnStart()
{
	lay = app.CreateLayout( "Linear", "Vcenter,FillXY" );
	b1= app.CreateButton( "Choice" );
	b1.SetOnTouch( b1_OnTouch );
	lay.AddChild( b1 );
	b2 = app.CreateButton( "Choices" );
	b2.SetOnTouch( b2_OnTouch );
	lay.AddChild( b2 );
	app.AddLayout( lay );
}

function b1_OnTouch()
{
	//app.RemoveLayout( lay );
	dig1 = app.CreateListDialog( "Choice", "Add,Remove,Delete" );
	dig1.SetOnTouch( dig1_OnTouch );
	dig1.Show();
}

function dig1_OnTouch(item)
{
	app.ShowPopup( item );
}

function b2_OnTouch ()
{
	//app.RemoveLayout( lay );
	dig2 = app.CreateListDialog( "Days",  "Mon,Tue,Wed,Thru,Fri,Sat,Sun", "Multi");
	dig2.SetOnTouch( dig2_OnTouch );
	dig2.Show();
	}
	
	function dig2_OnTouch(item, isChecked )
{
	app.ShowPopup( item+ " : " + isChecked );
}