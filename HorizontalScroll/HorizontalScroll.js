
function OnStart()
{
    lay = app.CreateLayout( "Absolute");
    lay.SetSize(1, 1);
    lay.SetBackColor("#ffffff");
    Scroll = app.CreateHorizontalScroll();
    btns = Scroll.GetLayout();
    for (var i=0; i<50; i++) Scroll.AddButton(i);
    lay.AddChild(btns);
    btns.SetPosition(0, 1 - Scroll.GetHeight());
    var layText = app.CreateLayout("Linear");
    layText.SetBackColor("#dddddd");
    edtscroll = app.CreateScroller(1, 1 - Scroll.GetHeight());
    lay.AddChild(edtscroll);
    edt = app.CreateTextEdit('q\nw\ne\nrt\nyu\niasdfgh', 1, -1);
    edt.SetTextColor("#333333");
    edt.Focus();
    layText.AddChild(edt);
    edtscroll.AddChild(layText);
    edtscroll.SetPosition(0, 0, 1, 1 - Scroll.GetHeight());
    app.AddLayout( lay );
    app.SetOnShowKeyboard(OnShowKeyboard);
    
}


function _testEdt() {
    var lay = app.CreateLayout("linear");
    var e = app.CreateTextEdit(edt.GetText().slice(0, edt.GetCursorPos()));
    var s = app.CreateScroller(1);
    s.AddChild(e)
    lay.AddChild(s);
    lay.SetVisibility("Hide");
    app.AddLayout(lay);
    app.Wait(0.05);
    var h = e.GetHeight() ;
    app.DestroyLayout(lay);
    return h;
}


function _HorizontalScroll() {
    this._obj = {};
    this._obj.btns = [];
    this._obj.callback = null;
    this._obj.longcallback = null;
    this._obj.width = app.GetScreenWidth();
    this._obj.height = app.GetScreenHeight();
    var lay = app.CreateLayout('Linear');
    lay.SetVisibility('Hide');
    var btn = app.CreateButton('');
    lay.AddChild(btn);
    var txt = app.CreateText('Ay');
    lay.AddChild(txt);
    app.AddLayout(lay);
    app.Wait(0.05);
    this._obj.btnwidth = btn.GetWidth();
    this._obj.btnheight = btn.GetHeight() * 0.9;
    this._obj.txtheight = txt.GetHeight();
    app.DestroyLayout(lay);
    this._obj.lay = app.CreateLayout("Linear", "FillX, VCenter, Left");
    this._obj.lay.SetBackColor("#999999");
    this._obj.scroll = app.CreateScroller(-1, this._obj.btnheight + 4 / this._obj.height);
    this._obj.layScroll = app.CreateLayout("Linear", "Horizontal, Left");
    this._obj.scroll.AddChild(this._obj.layScroll);
    this._obj.lay.AddChild(this._obj.scroll);


    this.GetHeight = function() {
        return this._obj.btnheight + 4 / this._obj.height;
    }


    this.GetScreenHeight = function() {
        return this._obj.height;
    }



    this.AddButton = function(text) {
        var btn = app.CreateText(text, -1, this._obj.btnheight);
        btn.SetPadding(0.03, this._obj.btnheight / 2 - this._obj.txtheight / 2, 0.03, 0);
        btn.SetMargins(2 / this._obj.width, 2 / this._obj.height, 2 / this._obj.width, 2 / this._obj.height);
        btn.SetTextColor("#333333");
        btn.SetBackColor("#fffffa");
        btn.SetOnTouch(_OnTouch);
        btn._this = this;
        this._obj.layScroll.AddChild(btn);
        this._obj.btns.push(btn);
    }
    
    this.SetOnTouch = function(f) {
        this._obj.callback = f;
    }
    
    this.GetLayout = function() {
        return this._obj.lay;
    }
}

function OnShowKeyboard(p) {
    
    if (p) {
        var k = app.GetKeyboardHeight() / Scroll.GetScreenHeight();
        var y = _testEdt() - edtscroll.GetScrollY();
        if (y > 1-k) k -= y - 1 + k;
        btns.SetPosition(0, 1 - Scroll.GetHeight() - k);
        edtscroll.SetPosition(0, 0, 1, 1 - Scroll.GetHeight() - k);
        
    }
    else {
        btns.SetPosition(0, 1 - Scroll.GetHeight());
        edtscroll.SetPosition(0, 0, 1, 1 - Scroll.GetHeight());
    }
}

function _OnTouch(ev) {
    if (ev.action == "Down") {
        this.time = new Date().getTime();
        this.X = ev.X;
        this.flag = true;
        this.col = false;
    }
    else if (ev.action == "Move") {
        if (!this.flag) return;
        if (ev.X != this.X) {
            this.flag = false;
            if (this.col) {
                this.SetBackColor("#fffffa");
                this.col = false;
            }
            return;
        }
        var t = new Date().getTime() - this.time;
        if (t > 150) {
            if (!this.col) {
                this.col = true;
                this.SetBackColor("#ff8800");
            }
        }
        if (t > 800) {
            this.SetBackColor("#fffffa");
            this.col = false;
            this.flag = false;
            alert("LongTouch");
        }
    }
    else if (ev.action == 'Up') {
        if (this.flag) {
            if (!this.col) 
                this.SetBackColor("#ff8800");
            app.Wait(0.05);
            this.SetBackColor("#fffffa");
            alert('ShortTouch');
        }
    }
}




app.CreateHorizontalScroll = function() {
    return new _HorizontalScroll();
}
