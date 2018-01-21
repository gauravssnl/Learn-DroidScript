////////////////////////////////////////////////////////////////////////////////
// Settings.js                                                                //
////////////////////////////////////////////////////////////////////////////////

var S_VERSION = 0.13;
var SETTINGS;
var SETTINGS_PATH = (
    app.GetAppPath() == "/Assets" ?
    "/data/data/ru.dimonvideo.virtuos86.idetor/shared_prefs/Settings.json" :
    "Settings.json"
);


function loadDefaultSettings () {
	return {
	    "version": S_VERSION,
		"ui": {
			"snippets": {
				"width": 1,
				"height": 0.06,
				"fg": "#000000",
				"bg": "#00ADBEEF",
				"list": [
					"()", "[]", "{}", "→", '""', "''", ";", "=", "//"
				]
			},

			"workarea": {
				"width": 1,
				"height": 0.84,
				"buffer": {
					"fg": "#3A0000",
					"fsize": 25,
					"bg": "#FFFFFF",
					"curcol": "#007A00"
				},
				"toolspane": {
				    "border": 0.05,
				    "width": 0.5,
				    "sep": {
					    "width": 0.1
				    },
				    "pane": {
				        "width": 0.9,
		    		    "filelist": {
			        		"width": 0.5,
				         	"height": -1,
				    	    "fg": "#FFFF00"
				         },
    				    "fileops": {
	    				    "width": 0.2,
		    			    "height": -1,
			    		    "fg": "#FFFF00"
				        },
    				    "fontsizelist": {
    				        "length": 50,
	    				    "width": 0.15,
		    			    "height": -1,
			    		    "fg": "#FFFF00"
				        },
				        "fontsizedimension": [
				            "sp", "dp", "px", "pt", "mm"
				        ],
    				    "funclist": {
	    				    "width": 0.5,
		    			    "height": -1,
			    		    "fg": "#FFFF00"
				        }
				    }
				}
			},
			"firstbar": {
				"width": 1,
				"height": 0.05,
				"bg": "#777777"
			},
			"secondbar": {
				"width": 1,
				"height": 0.05,
				"bg": "#777777"
			}
		}
	};
}

function loadSettings () {
	if( !app.FileExists( SETTINGS_PATH ) ) {
		app.WriteFile( SETTINGS_PATH, JSON.stringify( loadDefaultSettings(), null, 4 ) );
	};
	try {
		var settings = JSON.parse( app.ReadFile( SETTINGS_PATH ) );
	} catch( err ) {
		app.ShowPopup( ["Oops! Error loading settings:\n	",
		                err,
		                "\nUsed default parameters."].join( "" ) );
		var settings = loadDefaultSettings();
	};
	if( settings.version != S_VERSION )
	    SETTINGS = loadDefaultSettings();
	else
	    SETTINGS = settings;
	return settings;
};

function storeSettings ( settings ) {
    var s = JSON.stringify( SETTINGS, null, 4 );
    var settings = JSON.parse( s );
    app.WriteFile( SETTINGS_PATH, s );
};
