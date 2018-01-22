
function OnStart()
{
    lay = app.CreateLayout( "linear", "VCenter,FillXY" ); 
    edt = app.CreateTextEdit( "", 0.4, -1 , "number,vcenter");
    edt.SetOnChange(edtOnTouch);
    edt.SetTextColor('#dddddd');
    edt.SetHint('0');
    edt.inputType = 'integer';    
    //edt.inputType = 'float';
    lay.AddChild( edt );
    app.AddLayout(lay);
}

function edtOnTouch() 
{
    var text = this.GetText();
    if (this.inputType == 'integer' && text.indexOf('.') != -1) return this.Undo();
    else if (text == '00') return this.Undo();
    else if (text == '.') {
        text = '0.';
        this.SetText(text);
        this.SetCursorPos(2);
        }
    try {var res = eval(text)}
    catch(er) {return this.Undo()}
    var f = text.split('.')[1];
    if (res > 99999.99 || f && f.length > 2) return this.Undo(); // ограничение от безбашенного ввода
    // что-то делаем с res.
}