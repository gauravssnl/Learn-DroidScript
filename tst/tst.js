
function inputText(text, w, h, options) {
	var btn = app.CreateButton('', w, h, 'custom');
	btn.SetStyle('#ffffcc', '#ffddcc', 18, '#ff9955', 2, 1);
	var lay = app.CreateLayout('absolute');
	lay.AddChild(btn);
	var layM = app.CreateLayout('linear');
	layM.SetSize(w);
	lay.AddChild(layM);
	var edt = app.CreateTextEdit(text, w - 0.05, h );
	edt.SetCursorColor('#2299ee');
	edt.SetBackColor('#00000000');
	edt.SetTextColor('#555555');
	edt.SetHint('Enter text');
	layM.AddChild(edt);
	edt.lay = lay;
	return edt;
}


var lay = app.CreateLayout('linear', 'fillxy');
lay.AddChild(app.CreateText('TextEdit'.big(), -1, -1, 'html'));
var edt = inputText('', 0.8, 0.4);
edt.Focus();
lay.AddChild(edt.lay);
app.AddLayout(lay);