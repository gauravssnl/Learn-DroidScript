var WIDTH = app.GetScreenWidth();
var HEIGHT = app.GetScreenHeight();
var BTNWIDTH;
var BTNHEIGHT
(function() {
    var lay = app.CreateLayout('Linear');
    lay.SetVisibility('Hide');
    var btn = app.CreateButton('');
    lay.AddChild(btn);
    app.AddLayout(lay);
    app.Wait(0.05);
    BTNWIDTH = btn.GetWidth();
    BTNHEIGHT = btn.GetHeight();
    app.DestroyLayout(lay);
})();



function CreateTextEdit(text, width, height, options) {
    var w = width || 1;
    var h = height || 1;
    var foo = arguments.callee;
    var lay = app.CreateLayout('Absolute');
    lay.SetSize(w, h);
    foo.scroll = app.CreateScroller(w, h);
    lay.AddChild(foo.scroll);
    var layScroll = app.CreateLayout('linear');
    foo.scroll.AddChild(layScroll);
    lay.TextEdit = app.CreateTextEdit(text, w, -1, options);
    foo.textEdit = lay.TextEdit;
    layScroll.AddChild(lay.TextEdit);
    foo.laySlider = app.CreateLayout('Absolute');
    foo.laySlider.HeightSlider = h;
    foo.laySlider.SetPosition(w - BTNWIDTH / 1.5, 0);
    foo.laySlider.SetBackColor('#22555555');
    foo.laySlider.SetVisibility('Hide');
    lay.AddChild(foo.laySlider);
    foo.laySlider.Slider = app.CreateImage('Img/slider.png', BTNWIDTH / 1.5, BTNHEIGHT);
    foo.laySlider.AddChild(foo.laySlider.Slider);
    var bg = app.CreateImage(null, BTNWIDTH / 1.5, h);
    bg.SetOnTouch(_OnTouchMoveSlider);
    foo.laySlider.AddChild(bg);
    foo.TimeSlider = new Date().getTime();
    foo.ScrollPos = 0;
    foo.ShowSlider = false;
    setInterval('_lookOnSlider()', 50);
    return lay;
}



function _OnTouchMoveSlider(ev) {
    var foo = CreateTextEdit;
    if (ev.action == 'Move') {
        var e = foo.textEdit.GetHeight() - 1;
        foo.scroll.ScrollTo(0, e * ev.Y);
    }
}


function _lookOnSlider() {
    var foo = CreateTextEdit;
    var e = foo.textEdit.GetHeight();
    var hedt = e - 1;
    
    if (hedt <= 1) {
        if (foo.ShowSlider) {
            foo.ShowSlider = false;
            foo.laySlider.Animate('FadeOut');
        }
        return;
    }
    var hscr = foo.scroll.GetScrollY();
    foo.laySlider.Slider.SetPosition(0, (foo.laySlider.HeightSlider - BTNHEIGHT) * Math.max(0, Math.min(1, hscr / hedt)));
    if (hscr != foo.ScrollPos) {
        foo.ScrollPos = hscr;
        foo.TimeSlider = new Date().getTime();
        if (!foo.ShowSlider) {
            foo.ShowSlider = true;
            foo.laySlider.Animate('FadeIn');
        }
    }
    else {
        var n = new Date().getTime();
        if (n - foo.TimeSlider > 1500) {
            foo.TimeSlider = n;
            if (foo.ShowSlider) {
                foo.ShowSlider = false;
                foo.laySlider.Animate('FadeOut');
            }
        }
    }
}







function OnStart() {
    lay = app.CreateLayout('linear', 'fillxy, vcenter');

    var txt = '';
    for (var i = 0; i<2000; i++) txt += 'Line #' + i + '\n';

    layEdt = CreateTextEdit('', 0.8, 0.5);
    layEdt.SetBackground("/Res/drawable/pattern_carbon", "repeat");
    lay.AddChild(layEdt);
    
    layEdt.TextEdit.SetText(txt); //layEdt.TextEdit - text edit object.

    app.AddLayout(lay);
}
