// Introspection lite tool for home use by Steve Garman
// Main code stolen from AppInspector by Andreas Rozek 
// Modified as dialog and completed by Octazid

//Global variables
var myobj = app;
var ListView, menuView, FunctionView
var main_header_txt, edtFilter, dlg, edtDlg;
var lastMenu = "app";
var pasteable = "null";
var vers = Math.floor((app.GetVersion()
      +.0005) * 100);
var docfold = "/sdcard/octazid/droidscript/"+vers;
var docfile = docfold + "/null.txt";


// ---------------------------------------------------------------
//*** Dialog from here ***
//----------------------------------------------------------------

function FunctionInspectorDlg()
 {
    //Create dialog window.
    dlg = app.CreateDialog( "Function Inspector" );
    
    //Create a layout with objects vertically centered.
    var lay = app.CreateLayout( "linear", "VCenter" );  
    add_top_bar( lay );
    add_btn_bar( lay );
 
    //**** prepare page area ****//
    var PageArea = app.CreateLayout('frame','FillXY');
    lay.AddChild(PageArea);

    var control_list = "app,AudioRecorder,BluetoothList,BluetoothSerial,Button"
      +",CameraView,CheckBox,Crypt,Dialog,Downloader,Email,GLView,Image"
      +",IOIO,Layout,ListDialog,List,ListView (dont use!),Locator,Mediaplayer" 
      +",NetClient,Notification,NXTRemote,Playstore,Scroller,SeekBar"
      +",Sensor,Service,Shortcut,SmartWatch,SMS"
      +",SpeechRecognition,Spinner,Synth,Tabs,Text,TextEdit,ToggleButton"
      +",USBSerial,VideoView,WebServer,WebView,YesNoDialog,Zip"//,Manually entered code(is eval),Debug(is not helpful),Object(is not helpful),Shortcut(is not helpful) "
    
    menuView = app.CreateList( control_list, -1, 0.7, 'FillX');
    menuView.SetMargins(0.05,0,0,0.01);
    menuView.SetOnTouch(menuView_OnTouch);
    PageArea.AddChild(menuView);
    menuView.SetVisibility('Hide');

    ListView = app.CreateList("", -1, 0.7, 'FillX');
    ListView.SetMargins(0.05,0,0,0.01);
    prepareFunctionList();

    ListView.SetOnTouch(showAppFunction);
    PageArea.AddChild(ListView);

    //**** prepare detail view ****//
    FunctionView = app.CreateTextEdit("",-1,-1, "NoSpell");
    PageArea.AddChild(FunctionView);
    FunctionView.SetVisibility('Hide');
    
    //Add layout to app.    
    dlg.AddLayout(lay);
    //app.AddLayout( lay );
    showMenuView();

    app.HideKeyboard();
    //Show dialog.
    dlg.Show();   

}//OnStart
     

function add_top_bar (lyout, opts)
{
  //basic top bar layout
  var lay_bar = app.CreateLayout( "Linear", "Horizontal,Left, FillX" );
  lay_bar.SetBackGradient( "#444444", "#888888" );

  //add app name if required - stolen for object/function name in this app
  main_header_txt = app.CreateText( lastMenu , 0.6, -1 ,"Left, Autoscale");
  main_header_txt.SetTextSize( 20 );
  main_header_txt.SetPadding( 0.02, 0, 0, 0 );
  lay_bar.AddChild( main_header_txt );

  filterlabel = app.CreateText("Func filter: ");
  filterlabel.SetMargins(0.02,0,0,0);
  filterlabel.SetTextSize(18);
  filterlabel.SetTextColor("#ff222222");
  filterlabel.SetVisibility("Hide");
  lay_bar.AddChild( filterlabel );

  edtFilter = app.CreateTextEdit("", 0.1, -1, "NoSpell");
  edtFilter.SetBackColor("#ff222222");
  edtFilter.SetTextSize(16);
  edtFilter.SetPadding( 0.01, 0, 0, 0.01 );
  edtFilter.SetOnChange(edtFilterOnChange);
  edtFilter.SetVisibility("Hide")
  lay_bar.AddChild(edtFilter);

  lyout.AddChild( lay_bar );
}//add_top_bar

function add_btn_bar (lyout, opts)
{
  //basic button bar layout
  var laybtn_bar = app.CreateLayout( "Linear", "Horizontal,Left, FillX" );
  laybtn_bar.SetBackGradient( "#888888", "#444444" );
  
  btnBack = app.CreateButton ("<", -1, -1, "Alum");
  btnBack.SetOnTouch( btnBack_OnTouch );
  btnBack.SetMargins(0.02,0,0,0);
  laybtn_bar.AddChild(btnBack);

  btnTxtfile = app.CreateButton ("Create Textfile", -1, -1, "Alum");
  btnTxtfile.SetOnTouch( TxtfileOnExit_OnTouch );
  btnTxtfile.SetVisibility('Hide');
  laybtn_bar.AddChild(btnTxtfile);

  btnToClipb = app.CreateButton ("Copy", -1, -1, "Alum");
  btnToClipb.SetOnTouch(FuncToClipboard);
  btnToClipb.SetVisibility('Hide');
  laybtn_bar.AddChild(btnToClipb);

  btnFilter = app.CreateButton ("Filter", -1, -1, "Alum");
  btnFilter.SetOnTouch(btnFilter_OnTouch);
  laybtn_bar.AddChild(btnFilter);
  lyout.AddChild( laybtn_bar );
}//add_btn_bar


function menuView_OnTouch(name)
{
  lastMenu = name;
  switch(name) {
    case "Layout":
        myobj = app.CreateLayout( "linear" );
        break;
    case "BluetoothSerial":
        myobj = app.CreateBluetoothSerial();
        break;
    case "BluetoothList":
        myobj = app.CreateBluetoothList();
        break;
    case "Button":
        myobj = app.CreateButton("x");
        break;
    case "Downloader":
        myobj = app.CreateDownloader();
        break;
    case "Text":
        myobj = main_header_txt;
        break;
    case "Image":
        myobj = app.CreateImage( "/Sys/Img/Hello.png" );
        break;
    case "IOIO":
       myobj = app.CreateIOIO();
       break;
    case "Mediaplayer":
        myobj = app.CreateMediaPlayer();
        break;
    case "Notification":
        myobj = app.CreateNotification() ;
        break;
    case "NXTRemote":
        myobj = app.CreateNxtRemote() ;
        break;
    //case "Object":
    //    myobj = app.CreateObject() ;
    //    break;
    case "CheckBox":
        myobj = app.CreateCheckBox( "x" );
        break;
    case "AudioRecorder":
        myobj = app.CreateAudioRecorder() ;
        break;
    case "Crypt":
        myobj = app.CreateCrypt();
        break;
    //case "Debug":
    //   myobj = app.CreateDebug();
    //   break;
    case "GLView":
        myobj = app.CreateGLView( 0.8, 0.8, "Test" );
        break;
    case "Dialog":
        myobj = app.CreateDialog("");
        break;
    case "NetClient":
        myobj = app.CreateNetClient( "TCP" );
        break;
    case "Playstore":
        myobj = app.CreatePlayStore();
        break;
    case "Tabs":
        myobj = app.CreateTabs( "A,B,C",0.3,0.3,"" );
        break;
    case "ToggleButton":
        myobj = app.CreateToggle( "x" );
        break;
    case "SeekBar":
        myobj = app.CreateSeekBar( "x" );
        break;
    case "Synth":
        myobj = app.CreateSynth();
        break;
    case "ListDialog":
        myobj = app.CreateListDialog("Testdialog - just click...", "Yes,No,Chancel");
        break;
    case "List":
        myobj = ListView;
        break;
    case "ListView (dont use!)":
        myobj = app.CreateListView("Item1,Item2,Item3", "Title", 0.8, 0.8);
        break;
    case "TextEdit":
        myobj = FunctionView;
        break;
    case "Shortcut":
        myobj = app.CreateShortcut("Shortcut");
         break;
    case "SmartWatch":
        myobj = app.CreateSmartWatch("Smart");
        break;
    case "SpeechRecognition":
        myobj = app.CreateSpeechRec();
        break;
    case "WebView":
        myobj = app.CreateWebView( 0.8,0.8 );
        break;
    case "WebServer":
        myobj = app.CreateWebServer( 8080, "Upload,ListDir" );
        break;
    case "CameraView":
        myobj = app.CreateCameraView( 0.8,0.8 );
        break;
    case "Sensor":
        myobj = app.CreateSensor( "Accelerometer" );
        break;
    case "Email":
        myobj = app.CreateEmail( "mymail@gmail.com", "MyPass" );
        break;
    case "Locator":
        myobj = app.CreateLocator( "GPS,Network" );
        break;
    case "Scroller":
        myobj = app.CreateScroller( 0.9, 0.9 ); 
        break;
    case "Service":
        myobj = app.CreateService("Testservice");
        break;
    case "Spinner":
        myobj= app.CreateSpinner("1,2");
        break;
    case "SMS":
        myobj = app.CreateSMS();
        break;
    case "USBSerial":
        myobj = app.CreateUSBSerial();
        break;
    case "VideoView":
        myobj = app.CreateVideoView( 0.8,0.8 );
        break;
    case "YesNoDialog":
        myobj = app.CreateYesNoDialog("Testdialog - just click...");
        break;
    case "Zip":
        myobj = app.CreateZipUtil();
        break;
    //case("Manually entered code"):
    //    showEval();
    //    return;
    default:
        myobj=app;
        lastMenu = "app";
    }   
  prepareFunctionList();
  showOverview();
  main_header_txt.SetText( lastMenu );
}//menuView_OnTouch


function prepareFunctionList()
  {
      //**** prepare list view ****//

    var objFunctionList;
    objFunctionList = [];
    var fun = ""
    var filter = edtFilter.GetText().trim().toLowerCase()
    for (var Key in myobj) {
      var keyword= Key.toLowerCase()
      if ((filter == "") || (keyword.indexOf(filter) > -1)){
        if (myobj.hasOwnProperty(Key) && (typeof myobj[Key] === 'function')) {
        objFunctionList.push(Key);
        functi = String(myobj[Key]);
        funct = functi.split("{");
        funct = funct[0];
        functi = funct.replace("function ","");
        fun += "\n" + lastMenu + "." + Key + functi;
        };
      }
    };
    objFunctionList.sort();
    ListView.SetList( objFunctionList.join(','), ",")
    if(filter != "" ) filter = "Filtered [" + filter + "]\n";
    pasteable = filter
    pasteable += fun
    docfile = docfold + "/" + lastMenu + ".txt";
  }//prepareFunctionList


function showMenuView()
  {
    ListView.SetVisibility('hide');
    FunctionView.SetVisibility('hide');
    btnToClipb.SetVisibility('Hide');
    menuView.SetVisibility('show');
    main_header_txt.SetText( "Choose a Control" );
  }//showMenuView


function showAppFunction (Name) 
  {
    FunctionView.SetText(String(myobj[Name]));
    main_header_txt.SetText( lastMenu + "." + Name );
    ListView.SetVisibility('hide');
    menuView.SetVisibility('hide');
    FunctionView.SetVisibility('show');
    btnToClipb.SetVisibility('show');
    btnTxtfile.SetVisibility('Hide');
  }//showAppFunction


function showOverview () 
  {
    ListView.SetVisibility('show');
    FunctionView.SetVisibility('hide');
    btnToClipb.SetVisibility('Hide');
    btnTxtfile.SetVisibility('Show');
    menuView.SetVisibility('hide');
    main_header_txt.SetText( lastMenu );
  }//showOverview


function edtFilterOnChange()
  {
    if( ListView.GetVisibility() == "Show" )
    {
      prepareFunctionList(); 
    }
  }//edtFilterOnChange


function btnBack_OnTouch()
  {
    if (menuView.GetVisibility() == "Show") 
    {
    dlg.Hide();
    }
    else if( ListView.GetVisibility() == "Show" ) showMenuView();
    else showOverview();
  }//btnBack_OnTouch


function btnFilter_OnTouch()
  {
    if (edtFilter.GetVisibility() == "Hide") 
    {
    edtFilter.SetVisibility("Show");
    filterlabel.SetVisibility("Show");
    }
    else if( edtFilter.GetVisibility() == "Show" ) 
    {
    edtFilter.SetText("");
    edtFilter.SetVisibility("Hide");
    filterlabel.SetVisibility("Hide");
    app.HideKeyboard();
    }
  }//btnBack_OnTouch


function TxtfileOnExit_OnTouch()
  {
     if( ! app.FolderExists( docfold ) )
     app.MakeFolder ( docfold );
     app.WriteFile( docfile, pasteable );
     btnTxtfile.SetVisibility('Hide');
     showMenuView();
  }//TxtfileOnExit_OnTouch


function FuncToClipboard()
  {
      var FuncComplete = FunctionView.GetText();
      var func = FuncComplete.split("{"); //teilt den String bei jedem Zeichen
      func = func[0]; //0 ist das erste Teistück des geteilten String
      func = func.replace ("function ","");
      func = main_header_txt.GetText() + func;
      app.SetClipboardText(func); 
      lstClip.AddItem(app.GetClipboardText());
      //app.Alert("The Function: " + app.GetClipboardText() + " is in clipboard now.");
      showOverview();
  }//FuncToClipboard
