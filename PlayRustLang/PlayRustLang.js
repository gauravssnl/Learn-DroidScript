//"use strict";

//app.LoadPlugin( "UIExtras" );

app.LoadScript( "tabs.js" );
app.LoadScript( "File-IO.js" );
app.LoadScript( "Net-IO.js" );

const APP_NAME = "PlayRustLang";
var APP_PATH = "/sdcard/" + APP_NAME;

var curFile;

function json(obj) {
    return JSON.stringify(obj, null, 2);
}

function isValidFileName( str ) {
    return !/[/`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test( str ) && str!=APP_NAME;
};

function OnStart() {
    if( !app.FolderExists( APP_PATH ) ) {
        app.MakeFolder( APP_PATH );
        app.WriteFile( APP_PATH + "/hello_world.rs", hello_world_programm );
    };
    app.SetOrientation( "Auto" );
    CreateTheme();

    settings = loadSettings();
    if( settings.last ) {
        curFile = settings.last;
    };
	layMain = app.CreateLayout( "Absolute", "FillXY" );
	layMain.SetBackColor( "#aa0000" );

    //uix = app.CreateUIExtras();
    //layFab = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
    //btnRun = uix.CreateFAButton( "[fa-play]" );
    //btnRun.SetMargins( 0.02, 0.01, 0.02, 0.01 );
    //btnRun.SetButtonColors( "#db4437", "#c33d32" );
    //btnRun.SetOnTouch( runSource );
    //layFab.AddChild( btnRun );

    CreateActionBar();
	  CreateBody();
	  CreateDrawer();
    ShowFiles();
    CreateUtilsDrawer();

   	app.AddLayout( layMain );
    //app.AddLayout( layFab );
    app.AddDrawer( drawerScroll, "Left", drawerWidth );
    app.AddDrawer( utilsScroll, "Right", utilsWidth );
    app.SetOnShowKeyboard( OnShowKeyBoard );

    app.EnableBackKey( false );
    
    layInfo = app.CreateLayout( "Linear" );
    app.AddLayout( layInfo );
    layInfo.SetVisibility( "Hide" );
    infoScroller = app.CreateScroller( 1, 1 );
    layInfo.AddChild( infoScroller );
    txtInfo = app.CreateText( "", 1, -1, "Left,Multiline" );
    infoScroller.AddChild( txtInfo );
    txtInfo.SetFontFile( "Misc/UbuntuMono-B.ttf" );
    txtInfo.SetTextSize( 25, "px" );
    txtInfo.SetTextColor( "#000000" );
    txtInfo.SetTextShadow( 0.1, 0.1, 0.1, "#da0000" );
};
   
function OnBack() {
    if( layInfo.GetVisibility() == "Show" ) {
        layInfo.SetVisibility( "Hide" );
        layMain.SetVisibility( "Show" );
    } else if( bodyScroll.GetScrollY() > 0 ) {
        txtOutputBuffer.SetText( "" );
        bodyScroll.ScrollTo( 0, 0 );
    } else {
        var yesNo = app.CreateYesNoDialog( "Exit?" );
    	yesNo.SetOnTouch( function(result){ if(result=="Yes") app.Exit()} );
    	yesNo.Show();
    }
};

function OnShowKeyBoard( p ) {return;
    if( p ) {
        var kbdHeight = app.GetKeyboardHeight() / app.GetScreenHeight();
        layHoriz.SetPosition( 0, 0, 1, 0 );
        bodyScroll.SetPosition( 0, 0, 1, bodyHeight );
        //laySourceBuffer.SetPosition( 0, 0, 1, 1 - kbdHeight );console.log(2);
        //layOutputBuffer.SetPosition( 0, 1 - kbdHeight, 1, bodyHeight + kbdHeight );console.log(3);
        //txtNumPane.SetSize( 0.1, 1 - kbdHeight - 0.01 );
        //txtSourceBuffer.SetSize( 0.9, 1 - kbdHeight - 0.01 );
    } else {
        layHoriz.SetPosition( 0, 0, 1, 0.075 );
        bodyScroll.SetPosition( 0, 0.075, 1, bodyHeight );
        //laySourceBuffer.SetPosition( 0, 0, 1, bodyHeight );
        //layOutputBuffer.SetPosition( 0, bodyHeight, 1, bodyHeight );
        //txtNumPane.SetSize( 0.1, bodyHeight );
        //txtSourceBuffer.SetSize( 0.9, bodyHeight );
    };
};

function CreateTheme() {
    theme = app.CreateTheme( "Dark" );
    theme.AdjustColor( 35, 0, -10 );
    theme.SetBackColor( "#777777" );
    theme.SetBtnTextColor( "#000000" );
    theme.SetButtonOptions( "custom" );
    theme.SetButtonStyle( "#fafafa", "#fafafa", 5, "#999999", 0, 1, "#ff9000" );
    theme.SetCheckBoxOptions( "dark" );
    theme.SetTextEditOptions( "underline" );
    theme.SetDialogColor( "#770000" );
    theme.SetDialogBtnColor( "#eeeeee" );
    theme.SetDialogBtnTxtColor( "#000000" );
    theme.SetTitleHeight( 42 );
    theme.SetTitleColor( "#ff888888" ); 
    theme.SetTitleDividerColor( "#ff0099CC" );
    theme.SetTextColor( "#ffffff" );
    app.SetTheme( theme );
};

function CreateSep( width ) {
    var sep = app.CreateImage( null, width, 0.001, "fix", 2, 2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#cccccc" );
    return sep;
};

function CreateActionBar() {
    layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX" );
    layMain.AddChild( layHoriz );
    layHoriz.SetBackColor( "#770000" );
    layHoriz.SetPosition( 0, 0, 1, 0.075 );

    txtMenu = app.CreateText( "[fa-bars]", -1, -1, "FontAwesome" );
    layHoriz.AddChild( txtMenu );
    txtMenu.SetSize( 0.1 );
    txtMenu.SetPadding( 12, 10, 12, 10, "dip" );
    txtMenu.SetTextSize( 22 );
    txtMenu.SetTextColor( "#eeeeee" );
    txtMenu.SetOnTouchUp( function () {app.HideKeyboard();app.OpenDrawer()} );

    layBarTitle = app.CreateLayout( "Linear", "Horizontal,Left" );
    layHoriz.AddChild( layBarTitle );
    layBarTitle.SetSize( 0.4 );
    
    txtBarTitle = app.CreateText( "PlayRustLang", -1, -1, "Monospace" );
    layBarTitle.AddChild( txtBarTitle );
    txtBarTitle.SetFontFile( "Misc/UbuntuMono-B.ttf" );
    txtBarTitle.SetMargins( 0, 10, 0, 0, "dip" );
    txtBarTitle.SetTextSize( 25 );
    txtBarTitle.SetTextColor( "#ffffff" );

    layBarBtns = app.CreateLayout( "Linear", "Horizontal,FillXY,Right" );
    layHoriz.AddChild( layBarBtns );
    layBarBtns.SetSize( 0.5 );

    btnRun = app.CreateText( "[fa-play]", -1, -1, "FontAwesome" );
    layBarBtns.AddChild( btnRun );
    btnRun.SetPadding( 12, 10, 12, 10, "dip" );
    btnRun.SetTextSize( 22 );
    btnRun.SetTextColor( "#eeeeee" );
    btnRun.SetOnTouchUp( runSource );
    btnRun.SetOnLongTouch( function() {app.ShowPopup("Run code")} );

    btnFormat = app.CreateText( "[fa-arrows-h]", -1, -1, "FontAwesome" );
    layBarBtns.AddChild( btnFormat );
    btnFormat.SetPadding( 12, 10, 12, 10, "dip" );
    btnFormat.SetTextSize( 22 );
    btnFormat.SetTextColor( "#eeeeee" );
    btnFormat.SetOnTouchUp( formatSource );
    btnFormat.SetOnLongTouch( function() {app.ShowPopup("Format code")} );

    btnSave = app.CreateText( "[fa-save]", -1, -1, "FontAwesome" );
    layBarBtns.AddChild( btnSave );
    btnSave.SetPadding( 12, 10, 12, 10, "dip" );
    btnSave.SetTextSize( 22 );
    btnSave.SetTextColor( "#eeeeee" );
    btnSave.SetOnTouchUp( saveFile );
    btnSave.SetOnLongTouch( function() {app.ShowPopup("Save file")} );

    utilMenu = app.CreateText( "[fa-cog]", -1, -1, "FontAwesome" );
    layBarBtns.AddChild( utilMenu );
    utilMenu.SetPadding( 12, 10, 12, 10, "dip" );
    utilMenu.SetTextSize( 22 );
    utilMenu.SetTextColor( "#eeeeee" );
    utilMenu.SetOnTouchUp( function () {app.HideKeyboard();app.OpenDrawer('Right')} );
    utilMenu.SetOnLongTouch( function() {app.ShowPopup("Right drawer")} );
};

function CreateBody() {
    bodyHeight = 0.925;
    layBody = _Tabs("Input,Output", 1, bodyHeight);
    layMain.AddChild( layBody );
    layBody.SetPosition( 0, 0.075, 1, bodyHeight );
    layBody.SetBackColor( "#ffffff" );

    //edtScroll = app.CreateScroller( 1, bodyHeight );
    //layBody.AddChild( edtScroll );

    input = layBody.GetLayout("Input");
    bodyScroll = app.CreateScroller( 1, bodyHeight );
    input.AddChild( bodyScroll );
    //bodyScroll.SetPosition( 0, 0, 1, bodyHeight );

    laySourceBuffer = app.CreateLayout( "Linear", 1, 1, "Horizontal,FillXY" );
    //edtScroll.AddChild( bodyScroll );
    bodyScroll.AddChild( laySourceBuffer );
    //laySourceBuffer.SetPosition( 0, 0, 1, bodyHeight );
    laySourceBuffer.SetBackColor( "#dddddd" );
    //laySourceBuffer.SetPadding( 0.01, 0.01, 0.01, 0.01 );
    
    /*txtNumPane = app.CreateText( "", 0, bodyHeight, "Monospace,Multiline" );
    laySourceBuffer.AddChild( txtNumPane );
    txtNumPane.SetTextSize( 25, "px" );
    txtNumPane.SetBackColor( "#dddddd" );

    sep = app.CreateImage( null, 0.001, bodyHeight, "fix", 2, 2 );
    laySourceBuffer.AddChild( sep );
    sep.SetSize( 1, -1, "px" );
    sep.SetColor( "#cc0000" );
*/
    txtSourceBuffer = app.CreateTextEdit( "", 1, -1, "Monospace" );
    laySourceBuffer.AddChild( txtSourceBuffer );
    txtSourceBuffer.SetHint( "Type here!" );
    txtSourceBuffer.GetLineCount = function() {
        return this.GetText().split( "\n" ).length;
    };
    //txtSourceBuffer.SetNavigationMethod("Touch");
    txtSourceBuffer.SetOnChange( onSourceBufferChange );
    //txtSourceBuffer.SetOnTouch( updateNumPane );
    txtSourceBuffer.SetCursorColor( "#000000" );
    txtSourceBuffer.SetBackColor( "#ffffff" );
    txtSourceBuffer.SetTextSize( 25, "px" );
    txtSourceBuffer.SetTextColor( "#aa0000" );

    output = layBody.GetLayout("Output");
    outputScroll = app.CreateScroller( 1, bodyHeight );
    output.AddChild( outputScroll );
    //outputScroll.SetPosition( 0, bodyHeight, 1, bodyHeight );
    layOutputBuffer = app.CreateLayout( "Linear", 1, -1, "FillXY" );
    outputScroll.AddChild( layOutputBuffer );
    //layOutputBuffer.SetPosition( 0, bodyHeight, 1, bodyHeight );
    txtOutputBuffer = app.CreateTextEdit( "See an output here!", 1, -1, "Monospace,Multiline,Html,Left" );
    layOutputBuffer.AddChild( txtOutputBuffer );
    //txtOutputBuffer.SetFontFile( "Misc/UbuntuMono-B.ttf" )
    txtOutputBuffer.SetTextSize( 20 );
    txtOutputBuffer.SetBackColor( "ffffff" );
    txtOutputBuffer.SetTextColor( "#000000" );
    if( settings.last ) {
        newFileDlg( curFile );
    };
};

function CalcNumPaneWidth( n ) {
    // Передаем количество колонок в панели, получаем минимальную достаточную ширину панели.
    for( var i=0, testString=""; i<n; i++ ) {
        testString += "9";
    };
    var layLbl = app.CreateLayout( "Absolute" );
    layLbl.SetVisibility( "Hide" );
    var lbl = app.CreateText( testString );
    lbl.SetTextSize( 25, "px" );
    layLbl.AddChild( lbl );
    app.AddLayout( layLbl );
    app.Wait( 0.05 );
    var width = lbl.GetWidth();
    app.RemoveLayout( layLbl );
    app.DestroyLayout( layLbl );
    return width;
};

function updateNumPane() {return;
    var buffer = txtSourceBuffer;
    var lineCount = buffer.GetLineCount();
    var lineNumber = buffer.GetCursorLine();
    var width = CalcNumPaneWidth( lineCount.toString().length );
    buffer.SetSize( 1 - width );
    txtNumPane.SetSize( width, buffer.GetHeight() );
    var html = "<html><body>";
    for( var i=1; i<=lineCount; i++ ) {
        if( i == lineNumber + 1 )
            html += '<a bgcolor="#FF0000"><font color="#DD0000">' + i + "</font></a>" + "<br />"+"\n";
        else
            html += '<a bgcolor="#FF0000"><font color="#000000">' + i + "</font></a>" + "<br>"+"\n";
    };
    html += "</body></html>";
    txtNumPane.SetHtml( html );
};

//Called when a drawer is opened or closed.
function OnDrawer( side, state ) {
    console.log( side + " : " + state );
    if( state == "Open" )
        app.HideKeyboard();
};

function CreateDrawer() {
	drawerWidth = 0.75;
    drawerScroll = app.CreateScroller( drawerWidth, 1 );
    drawerScroll.SetBackColor( "#993000" );
	layDrawer = app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	layDrawer.SetOnTouchDown( function () {app.CloseDrawer( "Left" );} );

	//layDrawerTop = app.CreateLayout( "Linear", "Left" );
	//layDrawerTop.SetBackground( "Img/PlayRustLang.png" );
	//layDrawerTop.SetSize( drawerWidth );
	//layDrawer.AddChild( layDrawerTop );

	var txtName = app.CreateText( "PlayRustLang", -1, -1, "Bold");
	txtName.SetMargins( 0.04, 0.01, 0.02, 0.02 );
	txtName.SetTextColor( "#ffffff" );
	txtName.SetTextSize( 17 );
	layDrawer.AddChild( txtName );
	
	var layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	
    //Add a list to menu layout (with the menu style option).
    var listItems = "Start::[fa-home],About::[fa-question-circle],Provided crates::[fa-list],New File::[fa-plus]";
    lstMenuMain = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenuMain.SetTextColor( "#ffcccc" );
    lstMenuMain.SetHiTextColor1("#00ff00");
    lstMenuMain.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenuMain.SelectItemByIndex( 0, true );
    lstMenuMain.SetItemByIndex( 0, "Start" );
    lstMenuMain.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenuMain );
    curMenuList = lstMenuMain;
    
    layMenu.AddChild( CreateSep( drawerWidth ) );
    
    //Add title between menus.
	txtTitle = app.CreateText( "Files",-1,-1,"Left");
	txtTitle.SetTextColor( "#666666" );
	txtTitle.SetMargins( 16,12,0,0, "dip" );
	txtTitle.SetTextSize( 14, "dip" );
	layMenu.AddChild( txtTitle );
	
    //Add a second list to menu layout.
    lstMenuFiles = app.CreateList( "", drawerWidth,-1, "Menu,Expand" );
    lstMenuFiles.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenuFiles.SetIconSize( 24, "dip" );
    lstMenuFiles.SetOnTouch( newFileDlg );
    lstMenuFiles.SetOnLongTouch( lstFiles_OnLongTouch );
    layMenu.AddChild( lstMenuFiles );
};

function lstMenu_OnTouch( title, body, type, index ) {
    if( title == "Start" ) {
    } else if( title == "About" ) {
        app.ShowPopup( "Hardcoded by Virtuos86, 2017" );
    } else if( title == "Provided crates" ) {
        openProvidedCratesList();
    } else if( title == "New File" ) { 
        app.ShowTextDialog( 'File Name (w/o ".rs")', "", OnAdd );
    };
    
    app.CloseDrawer( "Left" );
};

function openProvidedCratesList() {
    layMain.SetVisibility( "Hide" );
    layInfo.SetVisibility( "Show" );
    if( txtInfo.GetText().length == 0 ) {
        app.ShowProgress( "Loading..." );
        try {
            app.HttpRequest(
                "get",
                "https://raw.githubusercontent.com",
                "/integer32llc/rust-playground/master/compiler/base/Cargo.toml",
                "",
                function( error, response ) {
                    var start = "[dependencies]\n";
                    if( ~response.indexOf( start ) ) {
                        response = response.slice( response.indexOf( start ) + start.length );
                    } else {};
                    txtInfo.SetBackColor( "#ffffff" );
                    txtInfo.SetText( response );
                    app.HideProgress();
                }
            );
        } catch(err) {
            app.HideProgress();
            alert( "Sorry, information is not available:\n" + err );
        };
        
    };
};

function newFileDlg( title, body, type, index ) {
    txtBarTitle.SetText( title );
    var file = APP_PATH + "/" + title;
    var source = app.ReadFile( file );
    //if( source.slice(-3) !== "\n\n\n" ) {
    //    source += "\n\n\n";
    //}
    txtSourceBuffer.SetText( source );
    app.CloseDrawer( "Left" );
    settings.last = title;
    storeSettings(); 
};

function saveFile() {
    var file = APP_PATH + "/" + txtBarTitle.GetText();
    app.WriteFile( file, txtSourceBuffer.GetText() );
    app.Vibrate( "0,100" );
    app.ShowPopup( "OK" ); 
};
////////////////////////////////////////////////////////////////////////////////

function lstFiles_OnLongTouch( title, body, type, index ) {
    //Show options dialog.
    curFile = title;
    var sOps = "Rename,Delete" 
    if( typeof lstOps == "undefined" ) {
        lstOps = app.CreateListDialog( "Actions", sOps, "AutoCancel" );
    };
    lstOps.SetOnTouch( lstOps_Select ); 
    lstOps.Show();
};

//Handle menu item selection.
function lstOps_Select( item ) {
    if( item == "Delete" ) {
        var msg = "Are you sure you want to delete '" + curFile + "'?"
        yesNo = app.CreateYesNoDialog( msg );
        yesNo.SetOnTouch( yesNoDelete_OnTouch );
        yesNo.Show();
    } else if( item=="Rename" ) {
        app.ShowTextDialog( "Rename Program", curFile, OnRename );
    };
};

//Handle delete 'are you sure' dialog.
function yesNoDelete_OnTouch( result ) {alert("Unimplemented!");return;
    if( result == "Yes" ) {
        //Delete the file and refresh list.
        app.DeleteFolder( APP_PATH + "/" + curFile );
        ShowFiles();
    };
};

//Called after user enters renamed program.
function OnRename( name ) {
    //Check up name.
	if( !isValidFileName( name ) ) {
		alert( "Name contains invalid characters!" );
		app.ShowTextDialog( "Rename Program", curFile, OnRename );
		return;
	};
	
    //Check if already exists.
    var newfile = APP_PATH + "/" + name;
    if( app.FileExists( newfile ) ) {
        app.Alert( "File already exists!" );
    }  else {
        //Rename the .rs data file.
        var oldfile = APP_PATH + "/" + curFile;
        if( app.FileExists( oldfile ) ) app.RenameFile( oldfile, newfile );
        ShowFiles();
    };
};

//Called after user enters new file name.
function OnAdd( name, type ) {
	//Check up name.
	if( !isValidFileName( name ) ) {
		alert( "Name contains invalid characters!" );
		app.ShowTextDialog( "File Name", "", OnAdd );
		return;
	};
    var file = APP_PATH + "/" + name + ".rs";
    if( app.FileExists( file ) ) {
        app.Alert( "File already exists!" );
    } else {
        app.WriteFile( file, "" );
        ShowFiles();
    };
    app.CloseDrawer( "Left" );
    newFileDlg( name + ".rs" );
};

//Get user files list.
function GetFileList() {    
    var fileList = "";
    var list = app.ListFolder( APP_PATH, ".rs", 0, "alphasort" );
    for( var i=0; i<list.length; i++ ) {
        if( app.FileExists( APP_PATH+"/"+list[i] ) ) {
            if( fileList.length>0 ) fileList += ",";
            fileList += list[i];
        };
    };
    return fileList;
};

//Update menus to show list of file.
function ShowFiles() {
    //Get list of user's file.
    var fileList = GetFileList().split( "," );
    
    //Create a menu item for each file.
    var  list = "";
    for( var i=0; i<fileList.length && fileList[0]!=""; i++ ) {
        if( list.length>0 ) list += ",";
        list += fileList[i] + "::[fa-file]";
    };
    lstMenuFiles.SetList( list );
};



////////////////////////////////////////////////////////////////////////////////

function CreateUtilsDrawer() {
	utilsWidth = 0.75;
    utilsScroll = app.CreateScroller( utilsWidth, 1 );
    utilsScroll.SetBackColor( "#993000" );
	layUtilsDrawer = app.CreateLayout( "Linear", "Bottom,Center" );
	utilsScroll.AddChild( layUtilsDrawer );
	layUtilsDrawer.SetOnTouchDown( function () {app.CloseDrawer( "Right" );} );
	
	layHost = app.CreateLayout( "Linear", "Horizontal,FillXY,Center" );
	layHost.SetMargins( 0, 0.04, 0, 0.02 );
	var txtHost = app.CreateText( "Host", 0.25, -1 );
	layHost.AddChild( txtHost );
	txtHost.SetFontFile( "Misc/UbuntuMono-B.ttf" );
	txtHost.SetTextSize( 20, "px" );
  var host = settings.host_url;
  var hosts = [PREFIX1, PREFIX2];
  if(hosts[0] != host) hosts.push(hosts.pop(0));
	hosts = hosts.join(",");
	hosts = app.CreateSpinner( hosts, 0.5, -1 );
	hosts.SetOnChange( function (host) {settings.host_url=host;storeSettings()} );
	layHost.AddChild( hosts );
	layUtilsDrawer.AddChild( layHost );
	
	layMode = app.CreateLayout( "Linear", "Horizontal,FillXY,Center" );
	layMode.SetMargins( 0, 0.04, 0, 0.02 );
	var txtMode = app.CreateText( "Mode", 0.25, -1 );
	layMode.AddChild( txtMode );
	txtMode.SetFontFile( "Misc/UbuntuMono-B.ttf" );
	txtMode.SetTextSize( 20, "px" );
	if( settings.mode == "debug" ) {
	    var modes = "debug,release";
    } else if( settings.mode == "release" ) {
	    var modes = "release,debug";
    } else {alert("Invalid value of the parameter `mode` in Settings: " + settings.mode + "!");};
	modes = app.CreateSpinner( modes, 0.5, -1 );
	modes.SetOnChange( function (mode) {settings.mode=mode;storeSettings()} );
	//modes.SelectItem( "debug" );
	layMode.AddChild( modes );
	layUtilsDrawer.AddChild( layMode );
	
	layChannel = app.CreateLayout( "Linear", "Horizontal,FillXY,Center" );
	layChannel.SetMargins( 0, 0, 0, 0.02 );
	var txtChannel = app.CreateText( "Channel", 0.25, -1 );
	layChannel.AddChild( txtChannel );
	txtChannel.SetFontFile( "Misc/UbuntuMono-B.ttf" );
	txtChannel.SetTextSize( 20, "px" );
	if( settings.channel == "stable" ) {
	    var channels = "stable,beta,nightly";
	} else if( settings.channel == "beta" ) {
	    var channels = "beta,stable,nightly";
	} else if( settings.channel == "nightly" ) {
	    var channels = "nightly,stable,beta";
	} else {alert("Invalid value of the parameter `channel` in Settings: " + settings.channel + "!");};
	channels = app.CreateSpinner( channels, 0.5, -1 );
	channels.SetOnChange( function (channel) {settings.channel=channel;storeSettings()} );
	//channels.SelectItem( "stable" );
	layChannel.AddChild( channels );
	layUtilsDrawer.AddChild( layChannel );
	
	layUtilsDrawer.AddChild( CreateSep( utilsWidth ) );
	
	layTargetBtns = app.CreateLayout( "Linear", "Horizontal,FillXY,Center" );
	layUtilsDrawer.AddChild( layTargetBtns );
	layTargetBtns.SetMargins( 0, 0.01, 0, 0.01 );
	var targets = ["ASM","LLVM IR","MIR"];
	var colours = ["#990000","#009900","#000099"];
	for( var i in targets ) {
	    var btn = app.CreateButton( targets[i], 0.25, -1, "Custom" );
	    btn.SetStyle( colours[i], colours[i], 2 );
	    btn.SetOnTouch( function () {app.CloseDrawer( "Right" );} );
	    layTargetBtns.AddChild( btn );
	};
	layUtilsDrawer.AddChild( CreateSep( utilsWidth ) );
};

function onSourceBufferChange() {
    var curPos = txtSourceBuffer.GetCursorPos();
    txtSourceBuffer.SetText( txtSourceBuffer.GetText() );
    //txtSourceBuffer.SetHtml( "<font face='Monospace'>"
    //                       + txtSourceBuffer.GetText()
    //                           .replace( /(\n)/g, "<br>" )
    //                           .replace( "fn ", "<font color='#dd0000'><b>fn </font></b>" )
    //                    + "</font>" );
    txtSourceBuffer.SetCursorPos( curPos );
};

function formatSource() {
    app.Vibrate( "0,100" );
    app.ShowProgress( "Loading..." );
    format( txtSourceBuffer.GetText(), function(res) {
        app.HideProgress();
        if( !res.success ) {
            handleProblem( res.stderr );
            layBody.ShowTab("Output");
        } else {
            txtSourceBuffer.SetText( res.code + "\n\n\n" );
        };
    });
};

function runSource() {
    app.Vibrate( "0,100" );
    app.ShowProgress( "Loading..." );
    execute( txtSourceBuffer.GetText(), handleResult );
    app.HideProgress();
    layBody.ShowTab("Output");
};