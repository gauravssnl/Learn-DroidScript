
const TIME_ANIMATE = 160;
var _listDialogObjects = [];


function _CustomDialog(body, title, options) {
	var callback;
	var yesText;
	var noText;
	var titleTextColor;
	var bodyTextColor;
	var bottomKeyTextColor;
	var titleTextShadow;
	var bodyTextShadow;
	var bottomKeyTextShadow;
	var style;
	var animate;
	var adjustColor;
	
	
	var objTitle = function() {
		title = String(title).replace(/\n+/gm, '<br>');
		if(title.length > 100) {
			title = title.slice(0, 100) + '...';
		}
		var _title = app.CreateText(title.big(), 0.85, -1, 'Html, Left, Multiline');
		_title.SetPadding(0, 0.02, 0, 0.02);
		_title.SetTextColor(titleTextColor);
		_title.SetTextShadow.apply(_title, titleTextShadow);
		return _title;
	}
	
	
	var createBtnCustom = function(w, h, opt) {
		var btnCustom = app.CreateButton('', w, h, opt);
		btnCustom.AdjustColor.apply(btnCustom, adjustColor);
		if (opt == 'custom') {
			btnCustom.SetStyle.apply(btnCustom, style);
		}
		return btnCustom;
	}
	
	
	var objBtn = function() {
		var btnOk = app.CreateButton(yesText.big(), noText?0.43:0.86, -1, 'Html,Singleline,Nopad');
		btnOk.SetTextColor(bottomKeyTextColor);
		btnOk.SetTextShadow.apply(btnOk, bottomKeyTextShadow);
		btnOk.SetEllipsize('End');
		btnOk.SetOnTouch(function(){onTouchBtn.call(btnOk, 'Yes')});
		btnOk.SetBackColor('#00000000');
		var layHrz = app.CreateLayout('Linear', 'Horizontal, Right');
		layHrz.SetSize(0.86);
		layHrz.SetPadding(0, 0.01, 0, 0.02);
		if (noText) {
			var btnNo = app.CreateButton(noText.big(), 0.43, -1, 'Html,Singleline,Nopad');
			btnNo.SetTextColor(bottomKeyTextColor);
			btnNo.SetTextShadow.call(btnNo, bottomKeyTextShadow);
			btnNo.SetEllipsize('End');
			btnNo.SetOnTouch(function(){onTouchBtn.call(btnNo, 'No')});
			btnNo.SetBackColor('#00000000');
			layHrz.AddChild(btnNo);
		}
		layHrz.AddChild(btnOk);
		return layHrz;
	}
	
	
	var onTouchBtn = function() {
		this.SetEnabled(false);
		var args = arguments;
		setTimeout(function(){
			while(_listDialogObjects.length) {
				_listDialogObjects.pop().Dismiss();
			}
			callback.apply(null, args);
		}, 100);
	}
	
	
		this.SetContent = function(bd, tit) {
		body = bd;
		title = tit;
	}
	
	
	this.SetOptions = function(opts) {
		options = opts;
	}
	
	
	this.SetOnTouch = function(clb) {
		if (typeof clb == 'function') {
			callback = clb;
		}
	}
	
	
	this.SetBottomKeyTextColor = function(clr) {
		if (typeof clr == 'string') {
			bottomKeyTextColor = clr;
		}
	}
	
	
	this.SetBottomKeyTextShadow = function(rad, dx, dy, col) {
		bottomKeyTextShadow = arguments;
	}
	
	
	this.SetTitleTextColor = function(clr) {
		if (typeof clr == 'string') {
			titleTextColor = clr;
		}
	}
	
	
	this.SetTitleTextShadow = function(rad, dx, dy, col) {
		titleTextShadow = arguments;
	}
	
	
	this.SetBodyTextShadow = function(rad, dx, dy, col) {
		bodyTextShadow = arguments;
	}
	
	
	this.SetBodyTextColor = function(clr) {
		if (typeof clr == 'string') {
			bodyTextColor = clr;
		}
	}
 	
	
	this.SetTextYes = function(txt) {
		if (typeof txt == 'string') {
			yesText = txt;
		}
	}
	
	
	this.SetTextNo = function(txt) {
		if (typeof txt == 'string') {
			noText = txt;
		}
	}
	
	
	this.SetStyle = function( clr1, clr2, radius, strokeClr, strokeWidth, shadow) {
		style = arguments;
	}
	
	
	this.AdjustColor = function(p1, p2, p3) {
		adjustColor = arguments;
	}
	
	
	this.SetAnimate = function(yesno) {
		animate = !!yesno;
	}
	
	
	this.ShowDialog = function() {
		options = String(options).toLowerCase();
		body = String(body)
			.replace(/\n+/gm, '<br>');
		var notitle = ~options.indexOf('notitle');

		var objText = function() {
			var opts = 'Html, Multiline';
			if (~options.indexOf('left'))
				opts += ',Left';
			var _text = app.CreateText(body.big(), 0.9, -1, opts);
			_text.SetTextColor(bodyTextColor);
			_text.SetTextShadow.apply(_text, bodyTextShadow);
			_text.SetPadding(0.02, notitle?0.02:0, 0.02, 0);
			return _text;
		}
		
		for(var i=0; i<20; i++) {
			var lay = app.CreateLayout('Linear');
			lay.SetVisibility('Hide');
			app.AddLayout(lay);
			if (!notitle) {
				var _title = objTitle();
				lay.AddChild(_title);
			}
			var btn = objBtn();
			lay.AddChild(btn);
			var _text = objText();
			lay.AddChild(_text);
			app.Wait(0.05);
			if (!notitle) 
				var titleHeight = +_title.GetHeight();
			else var titleHeight = 0;
			var textHeight = +_text.GetHeight();
			var btnHeight = +btn.GetHeight();
			app.DestroyLayout(lay);
			if((notitle?true:titleHeight) && textHeight && btnHeight) {
				break;
			}
		}

		textHeight = Math.min(0.95-titleHeight-btnHeight, textHeight);
		var sumHeight = titleHeight + textHeight + btnHeight;
	
		var opts = 'NoTitle';
		if (~options.indexOf('nodim'))
				opts += ',NoDim';
		if (~options.indexOf('nocancel'))
				opts += ',NoCancel';
		var Dialog = app.CreateDialog('', opts);
		_listDialogObjects.push(Dialog);
		Dialog.SetBackColor('#00000000');
		var layDlg = app.CreateLayout('Absolute');
		Dialog.AddLayout(layDlg);

		var opt = 'bar-dark';
		var opts = [
			'grayxs','gray',
			'lego-bw','lego-screen','lego',
			'alum','bar-green','bar-gray',
			'custom'];
		for(var i in opts) {
			var o = opts[i]
			if (~options.indexOf(o)) {
				opt = o;
				break;
			}
		}
		var btnCustom = createBtnCustom(0.95, sumHeight, opt);
		layDlg.AddChild(btnCustom);
		var lay = app.CreateLayout('Linear');
		lay.SetSize(0.95, sumHeight);
		if (!notitle) {
			lay.AddChild(objTitle());
		}
		var scroll = app.CreateScroller(0.9, textHeight, 'scrollfade');
		lay.AddChild(scroll);
		var layScroll = app.CreateLayout('Linear');
		layScroll.AddChild(objText());
		scroll.AddChild(layScroll);
		lay.AddChild(objBtn());
		layDlg.AddChild(lay);
		if (animate) {
			layDlg.SetVisibility('Hide');
			layDlg.Animate('FadeIn', null, TIME_ANIMATE);
		}
		Dialog.Show();
	}
}



app.CreateCustomDialog = function(body, title, options) {
	return new _CustomDialog(body, title, options);
}


