//Called when application is started.
function OnStart()
{
    //Create a layout with objects vertically centered.
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );    

    //Create a text label and add it to layout.
    txt = app.CreateTextEdit( "" );
    txt.SetHint("Plugin to delete")
    lay.AddChild( txt );

    btn=app.CreateButton("Delete Plugin");
    btn.SetOnTouch(DeleteUserPlugin);
    lay.AddChild(btn);
    
    privFldr = app.GetPrivateFolder( "Plugins" );
    plgins = app.ListFolder(privFldr);

    lvw = app.CreateListView( plgins, "Select a Plugin for uninstalling or press Back" );
    lvw.SetOnTouch( lvw_OnTouch );

    //Add layout to app.    
    app.AddLayout( lay );
}


function lvw_OnTouch( item )
{
  txt.SetText( item );
}


function DeleteUserPlugin()
{
    var plg = "" + txt.GetText()
    if (plg == "") return;
    plugDir = privFldr + "/" + plg.toLowerCase();
    if (app.FolderExists(plugDir))
    {
       var list = app.ListFolder(plugDir);
       var yesNo = app.CreateYesNoDialog( "Do you really want to uninstall the plugin " + txt.GetText() + "? \nThe following files or folders will be all deleted:\n\n" + list + "\n\nIt is no way for undo!");
       yesNo.SetOnTouch( yesNo_OnTouch );
    }
}


function yesNo_OnTouch( yesNoresult )
{
    if( yesNoresult == "Yes" )
    { 
        app.DeleteFolder(plugDir);
        
        app.Alert("Plugin " + txt.GetText() + " uninstalled!");
        txt.SetText("");
    }
    else
    {
        app.ShowPopup("No changings!");
    }
}
