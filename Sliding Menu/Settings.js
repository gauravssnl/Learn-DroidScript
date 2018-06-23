

//Create layout for Settings.
function CreateSettingsLayout()
{
    //Create layout for install controls (initially hidden).
    laySettings = app.CreateLayout( "Linear", "FillXY,VCenter" );
    //laySettings.SetBackColor("#141414");
    laySettings.Hide();
    layContent.AddChild( laySettings );
    
    var txt = "Put your settings\n controls here";
    txtInstall = app.CreateText( txt, 0.9,-1,"MultiLine" );
    txtInstall.SetTextSize( 22 );
    laySettings.AddChild( txtInstall );
    
     //Create a toggle button.
    var tgl = app.CreateToggle( "Toggle Button", 0.4 );
    tgl.SetMargins( 0, 0.1, 0, 0 );
    laySettings.AddChild( tgl );
  
    //Create a check box.
    var chk = app.CreateCheckBox( "Check Box" );
    chk.SetMargins( 0, 0.04, 0, 0 );
    laySettings.AddChild( chk );
}
