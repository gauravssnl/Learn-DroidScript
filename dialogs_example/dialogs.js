
var HEIGHT = app.GetScreenHeight();
var ListColorsDialogs = [['#222222', '#dddddd'], ['#ffffff', '#555555']];
var TextColorDialogs;
var BackgroundDialogs;
var IconOnDialogs = 'Img/ON.png';
var IconOffDialogs = 'Img/OFF.png';
var IconSelectDialogs = 'Img/SELECT.png';
var IconUnselectDialogs = 'Img/UNSELECT.png';


function SetStyleDialogs(style) {
    var white = +(String(style).toLowerCase() == 'white');
    TextColorDialogs = ListColorsDialogs[white][1];
    BackgroundDialogs = ListColorsDialogs[white][0];
}
SetStyleDialogs();




function MultiSelectionList(callback, list, title, list_indexes, text_btn_ok) 
{
    if (!arguments.length) {
        if (this.SetBackColor) this.SetBackColor('#0088aa'); 
        if (arguments.callee.Dialog) arguments.callee.Dialog.Dismiss();
        if (typeof this.callback == 'function') this.callback(arguments.callee.list_indexes);
        return;
    }
    else if (typeof callback != 'function') {
        try {
            var i = this.items[list_indexes].replace(/\^c\^/g, ':');
            var of = arguments.callee.list_indexes.indexOf(list_indexes);
            if (~of) {
                arguments.callee.list_indexes.splice(of, 1);
                this.SetItem(i, i, '', IconUnselectDialogs);
            }
            else {
                arguments.callee.list_indexes.push(list_indexes);
                this.SetItem(i, i, '', IconSelectDialogs);
            }
        } catch (er) {};
        return;
    }
    title = typeof title == 'string' && title || 'Selection:';
    text_btn_ok = typeof text_btn_ok == 'string' && text_btn_ok || 'OK';
    list_indexes = typeof list_indexes == 'object' && list_indexes.indexOf && list_indexes || [];
    if (typeof list == 'string') list = list.split(',');
    function C(t) {
        return (t.replace(/,/g, '‚')
        .replace(/:/g, '^c^')
        .replace(/\s/g, ' ')
        .replace(/\"/g, '″'));
    }
    var L =  app.CreateLayout("linear");
    L.SetVisibility('Hide');
    app.AddLayout(L);
    var titl = app.CreateText(title.big().bold()
        .replace(/\n/g, '<br/>'), 
        0.9, -1, 'multiline,html,left');
    titl.SetMargins(0, 0.015, 0, 0.015);
    var b = app.CreateButton(text_btn_ok.big(), 0.95, -1, "html");
    L.AddChild(b);
    L.AddChild(titl);
    var lst = [];
    for (var i=0; i<list.length; i++) {
        lst.push(C(list[i]) + ':' + IconUnselectDialogs);
    }
    var ls = app.CreateList(lst, 0.95, -1);
    L.AddChild(ls);
    app.Wait(0.05);
    app.RemoveLayout(L);
    var hbtn = b.GetHeight();
    var h = Math.min(ls.GetHeight(), 0.88 - hbtn - titl.GetHeight());
    arguments.callee.Dialog = app.CreateDialog(title, 'NoTitle');
    var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackColor(BackgroundDialogs);
    arguments.callee.Dialog.AddLayout(layDlg);
    var titl = app.CreateText(title.big().bold()
            .replace(/\n/g, '<br/>'), 
            0.9, -1, 'multiline,html,left');
    titl.SetTextColor('#3098ba');
    titl.SetMargins(0, 0.015, 0, 0.015);
    layDlg.AddChild(titl);
    var line = app.CreateText('', 0.95, 3/HEIGHT);
    line.SetBackColor('#3088aa');
    layDlg.AddChild(line);
    var lst = [], list2 = [];
    for (var i=0; i<list.length; i++) {
        var txt = C(list[i]);
        list2.push(txt);
        lst.push(txt + ':' + (~list_indexes.indexOf(i) ? IconSelectDialogs : IconUnselectDialogs));
    }
    var List = app.CreateList(lst, 0.95, h);
    List.items = list2;
    arguments.callee.list_indexes = list_indexes;
    List.SetTextColor(TextColorDialogs);
    List.SetOnTouch(arguments.callee);
    List.SetOnLongTouch(arguments.callee);
    layDlg.AddChild(List);
    var line = app.CreateText('', 0.95, 2/HEIGHT);
    line.SetBackColor('#999999');
    layDlg.AddChild(line);
    var btn = app.CreateButton(text_btn_ok.big(), 0.95, hbtn, 'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TextColorDialogs);
    btn.SetOnTouch(arguments.callee);
    btn.callback = callback;
    layDlg.AddChild(btn);
    arguments.callee.Dialog.Show();
    arguments.callee.Dialog.SetOnCancel(_dlgCancel);
}






function SelectionList(callback, list, title, index, text_btn_ok) 
{
    if (!arguments.length) {
        if (this.SetBackColor) this.SetBackColor('#0088aa'); 
        if (arguments.callee.Dialog) arguments.callee.Dialog.Dismiss();
        if (typeof this.callback == 'function') this.callback(arguments.callee.index);
        return;
    }
    else if (typeof callback != 'function') {
        try {
            if (index == arguments.callee.index) return;
            var i = this.items[arguments.callee.index].replace(/\^c\^/g, ':');
            this.SetItem(i, i, '', IconOffDialogs);
            i = this.items[index].replace(/\^c\^/g, ':');
            this.SetItem(i, i, '', IconOnDialogs);
            arguments.callee.index = index;
        } catch (er) {};
        return;
    }
    title = typeof title == 'string' && title || 'Selection:';
    text_btn_ok = typeof text_btn_ok == 'string' && text_btn_ok || 'OK';
    index = typeof index == 'number' && index || 0;
    if (typeof list == 'string') list = list.split(',');
    index = Math.min(index, list.length - 1);
    function C(t) {
        return (t.replace(/,/g, '‚')
        .replace(/:/g, '^c^')
        .replace(/\s/g, ' ')
        .replace(/\"/g, '″'));
    }
    var L =  app.CreateLayout("linear");
    L.SetVisibility('Hide');
    app.AddLayout(L);
    var titl = app.CreateText(title.big().bold()
        .replace(/\n/g, '<br/>'), 
        0.9, -1, 'multiline,html,left');
    titl.SetMargins(0, 0.015, 0, 0.015);
    var b = app.CreateButton(text_btn_ok.big(), 0.95, -1, "html");
    L.AddChild(b);
    L.AddChild(titl);
    var lst = [];
    for (var i=0; i<list.length; i++) {
        lst.push(C(list[i]) + ':' + (index == i ? IconOnDialogs : IconOffDialogs));
    }
    var ls = app.CreateList(lst, 0.95, -1);
    L.AddChild(ls);
    app.Wait(0.05);
    app.RemoveLayout(L);
    var hbtn = b.GetHeight();
    var h = Math.min(ls.GetHeight(), 0.88 - hbtn - titl.GetHeight());
    arguments.callee.Dialog = app.CreateDialog(title, 'NoTitle');
    var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackColor(BackgroundDialogs);
    arguments.callee.Dialog.AddLayout(layDlg);
    var titl = app.CreateText(title.big().bold()
            .replace(/\n/g, '<br/>'), 
            0.9, -1, 'multiline,html,left');
    titl.SetTextColor('#3098ba');
    titl.SetMargins(0, 0.015, 0, 0.015);
    layDlg.AddChild(titl);
    var line = app.CreateText('', 0.95, 3/HEIGHT);
    line.SetBackColor('#3088aa');
    layDlg.AddChild(line);
    var lst = [], list2 = [];
    for (var i=0; i<list.length; i++) {
        var txt = C(list[i]);
        list2.push(txt);
        lst.push(txt + ':' + (index == i ? IconOnDialogs : IconOffDialogs));
    }
    var List = app.CreateList(lst, 0.95, h);
    List.items = list2;
    arguments.callee.index = index;
    List.SetTextColor(TextColorDialogs);
    List.SetOnTouch(arguments.callee);
    List.SetOnLongTouch(arguments.callee);
    layDlg.AddChild(List);
    var line = app.CreateText('', 0.95, 2/HEIGHT);
    line.SetBackColor('#999999');
    layDlg.AddChild(line);
    var btn = app.CreateButton(text_btn_ok.big(), 0.95, hbtn, 'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TextColorDialogs);
    btn.SetOnTouch(arguments.callee);
    btn.callback = callback;
    layDlg.AddChild(btn);
    arguments.callee.Dialog.Show();
    arguments.callee.Dialog.SetOnCancel(_dlgCancel);
}


function Listbox(callback, list, title)
{
    if (typeof callback != 'function' && typeof arguments[3] == 'number') {
        if (arguments.callee.Dialog) arguments.callee.Dialog.Dismiss();
        if (typeof this.func =='function') this.func(arguments[3]);
    }
    else { 
        if (typeof list == 'string') list = list.split(',');
        title = typeof title == 'string' && title || 'Выбор:';
        arguments.callee.Dialog = app.CreateDialog('', 'NoTitle');
        var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
        layDlg.SetBackColor(BackgroundDialogs);
        layDlg.SetPadding(0, 0.005, 0, 0.005);
        arguments.callee.Dialog.AddLayout(layDlg);
        var head = app.CreateText(title.big().bold()
            .replace(/\n/g, '<br>'), 
            0.9, -1, 'multiline,html,left');
        head.SetTextColor('#3098ba');
        head.SetMargins(0, 0.015, 0, 0.015);
        layDlg.AddChild(head);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
        var lst = app.CreateList(list, 0.9, -1);
        lst.SetTextMargins(0, 0.005, 0, 0.005);
        layDlg.AddChild(lst);
        lst.func = callback;
        lst.SetOnTouch(arguments.callee);
        lst.SetOnLongTouch(arguments.callee);
        lst.SetTextColor(TextColorDialogs);
        lst.SetTextColor2(TextColorDialogs);
        arguments.callee.Dialog.Show();
        arguments.callee.Dialog.SetOnCancel(_dlgCancel);
    }
}




function Alert(body, head, text_btn_ok, left) {
    if (!body && this.result)
    {
        if (this.SetBackColor) this.SetBackColor('#0088aa'); 
        if (arguments.callee.Dialog) arguments.callee.Dialog.Dismiss();
    }
    else
    { 
        var format = function(str) {
            return String(str).replace(/^ /gm, '&#160;').replace(/\n/g, '<br>');
        }
        var text_btn_ok = text_btn_ok || 'OK';
        var head = head || 'Инфо:'; 
        var L =  app.CreateLayout("linear");
        L.SetVisibility('Hide');
        app.AddLayout(L);
        var title = app.CreateText(format(head).big().bold(),  0.9, -1, 'multiline,html,left');
        L.AddChild(title);
        var btn = app.CreateButton(format(text_btn_ok), 0.95, -1, 'filly,html');
        L.AddChild(btn);
        var text_body = app.CreateText(format(body).big(), 0.93, -1, 'multiline,html'+(left?',left':''));
        text_body.SetMargins(0.01, 0.02, 0.01, 0.02);
        L.AddChild(text_body);
        app.Wait(0.05);
        app.RemoveLayout(L);
        arguments.callee.Dialog = app.CreateDialog('', 'NoTitle');
        var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
        layDlg.SetBackColor(BackgroundDialogs);
        arguments.callee.Dialog.AddLayout(layDlg);
        title = app.CreateText(format(head).big().bold(), 0.9, -1, 'multiline,html,left');
        title.SetTextColor('#3098ba');
        title.SetMargins(0, 0.015, 0, 0.015);
        layDlg.AddChild(title);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
        var scroll = app.CreateScroller(0.95, Math.min(+text_body.GetHeight() + 0.05, 0.88 - title.GetHeight() - btn.GetHeight()));
        layDlg.AddChild(scroll);
        line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#999999');
        layDlg.AddChild(line);
        btn = app.CreateButton(format(text_btn_ok), 0.95, -1,'filly,html');
        btn.SetBackColor('#00000000');
        btn.SetTextColor(TextColorDialogs);
        btn.SetOnTouch( arguments.callee );
        btn.result = 'Yes';
        layDlg.AddChild(btn);
        arguments.callee.Dialog.result = 'Cancel';
        arguments.callee.Dialog.SetOnCancel( arguments.callee );
        var layScroll = app.CreateLayout('Linear');
        scroll.AddChild(layScroll);
        text_body = app.CreateText(format(body).big(), 0.93, -1, 'multiline,html'+(left?',left':''));
        text_body.SetTextColor(TextColorDialogs);
        text_body.SetMargins(0.01, 0.02, 0.01, 0.02);
        layScroll.AddChild(text_body);
        arguments.callee.Dialog.Show();
        arguments.callee.Dialog.SetOnCancel(_dlgCancel);
    }
}



function YesNoDialog(callback, body, head, text_btn_ok, text_btn_no, left) {
    if (!arguments.length) {
        if (this.SetBackColor) this.SetBackColor('#0088aa'); 
        if (arguments.callee.Dialog) arguments.callee.Dialog.Dismiss();
        if (typeof this.func == 'function') this.func(this.result);
    }
    else { 
        var format = function(str) {
            return String(str).replace(/^ /gm, '&#160;').replace(/\n/g, '<br>');
        }
        var line, btn;
        var text_btn_ok = text_btn_ok || 'Yes';
        var text_btn_no = text_btn_no || 'No';
        var head = head || 'Question:'; 
        var L =  app.CreateLayout("linear");
        L.SetVisibility('Hide');
        app.AddLayout(L);
        var title = app.CreateText(head.big().bold().replace(/\n/g, '<br>'), 
            0.9, -1, 'multiline,html,left');
        title.SetMargins(0, 0.015, 0, 0.015);
        L.AddChild(title);
        var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
        btn = app.CreateButton(text_btn_ok, 0.47, -1, 'filly,html');
        layButtons.AddChild(btn);
        btn = app.CreateButton(text_btn_no, 0.47, -1, 'filly,html');
        layButtons.AddChild(btn);
        L.AddChild(layButtons);
        var text_body = app.CreateText(format(body).big(), 
            0.92, -1, 'multiline,html'+ (left ? ',left' : ''));
        text_body.SetMargins(0.01, 0.02, 0.01, 0.02);
        L.AddChild(text_body);
        app.Wait(0.05);
        app.RemoveLayout(L);
        arguments.callee.Dialog = app.CreateDialog('', 'NoTitle');
        var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
        layDlg.SetBackColor(BackgroundDialogs);
        arguments.callee.Dialog.AddLayout(layDlg);
        title = app.CreateText(head.big().bold().replace(/\n/g, '<br>'), 
            0.9, -1, 'multiline,html,left');
        title.SetTextColor('#3098ba');
        title.SetMargins(0, 0.015, 0, 0.015);
        layDlg.AddChild(title);
        line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
        var scroll = app.CreateScroller(0.95, Math.min(+text_body.GetHeight() + 0.05, 0.88 - title.GetHeight() - layButtons.GetHeight()));
        layDlg.AddChild(scroll);
        line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#999999');
        layDlg.AddChild(line);
        var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
        btn = app.CreateButton(text_btn_ok, 0.47, -1,'filly,html');
        btn.SetBackColor('#00000000');
        btn.SetTextColor(TextColorDialogs);
        btn.SetOnTouch( arguments.callee );
        btn.result = 'Yes';
        btn.func = callback;
        layButtons.AddChild(btn);
        line = app.CreateText('W', 2/HEIGHT, -1, 'filly');
        line.SetBackColor('#999999');
        layButtons.AddChild(line);
        btn = app.CreateButton(text_btn_no, 0.47, -1, 'filly,html');
        btn.SetBackColor('#00000000');
        btn.SetTextColor(TextColorDialogs);
        btn.SetOnTouch(arguments.callee);
        btn.result = 'No';
        btn.func = callback ;
        layButtons.AddChild(btn);
        layDlg.AddChild(layButtons);
        arguments.callee.Dialog.func = callback ;
        var layScroll = app.CreateLayout('Linear');
        scroll.AddChild(layScroll);
        var text_body = app.CreateText(
            format(body).big(), 
            0.92, -1, 'multiline,html' + (left ? ',left' : ''));
        text_body.SetTextColor(TextColorDialogs);
        text_body.SetMargins(0.01, 0.02, 0.01, 0.02);
        layScroll.AddChild(text_body);
        arguments.callee.Dialog.Show();
        arguments.callee.Dialog.SetOnCancel(_dlgCancel);
    }
}




function _dlgCancel() {
    this.Dismiss();
}


