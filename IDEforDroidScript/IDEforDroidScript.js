//===============================================================
//--------------------------Variables----------------------------
//===============================================================
app.LoadPlugin( "UIExtras" ); 
// Startpath used for the first dialog start (Without "/" at the End)
var path = "/sdcard/DroidScript";
// filefilter
var ext = ".js";
var ext2 = ".htm";
var ext3 = ".txt";
var ext4 = ".css";
// zuletzt gewählter Pfad von FolderPicker 
var pickerresult = path;
// Boolean Variable zum Pruefen ob edt geändert wurde
var change = 0;
// Boolean Variable zum Pruefen ob edt farbig ist
var highl = 0;
//ButtonWidth Variable zum aendern der Buttonbreite
var bw = 0.07;
var line = 0;            //actually cursor line
var newline = line;      //new line (under cursor line)
var tab = 0;             //is Tab pressed then 1
var tablength = "";      //tab string
    //var startno = 0         //line Start number
    //var cpos = 0            //cursorposition
var note = "Be careful if you use the highlight function on a code! \nIt is not enough tested. \nIf you press the highlight button on a code, \nmake sure you have backup your code before - Use for Backup the Lifebelt Button near the Run Button. \nThe code will be automaticly saved if you press the Run or Debug Button, but you can use the Save Button too!"

//===============================================================
//----------------------Create the App---------------------------
//===============================================================

//Called when application is started.  
function OnStart()  
{   
    app.SetOrientation ("Portrait");
    app.SetScreenMode("Full");
    app.EnableBackKey ( false );
    //Stop screen turning off.
    app.PreventScreenLock( true );
    app.SetMenu("Settings,About");

    //Loading other files into the app
    app.ShowProgress("...Loading Scripts...");
    app.LoadScript("Misc/Folderpicker.js");
    app.LoadScript("Misc/Function Inspector.js");
    app.LoadScript("Src/highlight.js");
    app.LoadScript("Src/AboutDlg.js");
    app.LoadScript("Src/DlgColorpicker.js");
    app.HideProgress();
     
    //Create Sound Output on image pressing 
    ton = app.CreateMediaPlayer();
    ton.SetFile("/system/media/audio/ui/KeypressReturn.ogg");
    ton.SetVolume( 0.0, 0.0);

    //Create a layout with objects vertically centered.  
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );  

    if (app.IsTablet()) 
    {
    //Create Layout for Titlebar
    TitleBar = app.CreateLayout( "Linear", "Horizontal,Left,VCenter,FillX" );  
    TitleBar.SetBackground( "/res/drawable/bar_gray" );
    TitleBar.SetSize( 1, 0.04); 

    icon = app.CreateImage("Img/IDEforDroidScript.png",-1,0.03);
    icon.SetMargins( 0.015,0,0.015,0);
    TitleBar.AddChild(icon);

    header = app.CreateText("IDE for DroidScript",0.7,-1, "Left");
    header.SetTextColor("#ffffffff");
    TitleBar.AddChild(header);
    lay.AddChild(TitleBar);
    }
    else
    {
    app.Alert("Created for using on tablets with bigger screens than a mobile phone");
    }

    //Create 2 horizontal layout for buttons and HelpKeyboard
    layBut = app.CreateLayout("linear", "Horizontal,Left,FillX");
    layBut.SetMargins( 0,0,0,0 );
    layBut.SetBackGradient( "#444444", "#888888" );
    layKey = app.CreateLayout("linear", "Horizontal,Left,FillX");
    layKey.SetBackGradient( "#888888", "#444444" );

    //Create an Load button.  
    btnLoad = app.CreateImage("Img/btnopen.png",bw,-1); 
    btnLoad.SetMargins( 0.02,0.003,0,0 );
    btnLoad.SetOnTouchDown( btnLoad_OnTouch );  
    layBut.AddChild( btnLoad );  

    //Create an save button.  
    btnSave = app.CreateImage("Img/btnsave.png",bw,-1); 
    btnSave.SetMargins( 0,0.003,0,0 ); 
    btnSave.SetOnTouchDown( btnSave_OnTouch );  
    btnSave.SetVisibility ("Hide");
    layBut.AddChild( btnSave );   

    //Create an Undo button.  
    btnUndo = app.CreateImage("Img/btnundo.png",bw,-1); 
    btnUndo.SetMargins( 0,0.003,0,0 ); 
    btnUndo.SetOnTouchDown( btnUndo_OnTouch );  
    layBut.AddChild( btnUndo );

    //Create an Redo button.  
    btnRedo = app.CreateImage("Img/btnredo.png",bw,-1); 
    btnRedo.SetMargins( 0,0.003,0,0 ); 
    btnRedo.SetOnTouchDown( btnRedo_OnTouch );  
    layBut.AddChild( btnRedo );
    
    //Create an Copy button.  
    btnCopy = app.CreateImage("Img/btncopy.png",bw,-1);
    btnCopy.SetMargins( 0,0.003,0,0 );  
    btnCopy.SetOnTouchDown( btnCopy_OnTouch );  
    layBut.AddChild( btnCopy );
    
    //Create an Paste button.  
    btnPaste = app.CreateImage("Img/btnpaste.png",bw,-1);
    btnPaste.SetMargins( 0,0.003,0,0 );  
    btnPaste.SetOnTouchUp( btnPaste_OnTouch );
    btnPaste.SetOnLongTouch( btnClipSave_OnTouch );  
    layBut.AddChild( btnPaste );

    //Create an button for the Multiclipboard
    //btnClipSave = app.CreateImage("Img/btnClipSave.png",bw,-1);
    //btnClipSave.SetMargins( 0,0.003,0,0 );  
    //btnClipSave.SetOnTouchDown( btnClipSave_OnTouch );  
    //layBut.AddChild( btnClipSave );

    //Create an button to show the Function Inspector Dialog.  
    btnFundlg = app.CreateImage("Img/btninspect.png",bw,-1); 
    btnFundlg.SetMargins( 0,0.003,0,0 ); 
    btnFundlg.SetOnTouchDown( btnFundlg_OnTouch ); 
    layBut.AddChild( btnFundlg );

    //Create button for highlighting
    btnHl = app.CreateImage("Img/btnHl.png",bw,-1);
    btnHl.SetMargins( 0,0.003,0,0 ); 
    btnHl.SetOnTouchDown(btnHl_OnTouch);
    layBut.AddChild(btnHl);

    //Create an button to Debug the selected app.  
    btnDebug = app.CreateImage("Img/btndebug.png",bw,-1); 
    btnDebug.SetMargins(0,0.003,0,0) 
    btnDebug.SetOnTouchDown( btnDebug_OnTouch );  
    layBut.AddChild( btnDebug );

    //Create an button to Run the selected app.  
    btnRun = app.CreateImage("Img/btnrun.png",bw,-1); 
    btnRun.SetMargins(0,0.003,0,0) 
    btnRun.SetOnTouchDown( btnRun_OnTouch );  
    layBut.AddChild( btnRun );

    //Create an button to Save a Copy of the selected app.  
    btnRescue = app.CreateImage("Img/btnrescue.png",bw,-1); 
    btnRescue.SetMargins(0,0.003,0,0) 
    btnRescue.SetOnTouchDown( btnRescue_OnTouch );  
    layBut.AddChild( btnRescue );

    //Create an exit button.  
    btnExit = app.CreateImage("Img/btnexit.png",bw,-1); 
    btnExit.SetMargins(bw*1.75,0.003,0,0) 
    btnExit.SetOnTouchDown( btnExit_OnTouch );  
    layBut.AddChild( btnExit );

    //Add Buttonlayout to Layout.
    lay.AddChild( layBut );  

    btnTab = app.CreateImage("Img/btnTab.png",bw,-1);
    btnTab.SetMargins(0.02,0,0,0.003);
    btnTab.SetOnTouchDown(Tab_OnTouch);
    layKey.AddChild(btnTab);

    btnTabMin = app.CreateImage("Img/btnTabMin.png",bw,-1);
    btnTabMin.SetMargins(0,0,0,0.003);
    btnTabMin.SetOnTouchDown(TabMin_OnTouch);
    btnTabMin.SetVisibility("Hide");
    layKey.AddChild(btnTabMin);

    btnCom = app.CreateImage("Img/btnCom.png",bw,-1);
    btnCom.SetMargins(0,0,0,0.003);
    btnCom.SetOnTouchDown(Com_OnTouch);
    layKey.AddChild(btnCom);

    btnKAuf = app.CreateImage("Img/btnKAuf.png",bw,-1);
    btnKAuf.SetMargins(0,0,0,0.003);
    btnKAuf.SetOnTouchDown(KAuf_OnTouch);
    layKey.AddChild(btnKAuf);

    btnKZu = app.CreateImage("Img/btnKZu.png",bw,-1);
    btnKZu.SetMargins(0,0,0,0.003);
    btnKZu.SetOnTouchDown(KZu_OnTouch);
    layKey.AddChild(btnKZu);

    btnSem = app.CreateImage("Img/btnSem.png",bw,-1);
    btnSem.SetMargins(0,0,0,0.003);
    btnSem.SetOnTouchDown(Sem_OnTouch);
    layKey.AddChild(btnSem);

    btnKlA = app.CreateImage("Img/btnKlA.png",bw,-1);
    btnKlA.SetMargins(0,0,0,0.003);
    btnKlA.SetOnTouchDown(KlA_OnTouch);
    layKey.AddChild(btnKlA);

    btnKlZ = app.CreateImage("Img/btnKlZ.png",bw,-1);
    btnKlZ.SetMargins(0,0,0,0.003);
    btnKlZ.SetOnTouchDown(KlZ_OnTouch);
    layKey.AddChild(btnKlZ);

    btnCpic = app.CreateImage("Img/btnCpic.png",bw,-1);
    btnCpic.SetMargins(bw*3,0,0,0.003);
    btnCpic.SetOnTouchDown(Cpic_OnTouch);
    layKey.AddChild(btnCpic);

    //Create an button to show the Settings.  
    btnSettings = app.CreateImage("Img/btnsettings.png",bw,-1); 
    btnSettings.SetMargins(bw*0.75,0,0,0.003) 
    btnSettings.SetOnTouchDown( btnSettings_OnTouch );  
    layKey.AddChild( btnSettings );

    //Add Keylayout to Layout
    lay.AddChild( layKey );

    //Create an Spinner
    filespin = app.CreateSpinner( "Press Load Button" );
    filespin.SetSize( 0.96, -1 );
    filespin.SetOnTouch( filespn_OnTouch );
    //filespin.SetOnChange();
    lay.AddChild( filespin );
    
    //Create a layout inside scroller. 
    layScroll = app.CreateLayout( "Linear", "Left" ); 
    scroll = app.CreateScroller( 0.96, 1 ); 
    layScroll.AddChild( scroll );
    layEdt = app.CreateLayout("Linear", "Left");
    scroll.AddChild( layEdt); 

    //Create an edit box.  
    edt = app.CreateTextEdit( note, 1.2, 50, "Left,NoSpell,Monospace" );  
    edt.SetBackColor( "#FF222222" ); 
    edt.SetTextSize("14", "px");
    edt.SetOnChange (edt_OnChange);
    layEdt.AddChild( edt ); 

    lay.AddChild(layScroll);

    //Add layout to app.      
    app.AddLayout( lay );  

    laySettings = app.CreateLayout("Linear", "Vertical,FillXY");
    laySpin = app.CreateLayout("Linear", "Horizontal, FillX");
    laySpin.SetBackColor("#FF000000");
    laySpin.SetMargins(0.04,0.04,0.04,0);
    txtspin = app.CreateText("Fontsize", 0.2, -1);
    laySpin.AddChild(txtspin);
    sptxt = app.CreateSpinner("10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30");
    sptxt.SetMargins(0.03,0,0,0);
    sptxt.SetOnTouch(sptxt_OnChange);    
    laySpin.AddChild(sptxt);
    btnHide = app.CreateButton("Close", -1,-1)
    btnHide.SetMargins(0.03,0,0,0);
    btnHide.SetOnTouch(btnHide_OnTouch);
    laySpin.AddChild(btnHide);
    laySettings.AddChild(laySpin);
    laySettings.SetVisibility("Hide");
    app.AddLayout(laySettings);

    //Set Font Size
    sptxt.SetText("14");
    edt.SetTextSize(sptxt.GetText(), "px");
    
    MultiClipboard(edt, sptxt.GetText());

}  

//===============================================================



//===============================================================
//--------------------On Screen Controls-------------------------
//===============================================================

//called when user touches on an image-Button to animate it
function touch_button(btn)
{
    btn.Scale( 0.8, 0.8 ); 
    app.Wait(0.05);
    ton.SeekTo(0);
    ton.Play();
    btn.Reset( 1.0, 1.0 ); 
}


//Called when user touches Load button.  
function btnLoad_OnTouch()  
{ 
    touch_button(btnLoad);
    if (change != 0)
    {
    var JaNein = app.CreateYesNoDialog( "Save changings?" );
    JaNein.SetOnTouch( JaNein_OnTouch );
    
        //pick = new FolderPicker(path, path, pickerresult);
        //pick.SetFolder(pickerresult);
        //pick.Show();   
        //change = 0; 
    }
    else
    {
        pick = new FolderPicker(path, path, pickerresult);
        pick.SetFolder(pickerresult);
        pick.Show();   
    }
}  

//called when user wants to Exit the app
function BeforeExit() 
{ 
    var filename = filespin.GetText();
    if ( filename == "Press Load Button")
    {
        app.Exit();
    }
    else if (change == 0)
    {
       app.Exit();
    }
    else
    {
    var yesNo = app.CreateYesNoDialog( "Save changings before close?" );
        yesNo.SetOnTouch( yesNo_OnTouch );
    }
    
} 


//Dialog Result auswerten - Fuer Exit Button
function yesNo_OnTouch( yesNoresult )
{
    if( yesNoresult=="Yes" )
    { 
        //btnSave_OnTouch();
        var txt = edt.GetText(); 
        app.WriteFile( pickerresult+"/"+filespin.GetText(), txt );
    }
    app.Exit();
}


//called when user changes the Text in the Textedit
function edt_OnChange()
{ 
    change = 1;
    btnSave.SetVisibility("Show");
    filespin.SetVisibility("Hide");
    line = edt.GetCursorLine();

    /*if (highl ==1)
    {
    cpos = edt.GetCursorPos();           //number of the cursorpos
    startno = edt.GetLineStart(line);    //number of the linestart
    text = edt.GetHtml();                //text
    crow = text.substring(startno,cpos); //text of the current row
    before = text.substring(0,startno);
    after = text.substring(cpos,text.length);
    
    activehighlight(crow, edt, text , before, after); 
    highl = 1;
    }*/



    if (line - 1 == newline && tab == 1) 
    {
        edt.InsertText(tablength, edt.GetCursorPos());
        newline = line;
    }

    if (line < newline) 
    {
        tab = 0;
        tablength = "";
        btnTabMin.SetVisibility("Hide");
        newline = line;
    }

    if (line > newline) 
    {
        tab = 0;
        tablength = "";
        btnTabMin.SetVisibility("Hide");
        newline = line;
    }
}


//Called when user touches save button.  
function btnSave_OnTouch()  
{   
    touch_button(btnSave);
    var txt = edt.GetText(); 
    app.WriteFile( pickerresult+"/"+filespin.GetText(), txt );
    change = 0;
    btnSave.SetVisibility("Hide");
    filespin.SetVisibility("Show");
    
}  


//Dialog Result auswerten - Fuer Openbutton
function JaNein_OnTouch( JaNeinResult )
{
    if (change != 0)
    {
    if( JaNeinResult == "Yes" )
    { 
        var txt = edt.GetText(); 
        app.WriteFile( pickerresult+"/"+filespin.GetText(), txt );
        change = 0;
        btnSave.SetVisibility("Hide");
        filespin.SetVisibility("Show");
        pick = new FolderPicker(path, path, pickerresult);
        pick.SetFolder(pickerresult);
        pick.Show();   
    }
    else
    {
        change = 0;
        filespin.SetVisibility("Show");
        pick = new FolderPicker(path, path, pickerresult);
        pick.SetFolder(pickerresult);
        pick.Show();
    }
    }
    else
    {
    pick = new FolderPicker(path, path, pickerresult);
    pick.SetFolder(pickerresult);
    pick.Show();
    }
}


//Called when user touches Undo button.  
function btnUndo_OnTouch()  
{  
    touch_button(btnUndo);
    edt.Undo()
}  


//Called when user touches Redo button.  
function btnRedo_OnTouch()  
{  
    touch_button(btnRedo);
    edt.Redo();
} 


//Called when user touches Paste button.  
function btnCopy_OnTouch()  
{  
    touch_button(btnCopy);
    var cop = edt.GetSelectedText();
    app.SetClipboardText(cop);
    lstClip.AddItem(cop);
} 


//Called when user touches Paste button.  
function btnPaste_OnTouch()  
{  
    touch_button(btnPaste);
    edt.ReplaceText(app.GetClipboardText(), edt.GetSelectionStart(), edt.GetSelectionEnd());
} 


//Called when user long touch the paste button for Multiclipboard 
function btnClipSave_OnTouch()  
{  
    touch_button(btnPaste);
    app.HideKeyboard();
    layClip.Animate( "SlideFromRight" );
} 


//Called when user touches Highlight button.  
function btnHl_OnTouch()  
{ 
    touch_button(btnHl);
    var a = edt.GetText();
    var b = edt.GetCursorPos();
    if (highl == 0)
    {
        highlight(a, edt,"",""); 
        edt.SetCursorPos(b);
        highl = 1;
    }
    else
    {
        edt.SetText(a);
        edt.SetCursorPos(b);
        highl = 0;
    }
}  


function btnFundlg_OnTouch()
{
    touch_button(btnFundlg);
    FunctionInspectorDlg();
}


//Debug the app
function btnDebug_OnTouch()
{
    touch_button(btnDebug);
    if (filespin.GetText() != "Press Load Button")
    {
            if (change != 0)
            {
                    var txt = edt.GetText(); 
                    app.WriteFile( pickerresult+"/"+filespin.GetText(), txt );
                    change = 0;
                    filespin.SetVisibility("Show");
            }
            app.StartApp(pickerresult + "/" + filespin.GetText(), "Debug");
    }
}


//Start the app
function btnRun_OnTouch()
{
    touch_button(btnRun);
    if (filespin.GetText() != "Press Load Button")
    {
            if (change != 0)
            {
                    var txt = edt.GetText(); 
                    app.WriteFile( pickerresult+"/"+filespin.GetText(), txt );
                    change = 0;
                    filespin.SetVisibility("Show");
            }
            app.StartApp(pickerresult + "/" + filespin.GetText());
    }
}


//Create a Backup of the app
function btnRescue_OnTouch()
{
   touch_button(btnRescue);
   if (filespin.GetText() != "Press Load Button")
   {
       CrDate = String(app.GetFileDate( pickerresult +"/"+ filespin.GetText()));
       CrDate = CrDate.substring(4,CrDate.length-15);
       CrDate = CrDate.replace(/:/g,"");
       CrDate = CrDate.replace(/\s/g, "");
       CrDate = "(" + CrDate + ")_";
       app.CopyFile(pickerresult +"/"+ filespin.GetText(), pickerresult +"/"+ CrDate + filespin.GetText());
       app.Alert("File saved!");
   } 
}


function btnExit_OnTouch()
{
     touch_button(btnExit);
     BeforeExit();
}


function Tab_OnTouch()
{
    touch_button(btnTab);
    tablength = tablength + ("    ");
    edt.InsertText("    ", edt.GetCursorPos());
    tab = 1;
    btnTabMin.SetVisibility("Show");
}


function TabMin_OnTouch()
{
    touch_button(btnTabMin);
    if (tablength.length != 0)
    {
        edt.ReplaceText("",edt.GetCursorPos() - 4, edt.GetCursorPos());
        tablength = tablength.replace("    ", "");
        tab = 1
    }
    else
    {
        tab = 0
        tablength = ""
        btnTabMin.SetVisibility("Hide");
    }
}


function Com_OnTouch()
{
    touch_button(btnCom);
    edt.InsertText("//", edt.GetCursorPos())
}


function KAuf_OnTouch()
{
    touch_button(btnKAuf);
    edt.InsertText("{", edt.GetCursorPos())
}


function KZu_OnTouch()
{
    touch_button(btnKZu);
    edt.InsertText("}", edt.GetCursorPos())
}


function Sem_OnTouch()
{
    touch_button(btnSem);
    edt.InsertText(";", edt.GetCursorPos())
}


function KlA_OnTouch()
{
    touch_button(btnKlA);
    edt.InsertText("(", edt.GetCursorPos())
}


function KlZ_OnTouch()
{
    touch_button(btnKlZ);
    edt.InsertText(")", edt.GetCursorPos())
}


function btnSettings_OnTouch()
{
    touch_button(btnSettings);
    laySettings.SetVisibility("Show")
    //app.ShowPopup("Settings - No function at the Moment...");
}


function Cpic_OnTouch()
{
    touch_button(btnCpic);
    pick = new ColorPicker(GetString, edt);
    pick.Show();
}

//Handle file select.
function filespn_OnTouch( item )
{
    txt1 = app.ReadFile( pickerresult + "/" + item );
    edt.SetText( txt1 ); 
}

// Change the Font Size - SettingsMenu
function sptxt_OnChange( item )
{
    edt.SetTextSize( item, "px");
    laySettings.SetVisibility("Hide");
}

// Hide the SettingsMenu
function btnHide_OnTouch()
{
    laySettings.SetVisibility("Hide");
}


//===============================================================



//===============================================================
//------------------------App Events-----------------------------
//===============================================================

//Hardware Back-Button
function OnBack()
{
   app.ShowPopup("Please use the OnScreen Button!");
}


//Called when application is paused. 
//(eg. When user switches to home screen) 
//function OnPause()  
//{  
    //app.ToBack();
//} 


//Called if user press the Menubutton
function OnMenu(item)
{
    switch(item) 
    {
    case "Settings":
        app.ShowPopup("Settings");
        break;
    case "About":
        //app.ShowPopup("About");
        CreateAboutDlg()
        break;
    }
}//function On Menu

//===============================================================




//===============================================================
//--------Menu functions: called if a menuitem is pressed--------
//===============================================================

function CreateAboutDlg()
{
    var info= app.ReadFile("Src/about.htm");
    DlgAbout = new AboutDialog(info, 0.9, -1, "#ff888888");
    DlgAbout.Show();    
}

//===============================================================




//===============================================================
//--------------------Multiclipboard Layout----------------------
//===============================================================

function MultiClipboard(textfield,textsize) 
{ 
    //Create a layout we can slide over the main layout. 
    //(This hidden layout is actually on top of the main 
    //layout, it just appears to slide from the right) 
    layClip = app.CreateLayout( "Linear", "Vertical,Right,FillXY,TouchThrough" ); 
    layClip.SetPadding( 0, 0.04, 0, 0 );  
    layClip.SetVisibility( "Hide" ); 

    txtInfo = app.CreateText("Multiclipboard", 0.4,0.05 );
    txtInfo.SetBackColor("#ff000000");
    txtInfo.SetTextSize(30, "px")
    layClip.AddChild(txtInfo);

    layBtnRow = app.CreateLayout ("Linear", "Horizontal,Left");
 
    //Create button and add to button layout. 
    btnHideClip = app.CreateButton( "Close >", 0.2, 0.03, "gray" );
    btnHideClip.SetTextColor("#FF675423");
    btnHideClip.SetTextSize(12);
    btnHideClip.SetOnTouch( btnHideClip_OnTouch ); 
    layBtnRow.AddChild( btnHideClip );

    //Create button and add to button layout. 
    btnPasteClip = app.CreateButton( "Save", 0.2, 0.03, "gray" ); 
    btnPasteClip.SetTextColor("#FF675423");
    btnPasteClip.SetTextSize(12);
    btnPasteClip.SetOnTouch( btnPasteClip_OnTouch );
    layBtnRow.AddChild( btnPasteClip ); 

    layClip.AddChild(layBtnRow);

    lstClip = app.CreateList("", 0.4, 0.8);
    lstClip.SetTextSize(textsize, "px");
    lstClip.SetBackColor("#ff111111");
    lstClip.SetOnTouch( lstClip_OnTouch );
    lstClip.SetOnLongTouch( lstClip_OnLongTouch );
    layClip.AddChild(lstClip);
         
    //Add layouts to app.     
    app.AddLayout(layClip); 
} 



//Called when user touches 'Close' button. 
function btnHideClip_OnTouch() 
{ 
     layClip.Animate( "SlideToRight" );  
}



//Called when user touches the 'Save for later' button. 
function btnPasteClip_OnTouch() 
{ 
    lstClip.AddItem(app.GetClipboardText());
} 


function lstClip_OnTouch( item )
{
    try {
        var txt = item
        txt = txt.replace( RegExp("\\^q\\^","g"), "\"" );
        txt = txt.replace( RegExp("\\^n\\^","g"), "\n" );
        edt.ReplaceText(txt, edt.GetSelectionStart(), edt.GetSelectionEnd())
        //layClip.Animate( "SlideToRight" );
        }
   catch(err) {
        app.ShowPopup(err.message);
        }
}


function lstClip_OnLongTouch( item )
{
    var txt = item
    lstClip.RemoveItem( txt );
}

//===============================================================




/****************************************************************
=================================================================
-------------------------Usefull things--------------------------
=================================================================

DayFull = new Date();
Day = DayFull.toString().split(" ");
DayOfWeek = Day[0];
Month = Day[1];
DayOfMonth = Day[2];
Year = Day[3];
Time = Day[4];
TimeSplit = Time.toString().split(":");
Hours = TimeSplit[0];
Minutes = TimeSplit[1];
Seconds = TimeSplit[2];
Timezone = Day[5];
NameTimezone = Day[6];

=================================================================
****************************************************************/

































