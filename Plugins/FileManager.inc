
app.CreateFileManager = function() {
    return new  FileManager() ;
}

function FileManager() {
    this._obj = {};
    this._obj.width = app.GetScreenWidth();
    this._obj.height = app.GetScreenHeight();
    var lay = app.CreateLayout('Linear');
    lay.SetVisibility('Hide');
    var btn = app.CreateButton('');
    lay.AddChild(btn);
    app.AddLayout(lay);
    app.Wait(0.05);
    this._obj.btnwidth = btn.GetWidth();
    this._obj.btnheight = btn.GetHeight();
    app.DestroyLayout(lay);
    this._obj.callback = null;
    this._obj.callbackLong = null;
    this._obj.callbackAddButton = null;
    this._obj.exts_filter = null;
    this._obj.path = '/';
    this._obj.list_layouts = [];
    this._obj.list_lists = [];
    this._obj.hist = ['Device'];
    this._obj.style = {
        'background': null, 
        'backcolor': null,
        'backgradient': null,
        'textcolor': null,
        'adjustcolor': null
    }
    this._obj.closed_callback = null;
    this._obj.opened_callback = null;
    this._obj.start = false;
    this._obj.style_buttons = ['#bb666677', '#44eeeeff'];
    this._obj.addbuttontext = '[fa-ellipsis-v]';




    this.Start = function() {
        app.ShowProgress('', 'nodim');
        if (!this._obj.start) {
            this._obj.start = true;
            if (this._obj.opened_callback) this._obj.opened_callback();
        }
        this._obj.lay = app.CreateLayout("Absolute");
        if (this._obj.style.background) {
            this._obj.lay.SetBackground.apply(this._obj.lay, this._obj.style.background);
        }
        else if (this._obj.style.backcolor) {
            this._obj.lay.SetBackColor(this._obj.style.backcolor);
        }
        else if (this._obj.style.backgradient) {
            this._obj.lay.SetBackGradient.apply(this._obj.lay, this._obj.style.backgradient);
        }
        else {
            this._obj.lay.SetBackground('/res/drawable/pattern_carbon', 'repeat');
        }
        this._obj.list_layouts.push(this._obj.lay);
        if (this._obj.path.slice(-1) != '/') this._obj.path += '/';
        var pth = this._obj.path;
        if (pth == '/') pth = 'Device';
        var i = this._obj.hist.indexOf(pth);
        if (~i) this._obj.hist.splice(i, 1);
        this._obj.hist.push(pth);
        var list_dirs = [];
        var title = (this._obj.path == '/' ? "Device" : this._obj.path);
        var top = app.GetTop(); 
        var text_size = this._obj.height * top * 0.62; // "px";
        var lay = app.CreateLayout('linear', 'filly,vcenter');
        lay.SetSize(1, top);
        lay.SetBackGradient('#99222222', '#99555555');
        var text = app.CreateText(title, 0.98, -1, 'left,bold');
        text.SetTextSize(text_size, 'px');
        text.SetEllipsize('start');
        text.SetTextShadow( 1, 1, 1, "#000000" ); 
        text.SetTextColor('#eeeeee');
        lay.AddChild(text);
        this._obj.lay.AddChild(lay);
        var folds = [], files = [];
        var cmp = function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        }
        var lst = app.ListFolder(this._obj.path);
        for(var i in lst) {
            var p = lst[i];
            
            if (app.IsFolder(this._obj.path + p)) folds.push(p.replace(/,/g, '‚') + ':[fa-folder-open]');
            else {
                var ext = p.split('.');
                if (!this._obj.exts_filter || ext.length > 1 && ~this._obj.exts_filter.indexOf('.' + ext.slice(-1)[0].toLowerCase())) {
                    files.push(p.replace(/,/g, '‚') + ':[fa-file-o]');
                }
            }
        }
        folds.sort(cmp);
        files.sort(cmp);

        var list = folds.concat(files);
        if (! list.length) {
            var empty = app.CreateText('Empty'.big(), 1, -1, 'html');
            empty.SetTextShadow( 1, 1, 1, "#000000" ); 
            empty.SetTextColor('#eeeeee');
            empty.SetPosition(0, 0.3);
            this._obj.lay.AddChild(empty);
        }
        this._obj.lst_fm = app.CreateList(list, 1, 1 - app.GetTop());
        this._obj.lst_fm.SetTextMargins(0, 0, 0, 0);
        this._obj.lst_fm.SetPosition(0, app.GetTop());
        this._obj.list_lists.push(this._obj.lst_fm);
        if (this._obj.style.adjustcolor) {
            this._obj.lst_fm.AdjustColor.apply(this._obj.lst_fm, this._obj.style.adjustcolor);
        }
        this._obj.lst_fm.SetOnTouch(_OnTouchFM);
        if (this._obj.callbackLong)
            this._obj.lst_fm.SetOnLongTouch(_OnLongTouchFM);
        else
            this._obj.lst_fm.SetOnLongTouch(_OnTouchFM);
        if (this._obj.style.textcolor) 
            this._obj.lst_fm.SetTextColor(this._obj.style.textcolor);
        this._obj.lst_fm.obj = this;
        this._obj.lay.AddChild(this._obj.lst_fm);
        var close = app.CreateButton('[fa-power-off]', this._obj.btnwidth, this._obj.btnheight, 'fontawesome');
        close.SetTextSize(this._obj.btnheight / 1.9 * this._obj.height, 'px');
        close.SetBackColor(this._obj.style_buttons[0]);
        close.SetTextColor(this._obj.style_buttons[1]);
        close.SetPosition(1 - this._obj.btnwidth - 3 / this._obj.width, 1 - this._obj.btnheight - 3 / this._obj.height);
        close.SetOnTouch(_CloseFM);
        close.obj = this;
        this._obj.lay.AddChild(close);
        var hist = app.CreateButton('[fa-history]', this._obj.btnwidth, this._obj.btnheight, 'fontawesome');
        hist.SetTextSize(this._obj.btnheight / 1.9 * this._obj.height, 'px');
        hist.SetBackColor(this._obj.style_buttons[0]);
        hist.SetTextColor(this._obj.style_buttons[1]); 
        hist.SetPosition(1 - this._obj.btnwidth - 3 / this._obj.width, 1 - this._obj.btnheight * 2 - 6 / this._obj.height);
        hist.SetOnTouch(_HistFM);
        hist.obj = this;
        this._obj.lay.AddChild(hist);

        this._obj.btnmenu = app.CreateButton(this._obj.addbuttontext, this._obj.btnwidth, this._obj.btnheight, 'fontawesome');
        this._obj.btnmenu.SetTextSize(this._obj.btnheight / 1.9 * this._obj.height, 'px');
        this._obj.btnmenu.SetBackColor(this._obj.style_buttons[0]);
        this._obj.btnmenu.SetTextColor(this._obj.style_buttons[1]);
        this._obj.btnmenu.SetPosition(1 - this._obj.btnwidth - 3 / this._obj.width, 1 - this._obj.btnheight * 3 - 9 / this._obj.height);
        this._obj.btnmenu.SetOnTouch(_OnAddButtonTouchFM);
        this._obj.btnmenu.obj = this;
        this._obj.lay.AddChild(this._obj.btnmenu);
        if (!this._obj.callbackAddButton)
            this._obj.btnmenu.SetVisibility('Gone');

        app.AddLayout(this._obj.lay);
        app.HideProgress();
    }



    this.SetOnOpened = function(f) {
        if (typeof f == 'function') {
            this._obj.opened_callback = f;
        }
        else {
            this._obj.opened_callbac = null; 
        }
    }



    this.SetOnClosed = function(f) {
        if (typeof f == 'function') {
            this._obj.closed_callback = f;
        }
        else {
            this._obj.closed_callback = null; 
        }
    }



    this.SetOnTouch = function(f) {
        if (typeof f == 'function') {
            this._obj.callback = f; 
        }
        else {
            this._obj.callback = null; 
        }
    }



    this.SetOnLongTouch = function(f) {
        if (typeof f == 'function') {
            this._obj.callbackLong = f; 
        }
        else {
            this._obj.callbackLong = null; 
        }
    }



    this.GetPath = function() {
        return this._obj.path;
    }



    this.SetIconAddButton = function(t) {
        if (typeof t == 'string') {
            this._obj.addbuttontext = t; 
            if (this._obj.btnmenu) {
                this._obj.btnmenu.SetText(t);
            }
        }
    }




    this.SetPath = function(path) {
        path = path ? String(path) : '/';
        if (path.slice(-1) != '/') path += '/';
        if (path == this._obj.path) return;
        this._obj.path = path;
        if (this._obj.start) {
            this._obj.list_lists = [];
            this.Start();
            while (this._obj.list_layouts.length - 1) 
                app.DestroyLayout(this._obj.list_layouts.shift());
        }
        if (this._obj.path.length > 1) {
            var l = this._obj.path.slice(1, -1).split('/');
            var s = '/';
            for (var k=0; k<l.length-1; k++) {
                s += (l[k] + '/');
                var i = this._obj.hist.indexOf(s);
                if (~i) this._obj.hist.splice(i, 1);
                this._obj.hist.push(s);
            }
        }
    }



    this.GetFilter = function() {
        return this._obj.exts_filter;
    }




    this.SetFilter = function(exts_filter) {
        if (!Array.isArray(exts_filter))
            exts_filter = exts_filter ? String(exts_filter).split(',') : null;
        if (JSON.stringify(this._obj.exts_filter) == JSON.stringify(exts_filter)) {
            return;
        }
        this._obj.exts_filter = exts_filter;
        if (this._obj.exts_filter) {
            for (var i in this._obj.exts_filter) {
                this._obj.exts_filter[i] = this._obj.exts_filter[i].toLowerCase();
            }
        }
        if (this._obj.start) {
            this._obj.list_lists = [];
            this.Start();
            while (this._obj.list_layouts.length - 1) 
                app.DestroyLayout(this._obj.list_layouts.shift());
        }
    }


    this.SetOnAddButtonTouch = function(f) {
        if (typeof f == 'function') {
            this._obj.callbackAddButton = f; 
        }
        else {
            this._obj.callbackAddButton = null; 
        }
    }



    this.SetButtonsColors = function(backcolor, textcolor) {
        if (backcolor) this._obj.style_buttons[0] = backcolor;
        if (textcolor) this._obj.style_buttons[1] = textcolor;
    }



    this.SetBackground = function(img, options) {
        this._obj.style.background = [img, options];
        for (var i=0; i<this._obj.list_layouts.length; i++) {
            this._obj.list_layouts[i].SetBackground(img, options);
        }
        this._obj.style.backcolor = null;
        this._obj.style.backgradient = null;
    }



    this.SetBackGradient = function(p1, p2, p3) {
        this._obj.style.backgradient = [p1, p2, p3];
        for (var i=0; i<this._obj.list_layouts.length; i++) {
            this._obj.list_layouts[i].SetBackGradient(p1, p2, p3);
        }
        this._obj.style.backcolor = null;
        this._obj.style.background = null;
    }



    this.SetBackColor = function(p) {
        this._obj.style.backcolor = p;
        for (var i=0; i<this._obj.list_layouts.length; i++) {
            this._obj.list_layouts[i].SetBackColor(p);
        }
        this._obj.style.background = null;
        this._obj.style.backgradient = null;
    }



    this.SetTextColor = function(p) {
        this._obj.style.textcolor = p;
        for (var i=0; i<this._obj.list_lists.length; i++) {
            this._obj.list_lists[i].SetTextColor(p);
        }
    }



    this.AdjustColor = function(hue, sat, bright, cont) {
        this._obj.style.adjustcolor = [hue, sat, bright, cont];
        for (var i=0; i<this._obj.list_lists.length; i++) {
            this._obj.list_lists[i].AdjustColor(hue, sat, bright, cont);
        }
    }



   this.IsOpen = function() {
       return this._obj.start;
   }



    this.Close = function() {
        while (this._obj.list_layouts.length) 
            app.DestroyLayout(this._obj.list_layouts.shift());
        this._obj.list_lists = [];
        this._obj.start = false;
        if (typeof this._obj.closed_callback == 'function')
            this._obj.closed_callback();
    }



    this.Back = function() {
        this._obj.list_lists.pop();
        this._obj.lst_fm = this._obj.list_lists.slice(-1)[0];
        if (this._obj.path != '/') {
            this._obj.path = this._obj.path.split('/').slice(0, -2).join('/') + '/';
            if (this._obj.list_layouts.length == 1) {
                this.Start();
                app.DestroyLayout(this._obj.list_layouts.shift());
            }
            else {
                app.DestroyLayout(this._obj.list_layouts.pop());
            }
        }
        else {
            this.Close();
        }
    }



    this.GetType = function() {
        return "FileManager";
    }




    this.GetVersion = function() {
        return 1.0;
    }
}
//
//End function FileManager
//


function _OnTouchFM(item) {
    item = item.replace(/‚/g, ',');
    if (app.IsFolder(this.obj._obj.path + item)) {
        this.obj._obj.path += item;
        this.obj.Start();
    }
    else {
        if (typeof this.obj._obj.callback == 'function') {
            this.obj._obj.callback(this.obj._obj.path + item);
        }
    }
}



function _OnLongTouchFM(item) {
    item = item.replace(/‚/g, ',');
    if (typeof this.obj._obj.callbackLong == 'function') {
        this.obj._obj.callbackAddButton(this.obj._obj.path + item);
    }
}



function _OnAddButtonTouchFM() {
    this.SetScale(0.9, 0.9);
    app.Wait(0.05);
    this.SetScale(1.0, 1.0);
    if (typeof this.obj._obj.callbackAddButton == 'function') {
        this.obj._obj.callbackAddButton(this.obj._obj.path);
    }
}



function _CloseFM() {
    this.SetScale(0.9, 0.9);
    app.Wait(0.05);
    this.obj.Close();
}


function _HistFM() {
    this.SetScale(0.9, 0.9);
    app.Wait(0.05);
    this.SetScale(1, 1);
    var lst = this.obj._obj.hist.slice();
    for (var i=0; i<lst.length; i++) {
        if (lst[i].replace(/^Device$/, '/') == this.obj._obj.path) lst[i] = '✔ ' + lst[i];
    }
    var dlg = app.CreateListDialog('History:', lst);
    if (this.obj._obj.style.textcolor) {
        dlg.SetTextColor(this.obj._obj.style.textcolor);
    }
    if (this.obj._obj.style.background) {
        var p = this.obj._obj.style.background;
        dlg.SetBackground(p[0], p[1]);
    }
    else if (this.obj._obj.style.backcolor) {
        dlg.SetBackColor(this.obj._obj.style.backcolor);
    }
    else if (this.obj._obj.style.backgradient) {
        var p = this.obj._obj.style.backgradient;
        dlg.SetBackColor(p[0]);
    }
    else {
        dlg.SetBackground('/res/drawable/pattern_carbon', 'repeat');
    }
    if (this.obj._obj.style.adjustcolor) {
        var p = this.obj._obj.style.adjustcolor;
        dlg.AdjustColor(p[0], p[1], p[2], p[3]);
    }
    
    dlg.SetOnTouch(_HistFM2);
    _HistFM.obj = this.obj;
}


function _HistFM2(path) {
    _HistFM.obj._obj.path = path.replace(/✔ /, '').replace(/^Device$/, '/');
    _HistFM.obj._obj.list_lists = [];
    _HistFM.obj.Start();
    while (_HistFM.obj._obj.list_layouts.length - 1) 
        app.DestroyLayout(_HistFM.obj._obj.list_layouts.shift());
}


