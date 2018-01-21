/*
    All file I/O is here.
*/

const hello_world_programm = '// Эта строка является комментарием и она будет проигнорирована компилятором\n\n// Это главная функция. С неё начинается исполнение любой программы\nfn main() {\n    // Следующий код будет исполнен в момент, когда будет запущен исполняемый файл\n    // Отображаем текст в консоли\n    println!("Привет, мир!");\n}';

const DEFAULT_SETTINGS = {
    "last": "hello_world.rs",
    "version": "beta",
    "optimize": 0,
    "mode": "debug",
    "channel": "stable",
    "host_url": "https://play.integer32.com/"
};

var SETTINGS_PATH;
if( app.GetAppPath() == "/Assets" ) {
    SETTINGS_PATH = "/data/data/ru.org.linux.virtuos86/shared_prefs/Settings.json";
} else {
    SETTINGS_PATH = "Settings.json";
};

function log ( string ) {
    app.WriteFile( "log.txt", string + "\n", "Append" );
};

function loadSettings () {
	if( !app.FileExists( SETTINGS_PATH ) ) {
		 app.WriteFile(
            SETTINGS_PATH,
            json( DEFAULT_SETTINGS )
        );
	};
    var settings = JSON.parse( app.ReadFile( SETTINGS_PATH ) );
    if(typeof settings.host_url === "undefined") settings.host_url = DEFAULT_SETTINGS.host_url;
    return settings;
};

function storeSettings () {
    var s = JSON.parse( json( settings ) );
    app.WriteFile( SETTINGS_PATH, json( s ) );
};
