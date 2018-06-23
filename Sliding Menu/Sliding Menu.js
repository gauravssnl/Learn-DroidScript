
//Load external scripts.
app.LoadScript( "Panel.js" );
app.LoadScript( "WebView.js" );
app.LoadScript( "Settings.js" );

//Init global variables.
var curPage = null;
var curUrl = "Main.html";

//Called when application is started.
function OnStart()
{
    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
      
    //Create top level layouts.
    CreateMainLayout();
    CreatePanelLayout();
    
    //Create page layouts.
    CreateWebViewLayout();
    CreateSettingsLayout();

    //Add top level layouts to app.
    app.AddLayout( layMain );
    app.AddLayout( panel );
    
    //Load the main page.
    curPage = layWebView;
    webView.LoadUrl( curUrl );
}

//Create the main page layout.
function CreateMainLayout()
{
    //Create main layout.
    layMain = app.CreateLayout( "Linear", "FillXY" );
    layMain.SetBackColor("#ff000000");
    
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX,Left,VCenter" );
    layHoriz.SetBackColor("#ff444444");
    layMain.AddChild( layHoriz );
    
    //Create menu icon.
    txtMenu = app.CreateText( "[fa-bars]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 0.05,0,0.05,0 );
    txtMenu.SetTextSize( 28 );
    txtMenu.SetOnTouchUp( txtMenu_OnTouch );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for message box.
    layMsg = app.CreateLayout( "Linear", "Horizontal" );
    layMsg.SetSize( 0.65,-1);
    layHoriz.AddChild( layMsg );
    
    //Create message box.
    txtMsg = app.CreateText( "Main Page", -1,-1, "Left" );
    txtMsg.SetMargins(0,0.01,0,0.01);
    txtMsg.SetTextSize( 26 );
    layMsg.AddChild( txtMsg );
    
    //Create search icon.
    txtSrch = app.CreateText( "[fa-search]", -1,-1, "FontAwesome" );
    txtSrch.SetPadding( 0.05,0,0.05,0 );
    txtSrch.SetTextSize( 28 );
    txtSrch.SetOnTouchUp( txtSrch_OnTouch );
    layHoriz.AddChild( txtSrch );

    //Create content layout.
    layContent = app.CreateLayout( "Frame", "VCenter,FillXY" );
    layMain.AddChild( layContent );
}    

//Create layout for sliding panel (menu).
function CreatePanelLayout()
{
    //Create sliding panel.
    panel = app.CreatePanel( "Left" );
    layPanel = panel.GetLayout();
    
    //Add a list box to panel.
    var listItems = "Home:[fa-home],Temp:[fa-line-chart],Settings:[fa-cog]";
    lstMenu = app.CreateList( listItems, 0.45, 1 );
    lstMenu.SetTextSize( 28 );
    lstMenu.SetBackColor( "#dd000000" );
    lstMenu.SetTextColor2( "#bbbbbb" );
    lstMenu.SetPadding( 0.01, 0.01, 0, 0 );
    lstMenu.SetOnTouch( lstMenu_OnTouch );
    layPanel.AddChild( lstMenu );
}

//Swap the main content pages.
function ChangePage( lay )
{
    //Set the current page.
    curPage = lay;
    
    //Fade out current content.
    if( layWebView.IsVisible() ) layWebView.Animate( "FadeOut",OnFadeOut,200 );
    if( laySettings.IsVisible() ) laySettings.Animate( "FadeOut",OnFadeOut,200 );
}

//Called when page has been faded out.
function OnFadeOut()
{
    //Load html if this page is the webview.
    if( curPage==layWebView ) webView.LoadUrl( curUrl );
    
    //Fade in new content.
    setTimeout( function(){curPage.Animate("FadeIn");}, 200 );
}

//Handle menu icon.
function txtMenu_OnTouch()
{
    panel.Slide();
}

//Handle menu panel item selection.
function lstMenu_OnTouch( item )
{
    if( item=="Home" ) {
       curUrl = "Main.html";
       ChangePage( layWebView );
       txtMsg.SetText( "Main Page" );
    }
    else if( item=="Temp" ) {
       curUrl = "Temperature.html";
       ChangePage( layWebView );
       txtMsg.SetText( "Temperature" );
    }
    else if( item=="Settings" ) {
        ChangePage( laySettings );
        txtMsg.SetText( "Settings" );
    }
    panel.Slide();
}

//Handle search icon.
function txtSrch_OnTouch()
{
    app.ShowPopup( "Todo" );
}



