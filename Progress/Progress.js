;(function() {
	for (;;) {
		var lay = app.CreateLayout("Linear");
		lay.SetVisibility('Hide');
		app.AddLayout(lay);
		var b = app.CreateButton();
		lay.AddChild(b);
		app.Wait(0.05);
		var h = +b.GetHeight();
		app.DestroyLayout(lay);
		if (h) break;
	}
	BTNHEIGHT = h;
})();


function progress(current, max) {
	if (typeof current != 'number') {
		progress.lay = app.CreateLayout('linear','fillxy, vcenter');
		progress.lay.SetBackColor('#60000000');
		var l = app.CreateLayout('absolute');
		progress.lay.AddChild(l);
		l.SetSize(0.9, BTNHEIGHT*2);
		var b = app.CreateButton('', 0.9, BTNHEIGHT*2, 'bar-dark');
		l.AddChild(b);
		progress.img = app.CreateImage(null, 0.8, BTNHEIGHT);
		progress.img.SetPaintColor('#77aaff');
		progress.img.SetLineWidth(3);
		l.AddChild(progress.img);
		progress.img.SetPosition(0.05, 0);
		var lh = app.CreateLayout('linear','horizontal');
		lh.SetSize(0.8);
		l.AddChild(lh);
		lh.SetPosition(0.05, BTNHEIGHT*1.1);
		progress.textp = app.CreateText('', 0.3, -1, 'left,bold');
		progress.textp.SetTextColor('#ffffff');
		lh.AddChild(progress.textp);
		progress.text = app.CreateText('', 0.5, -1, 'right,bold');
		progress.text.SetTextColor('#ffffff');
		lh.AddChild(progress.text);
		progress.lay.SetVisibility('Hide');
		
		app.AddLayout(progress.lay);
		progress.lay.Animate('fadein', null, 200);
	}
	else {
		progress.img.DrawLine(0, 0.5, 1/max*current, 0.5);
		progress.textp.SetText(Math.round(current/max*100)+'%');
		progress.text.SetText(current + '/' + max);
	}
	if (current == max) 
		setTimeout(function() {
			app.DestroyLayout(progress.lay);
		}, 100);
}

//sample
lay = app.CreateLayout('linear', 'fillxy');
var scroll = app.CreateScroller();
var layScroll = app.CreateLayout('linear');
scroll.AddChild(layScroll);
lay.AddChild(scroll);
app.AddLayout(lay);

progress();

for (var i=0; i<200; i++) {
	var lhrz = app.CreateLayout('linear', 'horizontal');
	lhrz.SetSize(1);
	var t = app.CreateText('Item #' + (+i+1), 0.68, -1, 'left');
	lhrz.AddChild(t);
	t = app.CreateTextEdit('', 0.3, -1, 'number');
	t.SetHint('0.00');
	lhrz.AddChild(t);
	layScroll.AddChild(lhrz, 0);

	progress(+i+1, 200);

}
