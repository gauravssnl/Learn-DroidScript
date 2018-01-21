
//Called when application is started.
function OnStart()
{
	lvw = app.CreateListView( "Monday,Tuesday,Wednesfay,Thrusday,Friday,Saturday,Sunday", "Days" );
	lvw.SetOnTouch( lvw_OnTouch );
	lvw.Show();
}

function lvw_OnTouch(item)
{
	app.ShowPopup( item );
	OnStart()
}