
function dialogDismiss() {
	while(CreateListDialog.listDialogs.length) {
		CreateListDialog.listDialogs.pop().Dismiss();
	}
}


CreateListDialog.listDialogs = [];
function CreateListDialog(callback, head, list, callbackLong) {
	if (typeof callback == 'string') {
		dialogDismiss();
		if (typeof this.func == 'function') {
			this.func(callback, callbackLong);
		}
  }
	else { 
		var Dialog = app.CreateDialog('', 'NoTitle');
		CreateListDialog.listDialogs.push(Dialog);
		Dialog.SetOnCancel(dialogDismiss);
		var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
		layDlg.SetBackColor('#fafafa');
		layDlg.SetPadding(0, 0.005, 0, 0.005);
		Dialog.AddLayout(layDlg);
		var title = app.CreateText(head
			.replace(/\n/gm, '<br>').big().bold(),
			0.9, -1, 'multiline,html,left');
		title.SetTextColor('#ee8822');
		title.SetMargins(0, 0.02, 0, 0.02);
		layDlg.AddChild(title);
		var line = app.CreateText('', 0.95, 1.9/HEIGHT);
	line.SetBackColor('#ee8822');
		layDlg.AddChild(line);
		var lst = app.CreateList(list, 0.9, -1, 'html,normal');
		lst.SetTextMargins(0, 0.005, 0, 0.005);
		layDlg.AddChild(lst);
		lst.func = callback;
		lst.SetOnLongTouch(CreateListDialog);
		lst.SetTextColor('#555555');
		lst.SetTextColor2('#555555');
		if (typeof callbackLong == 'function') {
			lst.SetOnTouch(CreateListDialog);
		}
		Dialog.Show();
	}
}