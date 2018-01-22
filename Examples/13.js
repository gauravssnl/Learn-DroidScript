
function OnStart()
{
    setNumber(show, 'float', 'Input float:', 666);
}


 function setNumber(callback, mode, title, num) {
    if (num == undefined) num = '';
    Dialog = app.CreateDialog(title ? title : "");
    var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient('#111111', "#333333");
    layDlg.SetPadding(0.02, 0, 0.02, 0.02);
    Dialog.AddLayout(layDlg);
    var edt = app.CreateTextEdit(num, 0.8, -1, 'Number,vcenter');
    edt.SetOnChange(_edtOnTouch);
    edt.inputType = mode;
    edt.SetHint('0');
    edt.SetCursorPos(String(num).length);
    var btn = app.CreateButton("OK", 0.5, -1, 'alum');
    btn.SetOnTouch(setNumberOnTouch);
    btn.callback = callback;
    btn.textObj = edt;
    layDlg.AddChild(edt);
    layDlg.AddChild(btn);
    Dialog.Show();
}



function _edtOnTouch() 
{
    var text = this.GetText();
    if (text.length && !text.match(this.inputType == 'integer'? /\d+$/ : /[\d\.]+$/))  return this.Undo();
    else if (this.inputType == 'float' && text.indexOf('.') != text.lastIndexOf('.'))  return this.Undo();
    else if (text == '.') {
        text = '0.';
        this.SetText(text);
        this.SetCursorPos(2);
        }
    else if (text.match(/0\d+/)) {
        text = text.slice(1);
        this.SetText(text);
        this.SetCursorPos(text.length);
        }
    var f = text.split('.')[1];
    if (Number(text ? text : 0) > 99999.99 || f && f.length > 2) return this.Undo();
    
}



function setNumberOnTouch() {
   Dialog.Dismiss();
   var text = this.textObj.GetText();
   this.callback(Number(text.length ? text : 0));
}



function show(value) {
    app.ShowPopup(value);
}