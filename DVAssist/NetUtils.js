var LOGGED_IN = false;

var AUTH_URL = 'http://m.dimonvideo.ru/';
var THEME_URL = 'http://forum.dimonvideo.ru/forum/topic_1728149118/141/660#last'; 
var API_REQ_URL = 'http://api.dimonvideo.ru/smart/forumsapi.php?op=55&id=1728149118';
var API_REQ_URL1 = 'http://api.dimonvideo.ru/smart/forumsapi.php?op=6&id=1728149118&min=';

var HTTP_REQUEST = new XMLHttpRequest();

var PARAMS = {
    'login_name': null,
    'login_password': null,
    'login': 'submit',
    'auth': '1'
};

var BOUNDARY = String( Math.random() ).slice( 2 );
var BOUNDARY_MIDDLE = '--' + BOUNDARY + '\r\n';
var BOUNDARY_LAST = '--' + BOUNDARY + '--\r\n';

function log( string )
{
    app.WriteFile( "log.txt", string + "\n", "Append" );
};

function constructRequestString()
{
    var body = ['\r\n'];
    for ( var key in PARAMS )
    {
        body.push( 'Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + PARAMS[key] + '\r\n' );
    };
    body = body.join( BOUNDARY_MIDDLE ) + BOUNDARY_LAST;
    return body;
};

function setSomeHeaders( httpRequest )
{
    httpRequest.setRequestHeader( 'User-Agent', 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11' );
    httpRequest.setRequestHeader( 'Content-Type', 'multipart/form-data; boundary=' + BOUNDARY );
    httpRequest.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
};

function API( mn, callback, data )
{
    if( mn == 0 )
        HTTP_REQUEST.open( 'GET', API_REQ_URL, true )
    else if( mn == 1 )
    {
        HTTP_REQUEST.open( 'GET', API_REQ_URL1 + data, true );
    };
    var timeout = setTimeout( function() { HTTP_REQUEST.abort(); }, 30000 );
    setSomeHeaders( HTTP_REQUEST );
    HTTP_REQUEST.onreadystatechange = function() { clearTimeout( timeout ); callback( HTTP_REQUEST ); };
    HTTP_REQUEST.send( constructRequestString() );
};

function auth( username, password )
{
    PARAMS.login_name = username;
    PARAMS.login_password = password;
    HTTP_REQUEST.open( 'POST', AUTH_URL, false );
    setSomeHeaders( HTTP_REQUEST );
    HTTP_REQUEST.send( constructRequestString() );
    resp = HTTP_REQUEST.responseText;
    for( s in [
        "Good morning,  <a href='/0/name/",
        "Good afternoon,  <a href='/0/name/",
        "Good evening  <a href='/0/name/",
        " Goodnight <a href='/0/name/"] )
    {
        if( ~resp.indexOf( s ) )
        {
            LOGGED_IN = true;
            return true;
        };
    };
    return false;
};
