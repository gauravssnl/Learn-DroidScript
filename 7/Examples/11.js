function OnStart() {
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );    
    for(item in {'About':null, 'Input text':null}) {
      var btn = app.CreateButton(item, 0.8, 0.1, 'alum');
      btn.SetTextSize(16);
      btn.SetOnTouch(OnTouch);
      lay.AddChild(btn);
      }
    app.AddLayout( lay );
}

function OnTouch() {
  ((this.GetText()) == 'About' ? About : InputText)();
}

function About(){
    Dialog = app.CreateDialog('О программе');
    var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient('#111111', '#333333');
    layDlg.SetPadding(0.02, 0, 0.02, 0.02);
    Dialog.AddLayout(layDlg);
    var text = "<font color='#eeeedd'><b>Object</b> " +"v.0.1.Программа для строителей-отделочников." +
      "
Разработчик: <b>dimy44</b>.

Для замечаний, " +
      "пожеланий итп:
мой</font> <a href='http://m.dimonvideo.ru/0/name/dimy44'" +
      ">профиль</a> <font color='#eeeedd'>на DimonVideo.ru," +
      "
мой</font> <a href='mailto:dimy4496@gmail.com?" +
      "subject=Программа Object'>E-mail</a><font color='#eeeedd'>.</font>";
    var txtDlg = app.CreateText(text, 0.9, -1, "Html,Link");
    txtDlg.SetTextSize(16);
    layDlg.AddChild(txtDlg);
    Dialog.Show();
}

function InputText() {
    Dialog = app.CreateDialog("Введите текст:");
    var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient('#111111', '#333333');
    layDlg.SetPadding(0.02, 0, 0.02, 0.01);
    Dialog.AddLayout(layDlg);
    edt = app.CreateTextEdit('', 0.9, -1);
    edt.SetCursorPos(item.length);
    var btn = app.CreateButton("OK", 0.5, -1, 'alum');
    btn.SetOnTouch(resultInputText);
    btn.SetMargins(0, 0.01, 0, 0);
    layDlg.AddChild(edt);
    layDlg.AddChild(btn);
    Dialog.Show();
}

function resultInputText() {
  Dialog.Hide();
  var text = edt.GetText();
  app.ShowPopup(text);
}