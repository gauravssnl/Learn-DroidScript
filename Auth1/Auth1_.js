// Definition some constants
var USERNAME = "Virtuos86";
var PASSWORD = "*******";

// Здесь пробуем заменить `http` на `https`. 
// Этот урл отдает при авторизованном пользователе количество непрочитанных уведомлений.
var COUNTER_URL = "https://www.linux.org.ru/notifications-count";
// Урл для авторизации.
var AUTH_URL = "https://www.linux.org.ru//ajax_login_process/";
// Урл главной странице; с нее выдираем CSRF-токен и, по идее, должны начинать сессию.
var MAIN_URL = "http://linux.org.ru";

// Этот говнюк будет ходить по ссылкам.
var HTTP_REQUEST = new XMLHttpRequest();

/////////////////////

// Устанавливаем разом все необходимые заголовки для запроса.
function setSomeHeaders( httpRequest )
{
    httpRequest.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.setRequestHeader ('Accept', "application/json");
};

// Код примера из DroidScript, который оказался полезен.
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
    // Здесь смотрим список заголовков ответа и надеемся найти там куки.
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

    // Авторизуемся.
    auth();
    // На всякий случай закрываем соединение, это на время отладки.
    HTTP_REQUEST.abort();
};

// // Код примера из DroidScript, который оказался бесполезен, ну да и фиг с ним — пусть будет.
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

// Вообще это костыль, потому что токен и так должен отдаваться в куках, но их, блин, нет!
function getCsrf()
{
    // Делаем синхронный запрос (`false`).
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
    // Вообще здесь отдается json-объект, с именем пользователя и флагом, при успешной авторизации, но и так сгодится.
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
