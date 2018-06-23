
//Create layout for webview.
function CreateWebViewLayout()
{
    //Create layout for install controls (initially hidden).
    layWebView = app.CreateLayout( "Linear", "FillXY,VCenter" );
    layContent.AddChild( layWebView );
  
    //Create a web control to show guage.
	webView = app.CreateWebView( -1,-1, "FillXY" );
	layWebView.AddChild( webView );
}
