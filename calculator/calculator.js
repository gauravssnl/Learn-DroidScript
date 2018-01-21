

//Init variables. 
var sum = ""; 
var txtSize = 32; 
//Create global variables. 
var destFile = "/sdcard/test.wav" 
var timer = 0; 


//Called when application is started. 
function OnStart() 
{ 
     
    //Create the main layout. 
    layMain = app.CreateLayout( "Linear", "FillXY" );     
    layMain.SetBackColor("#2B2B35"  ); 
    layMain.SetPadding( 0, 0.1, 0, 0 ); 

  //Title of app
  txt = app.CreateText( "Calculator" );
  txt.SetTextSize( 25 );
  layMain.AddChild( txt );



    //Create array to hold number buttons. 
    keys = [ 7,8,9,"/", 4,5,6,"*", 1,2,3,"-", 0,".","C","+" ]; 
     

    //Create text control for displaying sum. 
    txtSum = app.CreateText( "", 0.8, 0.1 ); 
    txtSum.SetTextSize( 42 ); 
    txtSum.SetBackColor( "#ff222222" ); 
    txtSum.SetMargins( 0, 0.1, 0, 0.05 ); 
    layMain.AddChild( txtSum ); 
     
    //Create first row of buttons. 
    lay1st = app.CreateLayout( "linear", "Horizontal" );     
    for( i=0; i<4; i++ ) AddButton( lay1st, keys[i] ); 
    layMain.AddChild( lay1st ); 
     
    //Create second row of buttons. 
    lay2nd = app.CreateLayout( "linear", "Horizontal" );     
    for( i=4; i<8; i++ ) AddButton( lay2nd, keys[i] ); 
    layMain.AddChild( lay2nd ); 
     
    //Create third row of buttons. 
    lay3rd = app.CreateLayout( "linear", "Horizontal" );     
    for( i=8; i<12; i++ ) AddButton( lay3rd, keys[i] ); 
    layMain.AddChild( lay3rd ); 
     
    //Create fourth row of buttons. 
    lay4th = app.CreateLayout( "linear", "Horizontal" );     
    for( i=12; i<16; i++ ) AddButton( lay4th, keys[i] ); 
    layMain.AddChild( lay4th ); 
     
    //Create fifth row of buttons. 
    lay5th = app.CreateLayout( "linear", "Horizontal" );     
    AddButton( lay5th, "=" ); 
    layMain.AddChild( lay5th ); 

    //Create a text label cogs icon. 
    txt = app.CreateText( "[fa-cogs] Settings", 0.8, 0.1, "FontAwesome" ); 
    txt.SetTextSize( txtSize ); 
    txt.SetOnTouch( settingsOnTouch ); 
    layMain.AddChild( txt ); 

//Create a layout we can slide over the main layout. 
    //(This hidden layout is actually on top of the main 
    //layout, it just appears to slide from the left) 
    laySlide = app.CreateLayout( "Linear", "FillXY" ); 
    laySlide.SetPadding( 0, 0.1, 0, 0 );  
    laySlide.SetBackColor( "#2B2B35" ); 
    laySlide.SetVisibility( "Hide" );

//Create button and add to Sub layout. 
    btnText = app.CreateButton( "Notepad", 0.8, 0.1, "alum" ); 
 btnText.SetMargins(0, 0.1);
    btnText.SetOnTouch( btnText_OnTouch ); 
    laySlide.AddChild( btnText );

//Create button and add to Sub layout. 
    btnVoiceMemo = app.CreateButton( "Voice Memo", 0.8, 0.1, "alum" ); 
 btnVoiceMemo.SetMargins(0, 0.1);
    btnVoiceMemo.SetOnTouch( btnVoiceMemo_OnTouch ); 
    laySlide.AddChild( btnVoiceMemo );

//Create button and add to Sub layout. 
    btnTheme = app.CreateButton( "Theme", 0.8, 0.1, "alum" ); 
 btnTheme.SetMargins(0, 0.1);
    btnTheme.SetOnTouch( btnTheme_OnTouch ); 
    laySlide.AddChild( btnTheme );

//Create button and add to Sub layout. 
    btnBack = app.CreateButton( "Back", 0.8, 0.1, "alum" ); 
 btnBack.SetMargins(0, 0.1);
    btnBack.SetOnTouch( btnBack_OnTouch ); 
    laySlide.AddChild( btnBack );

//Create a layout we can slide over the main layout. 
    //(This hidden layout is actually on top of the main 
    //layout, it just appears to slide from the left) 
    laySlide1 = app.CreateLayout( "Linear", "FillXY" ); 
    laySlide1.SetPadding( 0, 0.1, 0, 0 );  
    laySlide1.SetBackColor( "#2B2B35" );i 
    laySlide1.SetVisibility( "Hide" );

//Create an edit box.  
    edt = app.CreateTextEdit( "", 0.94, 0.6 );  
    edt.SetBackColor( "#333333" ); 
    laySlide1.AddChild( edt );  
     
    //Create a horizontal layout for buttons.  
    layBut = app.CreateLayout("Linear", "Horizontal");  
    laySlide1.AddChild( layBut );  

    //Create an Load button.  
    btnLoad = app.CreateButton( "Load", 0.23, 0.1 );  
    btnLoad.SetOnTouch( btnLoad_OnTouch );  
    layBut.AddChild( btnLoad );  

    //Create an save button.  
    btnSave = app.CreateButton( "Save", 0.23, 0.1 );  
    btnSave.SetOnTouch( btnSave_OnTouch );  
    layBut.AddChild( btnSave );  

    //Create an Back button.  
    btnBack2 = app.CreateButton( "Back", 0.23, 0.1 );  
    btnBack2.SetOnTouch( btnBack2_OnTouch );  
    layBut.AddChild( btnBack2 );  

    //Create an text edit box for password.
    edtPass = app.CreateTextEdit( "pass", 0.4 );
    laySlide1.AddChild( edtPass );
    
  //Create a horizontal layout for buttons.  
    layBut1 = app.CreateLayout("Linear", "Horizontal");  
    laySlide1.AddChild( layBut1 );  


    //Create an 'Encrypt' button..
    btnEncrypt = app.CreateButton( "Encrypt", 0.23, 0.1);
    btnEncrypt.SetOnTouch( btnEncrypt_OnTouch );
    layBut1.AddChild( btnEncrypt );

    //Create an 'Decrypt' button..
    btnDecrypt = app.CreateButton( "Decrypt", 0.23, 0.1);
    btnDecrypt.SetOnTouch( btnDecrypt_OnTouch );
    layBut1.AddChild( btnDecrypt );
    
    //Create a 'Hash' button..
    btnHash = app.CreateButton( "Hash", 0.23, 0.1);
    btnHash.SetOnTouch( btnHash_OnTouch );
    layBut1.AddChild( btnHash );

//Create a layout we can slide over the main layout. 
    //(This hidden layout is actually on top of the main 
    //layout, it just appears to slide from the left) 
    laySlide2 = app.CreateLayout( "Linear", "FillXY" ); 
    laySlide2.SetPadding( 0, 0.1, 0, 0 );  
    laySlide2.SetBackColor( "#2B2B35" ); 
    laySlide2.SetVisibility( "Hide" );

//Create a 'Start' button. 
    btnStart = app.CreateButton( "Start", 0.6, -1, "Alum,NoSound" ); 
    btnStart.SetMargins( 0, 0.1); 
    btnStart.SetOnTouch( btnStart_OnTouch ); 
    laySlide2.AddChild( btnStart ); 

    //Create a 'Pause' button. 
    btnPause = app.CreateButton( "Pause", 0.6, -1, "Alum,NoSound" ); 
    btnPause.SetMargins( 0, 0.1); 
    btnPause.SetOnTouch( btnPause_OnTouch ); 
    laySlide2.AddChild( btnPause ); 
     
    //Create a 'Stop' button. 
    btnStop = app.CreateButton( "Stop", 0.6, -1, "Alum,NoSound" ); 
    btnStop.SetMargins( 0, 0.1); 
    btnStop.SetOnTouch( btnStop_OnTouch ); 
    laySlide2.AddChild( btnStop ); 
     
    //Create a 'Play' button. 
    btnPlay = app.CreateButton( "Play File", 0.6, -1, "Alum,NoSound" ); 
    btnPlay.SetMargins( 0, 0.1 ); 
    btnPlay.SetOnTouch( btnPlay_OnTouch ); 
    laySlide2.AddChild( btnPlay ); 

//Create a 'Play' button. 
    btnback3 = app.CreateButton( "Back", 0.6, -1, "Alum,NoSound" ); 
    btnback3.SetMargins( 0, 0.1, 0, 0 ); 
    btnback3.SetOnTouch( btnback3_OnTouch ); 
    laySlide2.AddChild( btnback3 ); 

//Create a layout we can slide over the main layout. 
    //(This hidden layout is actually on top of the main 
    //layout, it just appears to slide from the left) 
    laySlide3 = app.CreateLayout( "Linear", "FillXY" ); 
    laySlide3.SetPadding( 0, -0, 0, 0 );  
    laySlide3.SetBackColor( "#2B2B35" ); 
    laySlide3.SetVisibility( "Hide" );

//Create button and add to Sub layout. 
    btnCharcoalT = app.CreateButton( "Charcoal", 0.8, 0.1, "alum" ); 
 btnCharcoalT.SetMargins(0, 0.1);
    btnCharcoalT.SetOnTouch( btnCharcoalT_OnTouch ); 
    laySlide3.AddChild( btnCharcoalT );

//Create button and add to Sub layout. 
    btnWhiteT = app.CreateButton( "White", 0.8, 0.1, "alum" ); 
 btnWhiteT.SetMargins(0, 0.1);
    btnWhiteT.SetOnTouch( btnWhiteT_OnTouch ); 
    laySlide3.AddChild( btnWhiteT );

btnBeigeT = app.CreateButton( "Beige", 0.8, 0.1, "alum" );
btnBeigeT.SetMargins(0, 0.1);
btnBeigeT.SetOnTouch( btnBeigeT_OnTouch ); 
    laySlide3.AddChild( btnBeigeT );

btnBlueT = app.CreateButton( "Pale Blue", 0.8, 0.1, "alum" );
btnBlueT.SetMargins(0, 0.1);
btnBlueT.SetOnTouch( btnBlueT_OnTouch ); 
    laySlide3.AddChild( btnBlueT );

//Create button and add to Sub layout. 
    btnBackT = app.CreateButton( "Back", 0.8, 0.1, "alum" ); 
 btnBackT.SetMargins(0, 0.1);
    btnBackT.SetOnTouch( btnBackT_OnTouch ); 
    laySlide3.AddChild( btnBackT );

    //Add layout to app.     
    app.AddLayout( layMain );
 app.AddLayout( laySlide ); 
 app.AddLayout( laySlide1 );
 app.AddLayout( laySlide2 );
 app.AddLayout( laySlide3 );
} 

 //Create Cryptography object.
    crypt = app.CreateCrypt();

//Add a button to a given layout. 
function AddButton( lay, name ) 
{ 
    if( name=="=" ) w = 0.8; else w=0.2; 
    btn = app.CreateButton( name, w, 0.1, "Alum" ); 
    btn.SetOnTouch( btns_OnTouch ); 
    lay.AddChild( btn ); 
} 

//Called when user presses number buttons. 
function btns_OnTouch() 
{ 
     
    //Get button text. 
    btn = app.GetLastButton(); 
    var txt = btn.GetText(); 
     
    //Handle equals button. 
    if( txt=="=" ) CalcResult(); 
     
    //Handle clear button. 
    else if( txt=="C" ) sum = ""; 
     
    //Handle other buttons. 
    else sum += txt; 
     
    //Update display. 
    txtSum.SetText( sum ); 
} 

//Calculate sum. 
function CalcResult() 
{ 
    try { 
        //Evaluate sum (and catch errors). 
        sum = eval( sum ).toFixed(2); 
    } 
    catch(e) { sum = "Error" } 
} 
//Called when user touches our 'back' button. 
function settingsOnTouch( ev ) 
{ 
    laySlide.Animate( "SlideFromLeft" );
     if( ev.action=="Down" )  
        this.SetTextSize( txtSize-4 ); 
    else if( ev.action=="Up" )  
        this.SetTextSize( txtSize );
}
//Called when user touches our 'back' button. 
function btnBack_OnTouch() 
{ 
    laySlide.Animate( "SlideToLeft" );     
}
//Called when user touches our 'Text' button. 
function btnText_OnTouch() 
{ 
    laySlide1.Animate( "SlideFromLeft" );     
}
function btnVoiceMemo_OnTouch()
{
laySlide2.Animate( "SlideFromLeft" );
}
function btnTheme_OnTouch()
{
laySlide3.Animate( "SlideFromLeft" );
}
function btnCharcoalT_OnTouch()
{
layMain.SetBackColor( " #2B2B35 " );
laySlide.SetBackColor( "#2B2B35" );
laySlide1.SetBackColor( "#2B2B35" );
laySlide2.SetBackColor( "#2B2B35" );
laySlide3.SetBackColor( "#2B2B35" );
}
function btnWhiteT_OnTouch()
{
layMain.SetBackColor( "#FFFFFF" );
laySlide.SetBackColor( "#FFFFFF" );
laySlide1.SetBackColor( "#FFFFFF" );
laySlide2.SetBackColor( "#FFFFFF" );
laySlide3.SetBackColor( "#FFFFFF" );
}
function btnBeigeT_OnTouch()
{
layMain.SetBackColor( "#F5F5DC" );
laySlide.SetBackColor( "#F5F5DC" );
laySlide1.SetBackColor( "#F5F5DC" );
laySlide2.SetBackColor( "#F5F5DC" );
laySlide3.SetBackColor( "#F5F5DC" );
}
function btnBlueT_OnTouch()
{
layMain.SetBackColor( "#add8e6" );
laySlide.SetBackColor( "#add8e6" );
laySlide1.SetBackColor( "#add8e6" );
laySlide2.SetBackColor( "#add8e6" );
laySlide3.SetBackColor( "#add8e6" );
}
function btnBackT_OnTouch()
{
laySlide3.Animate( "SlideToLeft" );
}
//Called when user touches our 'Text' button. 
function btnCamera_OnTouch() 
{ 
    laySlide2.Animate( "SlideFromLeft" );     
}
//Called when user touches Load button.  
function btnLoad_OnTouch()  
{  
   var txt = app.ReadFile( "/sdcard/calculator_notepadfile.txt" ); 
   edt.SetText( txt ); 
}  

//Called when user touches save button.  
function btnSave_OnTouch()  
{  
    var txt = edt.GetText(); 
    app.WriteFile( "/sdcard/calculator_notebadfile.txt", txt ); 
}  

//Called when user touches Back button.  
function btnBack2_OnTouch()  
{  
    laySlide1.Animate( "SlideToLeft" );
}  
//Called when user touches 'Encrypt' button.
function btnEncrypt_OnTouch()
{ 
    //Get password and text.
    var pass = edtPass.GetText();
    var txt = edt.GetText();
    
    //Encrypt text.
    var txt = crypt.Encrypt( txt, pass );
    edt.SetText( txt );
}
//Called when user touches 'Decrypt' button.
function btnDecrypt_OnTouch()
{
    //Get password and text.
    var pass = edtPass.GetText();
    var txt = edt.GetText();
    
    //Decrypt text.
    txt = crypt.Decrypt( txt, pass );
    edt.SetText( txt );
}

//Genrate MD5 Hash of password.
function btnHash_OnTouch()
{
    var pass = edtPass.GetText();
    var md5 = crypt.Hash( pass, "MD5"); 
    app.ShowPopup( md5 );
}

//Create Audio Recorder and set dest file. 
    rec = app.CreateAudioRecorder(); 
    rec.SetFile( destFile ); 
     
    //Create media player. 
    player = app.CreateMediaPlayer(); 
    player.SetOnReady( player_OnReady ); 
     
    //Switch off debug so we don't fill the log. 
    app.SetDebugEnabled( false );

//Called when user touches our 'Start' button. 
function btnStart_OnTouch() 
{ 
    rec.Start(); 
    clearInterval( timer ); 
} 

//Called when user touches our 'Pause' button. 
function btnPause_OnTouch() 
{ 
    rec.Pause();
} 

//Called when user touches our 'Stop' button. 
function btnStop_OnTouch() 
{ 
    rec.Stop(); 
    clearInterval( timer ); 
} 

//Called when user touches our 'Play' button. 
function btnPlay_OnTouch() 
{ 
    player.SetFile( destFile ); 
} 

//Called when the WAV file is loaded. 
function player_OnReady() 
{ 
     player.Play(); 
} 
function btnback3_OnTouch()
{
laySlide2.Animate( "SlideToLeft" );
}





































