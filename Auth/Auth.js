// Definition some constants
var USERNAME = "dimq44";
var PASSWORD = "";

// Здесь пробуем заменить `http` на `https`. 
// Этот урл отдает при авторизованном пользователе количество непрочитанных уведомлений.
var COUNTER_URL = "https://www.linux.org.ru/notifications-count";
// Урл для авторизации.
var AUTH_URL = "https://www.linux.org.ru//ajax_login_process/";
// Урл главной странице; с нее выдираем CSRF-токен и, по идее, должны начинать сессию.
var MAIN_URL = "http://linux.org.ru";

// Этот говнюк будет ходить по ссылкам.
var HTTP_REQUEST = new XMLHttpRequest();

var PARAMS = {
    'nick': USERNAME, 
    'passwd': PASSWORD, 
    'csrf': getCsrf()
};

// уникальный разделитель для multipart form data:
var boundary = String(Math.random()).slice(2);
var boundaryMiddle = '--' + boundary + '\r\n';
var boundaryLast = '--' + boundary + '--\r\n'
var body = ['\r\n'];
for (var key in PARAMS) {
    body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + PARAMS[key] + '\r\n');
}
body = body.join(boundaryMiddle) + boundaryLast;


/////////////////////

// Устанавливаем разом все необходимые заголовки для запроса.
function setSomeHeaders( httpRequest )
{
    HTTP_REQUEST.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
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
            app.Alert( "Response: " + httpRequest.status + httpRequest.responseText, "Ответ:"); 
        } 
        // An error occurred 
        else 
            alert( "Error: " + httpRequest.status + httpRequest.responseText); 
    } 
    // Здесь смотрим список заголовков ответа и надеемся найти там куки.
    app.Alert( httpRequest.getAllResponseHeaders() , "headers:");
};


function OnStart() 
{ 
    // Авторизуемся.
    auth();
    // На всякий случай закрываем соединение, это на время отладки.
    HTTP_REQUEST.abort();
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
    HTTP_REQUEST.send( body );
    // Вообще здесь отдается json-объект, с именем пользователя и флагом, при успешной авторизации, но и так сгодится.
    if( HTTP_REQUEST.responseText.substr( 0, 1 ) == "{" )
    {
   	     return true;
    }
    else 
        return false;
};

