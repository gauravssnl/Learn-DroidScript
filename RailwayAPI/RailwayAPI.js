
API_KEY = "c7jwc2qyud"
function OnStart()
{
	layMain = app.CreateLayout( "Linear", "Vertical" );
	layMain.SetSize( 1 , 1);
	layMain.SetBackColor( "White" );
	layT = app.CreateLayout( "Linear", "Horizontal,FillX" );
	layT.SetBackColor( "#ff0000" );
	side_btn = app.CreateButton( "[fa-list]", -1,-1,"Fontawesome,Left");
	//side_btn.SetTextSize( 30);
	side_btn.SetScale( 4,3);
	side_btn.SetBackColor( "#ff0000" );
	layT.AddChild( side_btn );
	layMain.AddChild( layT );
	title = app.CreateText( "RailwayAPI" , 1- side_btn.GetWidth() ,-1, "");
	title.SetTextSize(30);
	layT.AddChild( title );
	layT.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	layB = app.CreateLayout( "Linear", "VCenter" );
	layMain.AddChild( layB );
	btn1 = app.CreateButton( "Check PNR status" , 1,-1, "FillXY");
	layB.AddChild( btn1 );
	btn1.SetOnTouch( btn1_OnTouch );
	app.AddLayout( layMain );
}

function btn1_OnTouch()
{
	dlg1 = app.CreateDialog( "PNR Status" );
	layDlg1 = app.CreateLayout( "Linear", "Vertical" );
  layDlg1.SetSize( 1.0, 1.0);
  layDlg1.SetBackGradient( "#eeeeee", "#ffffff" );
	dlg1.AddLayout( layDlg1 );
	pnr_txtEdit = app.CreateTextEdit( "", 1.0, -1);
	pnr_txtEdit.SetTextColor( "#000000" );
 pnr_txtEdit.SetHint( "Enter PNR Number" );
	layDlg1.AddChild( pnr_txtEdit );
	pnr_check_btn = app.CreateButton( "Check PNR status", -1,-1,"Gray" );
	layDlg1.AddChild( pnr_check_btn );
	pnr_check_btn.SetOnTouch( pnr_check_btn_OnTouch );
	result_text = app.CreateTextEdit( "" , -1,-1, "NoKeyBoard");
	result_text.SetBackColor( "#000000" );
	layDlg1.AddChild( result_text );
	result_text.Hide();
	dlg1.Show();
}

function pnr_check_btn_OnTouch()
{

	try
	{  
	  if(!(pnr = pnr_txtEdit.GetText())) return;
	  url =" https://api.railwayapi.com/v2/pnr-status/pnr/" + pnr + "/apikey/"+API_KEY +"/";
	  request = new XMLHttpRequest();
	  request.open('GET' , url);
	  request.send();
	  request.onload = function ()
{ 
   result = request.response;
  // result_text.SetText( result );
   try
    {
    data = JSON.parse(result);
    keys = Object.keys(data);
    msg = "";
    for(var i = 0; i < keys.length; i ++)
     {
       var key = keys[i];
        msg += key + "=" + data[key].toString() ;
        msg += "\n";
     }
    }
   catch(e) {alert(e);}
   //alert(data);
   result_text.SetText( msg );
   result_text.Show();
}

	}
	catch(e)
	{
	  app.ShowPopup( "Error: "+ e );
	}
}