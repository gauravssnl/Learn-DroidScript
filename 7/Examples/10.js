function OnStart() {
    dlg = app.CreateDialog("Опции:");
    layDlg = app.CreateLayout("linear");
    layDlg.SetPadding(0.02, 0, 0.02, 0.02);
    dlg.AddLayout(layDlg);
    var list = 'Item1,Item2';
    lstDlg = app.CreateList(list, 0.8, -1);
    lstDlg.SetTextSize(25);
    lstDlg.SetTextColor("#dddddd");
    lstDlg.SetOnTouch(OnTouch);
    layDlg.AddChild(lstDlg);
    dlg.Show();
}

function OnTouch(item) {
    dlg.Hide();
    app.RemoveLayout(layDlg);
    app.Alert(item);
}