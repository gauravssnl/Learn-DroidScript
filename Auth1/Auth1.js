// Definition some constants
var USERNAME = "Virtuos86";
var PASSWORD = "*******";

// Here we try to replace `http` with` https`.
// This URL gives the number of unread notifications with the authorized user.
var COUNTER_URL = "https://www.linux.org.ru/notifications-count";
// URL for authorization
var AUTH_URL = "https://www.linux.org.ru//ajax_login_process/";
// Url the main page; with it we rip out the CSRF-token and, in theory, should start the session.
var MAIN_URL = "http://linux.org.ru";

// This shit will follow the links.
var HTTP_REQUEST = new XMLHttpRequest();

/////////////////////

// Set all necessary headers for the request at once.
function setSomeHeaders( httpRequest )
{
    httpRequest.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.setRequestHeader ('Accept', "application/json");
};

/// Code example from DroidScript, which turned out to be useful.
// Handle the server's reply (a json object). 
function HandleReply( httpRequest ) 
{ 
    if( httpRequest.readyState==4 ) 
    { 
        //If we got a valid response. 
        if( httpRequest.status==200 ) 
        { 
            txt.SetText( "Response: " + httpRequest.status + httpRequest.responseText); 
        } 
        // An error occurred 
        else 
            txt.SetText( "Error: " + httpRequest.status + httpRequest.responseText); 
    } 
    app.HideProgress();
    /// Here we look at the list of response headers and hope to find cookies there.
    alert( httpRequest.getAllResponseHeaders() );
};


function OnStart() 
{ 
    //Create a layout with objects vertically centered. 
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );     

    //Create an text edit box for postcode entry.
    edt = app.CreateTextEdit( "CB1", 0.8 );
    lay.AddChild( edt );  

    //Create a button to send request.
    btn = app.CreateButton( "Get Places", 0.3, 0.1 ); 
    btn.SetMargins( 0, 0.05, 0, 0 );  
    btn.SetOnTouch( btn_OnTouch );
    lay.AddChild( btn );  

    //Create a text label to show results. 
    txt = app.CreateText( "", 0.8, 0.6, "Left,Multiline" );  
    txt.SetBackColor( "#ff222222" );  
    txt.SetTextSize( 12 ); 
    lay.AddChild( txt ); 
     
    //Add layout to app.     
    app.AddLayout( lay ); 

    // We are authorized..
    auth();
    // Just in case we close the connection, this is for debugging time.
    HTTP_REQUEST.abort();
};

// // The code of the example from DroidScript, which turned out to be useless, well, and figs with it - let it be.
//Handle button press. 
function btn_OnTouch()  
{  
    //Send request to remote server. 
    var postCode = edt.GetText(); 
    var url = "http://api.geonames.org/postalCodeLookupJSON?" 
    + "postalcode=" + postCode + "&country=UK&username=androidscript"; 
    SendRequest( url  ); 
} 

//Send an http get request. 
function SendRequest( url ) 
{

    HTTP_REQUEST.open("GET", url, true); 
    HTTP_REQUEST.send(null); 
     
    app.ShowProgress( "Loading..." ); 
};

// In general, this is a crutch, because the token and so should be given in the cookies, but they, pancake, no!
function getCsrf()
{
    // // We make a synchronous request (`false`).
    HTTP_REQUEST.open( "GET", MAIN_URL, false);
    setSomeHeaders( HTTP_REQUEST );
    HTTP_REQUEST.onreadystatechange = function() {};
    HTTP_REQUEST.send( null );
    var resp = HTTP_REQUEST.responseText;
    var marker = 'name="csrf" value="';
    var start = resp.indexOf( marker ) + marker.length;
    var stop = start + resp.slice(start, start + 42).indexOf('">');
    var csrf_token = resp.slice( start, stop );
    return csrf_token;
};

function auth()
{
    HTTP_REQUEST.open( "POST", AUTH_URL, false );
    setSomeHeaders( HTTP_REQUEST );
    HTTP_REQUEST.onreadystatechange = function() { HandleReply(HTTP_REQUEST); };
    HTTP_REQUEST.send( PARAMS );
    // In general, here is given a json-object, with the user name and flag, with successful authorization, but it will do so.
    if( HTTP_REQUEST.responseText.substr( 0, 1 ) == "{" )
    {
   	     return true;
    }
    else 
        return false;
};

var PARAMS = {
    'nick': encodeURIComponent( USERNAME ), 
    'passwd': encodeURIComponent( PASSWORD ), 
    'csrf': encodeURIComponent( getCsrf() )
};
