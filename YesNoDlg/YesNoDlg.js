app.LoadScript('customDialogs.js');


function OnStart() {
	var lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	lay.SetBackground('/Res/drawable/pattern_carbon', 'repeat');

	var items = [
		'Стиль "bar-dark" (по-умолчанию)',
		'Стиль "bar-green" с применением метода AdjustColor',
		'Стиль "Alum" с применением метода AdjustColor',
		'Стиль "Lego"  с применением метода AdjustColor',
		'Стиль "custom" (пользовательский стиль)'
	];
	var list = app.CreateList(items, 0.95);
	list.SetOnTouch(showDialogs);
	lay.AddChild(list);
	app.AddLayout( lay );
}


function showDialogs(it, b, ic, ind) {
	if (ind == 0) {
		var dlg = app.CreateCustomDialog('Здесь могла быть Ваша реклама.', 'Стиль bar-dark'.bold(), 'bar-dark');
		dlg.SetTitleTextColor('#ff9922');
		dlg.SetBodyTextColor('#dddddd');
		dlg.SetBottomKeyTextColor('#dd8800');
		dlg.SetTextYes('ОК');
		dlg.SetTextNo('Отмена');
		//dlg.SetAnimate(true);
		dlg.SetOnTouch(app.ShowPopup);
		dlg.ShowDialog();
	}

	else if (ind == 1) {
		var txt = 'Oops! <img src="Img/smile.png"> \nВ программе Hello, world произошла ошибка.';
		var dlg = app.CreateCustomDialog(txt, 'Стиль bar-green с применением метода AdjustColor', 'bar-green');
		dlg.SetTitleTextColor('#88bb88');
		dlg.SetBodyTextColor('#dddddd');
		dlg.SetBottomKeyTextColor('#889988');
		dlg.SetTextYes('Епрст!'.bold());
		//dlg.SetAnimate(true);
		dlg.AdjustColor(-30, -60, -60);
		//dlg.AdjustColor(-80, -60, -60);
		dlg.SetOnTouch(app.ShowPopup);
		dlg.ShowDialog();
	}



	else if (ind == 2) {
		var dlg = app.CreateCustomDialog('Закрыть программу?', 'Стиль alum с применением метода AdjustColor', 'alum');
		dlg.SetTitleTextColor('#ff9933');
		dlg.SetBodyTextColor('#dddddd');
		dlg.SetBottomKeyTextColor('#ee7722');
		dlg.SetTextYes('Да');
		dlg.SetTextNo('Нет');
		dlg.SetAnimate(true);
		dlg.AdjustColor(0, 0, -60);
		dlg.SetOnTouch(app.ShowPopup);
		dlg.ShowDialog();
	}
	

	else if (ind == 3) {
		var txt = 'Oops!\nВ программе Hello, world произошла ошибка. Отослать текст с ошибкой разработчику?';
		var dlg = app.CreateCustomDialog(txt, '<img src="Img/smile.png"> Стиль lego с применением метода AdjustColor', 'lego');
		dlg.SetTitleTextColor('#ffffdd');
		dlg.SetBodyTextColor('#dddddd');
		dlg.SetBottomKeyTextColor('#ddddaa');
		dlg.SetTextYes('Email разработчику');
		dlg.SetTextNo('Да пошел он');
		dlg.SetAnimate(true);
		dlg.AdjustColor(30, -70, -80);
		//dlg.AdjustColor(-30, -70, -80);
		//dlg.AdjustColor(150, -70, -80);
		dlg.SetOnTouch(app.ShowPopup);
		dlg.ShowDialog();
	}


	else if (ind == 4) {
		var dlg = app.CreateCustomDialog(null, null, 'custom, left');
		var methods = [];
		for (var k in dlg) {
			methods.push(k);
		}
		var body = 'dlg = app.CreateCustomDialog(str body, str title, str options)\n<br>';
		body += '<i>Методы:\n</i>' + methods.join('\n');
		body += '<br>\n<i>Опции:</i>\n';
		body += "grayxs, gray, lego-bw, lego-screen, lego, alum, bar-green, bar-gray, custom;\nnotite, nodim, nocancel, left";
		dlg.SetContent(body, 'Стиль custom');
		dlg.SetTitleTextColor('#ff9933');
		dlg.SetBodyTextColor('#dddddd');
		dlg.SetBottomKeyTextColor('#aaaa99');
		dlg.SetTextYes('OK');
		dlg.SetTextNo('Cancel');
		dlg.SetStyle('#333333', '#111111', 20, '#553300', 1, 1);
		//dlg.SetAnimate(true);
		dlg.SetOnTouch(app.ShowPopup);
		dlg.ShowDialog();
	}
}
