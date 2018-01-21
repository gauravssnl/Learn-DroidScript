/*
    Useful utils of the proect.
*/

var CRYPT = app.CreateCrypt();
var SETTINGS_PATH;
if( app.GetAppPath() == "/Assets" )
    SETTINGS_PATH = "/data/data/ru.dimonvideo.virtuos86.dvassist/shared_prefs/Settings.json"
else
    SETTINGS_PATH = "Settings.json";

var INTERVALS = {
    "1 hour": 3600000,
    "2 hour": 7200000,
    "3 hour": 10800000,
    "30 min": 1800000,
    "15 min": 900000,
    "5 min": 300000,
    "1 min": 60000
};

function log( string )
{
    app.WriteFile( "log.txt", string + "\n", "Append" );
};

function loadSettings()
{
	if( !app.FileExists( SETTINGS_PATH ) )
	{
		 app.WriteFile(
            SETTINGS_PATH,
            JSON.stringify(
                {
                    "login_name": "",
                    "login_password": "",
                    "autoboot": false,
                    "refreshAfter": "30 min",
                    "dv": {
                        "posts": "679",
                        "last_post": "1451960526" ,
                        "last_poster_name": "Virtuos86"
                    }
                }
            )
        );
	};
    var settings = JSON.parse( app.ReadFile( SETTINGS_PATH ) );
    if( settings.login_password != '' )
        settings.login_password = CRYPT.Decrypt(  settings.login_password, settings.login_name );
    return settings;
};

function storeSettings( settings )
{
    var settings = JSON.parse( JSON.stringify( settings ) );
    settings.login_password = CRYPT.Encrypt( settings.login_password ); 
    app.WriteFile( SETTINGS_PATH, JSON.stringify( settings ) );
};
