var WIDTH = app.GetScreenWidth();
var HEIGHT = app.GetScreenHeight();
var BTN_WIDTH;
var BTN_HEIGHT
(function() {
    var lay = app.CreateLayout('Linear');
    lay.SetVisibility('Hide');
    var btn = app.CreateButton('');
    lay.AddChild(btn);
    app.AddLayout(lay);
    app.Wait(0.05);
    //BTN_WIDTH = btn.GetWidth();
    BTN_HEIGHT = btn.GetHeight();
    app.RemoveLayout(lay);
})();
var BACKGROUND_FM = '#eeeeee';
var TEXTCOLOR_FM = '#555555';


//для отладки
function print() { 
    var args = [];
    for (var i=0; i<arguments.length; i++) {
        var arg = JSON.stringify(arguments[i]);
        args.push(arg);
    }
    alert(args.join('\n'));
}


App.prototype.CreateTitle = function(title, end) {
    var top = this.GetTop();
    var text_size = this.GetScreenHeight() * top * 0.62;
    var lay = this.CreateLayout('linear', 'filly,vcenter');
    lay.SetSize(1, top);
    lay.SetBackGradient('#aaaaaa', '#666666');
    var text = this.CreateText(title, 0.98, -1, 'left,bold');
    text.SetTextSize(text_size, 'px');
    text.SetEllipsize(end ? 'start' : "end");
    text.SetTextShadow( 1, 1, 1, "#000000" ); 
    text.SetTextColor('#eeeeee');
    lay.AddChild(text);
    return lay;
}


function FileManager(callback, exts, path) {
    app.ShowProgress('', 'nodim');
    callback = callback || app.Alert;
    exts = exts || [];
    path = path || '/';
    if (path.slice(-1) != '/') path += '/';
    var lay = app.CreateLayout("Absolute");
    lay.SetBackColor(BACKGROUND_FM);
    
    var foo = arguments.callee; // function FileManager
    if (! foo.obj) {
        foo.obj = {};
        foo.obj.list_layouts = [];
        foo.obj.list_lists = [];
        foo.obj.hist = [];
        if (path.length > 1) {
            var s = '/';
            foo.obj.hist.push('Устройство');
            var l = path.slice(1, -1).split('/');
            for (var k=0; k<l.length-1; k++) {
                s += (l[k] + '/');
                foo.obj.hist.push(s);
            }
        }
    }
    foo.obj.list_layouts.push(lay);
    var pth = path;
    if (pth == '/') pth = 'Устройство';
    var i = foo.obj.hist.indexOf(pth);
    if (~i) foo.obj.hist.splice(i, 1);
    foo.obj.hist.push(pth);
    for (var i in exts) exts[i] = exts[i].toLowerCase();
    foo.obj.args = [callback, exts, path];
    var list_dirs = [];
    var pth = foo.obj.args[2];
    var title = (pth=='/' ? "Устройство" : pth);
    lay.AddChild(app.CreateTitle(title, 'start'));
    var folds = [], files = [];
    var cmp = function(a, b) {
        return (a.toLowerCase()>b.toLowerCase()) ? 1: -1;
    }
    var lst = app.ListFolder(pth);
    for(var i in lst) {
        var p = lst[i];
        if (app.IsFolder(pth + p)) folds.push(p.replace(/,/g, '‚') + ':Img/folds.png');
        else {
            var ext = p.split('.');
            if (!exts.length || ext.length > 1 && ~exts.indexOf('.' + ext.slice(-1)[0].toLowerCase()))
                files.push(p.replace(/,/g, '‚') + ':Img/files.png');
        }
    }
    folds.sort(cmp);
    files.sort(cmp);

    var list = folds.concat(files);
    if (! list.length) {
        var empty = app.CreateText('<big>Пусто</big>', 1, -1, 'html');
        empty.SetTextColor(TEXTCOLOR_FM);
        empty.SetPosition(0, 0.3);
        lay.AddChild(empty);
    }
    foo.lst_fm = app.CreateList(list, 1, 1 - app.GetTop());
    foo.lst_fm.SetTextMargins(0, 0, 0, 0);
    foo.lst_fm.SetPosition(0, app.GetTop());
    foo.obj.list_lists.push(foo.lst_fm);
    foo.lst_fm.SetTextColor(TEXTCOLOR_FM);
    foo.lst_fm.SetOnTouch(OnTouchFM);
    foo.lst_fm.SetOnLongTouch(OnTouchFM);
    lay.AddChild(foo.lst_fm);
    
    var btn_width = BTN_HEIGHT*HEIGHT/WIDTH;
    var close = app.CreateImage('Img/close.png', btn_width, BTN_HEIGHT);
    close.SetAlpha(0.5);
    close.SetPosition(1 - btn_width - 0.015, 1 - BTN_HEIGHT - 0.01);
    close.SetOnTouchDown(CloseFM);
    lay.AddChild(close);
    var hist = app.CreateImage('Img/hist.png', btn_width, BTN_HEIGHT);
    hist.SetAlpha(0.5);
    hist.SetPosition(1 - btn_width - 0.015, 1 - BTN_HEIGHT*2 - btn_width/3);
    hist.SetOnTouchDown(HistFM);
    lay.AddChild(hist);
    
    app.AddLayout(lay);
    app.HideProgress();
}

function OnTouchFM(item) {
    item = item.replace(/‚/g, ',');
    var path = FileManager.obj.args[2] + item;
    if (app.IsFolder(path)) {
        FileManager.obj.args[2] += item;
        window.FileManager.apply(null, FileManager.obj.args);
    }
    else {
        FileManager.obj.args[0](path);
    }
}


function CloseFM() {
    while (FileManager.obj.list_layouts.length) 
        app.RemoveLayout(FileManager.obj.list_layouts.shift());
    FileManager.obj.list_lists = [];
    ExitFlag = 'start';
}


function HistFM() {
    this.SetScale(0.9, 0.9);
    app.Wait(0.05);
    this.SetScale(1, 1);
    var lst = FileManager.obj.hist.slice(0);
    for (var i=0; i<lst.length; i++) {
        if (lst[i].replace(/^Устройство$/, '/') == FileManager.obj.args[2]) lst[i] = '✔ ' + lst[i];
    }
    var dlg = app.CreateListDialog('Переход:', lst);
    dlg.SetBackColor(BACKGROUND_FM);
    dlg.SetTextColor(TEXTCOLOR_FM);
    dlg.SetOnTouch(HistFM2);
}


function HistFM2(path) {
    FileManager.obj.args[2] = path.replace(/✔ /, '').replace(/^Устройство$/, '/');
    FileManager.obj.list_lists = [];
    window.FileManager.apply(null, FileManager.obj.args);
    while (FileManager.obj.list_layouts.length-1) 
        app.RemoveLayout(FileManager.obj.list_layouts.shift());
}


function BackFM() {
    FileManager.obj.list_lists.pop();
    FileManager.lst_fm = FileManager.obj.list_lists.slice(-1)[0];
    var p = FileManager.obj.args[2];
    if (p != '/') {
        FileManager.obj.args[2] = FileManager.obj.args[2].split('/').slice(0, -2).join('/') + '/';
        if (FileManager.obj.list_layouts.length == 1) {
            window.FileManager.apply(null, FileManager.obj.args);
            app.RemoveLayout(FileManager.obj.list_layouts.shift());
        }
        else {
            app.RemoveLayout(FileManager.obj.list_layouts.pop());
        }
        return false;
    }
    else {
        app.RemoveLayout(FileManager.obj.list_layouts.pop());
        return true;
    }
}



