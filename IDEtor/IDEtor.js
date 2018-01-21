////////////////////////////////////////////////////////////////
// IDEtor.js                                                  //
// Copyright 2016, created by Virtuos86 <virtuos86@yandex.ru> //
////////////////////////////////////////////////////////////////

app.LoadScript( "Settings.js" );
app.LoadScript( "Windows.js" );

function globalErrorHook ( message, url, lno ) {
	var dlg = errorInfoDlg;
	dlg.body.SetText( message + " in `" + url + "`\nLine: " + lno );
	dlg.Show();
	app.Wait( 5 );
}

////////////////////////////////////////////////////////////////////////////////

function log( data ) {
	app.WriteFile( "/sdcard/IDEtor.log", data + "\n\n", "Append")
}

function OnStart() {
	app.SetDebugEnabled( false );
	window.onerror = globalErrorHook;
	errorInfoDlg = createErrorInfoDlg();

	app.SetOrientation ( "Portrait" );
	app.SetScreenMode( "Game" );
	app.SetMenu( "About" );

	var isFromApk = ( app.GetAppPath() == "/Assets" );
	if( isFromApk )
		app.SetSharedApp( "IDEtor" );

    loadSettings();
	OnResume();

    FONT_SIZES = SETTINGS.ui.workarea.buffer.fsize.toString() + ",";
    for( var i=5; i < 51; i++ ) {
	    FONT_SIZES += i.toString() + ",";
    };
	SNIPPETS = SETTINGS.ui.snippets.list;
	try {
		var layout = ( !windows.all.length ?
		               createWindow( "?" ).layout :
		               currentWin().layout );
	} catch( err ) {
		var layout = createWindow( "?" ).layout;
	};
	app.AddLayout( layout );
	createUtils();
	createLayAbout();
}

function OnResume() {
	var paths = app.GetSharedFiles();
	if( paths === null ) {
		return;
	} else {
		for( i = 0; i < paths.length; i++ ) {
			try {
				var path = paths[i];
				createWindow( path );
			} catch( err ) {
				alert( "Oops!:\n	" + err );
			}
		};
	};
}

function OnMenu( item )
{
	switch( item ) {
		case "About":
			currentWin().layout.SetVisibility( "Hide" );
			windows.layAbout.SetVisibility( "Show" );
			break;
	}
}

// tab = 4
