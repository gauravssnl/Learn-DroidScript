//Init variables. 
var sum = ""; 

//Called when application is started. 
function OnStart() 
{ 
    //Create a layout with objects vertically centered. 
    layMain = app.CreateLayout( "linear", "FillXY" );     

    //Create array to hold number buttons. 
    keys = [ 1,2,3, 4,5,6, 7,8,9, 0,"ok","c" ]; 
     
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
    //выводим результат ввода номера
    txtViewNumber = app.CreateText( "" );
    txtViewNumber.SetTextSize( 22 );
    layMain.AddChild( txtViewNumber );
     
    //Add layout to app.     
    app.AddLayout( layMain ); 
} 

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
    if( txt=="ok" ) txtViewNumber.SetText( txtSum.GetText() );
     
    //Handle clear button. 
    else if( txt=="c" ) sum = ""; 
     
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

