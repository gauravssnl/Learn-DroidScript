(function() {
    var lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    lay.SetVisibility('Hide');
    var btn = app.CreateButton('');
    lay.AddChild(btn);
    app.AddLayout(lay);
    app.RemoveLayout(lay);
    var p = 0.55;
    BTN = {};
    BTN['height'] = btn.GetHeight() * 0.9;
    BTN['padding'] = (BTN['height'] - app.GetTop() * p) / 2.2;
    BTN['textSize'] = app.GetTop() * p * app.GetScreenHeight();
})();


App.prototype.CreateTitle = function(title, end) {
    var top = this.GetTop();
    var text_size = this.GetScreenHeight() * top * 0.62;
    var lay = this.CreateLayout('linear', 'filly,vcenter');
    lay.SetSize(1, top);
    lay.SetBackGradient('#aaaaaa', '#666666');
    var text = this.CreateText(title, 0.98, -1, 'left,bold');
    text.SetTextSize(text_size, 'px');
    text.SetEllipsize(end ? end + '' : 'end');
    text.SetTextShadow( 1, 1, 1, "#000000" ); 
    text.SetTextColor('#eeeeee');
    lay.AddChild(text);
    return lay;
}


App.prototype.CreateBtn = function(text, width) {
    var btn = this.CreateText(text, width, BTN['height']);
    btn.SetPadding(0.005, BTN['padding'], 0.005, 0);
    btn.SetTextSize(BTN['textSize'], 'px');
    btn.SetOnTouch(_OnTouchMyBtn);
    btn.SetEllipsize('end');
    return btn;
}


function _OnTouchMyBtn(ev) {
    var f = arguments.callee;
    if (ev.action == 'Down') {
        this.SetBackColor('#0088aa');
        f[this] = new Date().getTime();
    }
    else if (ev.action == 'Move') {
        var t =  new Date().getTime() - f[this];
        var hex = function(x) {
            x = x.toString(16);
            if (x.length==1) x = '0' + x;
            return x;
        }
        if (t >= 645) {
            var q = 900 - t;
            if (q > 0) {
                this.SetBackColor('#'+hex(q)+'0088aa')
            }
        }
        if (f[this]) {
            if (ev.X < 0 || ev.X > 1 || ev.Y < 0 || ev.Y > 1) {
                f[this] = false;
                this.SetBackColor('#00000000');
            }
            else if (t >= 900) {
                f[this] = false;
                this.SetBackColor('#00000000');
                if (typeof this.callbackLong == 'function') this.callbackLong();
                else if (typeof this.callback == 'function') this.callback();
            }
        }
    }
    else if (ev.action == 'Up') {
        this.SetBackColor('#00000000');
        if (f[this]) {
            f[this] = false;
            if (typeof this.callback == 'function') this.callback();
        }
    }
}

function AddLineVertical(lay) {
    var line = app.CreateText('', 2.3/app.GetScreenHeight(), -1, 'filly');
    line.SetMargins(0, 0.005, 0, 0.005)
    line.SetBackColor('#55999999');
    lay.AddChild(line);
    return line;
}


function OnStart()
{
    var lay = app.CreateLayout( "Linear", "FillXY" );
    var title = app.CreateTitle('Title');
    lay.AddChild(title);
    for (var i=0, l=[]; i<100; l.push("item "+i), i++);
    var lst = app.CreateList(l, 1, 1-app.GetTop()-BTN['height']);
    lay.AddChild( lst );
    var layBtn = app.CreateLayout('Linear', 'Horizontal, fillX');
    layBtn.SetBackColor('#444444');
    lay.AddChild(layBtn);
    var b = app.CreateBtn('Menu', 0.25);
    b.callback = function() {app.ShowPopup("Menu", "Short")};
    b.callbackLong = function() {app.ShowPopup("Menu Long", "Short")};
    layBtn.AddChild(b);
    AddLineVertical(layBtn);
    b = app.CreateBtn('Calculator', 0.25);
    b.callback = function() {app.ShowPopup("Calculator", "Short")};
    b.callbackLong = function() {app.ShowPopup("Calculator Long", "Short")};
    layBtn.AddChild(b);
    AddLineVertical(layBtn);
    b = app.CreateBtn('reference', 0.25);
    b.callback = function() {app.ShowPopup("reference", "Short")};
    b.callbackLong = function() {app.ShowPopup("reference Long", "Short")};
    layBtn.AddChild(b);
    AddLineVertical(layBtn);
    b = app.CreateBtn('Done', 0.25);
    b.callback = function() {app.ShowPopup("Done", "Short")};
    b.callbackLong = function() {app.ShowPopup("Done Long", "Short")};
    layBtn.AddChild(b);
    app.AddLayout( lay );
}
