
//Called when application is started.
function OnStart(d)
{

	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "FillXY" );	
	txt = app.CreateText("NoteApp by gauravssnl");
	txt.SetTextColor( "#22ff22" );
	txt.SetTextSize( 18 );
	lay.AddChild( txt );
	if( d == undefined)
	data = []
	layList = app.CreateLayout( "Linear", "Vertical");
	createList(data);
	lay.AddChild( layList );
	layB = app.CreateLayout( "Linear", "Horizontal,Bottom" );
layB.SetPosition( 0.9 , 0.9, 0.9, 0.9);
	lay.AddChild( layB );
addBtn = app.CreateButton( "Add", -1,-1,"FillX" );
addBtn.SetTextColor( "#22ff22" );
addBtn.SetBackColor( "#cc22cc" );
	addBtn.SetOnTouch( addBtn_OnTouch );
	layB.AddChild( addBtn );
	
	
	
	//Add layout to app.	
	app.AddLayout( lay );
}

function createList(data)
{
	
	list = app.CreateList( data );
	layList.AddChild( list );
}

function addBtn_OnTouch ()
{

	dlg = app.CreateDialog( "Add Note" );
	layDlg = app.CreateLayout( "Linear", "Vertical" );
	layDlg.SetSize( 0.9, 0.9 );
	dlg.AddLayout( layDlg );
	titleEdit = app.CreateTextEdit( "", -1,0.4,"FillX" );
	titleEdit.SetHint( "Note Text" );
	layDlg.AddChild( titleEdit );
	lay1 = app.CreateLayout( "Linear", "Horizontal,Left" );
	layDlg.AddChild(lay1  );
	saveBtn = app.CreateButton( "Save" );
	saveBtn.SetOnTouch( saveBtn_OnTouch );
	cancelBtn = app.CreateButton( "Cancel" );
	lay1.AddChild( cancelBtn );
	lay1.AddChild( saveBtn );
	dlg.Show();
}

function saveBtn_OnTouch()
{
  data.push(titleEdit.GetText());
	dlg.Hide();
	app.RemoveLayout( layB );
	OnStart(data)
	
	
}