function inputDigital(callback, input_type, title, default_value) { 
    input_params = {
        sum: String(default_value || 0), 
        maxvalue: 99999999.99, 
        round: 2,
        callback: callback,
        flag_exit: false
        }
    var mode = Number(input_type!="float")
    layInputDigital = app.CreateLayout("linear", "FillXY");
    layInputDigital.SetBackColor("#dd111111");
    layInputDigital.SetVisibility("Hide")  
    var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "⇦", "C", "↺", "Ok"]; 
    var txt_title = app.CreateText(title, 0.9, 0.45, "Multiline");
    txt_title .SetTextSize(12);
    txt_title .SetTextColor("#dddddd");
    layInputDigital.AddChild(txt_title); 
    input_params.txtSum = app.CreateText(input_params.sum, 0.9, 0.1); 
    input_params.txtSum.SetTextSize(30);
    input_params.txtSum.SetTextColor("#aaaaaa");
    input_params.txtSum.SetMargins(0, 0, 0, 0.01); 
    layInputDigital.AddChild(input_params.txtSum); 
    var lay1st = app.CreateLayout("linear", "Horizontal");     
    for( i=0; i<4; i++) AddButton(lay1st, keys[i], input_type); 
    layInputDigital.AddChild(lay1st); 
    var lay2nd = app.CreateLayout("linear", "Horizontal");     
    for(i=4; i<8; i++) AddButton(lay2nd, keys[i], input_type); 
    layInputDigital.AddChild(lay2nd); 
    var lay3rd = app.CreateLayout("linear", "Horizontal");     
    for(i=8; i<([12, 13][mode]); i++) {
        if (input_type != "float" && i == 10) i++;
        AddButton(lay3rd, keys[i], input_type) } 
    layInputDigital.AddChild(lay3rd);
    var lay4rd = app.CreateLayout("linear", "Horizontal");     
    for(i= (input_type == "float") ?  12 : 13 ; i<15; i++) {
        AddButton(lay4rd, keys[i], input_type) }
    layInputDigital.AddChild(lay4rd);
    app.AddLayout(layInputDigital); 
    layInputDigital.Animate("SlideFromRight");
    app.EnableBackKey(false);

} 

function AddButton(lay, name, input_type) 
{ 
    if(name == "Ok")  w = (input_type == "float") ? 0.45 : 0.675;
    else w = 0.225;
    var btn = app.CreateButton(name, w, 0.1, "Gray"); 
    btn.SetOnTouch(btns_OnTouch); 
    btn.SetTextSize(20);
    lay.AddChild(btn); 
} 

function btns_OnTouch() { 
    var btn = app.GetLastButton(); 
    var txt = btn.GetText();
    if(txt == "Ok") {
        input_params.callback(input_params.sum);
        input_params.flag_exit = true
        layInputDigital.Animate("SlideToRight") }
    else if(txt == "↺") {
        layInputDigital.Animate("SlideToRight");
        input_params.flag_exit = true }
    else if(txt == "C") input_params.sum = "0"; 
    else if(txt == "⇦") {
        input_params.sum = input_params.sum.slice(0, -1); 
        if (input_params.sum == "") input_params.sum = "0" }
    else if(txt == "." && input_params.sum.indexOf(".") != -1) return;
    else {           
        if (input_params.sum == "0" && txt != ".") input_params.sum = "";
        else if (eval(input_params.sum + txt) > input_params.maxvalue) return;
        else if (input_params.sum.slice(input_params.sum.indexOf("."), -1).length == input_params.round) return;
        input_params.sum += txt }
    input_params.txtSum.SetText(input_params.sum);
}

// example
function Example() {
    layMain = app.CreateLayout("Linear", "FillXY");         
    arr = []
    for(i=0; i<6; i++) {
        arr[i] = app.CreateButton("0", 0.6, 0.1, "gray");
        arr[i].SetOnTouch(btn_OnTouch); 
        layMain.AddChild(arr[i]) }
    app.AddLayout(layMain)
}

function btn_OnTouch() {
     var btn = app.GetLastButton();
     indexTouch = arr.indexOf(btn) //индекс нажатой кн.
     title = "Введите значение для кнопки " + (indexTouch+1)
     inputDigital(btnSetText, "float", title, btn.GetText()) // вызов ф-ции ввода
} 

function btnSetText(text) {
   arr[indexTouch].SetText(text)
}

function OnBack() {
   if (input_params.flag_exit == true) app.Exit();
   else {
        layInputDigital.Animate("SlideToRight");
        input_params.flag_exit = true }
}

function OnStart() {
   Example() 
}





