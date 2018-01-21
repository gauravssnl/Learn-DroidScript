    
//Called after application is started.
    function OnStart()
    {
        app.EnableBackKey( false );
        app.ShowPopup( "Touch the Back Buttom" );
    }
   
    function OnBack()
    {              
        //Create dialog window.
        dlgExit = app.CreateDialog( "закрыть?" );
       
        //Create a layout for dialog.
        layDlg = app.CreateLayout( "Linear", "Horizontal,FillXY" );
        layDlg.SetPadding( 0.02, 0.02, 0.02, 0.02 );
        dlgExit.AddLayout( layDlg );
   
        var btnYes = app.CreateButton("[fa-check-circle] да", 0.3, -1, "FontAwesome");
        btnYes.SetTextSize( 24 );
        btnYes.SetOnTouch( btnYes_OnTouch );
        layDlg.AddChild( btnYes );
       
        var btnNo = app.CreateButton("[fa-times-circle] нет", 0.3, -1, "FontAwesome");
        btnNo.SetOnTouch( btnNo_OnTouch );
        btnNo.SetTextSize( 24 );
        layDlg.AddChild( btnNo );
       
        //Show dialog.
        dlgExit.Show();
    }
   
    function btnYes_OnTouch()
    {
        dlgExit.Dismiss();
        app.Exit();
    }
   
    function btnNo_OnTouch()
    {
        dlgExit.Dismiss();
    }
