

//глушим дебаггер DroidScript'а:
app.SetOnError(function(e){});


window.onerror = function(err, file, line) {
	if (!err) {
		this.SetBackColor('#30777777');
		setTimeout(__dialog.Dismiss, 200);
		if (this.result) {
			
			//здесь прописать свой email:
			var myEmail = 'myname@gmail.com';
			
			var headEmail = 'В программе "' 
				+ app.GetAppName() 
				+ '" v.' 
				+ app.GetVersion() 
				+ ' произошла ошибка';
			app.SendMail( myEmail, headEmail, this.textError );
		}
		return;
	}
	__dialog = app.CreateDialog('', 'NoTitle,NoCancel');
	var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
	layDlg.SetSize(0.95);
	layDlg.SetBackColor('White');
	__dialog.AddLayout(layDlg);
	var txtTitle = 'Oops!';
	var title = app.CreateText(txtTitle.big().bold(), 0.9, -1, 'left,html');
	title.SetTextColor('#3098ba');
	title.SetMargins(0, 0.02, 0, 0.02);
	layDlg.AddChild(title);
	var txtBody = 'В программе "' + app.GetAppName() + '" произошла ошибка.';
	txtBody += '\nОтправить отчет разработчику?';
	var body = app.CreateText(txtBody.big(), 0.91, -1, 'multiline,html');
	body.SetTextColor('#666666');
	body.SetMargins(0.02, 0.04, 0.02, 0.08);
	layDlg.AddChild(body);
	var layButtons = app.CreateLayout("linear", "horizontal,right" );
	layButtons.SetMargins(0, 0, 0, 0.01);
	layButtons.SetSize(0.9);
	var btn = app.CreateButton('Нет'.big(), -1, -1, 'html');
	btn.SetBackColor('#00000000');
	btn.SetTextColor('#3098ba');
	btn.SetOnTouch( arguments.callee );
	layButtons.AddChild(btn);
	var btn = app.CreateButton('Отчет'.big(), -1, -1, 'html');
	btn.textError = err + '\n' + file + '\n line: ' + line;
	btn.SetBackColor('#00000000');
	btn.SetTextColor('#3098ba');
	btn.SetOnTouch( arguments.callee );
	btn.result = true;
	layButtons.AddChild(btn);
	layDlg.AddChild(layButtons);
	__dialog.Show();
}

