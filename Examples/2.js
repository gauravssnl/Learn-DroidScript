
//Init variables. 
var sum = "0"; 
var maxvalue = 99999999.99;
var round = 2;

//Called when application is started. 
function OnStart() 
{ 
    //Create a layout with objects vertically centered. 
    layMain = app.CreateLayout("linear", "FillXY");     

    //Create array to hold number buttons. 
    keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".","⇦", "C", "↺", "Ok"]; 
     
    //Create text control for displaying sum. 
    txtSum = app.CreateText(sum, 0.9, 0.1); 
    txtSum.SetTextSize(30); 
    txtSum.SetBackColor("#222222"); 
    txtSum.SetMargins(0, 0.45, 0, 0.01); 
    layMain.AddChild(txtSum); 
     
    //Create first row of buttons. 
    lay1st = app.CreateLayout("linear", "Horizontal");     
    for( i=0; i<4; i++) AddButton(lay1st, keys[i]); 
    layMain.AddChild(lay1st); 
     
    //Create second row of buttons. 
    lay2nd = app.CreateLayout("linear", "Horizontal");     
    for(i=4; i<8; i++) AddButton(lay2nd, keys[i]); 
    layMain.AddChild(lay2nd); 
     
    //Create third row of buttons. 
    lay3rd = app.CreateLayout("linear", "Horizontal");     
    for(i=8; i<12; i++) AddButton(lay3rd, keys[i]); 
    layMain.AddChild(lay3rd); 

    lay4rd = app.CreateLayout("linear", "Horizontal");     
    for(i=12; i<15; i++) AddButton(lay4rd, keys[i]); 
    layMain.AddChild(lay4rd);
     
    //Add layout to app.     
    app.AddLayout(layMain); 
} 

//Add a button to a given layout. 
function AddButton(lay, name) 
{ 
    w = name == "Ok" ? 0.45 : 0.225;
    btn = app.CreateButton(name, w, 0.1, "Gray"); 
    btn.SetOnTouch(btns_OnTouch); 
    btn.SetTextSize(20);
    lay.AddChild(btn); 
} 

//Called when user presses number buttons. 
function btns_OnTouch() 
{ 
     
    //Get button text. 
    btn = app.GetLastButton(); 
    var txt = btn.GetText();
    
     
    //Handle equals button. 
    if(txt == "Ok") true;
    //cancel
    else if(txt == "↺") {
        sum = "0";
        // .......
        }
    //clear
    else if(txt == "C") sum = "0";     
    //Handle clear button. 
    else if(txt == "⇦") {
        sum = sum.slice(0, -1); 
        if (sum == "") sum = "0"
        }
    else if(txt == ".") {
        if (sum.indexOf(".") != -1) txt = "";
        sum += txt; 
        }
    //Handle other buttons. 
    else {           
           if (sum == "0") sum = "";
           else if (eval(sum + txt) > maxvalue || sum.slice(sum.indexOf("."), -1).length == round) txt = "";
           sum += txt;
         }
     
    //Update display. 
    txtSum.SetText(sum);
}


