
var TextSize = 12;
var HEIGHT = app.GetDisplayHeight()

function  _sz()
{
    var lay = app.CreateLayout("Linear", "Top,FillXY");
    lay.SetVisibility('Hide');
    app.AddLayout(lay);
    var b = app.CreateButton('<big>❯</big>', -1, -1, "html");
    b.SetVisibility('Hide');
    lay.AddChild(b);
    var tmp = app.CreateButton('', -1, 0.1);
    lay.AddChild(tmp);
    app.Wait(0.05);
    var h = b.GetHeight();
    var w = b.GetWidth();
    var h2 = tmp.GetHeight();
    app.RemoveLayout(lay);
    return [h, h2, w]
}

var HButton2 = _sz()[1];


function inputDigital(callback, input_type, title, default_value, rnd) 
{ 
    var T = 'HButton2 = '+HButton2;
    input_params = {
        sum: String(default_value || 0), 
        maxvalue: 99999.99, 
        callback: callback,
        flag_exit: false
        }
    input_params.round = rnd ? rnd : 2;
    var mode = Number(input_type!="float")
    layInputDigital = app.CreateLayout("linear", "FillXY,bottom");
    layInputDigital.SetBackGradient('#333333', '#555555');
    var keys = ["↺", "C", "Ok", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "⇦"]; 
    var txt_title = app.CreateText('<big>'+title+'</big>', 0.98, -1, "Multiline,html");
    txt_title.SetPadding(0, 0.005, 0, 0.005); 
    txt_title.SetVisibility('hide');
    txt_title .SetTextColor("#eeeeee");
    txt_title.SetBackGradient('#66444444', '#66222222');
    layInputDigital.AddChild(txt_title); 
    var l = app.CreateLayout("linear", "Horizontal,right");
    layInputDigital.AddChild(l);
    input_params.txtSum = app.CreateText(input_params.sum, 0.9, -1, 'lego'); 
    input_params.txtSum.SetTextSize(TextSize * 1.6);
    input_params.txtSum.SetTextColor("#444433");
    input_params.txtSum.SetMargins(0, 0.005, 0, 0.005); 
    layInputDigital.AddChild(input_params.txtSum); 
    var lay1st = app.CreateLayout("linear", "Horizontal");
    for(var i=0; i<3; i++) AddButtonInput(lay1st, keys[i], input_type); 
    layInputDigital.AddChild(lay1st); 
    var lay2nd = app.CreateLayout("linear", "Horizontal");
    for (var i=3; i<7; i++) AddButtonInput(lay2nd, keys[i], input_type); 
    layInputDigital.AddChild(lay2nd); 
    var lay3rd = app.CreateLayout("linear", "Horizontal");
    for(var i=7; i<11; i++) AddButtonInput(lay3rd, keys[i], input_type) ;
    layInputDigital.AddChild(lay3rd);
    var lay4rd = app.CreateLayout("linear", "Horizontal");
    lay4rd.SetMargins(0, 0, 0, 0.001); 
    for(var i= 11; i<15; i++) {
        if (input_type != "float" && i == 13) i++;
        AddButtonInput(lay4rd, keys[i], input_type) ;
        }
    layInputDigital.AddChild(lay4rd);
    app.AddLayout(layInputDigital); 
    app.Wait(0.05);
    var sz = 1 - txt_title.GetHeight() - input_params.txtSum.GetHeight()  - HButton2*4 - 0.02;
    
    var t = app.CreateText('', 0.45, sz);
    l.AddChild(t);
    var lst = app.CreateList('1,2,3,4,5,6', 0.45, sz);
    lst.SetMargins(0, 0.005, 0, 0); 
    lst.SetDivider(2/HEIGHT, '#888888');
    lst.SetBackGradient('#40333333', '#40111111');
    l.AddChild(lst);
    txt_title.SetVisibility('show');
} 



function AddButtonInput(lay, name, input_type) { 
    if(name == "⇦")  w = (input_type == "float") ? 0.225 : 0.45;
    else if (name == "Ok") w = 0.45;
    else w = 0.225;
    var btn = app.CreateButton(name, w, 0.1, 'gray' ); 
    
    btn.SetTextSize(TextSize+3);
    if (name == "Ok") btn.SetTextColor('#005000');
    else if (name == "C" || name == "⇦") btn.SetTextColor('#900000');
    lay.AddChild(btn); 
} 

inputDigital()
