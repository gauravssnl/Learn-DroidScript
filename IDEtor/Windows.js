////////////////////////////////////////////////////////////////
// Windows.js                                                 //
// Copyright 2016, created by Virtuos86 <virtuos86@yandex.ru> //
////////////////////////////////////////////////////////////////

app.LoadScript( "Libs/Filemanager.js" );
app.LoadScript( "Libs/highlight.js" );
app.LoadScript( "Libs/DlgColorpicker.js" );
app.LoadScript( "Libs/Function Inspector.js" );
app.LoadScript( "highlightJson.js" );

var isEdit = false;
var isHighl = 0;
var workAreaId;
var utilsIntervalId;
var posUtilsScroll;

const windows = {
    "current": 0,
    "all": [],
    "utils": null,
    "layAbout": null
};

var SNIPPETS = [
    "()", "[]", "{}", "→", '""', "''", ";", "=", "//"
];

function currentWin () {
    return windows.all[windows.current];
}

function createWindow ( path ) {
    var title = path.split( "/" ).pop();
    for( var i in windows.all ) {
        if( title == windows.all[i].title )
            return;
    }

    // `win` === opened js file
    var win = {};

    windows.all.push( win );
    win.path = "?" !== path ? path : "/sdcard/tempfile.js";
    win.title = win.path.split( "/" ).pop();

    
	app.SetDebugEnabled( false );
    
    // Root layout.
    win.layout = app.CreateLayout( "Absolute" );
    win.layout.SetBackColor( "#FFFFFF" );

    // Layout for a snippet layout.
    win.snippetScroll = app.CreateScroller();
    win.layout.AddChild( win.snippetScroll );
    win.snippetScroll.SetPosition( 0, 0 );
    win.snippetScroll.SetSize( SETTINGS.ui.snippets.width,
                    SETTINGS.ui.snippets.height );
    win.snippetScroll.SetBackColor( SETTINGS.ui.snippets.bg );
    var lay = app.CreateLayout( "Linear", "Left,Horizontal,FillY" );
    win.snippetScroll.AddChild( lay );
    lay.SetSize( 2, 1 );
    
    for( var i=0, btn; i < SNIPPETS.length; i++ ) {
        btn = app.CreateButton( SNIPPETS[i] );
        btn.SetSize( 0.1, -1 );
        btn.SetTextColor( SETTINGS.ui.snippets.fg );
        btn.SetOnTouch( insertSnippet );
        btn.SetMargins( 0, 0, 0, 0 );
        lay.AddChild( btn );
    };

    // Layout for a text area.
    win.workArea = app.CreateLayout( "Absolute" );
    win.layout.AddChild( win.workArea );
    win.workArea.SetPosition( 0, SETTINGS.ui.snippets.height );
    win.workArea.SetSize( SETTINGS.ui.workarea.width, SETTINGS.ui.workarea.height );
    win.workArea.SetOnTouch( closeToolsPane );

    win.layBuffer = app.CreateScroller();
    win.workArea.AddChild( win.layBuffer );
    win.layBuffer.SetPosition( 0, 0 );
    win.layBuffer.SetSize( 1 - SETTINGS.ui.workarea.toolspane.border, 1 );
    win.layBuffer.SetBackColor( SETTINGS.ui.workarea.buffer.bg );

    win.layScroll = app.CreateLayout( "Linear", "Horizontal" );
    win.layBuffer.AddChild( win.layScroll );
    win.layScroll.SetSize( 1 - SETTINGS.ui.workarea.toolspane.border );

    win.numPane = app.CreateText( "", 0.09, -1, "Multiline,Right" );
    win.layScroll.AddChild( win.numPane );
    win.numPane.SetTextColor( "#777777" );
    win.numPane.SetBackColor( SETTINGS.ui.workarea.buffer.bg );
    win.numPane.SetTextSize( SETTINGS.ui.workarea.buffer.fsize,
                             SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
    win.numPane.SetMargins( 0, 0, 0.01, 0);
    win.buffer = app.CreateCodeEdit( "", 1, 1, "Left,NoSpell,MonoSpace,Wrap" );
    
    win.layScroll.AddChild( win.buffer );
    win.buffer.SetTextSize( SETTINGS.ui.workarea.buffer.fsize,
                            SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
    win.buffer.SetTextColor( SETTINGS.ui.workarea.buffer.fg );
    win.buffer.SetBackColor( SETTINGS.ui.workarea.buffer.bg );
    win.buffer.SetOnChange( onChangeText );
    win.buffer.SetOnDoubleTap( onDoubleTapBuffer );
    win.buffer.SetText( app.ReadFile( win.path ) );
    win.buffer.SetCursorPos( 0 );
    win.buffer.SetNavigationMethod( "Touch" );
    updateNumPane( win );

    win.toolsPane = app.CreateLayout( "Absolute" );
    win.workArea.AddChild( win.toolsPane );
    win.toolsPane.SetPosition( 1 - SETTINGS.ui.workarea.toolspane.border, 0 );
    win.toolsPane.SetSize( SETTINGS.ui.workarea.toolspane.width, 1 );
    win.toolsPane.SetBackColor( "#77000000" );

    win.brd = app.CreateLayout( "Linear" );
    win.toolsPane.AddChild( win.brd );
    win.brd.SetPosition( 0, 0 );
    win.brd.SetSize( SETTINGS.ui.workarea.toolspane.sep.width, 1 );
    win.brd.SetOnTouchDown( onTouchToolsPane );

    win.pane = app.CreateLayout( "Linear", "Left" );
    win.toolsPane.AddChild( win.pane );
    win.pane.SetPosition( SETTINGS.ui.workarea.toolspane.sep.width, 0 );
    win.pane.SetSize( SETTINGS.ui.workarea.toolspane.pane.width, 1 );
    win.pane.SetOnTouch( closeToolsPane );
    //win.pane.SetBackColor( "#3A0000" );

    var fileList = getListWindows().split( "," );
    fileList.unshift( fileList.pop() );
    win.fileList = app.CreateSpinner( fileList.join( "," ) );
    win.fileList.SetSize( SETTINGS.ui.workarea.toolspane.pane.filelist.width,
                          SETTINGS.ui.workarea.toolspane.pane.filelist.height );
    win.fileList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.filelist.fg );
    win.fileList.SetOnTouch( selectWindow );
    win.pane.AddChild( win.fileList );

    win.fileOperationsList = app.CreateSpinner( "FM,Open,Save,Save As,Close,Open Settings" );
    win.fileOperationsList.SetSize( SETTINGS.ui.workarea.toolspane.pane.fileops.width,
                                    SETTINGS.ui.workarea.toolspane.pane.fileops.height );
    win.fileOperationsList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.fileops.fg );
    win.fileOperationsList.SetOnTouch( selectFileOperation );
    win.pane.AddChild( win.fileOperationsList );

    ///////////////
    
    var lay = app.CreateLayout( "Linear", "Horizontal" );
    win.pane.AddChild( lay );

    win.fontSizeList = app.CreateSpinner( FONT_SIZES );
    win.fontSizeList.SetSize( SETTINGS.ui.workarea.toolspane.pane.fontsizelist.width,
                              SETTINGS.ui.workarea.toolspane.pane.fontsizelist.height );
    win.fontSizeList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.fontsizelist.fg );
    win.fontSizeList.SetOnTouch( selectFontSize );
    lay.AddChild( win.fontSizeList );

    win.fontSizeDimensionList = app.CreateSpinner( SETTINGS.ui.workarea.toolspane.pane.fontsizedimension );
    win.fontSizeDimensionList.SetSize( SETTINGS.ui.workarea.toolspane.pane.fontsizelist.width,
                              SETTINGS.ui.workarea.toolspane.pane.fontsizelist.height );
    win.fontSizeDimensionList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.fontsizelist.fg );
    win.fontSizeDimensionList.SetOnTouch( selectFontSizeDimension );
    lay.AddChild( win.fontSizeDimensionList );
    
    ///////////////

    win.funcList = app.CreateSpinner( funcList() );
    win.funcList.SetSize( SETTINGS.ui.workarea.toolspane.pane.funclist.width,
                              SETTINGS.ui.workarea.toolspane.pane.funclist.height );
    win.funcList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.funclist.fg );
    win.funcList.SetOnTouch( goToFunc );
    win.pane.AddChild( win.funcList );
    setInterval( "currentWin().funcList.SetList( funcList() )", 30000 );

    //////////////////////////////////////////////////////////////////////////////////////

    // Layout for a first bar in bottom.
    win.layTopBut = app.CreateLayout("Linear", "Horizontal,FillX");
    win.layTopBut.SetPosition( 0, 1  - SETTINGS.ui.secondbar.height - SETTINGS.ui.firstbar.height );
    win.layTopBut.SetSize( SETTINGS.ui.firstbar.width, SETTINGS.ui.firstbar.height );
    win.layTopBut.SetBackColor( SETTINGS.ui.firstbar.bg );
    win.layout.AddChild( win.layTopBut );

    win.btnRun = app.CreateButton( "Run", 0.2, 1, "Custom" );
    win.btnRun.SetStyle( "#821CO3", "#821CO3", 0 );
    win.btnRun.SetOnTouch( runSource );
    win.layTopBut.AddChild( win.btnRun );

    win.btnDebug = app.CreateButton( "Debug", 0.2, 1, "Custom" );
    win.btnDebug.SetStyle( "#400060", "#400060", 0 );
    win.btnDebug.SetOnTouch( debugSource );
    win.layTopBut.AddChild( win.btnDebug );

    win.btnUtils = app.CreateButton( "[fa-navicon]", 0.2, -1,
                                     "FontAwesome,Custom" );
    win.btnUtils.SetStyle( "#821CO3", "#821CO3", 0 );
    win.btnUtils.SetOnTouch( openUtils );
    win.layTopBut.AddChild( win.btnUtils );

    // Layout for a second bar in bottom.
    win.layBottomBut = app.CreateLayout("Linear", "Horizontal,FillX");
    win.layBottomBut.SetPosition( 0, 1 - SETTINGS.ui.secondbar.height );
    win.layBottomBut.SetSize( SETTINGS.ui.secondbar.width,
                              SETTINGS.ui.secondbar.height );
    win.layBottomBut.SetBackColor( SETTINGS.ui.secondbar.bg );
    win.layout.AddChild( win.layBottomBut );

    win.btnUndo = app.CreateButton( "[fa-undo]", 0.2, 1, "FontAwesome,Custom" );
    win.btnUndo.SetStyle( "#B00000", "#400060", 0 );
    win.btnUndo.SetOnTouch( onTouchUndo );
    win.layBottomBut.AddChild( win.btnUndo );

    win.btnRedo = app.CreateButton( "[fa-repeat]", 0.2, 1, "FontAwesome,Custom" );
    win.btnRedo.SetStyle( "#00B000", "#400060", 0 );
    win.btnRedo.SetOnTouch( onTouchRedo );
    win.layBottomBut.AddChild( win.btnRedo );

    if( "?" !== path )
        win.layout.SetVisibility( "Hide" );
    app.AddLayout( win.layout );
    
	app.SetDebugEnabled( true );

    //selectFontSize( win.fontSizeList.GetText() );
    app.SetOnShowKeyboard( onShowKeyboard );
    return win;
}

function onShowKeyboard ( p ) {
    var win = currentWin();
    var sh = ( win.snippetScroll.GetVisibility() == "Hide" ?
               0 : SETTINGS.ui.snippets.height );
    var fbh = SETTINGS.ui.firstbar.height;
    var sbh = SETTINGS.ui.secondbar.height;
    var kbdHeight = ( app.IsKeyboardShown() ?
                      app.GetKeyboardHeight() / app.GetScreenHeight() : 0 );
    
    if( p ) {
        var newHeight = 1 - sh - kbdHeight - fbh - sbh;
    } else {
        var newHeight = 1 - sh;
    };
    win.workArea.SetPosition( 0, sh, SETTINGS.ui.workarea.width, newHeight );
    win.layTopBut.SetPosition( 0, 1 - kbdHeight - sbh - fbh );
    win.layBottomBut.SetPosition( 0, 1 - kbdHeight - sbh );
}

function createErrorInfoDlg () {
    var dlg = app.CreateDialog( "" );
    var lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    dlg.AddLayout( lay );
    dlg.body = app.CreateTextEdit();
    lay.AddChild( dlg.body );
    return dlg;
}

function createLayAbout () {
    windows.layAbout = app.CreateLayout( "Linear", "VCenter,FillXY" );
    var layAbout = windows.layAbout;
    layAbout.SetBackColor( "#000000" );
    var body = app.CreateTextEdit( app.ReadFile( "About.txt" ), 1, 0.9 );
    body.SetTextSize( 16 );
    var backBtn = app.CreateButton( "Back", 0.25, 0.1 );
    layAbout.AddChild( body );
    layAbout.AddChild( backBtn );
    backBtn.SetOnTouch( layAboutToBack );
    layAbout.SetVisibility( "Hide" );
    app.AddLayout( layAbout );
}

function layAboutToBack () {
    windows.layAbout.SetVisibility( "Hide" );
    currentWin().layout.SetVisibility( "Show" );
    }

function createUtils () {
    // Боковое меню.
    windows.utils = app.CreateLayout( "Linear", "VLeft,FillXY" );
    var layUtils = windows.utils;

    layUtils.scrollers = [];
    layUtils.layouts = [];
    var rows = 9;
    for (var i = 0; i < rows; i++) {
        var scroller = app.CreateScroller( 1, 0.1 );
        var lay = app.CreateLayout( "Linear", "Left,Bottom,Horizontal,FillX" );
        lay.SetSize( 2, 1 );
        layUtils.layouts.push( lay );
        scroller.AddChild( lay );
        layUtils.scrollers.push( scroller );
        layUtils.AddChild( scroller );

        if( i == ( rows - 1 ) )
            break;

        var sizes = [0.25, 0.5, 0.3, 0.5, 0.2, 0.25];
        for( var k=0; k<6; k++ ) {
            var sizeIndex = Math.ceil( Math.random() * sizes.length );
            btn = app.CreateButton(
                "abcdefghijklmnopqrstuvwxyz"[Math.ceil( Math.random() * 25 )],
                sizes[sizeIndex], 0.1, "Custom"
            );
            sizes.splice( sizeIndex, 1 );
            var color = "#";
            for( var j=0; j<6; j++ ) {
                color += "0123456789ABCDEF"[Math.ceil( Math.random() * 15 )];
            };
            btn.SetStyle( color, color, 4 );
            //btn.SetOnTouch();
            lay.AddChild( btn );
        };
    };

    lay = app.CreateLayout( "Linear", "Left,Bottom,Horizontal,FillX" );
    lay.SetSize( 1, 0.1 );
    var btn = app.CreateButton( "< Back", 0.25, 0.1, "Custom" );
    btn.SetStyle( "#FF7014A1", "#FF7014A1", 4 );
    btn.SetOnTouch( openMain );
    lay.AddChild( btn );
    layUtils.ctrlScroller = app.CreateScroller();
    layUtils.ctrlScroller.SetSize( 0.75, 0.1 );
    lay.AddChild( layUtils.ctrlScroller );
    layUtils.ctrlRow = app.CreateLayout( "Linear", "Left,Bottom,Horizontal,FillX" );
    layUtils.ctrlRow.SetSize( 2, 1 );
    layUtils.ctrlScroller.AddChild( layUtils.ctrlRow );
    layUtils.AddChild( lay );

    var firstRow = layUtils.layouts[rows - 1];

    btn = app.CreateButton( "Highlight", 0.25, 0.1, "Custom" );
    btn.SetStyle( "#FF6900", "#FF6900", 4 );
    btn.SetOnTouch( highlightCode );
    firstRow.AddChild( btn );

    btn = app.CreateButton( "Color Picker", 0.5, 0.1, "Custom" );
    btn.SetStyle( "#F99999", "#F99999", 4 );
    btn.SetOnTouch( openColorPicker );
    firstRow.AddChild( btn );

    btn = app.CreateButton( "FuncInspector", 0.5, 0.1, "Custom" );
    btn.SetStyle( "#08639E", "#08639E", 4 );
    btn.SetOnTouch( openFunctionInspector );
    firstRow.AddChild( btn );

    layUtils.SetVisibility( "Hide" );
    app.AddLayout( layUtils );
}

function setListWindows () {
    var win = currentWin();
    var wins = [];
    for( var i in windows.all ) {
        wins.push( windows.all[i].title );
    };
    var fileList = wins.length == 1 ? wins[0] : wins.join( "," );
    for( var i in windows.all ) {
        windows.all[i].fileList.SetList( fileList );
        windows.all[i].fileList.SelectItem( windows.all[i].title );
    };
}

function getListWindows () {
    var wins = [];
    for( var i in windows.all ) {
        wins.push( windows.all[i].title );
    };
    return wins.length == 1 ? wins.pop() : wins.join( "," );
}

function selectWindow ( item ) {
    for (var i in windows.all ) {
        var win = windows.all[i];
        if( win.title == item ) {
            break;
        };
    };
    openWindow( i );
}

function funcList ( item ) {
    var win = currentWin();
    var text = win.buffer.GetText();
    var matches = text.match( /function\s+\w+\s*\(/g );
    if( matches == null )
        return "function ...";
    var funcs = "";
    for( var i=0; i<matches.length; i++ ) {
        funcs += matches[i].split( "(" )[0].split( " " )[1] + ",";
    };
    return "function ...," + funcs;
}

function goToFunc ( item ) {
    if( item == "function ..." )
        return;
    var win = currentWin();
    var buffer = win.buffer;
    win.funcList.SetList( funcList() );
    closeToolsPane();
    var pos = buffer.GetText().search( new RegExp( "function\\s+" + item + "\\s*\\(" ) );
    buffer.SetCursorPos( buffer.GetText().length - 1 );
    buffer.SetCursorPos( pos );
    updateNumPane( win );
}

function selectFileOperation ( item ) {
    currentWin().fileOperationsList.SetList( "FM,Open,Save,Save As,Close,Open Settings" );
    switch( item ) {
        case "Open":
            closeToolsPane();
            OnTouchSelectFile();
            break;
        case "Save":
            saveFile();
            break;
        case "Save As":
            break;
        case "Close":
            closeToolsPane();
            var cfm = app.CreateYesNoDialog( "Do you want to close the current file?" );
            cfm.SetOnTouch( closeFile );
            break;
        case "Open Settings":
            createWindow( SETTINGS_PATH );
            openWindow( -1 );
            break;
    };
}

function selectFontSize ( item ) {
    SETTINGS.ui.workarea.buffer.fsize = parseInt( item );
    storeSettings();
    for (var i in windows.all ) {
        var win = windows.all[i];
        win.numPane.SetTextSize( item, SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
        win.buffer.SetTextSize( item, SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
        updateNumPane( win );
    };
}

function selectFontSizeDimension ( item ) {
    var win = currentWin();
    var dim = SETTINGS.ui.workarea.toolspane.pane.fontsizedimension;
    dim.splice( dim.indexOf( item ), 1 );
    dim.unshift( item );
    SETTINGS.ui.workarea.toolspane.pane.fontsizedimension = dim;
    storeSettings();
    for (var i in windows.all ) {
        var win = windows.all[i];
        win.numPane.SetTextSize( SETTINGS.ui.workarea.buffer.fsize, item );
        win.buffer.SetTextSize( SETTINGS.ui.workarea.buffer.fsize, item );
        updateNumPane( win );
    };
}

function closeToolsPane () {
    var win = currentWin();
    win.brd.SetOnTouchDown( onTouchToolsPane );
    win.toolsPane.SetPosition( 1  - SETTINGS.ui.workarea.toolspane.border, 0 );
}

function onTouchToolsPane ( p ) {
    var win = currentWin();
    win.brd.SetOnTouchDown( closeToolsPane );
    win.funcList.SetList( funcList() );
    win.toolsPane.SetPosition( 1  - SETTINGS.ui.workarea.toolspane.width, 0 );
}

function onDoubleTapBuffer() {app.ShowPopup(true);
    closeToolsPane();
    var win = currentWin();
    updateNumPane( win );
    clearTimeout( snippetsAutoHideId );
    if( win.snippetScroll.GetVisibility() == "Hide" ) {
        win.snippetScroll.SetVisibility( "Show" );
        win.workArea.SetPosition( 0, SETTINGS.ui.snippets.height,
                                  SETTINGS.ui.workarea.width,
                                  SETTINGS.ui.workarea.height
        );
    };
    setTimeout( hideSnippets, 10000 );
}

function onTouchUndo () {
    currentWin().buffer.Undo();
}

function onTouchRedo () {
    currentWin().buffer.Redo();
}

function _getCurIndent ( buffer ) {
    var indent = "";
    var curLine = buffer.GetText().split( "\n" )[buffer.GetCursorLine()];
    if( typeof curLine == "undefined" )
        return;
    for( var i=0; i<curLine.length; i++ ) {
        var char = curLine[i];
        if( char == " " || char == '    ' )
            indent += char;
        else
            break;
    };
    return indent;
}

function onEnterText () {
    var win = currentWin();
    var buffer = win.buffer;
    buffer.InsertText( "\n" + _getCurIndent( buffer ), buffer.GetCursorPos() );
    updateNumPane( currentWin() );
    isEdit = true;
}

function onChangeText () {
    if( isEdit === true ) {
        isEdit = false;
        return;
    }
    var win = currentWin();
    updateNumPane( win );
    var buffer = win.buffer;
    updateNumPane( win );
    var inputChar = buffer.GetText()[buffer.GetCursorPos() - 1];
}

function _calculateNumPaneWidth ( win, n ) {
    // Передаем количество колонок в панели, получаем минимальную достаточную ширину панели.
    for( var i=0, testString=""; i<n; i++ ) {
        testString += "9";
    };
    var layLbl = app.CreateLayout( "Absolute" );
    var lbl = app.CreateText( testString );
    lbl.SetTextSize( SETTINGS.ui.workarea.buffer.fsize,
                     SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
    layLbl.AddChild( lbl );
    layLbl.SetVisibility( "Hide" );
    app.AddLayout( layLbl );
    app.Wait( 0.05 );
    var width = lbl.GetWidth();
    app.DestroyLayout( layLbl );
    return width;
}

function updateNumPane ( win ) {
    var buffer = win.buffer;
    return;//var lineCount = buffer.GetLineCount();
    var lineNumber = buffer.GetCursorLine();
    var width = _calculateNumPaneWidth( currentWin(), lineCount.toString().length );
    win.numPane.SetSize( width );
    buffer.SetSize( 1 - width - 0.01 - SETTINGS.ui.workarea.toolspane.sep.width );
    var html = "<html><body>";
    for( var i=1; i<=lineCount; i++ ) {
        if( i == lineNumber + 1 )
            html += '<a bgcolor="#FF0000"><font color="#DD0000">' + i + "</font></a>" + "<br>";
        else
            html += i + "<br>";
    };
    html += "</body></html>";
    win.numPane.SetHtml( html );
}

function updateSettings () {
    var win = currentWin();
    win.fileList.SetSize( SETTINGS.ui.workarea.toolspane.pane.filelist.width,
                          SETTINGS.ui.workarea.toolspane.pane.filelist.height );
    win.fileList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.filelist.fg );
    win.fileOperationsList.SetSize( SETTINGS.ui.workarea.toolspane.pane.fileops.width,
                                    SETTINGS.ui.workarea.toolspane.pane.fileops.height );
    win.fileOperationsList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.fileops.fg );
    win.fontSizeList.SetSize( SETTINGS.ui.workarea.toolspane.pane.fontsizelist.width,
                              SETTINGS.ui.workarea.toolspane.pane.fontsizelist.height );
    win.fontSizeList.SetTextColor( SETTINGS.ui.workarea.toolspane.pane.fontsizelist.fg );
    win.snippetScroll.SetPosition( 0, 0 );
    win.snippetScroll.SetSize( SETTINGS.ui.snippets.width,
                    SETTINGS.ui.snippets.height );
    win.snippetScroll.SetBackColor( SETTINGS.ui.snippets.bg );
    win.numPane.SetTextColor( "#777777" );
    win.numPane.SetBackColor( SETTINGS.ui.workarea.buffer.bg );
    win.numPane.SetTextSize( SETTINGS.ui.workarea.buffer.fsize,
                             SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
    win.numPane.SetMargins( 0, 0, 0.01, 0);
    //win.buffer.SetSize( 0.9 );
    win.buffer.SetTextSize( SETTINGS.ui.workarea.buffer.fsize,
                            SETTINGS.ui.workarea.toolspane.pane.fontsizedimension[0] );
    win.buffer.SetTextColor( SETTINGS.ui.workarea.buffer.fg );
    win.buffer.SetBackColor( SETTINGS.ui.workarea.buffer.bg );
    win.buffer.SetCursorColor( SETTINGS.ui.workarea.buffer.curcol );
    win.layTopBut.SetPosition( 0, 1  - SETTINGS.ui.secondbar.height - SETTINGS.ui.firstbar.height );
    win.layTopBut.SetSize( SETTINGS.ui.firstbar.width, SETTINGS.ui.firstbar.height );
    win.layTopBut.SetBackColor( SETTINGS.ui.firstbar.bg );
    win.layBottomBut.SetPosition( 0, 1 - SETTINGS.ui.secondbar.height );
    win.layBottomBut.SetSize( SETTINGS.ui.secondbar.width,
                              SETTINGS.ui.secondbar.height );
    win.layBottomBut.SetBackColor( SETTINGS.ui.secondbar.bg );
}

function highlightCode () {
    var win = currentWin();
    var source = win.buffer.GetText();
    var curpos = win.buffer.GetCursorPos();
    if( isHighl == 0 ) {
        highlight( source, win.buffer, "", "" );
        win.buffer.SetCursorPos( curpos );
        isHighl = 1;
    } else {
        win.buffer.SetText( source );
        win.buffer.SetCursorPos( curpos );
        isHighl = 0;
    };
}

function openColorPicker () {
    openMain();
    var pick = new ColorPicker( GetString, currentWin().buffer );
    pick.Show();
}

function openFunctionInspector () {
    openMain();
    FunctionInspectorDlg();
}

function openUtils () {
    currentWin().layout.Animate( "SlideToLeft" );
    windows.utils.Animate( "SlideFromRight" );
    utilsIntervalId = setInterval( utilsWatcher, 100 );
}

function openMain () {
    if( windows.utils.GetVisibility() == "Show" ) {
        clearInterval( utilsIntervalId );
        windows.utils.Animate( "SlideToLeft" );
        currentWin().layout.Animate( "SlideFromRight" );
    };
}

function openWindow ( number ) {
    if( windows.all.length == 1 )
        return;
    if( number < 0 ) {
        number += windows.all.length;
    };
    var prevWin = currentWin();
    windows.current = number;
    var win = currentWin();
    updateNumPane( win );
    prevWin.layout.Animate( "SlideToLeft" );
    win.fileList.SelectItem( win.title );
    win.layout.Animate( "SlideFromRight" );
    return win;
}

function closeWindow ( number ) {
    if( windows.all.length == 1 ) {
        app.ShowPopup( "Sorry, you must have at least one open file after closing the current file.", "Center" );
        return;
    }
    if( number < 0 ) {
        number += windows.all.length;
    };
    windows.all = windows.all.slice( 0, number ).concat( windows.all.slice( number ) );
    setListWindows();
    openWindow( 0 );
    app.DestroyLayout( windows.all[number] );
    delete windows.all[number];
}

function closeFile ( yesOrNot ) {
    if( yesOrNot == "Yes" )
        closeWindow( windows.current );
}

function debugSource () {
    var win = currentWin();
    var source = win.buffer.GetText();
    try {
        saveFileForRun();
        app.StartApp( ".run/" + win.title, "Debug");
    } catch( err ) {
        alert( "Oops!:\n    " + err );
    }
}

function runSource () {
    var win = currentWin();
    var source = win.buffer.GetText();
    try {
        saveFileForRun();
        app.StartApp( ".run/" + win.title );
    } catch( err ) {
        alert( "Oops!:\n    " + err );
    }
}

function saveFile () {
    var win = currentWin();
    var source = win.buffer.GetText();
    if( win.path == SETTINGS_PATH ) {
        try {
            SETTINGS = JSON.parse( source );
        } catch( err ) {
            app.ShowPopup( ["Oops! Error storing settings:\n    ",
                            err.name + "> " + err.message,
                            "\nCheck your changes."].join( "" )
            );
            return;
        };
        app.WriteFile( win.path, source );
        app.ShowPopup( "Settings saved.", "Top" );
        updateSettings();
    } else {
        app.WriteFile( win.path, source );
        app.ShowPopup( "File saved.", "Top" );
    };
}

function saveFileForRun () {
    var win = currentWin();
    var source = win.buffer.GetText();
    app.WriteFile( ".run/" + win.title,
                   'app.SetDebugEnabled( false );function ShowError ( message, url, lineNumber ) {\n  alert( message + "\\n    in " + url + "\\n    in line " + ( lineNumber - 6 ) );\n}\nwindow.onerror = ShowError;\n' + source );
    app.ShowPopup( "File saved.", "Top" );
}

////////////////////////////////////////////////////////////////////////////////

function insertSnippet () {
    var snippet = this.GetText();
    var buffer = currentWin().buffer;
    var pos = buffer.GetCursorPos();
    buffer.InsertText( snippet != "→" ? snippet : " ", pos );
    buffer.SetCursorPos( pos + snippet.length )
}

function utilsWatcher () {
    var layUtils = windows.utils;
    var rows = layUtils.scrollers.length;
    var layControl = layUtils.ctrlScroller;
    var pos = layControl.GetScrollX();
    if( pos != posUtilsScroll ) {
        for( i=0; i < rows; i++ ) {
            layUtils.scrollers[i].ScrollTo( pos );
        };
        posUtilsScroll = pos;
    };
}

function hideSnippets () {
    var win = currentWin();
    win.snippetScroll.SetVisibility( "Hide" );
    win.workArea.SetPosition( 0, 0,
                              SETTINGS.ui.workarea.width,
                              SETTINGS.ui.workarea.height + SETTINGS.ui.snippets.height
    );
}

// tab = 4
