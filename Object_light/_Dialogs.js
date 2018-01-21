
function selectFm(path) {
    selectFm.path0 = path;
    app.SaveText('FM', JSON.stringify(fm_params.path));
    selectFm.path = (fm_params.path.join("/")+'/'+path).replace(/‚/g, ',').slice(1);
    if (ShowCopy.flag == 'json')
    {
        return saveJson(path);
    }
    Dialog = app.CreateDialog("", 'NoTitle');
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    Dialog.AddLayout(layDlg);
    var titl = app.CreateText('<img src="Img/add.png"> <big><b>Сохранить в ' + selectFm.path  + '/</b></big>', 
            0.9, -1, 'multiline,html,left');
        titl.SetTextColor('#3098ba');
        titl.SetMargins(0, 0.02, 0, 0.02);
        layDlg.AddChild(titl);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
    var edt_fm = app.CreateTextEdit('', 0.8, -1);
    edt_fm.SetCursorColor('#ff8800');;
    edt_fm.SetHint('Введите имя файла');
    edt_fm.SetTextColor(TC[BG]);
    var line = app.CreateText('', 1, 2/HEIGHT);
    line.SetMargins(0, 0.02, 0, 0);
    line.SetBackColor('#aaaaaa');
    var btn = app.CreateButton("OK", 0.475, -1, 'html');
    btn.SetBackColor('#00000000');
    btn.SetOnTouch(saveFm);
    btn.SetTextColor(TC[BG]);
    btn.txt = edt_fm;
    layDlg.AddChild(edt_fm);
    layDlg.AddChild(line);
    var o = app.CreateLayout("linear", 'horizontal');
    layDlg.AddChild(o);
    var b = app.CreateButton("Отмена", 0.475, -1, 'html');
    b.SetBackColor('#00000000')
    b.SetOnTouch(dlgCancel2);
    b.SetTextColor(TC[BG]);
    o.AddChild(b);
    var l = app.CreateText('', 1.5/WIDTH, -1, 'filly');
    l.SetBackColor('#aaaaaa');
    o.AddChild(l);
    o.AddChild(btn);
    Dialog.Show(); 
    Dialog.SetOnCancel(dlgCancel);
}


function saveFm() {
    this.SetBackColor("#880088aa");
    app.Wait(0.05);
    this.SetBackColor("#00000000");
    var n = this.txt.GetText();
    if (!n) return app.ShowPopup('Введите имя файла');
    n = n + '.txt';
    var p = app.ListFolder(selectFm.path);
    var j = false;
    for (var i in p) {
        var f = p[i].toLowerCase();
        if (f == n.toLowerCase()) {
            j = true; break;
        }
    }
    var file = selectFm.path + '/' + n;
    saveFm.file= file;
    if (j) {
        Dialog.Dismiss();
        app.DestroyLayout(layDlg);
        YesNoDialog(saveFm2, 'Файл ' + file + ' уже существует. Перезаписать?', '<img src="Img/help.png"> Вопрос:');
    }
    else {
        try {
            app.WriteFile(file, ShowCopy.txt);
            Dialog.Dismiss();
            app.DestroyLayout(layDlg);
            cancelFm();
            var   exists = app.FileExists( saveFm.file);
            if (exists)
                t = 'Файл ' + saveFm.file + ' сохранен!';
            else
                t = 'Невозможно сохранить файл ' + saveFm.file;
            if (exists) 
                Alert(t, '<img src="Img/about.png"> Сделано.');
            else
                Alert(t, '<img src="Img/alert.png"> Oops!');
        }
        catch (e) {
            app.ShowPopup('Не могу сохранить файл ' + file);
        }
    }
}

function saveFm2(i) {
    Dialog.Dismiss();
    app.DestroyLayout(layDlg);
    if (this.ID == 'Yes') {
        app.WriteFile(saveFm.file, ShowCopy.txt);
        cancelFm();
        app.ShowPopup('Файл ' + saveFm.file + ' сохранен!');
    }
    else {
        selectFm(selectFm.path0);
    }
}


function saveJson()
{
    var d = new Date();
    var date = d.getFullYear() + "_" + Format(d.getMonth()+1) + "_" + Format(d.getDate()) + " " + Format(d.getHours()) + "-" + Format(d.getMinutes()) + "-" + Format(d.getSeconds());
    var path = selectFm.path + '/Object_light calculation ' + date + '.json';
    var obj = {}, hist = JSON.parse(HISTORY);
    for (var i=0; i<showCheck.length; i++)
    {
        var k = showCheck[i].split('^n^')[0].slice(10);
        if (hist[k]) obj[k] = hist[k];
    }
    cancelFm();
    cancelShowCheck();
    app.WriteFile(path, JSON.stringify(obj));
    var   exists = app.FileExists(path);
    var t;
    if (exists)
        t = 'Файл ' + path + ' сохранен!';
    else
        t = 'Невозможно сохранить файл ' + path;
    if (exists) 
        Alert(t, '<img src="Img/about.png"> Сделано.');
    else
        Alert(t, '<img src="Img/alert.png"> Oops!');
}


function cancelFm() {
    app.DestroyLayout(lst_fm_lay[0]);
    cancelShowCheck();
    Exit = 'show';
}


var lst_fm_lay = [];
function FileManager(callback, path, mode) {
  Exit = 'filemanager';
  var pth = path.join("/").replace(/‚/g, ',').replace(/\/\//, '/');
  var fold = app.ListFolder(pth);
  if(! fold) return;
  lst_fm_lay.push(app.CreateLayout("Absolute"));
  var lay = lst_fm_lay.slice(-1)[0];
  var title_ = app.CreateTitle(path.length==1 ? "Устройство" : pth, 1);
  lay.AddChild(title_);
  if(path.length>1) pth += "/";
//  lay.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
  lay.SetBackground('Img/bg'+BG+'.png', 'repeat');
  fm_params = {callback: callback, mode: mode, path: path};
  list_dirs = [];
  var cmp = function(a, b) {
    return (a.toLowerCase()>b.toLowerCase()) ? 1: -1;
    }
  fold.sort(cmp);
  for(var i in fold) {
    var p = fold.slice(i)[0].replace(/‚/g, ',');
    if(app.IsFolder(pth+p)) list_dirs.push(p.replace(/,/g, '‚'));
  }
  var data = "";
  for(var i in list_dirs)  data += list_dirs[i] + ":folder,";
  lst = app.CreateList(data, 1,  1-GET_TOP);
  lst.SetPosition(0, GET_TOP);
  lst.SetTextColor(TC[BG]);
  lst.SetTextMargins(0.04, 0, 0, 0); 
  lst.SetOnTouch(FM_lst_OnTouch);
  lst.SetOnLongTouch(callback);
  lay.AddChild(lst);
  var exit = app.CreateButton('[fa-close]', BTNWIDTH, BTNHEIGHT, "fontawesome, custom");
  exit.SetPosition(1-BTNWIDTH, 1-BTNHEIGHT);
  exit.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
  exit.SetOnTouch(cancelFm);
  exit.SetTextColor('#bb0000');
  exit.SetTextSize(TextButtonsSize, 'px');
  lay.AddChild(exit);
  app.AddLayout(lay);
  if(lst_fm_lay.length>1) {
    app.DestroyLayout(lst_fm_lay[0]);
    lst_fm_lay.splice(0, 1) 
  }
}

function FM_lst_OnTouch(item) {
    fm_params.path.push(item) ;
    FileManager(fm_params.callback, fm_params.path, fm_params.mode);
}




//#############
var flagInput = false;
function inputDigital(callback, input_type, title, default_value, rnd, hint) { 
    if (flagInput) return;
    flagInput = true;
    input_params = {
        sum: String(default_value || 0), 
        maxvalue: 999999.99, 
        callback: callback,
        flag_exit: false
        }
    input_params.round = rnd ? rnd : 2;
    var mode = Number(input_type!="float")
    layInputDigital = app.CreateLayout("linear", "FillXY");
    layInputDigital.SetBackground('Img/bg'+BG+'.png', 'repeat');
    layInputDigital2 = app.CreateLayout("linear", "bottom");
    layInputDigital2.SetVisibility('Hide');
    var keys = ["C", "CE", "OK", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."]; 
    var title_ = app.CreateTitle(title);
    layInputDigital.AddChild(title_);
    layInputDigital.AddChild(layInputDigital2);
    var l = app.CreateLayout("linear", "Horizontal");
    layInputDigital2.AddChild(l);
    input_params.txtSum = app.CreateText(input_params.sum, 0.98, -1); 
    input_params.txtSum.SetBackGradient('#77'+COLORS[BG][0].slice(1), '#77'+COLORS[BG][1].slice(1));
    input_params.txtSum.SetTextSize(TextButtonsSize*1.6, 'px');
    input_params.txtSum.SetTextColor(TC[BG]);
    input_params.txtSum.SetMargins(0, 0.005, 0, 0.005); 
    layInputDigital2.AddChild(input_params.txtSum); 
    var lay1st = app.CreateLayout("linear", "Horizontal");
    for(var i=0; i<3; i++) AddButtonInput(lay1st, keys[i], input_type); 
    layInputDigital2.AddChild(lay1st); 
    var lay2nd = app.CreateLayout("linear", "Horizontal");
    for (var i=3; i<7; i++) AddButtonInput(lay2nd, keys[i], input_type); 
    layInputDigital2.AddChild(lay2nd); 
    var lay3rd = app.CreateLayout("linear", "Horizontal");
    for(var i=7; i<11; i++) AddButtonInput(lay3rd, keys[i], input_type) ;
    layInputDigital2.AddChild(lay3rd);
    var lay4rd = app.CreateLayout("linear", "Horizontal");
    lay4rd.SetMargins(0, 0, 0, 0.001); 
    for(var i= 11; i<14; i++) {
        if (input_type != "float" && i == 13) 
            continue;
        AddButtonInput(lay4rd, keys[i], input_type) ;
    }
    layInputDigital2.AddChild(lay4rd);
    app.AddLayout(layInputDigital); 
    app.Wait(0.05);
    var sz = 1 - input_params.txtSum.GetHeight() - 0.01 - GET_TOP - BTNHEIGHTCALC*4;
    var t = app.CreateText('', inputValues2.length?0.45:0.9, sz, 'left,html,multiline');
    if (hint ) {
        t.SetHtml(hint.big() );
        t.SetPadding(0, 0.015, 0, 0)
        t.SetTextColor(TC[BG]);
        t.SetTextShadow( 20, 0, 0, "#ccaaaa00" ); 
    }
    l.AddChild(t);
    var fl = false;
    if (inputValues2.length && (Exit == 'input')) {
        var lst = app.CreateList(inputValues2, 0.45, sz-0.005);
        fl = true;
    }
    else if (inputValues2_1.length && (Exit == 'input2')) {
        var lst = app.CreateList(inputValues2_1, 0.45, sz-0.005);
        fl = true;
    }
    else if (Exit == 'inputPrice') {
        var vl = 0;
        for (var key in defaultPrices) {
            if (key.slice(0, -1) == title.replace(/^(.+) \(.+\)$/, "$1")) {
                vl = defaultPrices[key]; break;
            }
        }
        if (vl) {
            var lst = app.CreateList(vl, 0.45, sz-0.005);
            fl = true;
        }
    }
    if (fl) {
        lst.SetMargins(0, 0.005, 0, 0); 
        lst.SetDivider(2/HEIGHT, '#50888888');
        lst.SetOnTouch(btns_OnTouch);
        lst.SetOnLongTouch(btns_OnTouch);
        lst.SetTextColor(TC[BG]);
        l.AddChild(lst);
    }
    layInputDigital2.SetVisibility('Show');
} 



function AddButtonInput(lay, name, input_type) { 
    if(name == 0)  w = (input_type == "float") ? 0.25 : 0.75;
    else if (name == "." || name == "OK") w = 0.5;
    else w = 0.25;
    var btn = app.CreateButton(name, w, 0.1, "custom");
    btn.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    btn.SetOnTouch(btns_OnTouch); 
    btn.SetTextSize(TextButtonsSize, 'px');
    if (name == "C" || name == "CE") btn.SetTextColor('#aa5555');
    else if (name == "OK" ) btn.SetTextColor('#009000');
    else btn.SetTextColor(TC2[BG]);
    lay.AddChild(btn); 
} 

function btns_OnTouch(a) { 
    if (typeof a != 'string') {
        var txt = this.GetText();
        }
    else {
        input_params.sum = a;
        txt = 'OK';
        }
    if(txt == "OK") {
        input_params.sum =  input_params.sum.replace(/(\d+)\.0*$/g, '$1');
        input_params.sum =  input_params.sum.replace(/(\d+\.[1-9]+)0*$/g, '$1');
        var nmb = +(input_params.sum);
        if (Exit == 'input') sortValues(nmb);
        else if (Exit == 'input2') sortValues2(nmb);
        else if (Exit == 'inputPrice') sortPrices(nmb);
        input_params.callback(nmb);
        if (Exit == 'input') Exit = 'form';
        else if (Exit == 'input2') Exit = 2;
        else if (Exit == 'inputPrice') Exit = 'price';
        else if (Exit == 'input_fin') Exit = 'finance'; 
        else if (Exit == 'inputwall') Exit = 'wallpaper'; 
        app.DestroyLayout(layInputDigital)
        flagInput = false;
        }
    else if(txt == "C") input_params.sum = "0"; 
    else if(txt == "CE") {
        input_params.sum = input_params.sum.slice(0, -1); 
        if (input_params.sum == "") input_params.sum = "0" }
    else if(txt == "." && input_params.sum.indexOf(".") != -1) return;
    else {           
        if (input_params.sum == "0" && txt != ".") input_params.sum = "";
        else if (eval(input_params.sum + txt) > input_params.maxvalue) return;
        else if (input_params.sum.slice(input_params.sum.indexOf("."), -1).length == input_params.round) return;
        input_params.sum += txt }
    input_params.txtSum.SetText(input_params.sum);
}





var sumCalculator = "0";
function showCalculator() {
    layCalculator = app.CreateLayout( "linear", "FillXY" );
    var title_ = app.CreateTitle('Калькулятор');
    layCalculator.AddChild(title_);
    layCalculator2 = app.CreateLayout( "linear", "bottom" );
    layCalculator.AddChild(layCalculator2);
   // layCalculator.SetBackColor(COLORS[BG][0]);
   layCalculator.SetBackground('Img/bg'+BG+'.png', 'repeat');
    var layFrm = app.CreateLayout( "Frame" );
    layFrm.SetSize(0.99, 1-BTNHEIGHTCALC*5 - GET_TOP);
    var keys = [ 1, 2, 3, "÷", 4, 5, 6, "×", 7, 8, 9, "─", 0, ".", "(", "+", "C", "CE", ")", "=" ]; 
    var layScroll = app.CreateScroller(0.99, 1-BTNHEIGHTCALC*5 - GET_TOP);
    txtSum2 = app.CreateText( sumCalculator, 0.99, -1, 'multiline,html'); 
    txtSum2.SetBackGradient('#77'+COLORS[BG][0].slice(1), '#77'+COLORS[BG][1].slice(1));
    txtSum2.SetTextSize(TextButtonsSize*1.6, 'px'); 
    txtSum2.SetOnTouch(clipboardTextTouch);
    txtSum2.SetTextColor(TC[BG]);
    layScroll.SetMargins( 0, 0.01, 0, 0.02 ); 
    layScroll.AddChild(txtSum2);
    layCalculator2.AddChild( layFrm);
    layFrm.AddChild( layScroll );
    for (var q=0; q<keys.length; q+=4) {
        var lay = app.CreateLayout( "linear", "Horizontal" );
        for (var i=0; i<4; i++ ) Add_buttons( lay, keys[q+i] ); 
        layCalculator2.AddChild(lay);
        }
    layCalculator.lf  = app.CreateLayout( "linear", "right,top" );
    var cancel = app.CreateText('[fa-close]', -1, -1, 'fontawesome');
    cancel.SetTextSize(TextButtonsSize * 1.5, 'px');
    cancel.SetOnTouchDown(clipboardCancelTouch); 
    cancel.SetTextColor('#bb0000');
    cancel.SetMargins(0, 0.005, 0.01, 0.005);
    layCalculator.lf.AddChild(cancel);
    var line = app.CreateText('', 0.6, 2/HEIGHT);
    line.SetBackColor('#555544');
    layCalculator.lf.AddChild(line);
    layCalculator.lst = app.CreateList('', 0.6, -1);
    layCalculator.lst.SetOnTouch(clipboardListTouch);
    layCalculator.lst.SetOnLongTouch(clipboardListTouch);
    layCalculator.lst.SetTextSize(TextSize);
    layCalculator.lf.SetBackColor('#dddddddd');
    layCalculator.lst.SetTextColor('#444430');
    layCalculator.lf.SetVisibility('Hide');
    layCalculator.lf.AddChild(layCalculator.lst);
    layFrm.AddChild(layCalculator.lf);
    layCalculator.SetVisibility('Hide');
    app.AddLayout( layCalculator ); 
    layCalculator.Animate('ScaleFromLeft');
} 

function clipboardListTouch (t) {
    var t =  Round(t).toString();
    if (Round(sumCalculator) == 0) {
        sumCalculator = t;
        txtSum2.SetText(t);
        txtSum2.SetTextColor(TC[BG]);
        }
    else {
            if (t.slice(0, 1) == '-' && sumCalculator.slice(-1) != '(')
                t = '(' + t + ')';
            sumCalculator += t;
            txtSum2.SetText(sumCalculator);
            txtSum2.SetTextColor(TC[BG]);
        }
    layCalculator.lf.SetVisibility('Hide');
}

function clipboardTextTouch (ev) {
    if (layCalculator.lf.GetVisibility() == 'Show') return;
    if (ev.action == 'Down') {
        arguments.callee.Y = ev.Y;
        return;
    }
    else if (ev.action == 'Move') return;
    else if (ev.action == 'Up') {
        if (arguments.callee.Y != ev.Y) return;
    }
    resizeButton(this, 1.0, 0.95);
    var txt = app.GetClipboardText();
    if (!txt) 
    {
        return app.ShowPopup('Буфер обмена пуст.', 'Short');
    }
    if (!(sumCalculator.slice(-1).match(/[\-\+\*\/\(]$/)) && (Round(sumCalculator) != 0)) 
    {
        return app.ShowPopup('Вставка возможна только после +-*\/(', 'Short');
    }
    var mo = txt.match(/(\-?\d+\.?\d*)/gm);
    if (Clipboard.length > 1)
    {
        for (var j=1; j<Clipboard.length; j++)
        {
            var m = Clipboard[j].match(/(\-?\d+\.?\d*)/gm);
            if (mo && m)
            {
                mo = mo.concat(m);
            }
        }
    }
    if (mo) 
    {
        layCalculator.lst.SetList(mo);
        layCalculator.lf.SetVisibility('Show');
    }
    else app.ShowPopup('В буфере нет числовых значений.', 'Short')
}


function clipboardCancelTouch() 
{
    layCalculator.lf.SetVisibility('Hide');
}



function Add_buttons(lay, name) { 
    var btn = app.CreateButton(name, 0.25, 0.1, "custom");
    btn.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    if (name == "C" || name == "CE") btn.SetTextColor('#aa5555');
    else btn.SetTextColor(TC2[BG]);
    btn.SetOnTouch(btnsc_OnTouch); 
    btn.SetTextSize(TextButtonsSize, 'px')
    lay.AddChild(btn); 
} 


function btnsc_OnTouch(arg) { 
    var txt = this.GetText().replace(/÷/g, '/').replace(/×/g, '*').replace(/─/g, '-');
    if (txt=="=")  return CalcResult();
    else if (txt=="C") sumCalculator = "0"; 
    else if (txt.match(/[\d\.]/) && sumCalculator.slice(-1) == ')' ) return;
    else if (txt.match(/^[\d\(]$/) && sumCalculator == '0') sumCalculator = txt; 
    else if (txt == '0' && sumCalculator == '0') sumCalculator = txt; 
    else if (txt == 'CE') {
        if (sumCalculator == '0') return;
        if (sumCalculator.match(/^[^0]$/)) sumCalculator = '0';
        else sumCalculator = sumCalculator.slice(0, -1);
        }
    else if (txt.match(/^[\+\-\*\/]$/)) {
        if (sumCalculator == '0' ) {
            if (txt == '-') sumCalculator = txt;
            else return;
            }
        else if (txt != '-' && sumCalculator.slice(-1) == '(' || sumCalculator.match(/^.{0,}\([\.\-]+$/)  || sumCalculator.match(/^.{0,}[\+\-\*\/]\.$/)) return;
        else if (sumCalculator.match(/^[\+\-\*\/]$/)) return;
        else if (sumCalculator.match(/^.{0,}[\+\-\*\/]$/)) sumCalculator = sumCalculator.slice(0, -1) + txt;
        else sumCalculator += txt;
        }
    else if (txt == '(') {
        if (sumCalculator.match(/^.{0,}[\d\)\.]$/)) return;
        else sumCalculator += txt;
        }
    else if (txt == ')') {
        if (sumCalculator.match(/^.{0,}[^\d\.\)]$/) || sumCalculator == '0' || sumCalculator.match(/^.{0,}[\(\.]$/)) return;
        if (sumCalculator.split('(').length == sumCalculator.split(')').length) return;
        else sumCalculator += txt;
        }
    else if (txt == '.') {
        if (sumCalculator.match(/^.+e[\+\-]\d+$/gi)) return;
        var ind = sumCalculator.split(/[\+\-\*\/]/).slice(-1)[0].indexOf('.');
        if (ind != -1) return;
        else sumCalculator += txt;
        }
    else sumCalculator += txt; 

    var $ = sumCalculator.split(/[\+\-\*\/\)\(]/).slice(-1)[0];
    try 
    {
        if (eval($) > 999999.99 || $.indexOf('.') != -1 && $.split('.').slice(-1)[0].length > 2) 
        {
            sumCalculator = sumCalculator.slice(0, -1);
        }
    }
    catch(e) {};
    txtSum2.SetText(sumCalculator); 
    txtSum2.SetTextColor(TC[BG]);
    if (layCalculator.lf.GetVisibility() == 'Show' && !(txt.match(/[\-\+\*\/\(]$/)) && (Round(sumCalculator) != 0)) 
    {
        clipboardCancelTouch()
    }
} 


function CalcResult() { 
    try { 
        var temp = sumCalculator;
        sumCalculator = Round(eval(sumCalculator)).toString();
        if (isFinite(eval(sumCalculator))) {
            txtSum2.SetText(sumCalculator); 
            txtSum2.SetTextColor('#009900');
            }
        else {
            txtSum2.SetTextColor("#ff0000");
            txtSum2.SetHtml(temp+' <img src=Img/alert.png>');
            app.ShowPopup('Ошибка', 'Short');
            sumCalculator = temp;
            }
    } 
    catch(e) {
        txtSum2.SetTextColor('#ff0000');
        txtSum2.SetHtml(temp+' <img src=Img/alert.png>');
        app.ShowPopup('Неверное выражение', 'Short');
        } 
} 





//##############################hist/bask

function Alert(body, title, yes, left, callback) {
    yes = yes || 'OK';
    title = title || 'Сообщение:';
    Dialog = app.CreateDialog('', 'NoCancel,NoTitle');
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    Dialog.AddLayout(layDlg);
    var titl = app.CreateText('<big><b>'+title
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
        titl.SetTextColor('#3098ba');
        titl.SetMargins(0, 0.02, 0, 0.02);
        layDlg.AddChild(titl);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
    var scroll = app.CreateScroller(0.95, -1);
    layDlg.AddChild(scroll);
    var layScroll = app.CreateLayout('Linear')
    scroll.AddChild(layScroll);
    if (!left)
        edt = app.CreateText('<big>'+body.replace(/\n/g, '<br>')+'</big>', 0.9, -1, 'multiline,html');
    else
        edt = app.CreateText('<big>'+body.replace(/\n/g, '<br>')+'</big>', 0.9, -1, 'multiline,html,left');
    edt.SetFontFile('fonts/DroidSerif-Regular.ttf');
    edt.SetTextColor(TC[BG]);
    edt.SetMargins(0, 0.02, 0, 0.03);
    layScroll.AddChild(edt);
    var line = app.CreateText('', 0.95, 2/HEIGHT);
    line.SetBackColor('#999999');
    layScroll.AddChild(line);
    var btn = app.CreateButton(yes, -1, -1, 'html,fillx');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TC[BG]);
    btn.callback = callback;
    btn.SetOnTouch(_alert);
    layScroll.AddChild(btn);
    Dialog.Show();
}


function _alert()
{
    this.SetBackColor('#33aacc');
    Dialog.Dismiss();
    app.DestroyLayout(layDlg);
    if (this.callback) this.callback();
}



function Alert2(body, head, yes_btn_text, left) {
    if (!body && this.result)
    {
        try
        {
            if (this.result != 'Cancel') this.SetBackColor('#0088aa'); 
            Alert2.Dialog.Dismiss();
            app.DestroyLayout(Alert2.layDlg); 
        }
        catch(er) {return alert(er)}
    }
    else
    { 
        var format = function(str) {
            return String(str)
                    .replace(/^ /gm, '&#160;')
                    .replace(/\n/g, '<br>');
        }
        var yes_btn_text = yes_btn_text || 'OK';
        var head = head || 'Инфо:'; 
        var L =  app.CreateLayout("linear");
        L.SetVisibility('Hide');
        app.AddLayout(L);
        var title = app.CreateText('<big><b>'+ format(head) + '</b></big>',  0.9, -1, 'multiline,html,left');
        L.AddChild(title);
        var btn = app.CreateButton(format(yes_btn_text), 0.95, -1, 'filly,html');
        L.AddChild(btn);
        var qt = app.CreateText('<big>' + format(body) + '</big>', 0.93, -1, 'multiline,html'+(left?',left':''));
        qt.SetFontFile('fonts/DroidSerif-Regular.ttf');
        qt.SetMargins(0.01, 0.02, 0.01, 0.02);
        L.AddChild(qt);
        app.Wait(0.05);
        Alert2.Dialog = app.CreateDialog('', 'NoTitle');
        Alert2.layDlg = app.CreateLayout("linear", "vertical,fillxy" );
        Alert2.layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
        Alert2.Dialog.AddLayout(Alert2.layDlg);
        title = app.CreateText('<big><b>'+format(head)+'</b></big>', 0.9, -1, 'multiline,html,left');
        title.SetTextColor('#3098ba');
        title.SetMargins(0, 0.02, 0, 0.02);
        Alert2.layDlg.AddChild(title);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        Alert2.layDlg.AddChild(line);
        var scroll = app.CreateScroller(0.95, Math.min(+qt.GetHeight() + 0.05, 0.88 - title.GetHeight() - btn.GetHeight()));
        Alert2.layDlg.AddChild(scroll);
        line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#999999');
        Alert2.layDlg.AddChild(line);
        btn = app.CreateButton(format(yes_btn_text), 0.95, -1,'filly,html');
        btn.SetBackColor('#00000000');
        btn.SetTextColor(TC[BG]);
        btn.SetOnTouch( Alert2 );
        btn.result = 'Yes';
        Alert2.layDlg.AddChild(btn);
        Alert2.Dialog.result = 'Cancel';
        Alert2.Dialog.SetOnCancel( Alert2 );
        var layScroll = app.CreateLayout('Linear');
        scroll.AddChild(layScroll);
        var qt = app.CreateText('<big>'+ format(body) +'</big>', 0.93, -1, 'multiline,html'+(left?',left':''));
        qt.SetFontFile('fonts/DroidSerif-Regular.ttf');
        qt.SetTextColor(TC[BG]);
        qt.SetMargins(0.01, 0.02, 0.01, 0.02);
        layScroll.AddChild(qt);
        app.DestroyLayout(L);
        Alert2.Dialog.Show();
    }
}



function ynd(obj) {
    this.SetBackColor('#33aacc')
    this.func();
}

{function YesNoDialog(func, query, title, yes, no) {
    yes = yes || 'Да';
    no = no || 'Нет';
    title = title || 'Вопрос:';
    Dialog = app.CreateDialog(title, 'NoCancel,NoTitle');
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    Dialog.AddLayout(layDlg);
    var titl = app.CreateText('<big><b>'+title
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
        titl.SetTextColor('#3098ba');
        titl.SetMargins(0, 0.02, 0, 0.02);
        layDlg.AddChild(titl);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
    var scroll = app.CreateScroller(0.95, -1);
    layDlg.AddChild(scroll);
    var layScroll = app.CreateLayout('Linear')
    scroll.AddChild(layScroll);
    edt = app.CreateText('<big>'+query.replace(/\n/g, '<br>')+'</big>', 0.9, -1, 'multiline,html');
    edt.SetFontFile('fonts/DroidSerif-Regular.ttf');
    edt.SetTextColor(TC[BG]);
    edt.SetMargins(0, 0.02, 0, 0.03);
    layScroll.AddChild(edt);
    var line = app.CreateText('', 0.95, 2/HEIGHT);
    line.SetBackColor('#999999');
    layScroll.AddChild(line);
    var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
    var btn = app.CreateButton(no, 0.475, -1,'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TC[BG]);
    btn.SetOnTouch(ynd);
    btn.ID = 'No';
    btn.func = func;
    layButtons.AddChild(btn);
    var line = app.CreateText('', 2.3/HEIGHT, -1, 'filly');
    line.SetBackColor('#999999');
    layButtons.AddChild(line);
    var btn = app.CreateButton(yes, 0.475, -1, 'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TC[BG]);
    btn.SetOnTouch(ynd);
    btn.ID = 'Yes';
    btn.func = func;
    layButtons.AddChild(btn);

    layScroll.AddChild(layButtons);
    Dialog.Show();
    Dialog.SetOnCancel(dlgCancel);
}
}
function dlgCancel() {
    app.DestroyLayout(layDlg);
}


//####################################

function YesNoDialog2(callback, body, head, left, yes, no)
{
    var format = function(str) {
            return String(str)
                    .replace(/^ /gm, '&#160;')
                    .replace(/\n/g, '<br>');
    }
    if (!callback)
    {
        if (this.result != 'Cancel')
            this.SetBackColor('#0088aa'); 
        Dialog.Dismiss();
        app.DestroyLayout(layDlg); 
        this.func(this.result);
    }
    else
    { 
        var line, btn;
        var yes = yes || 'Да';
        var no = no || 'Нет';
        var head = head || 'Вопрос:'; 
        var L =  app.CreateLayout("linear");
        L.SetVisibility('Hide');
        app.AddLayout(L);
        var title = app.CreateText('<big><b>'+head
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
        L.AddChild(title);
        var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
        btn = app.CreateButton(yes, 0.47, -1, 'filly,html');
        layButtons.AddChild(btn);
        btn = app.CreateButton(no, 0.47, -1, 'filly,html');
        layButtons.AddChild(btn);
        L.AddChild(layButtons);
        var qt = app.CreateText(
            '<big>'+format(body)+'</big>', 
            0.92, -1, 'multiline,html'+ (left ? ',left' : ''));
        qt.SetMargins(0.01, 0.02, 0.01, 0.02);
        L.AddChild(qt);
        app.Wait(0.05);
        Dialog = app.CreateDialog('', 'NoTitle');
        layDlg = app.CreateLayout("linear", "vertical,fillxy" );
        layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
        Dialog.AddLayout(layDlg);
        title = app.CreateText('<big><b>'+head
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
        title.SetTextColor('#3098ba');
        title.SetMargins(0, 0.02, 0, 0.02);
        layDlg.AddChild(title);
        line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
        var scroll = app.CreateScroller(0.95, Math.min(+qt.GetHeight() + 0.05, 0.88 - title.GetHeight() - layButtons.GetHeight()));
        layDlg.AddChild(scroll);
        line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#999999');
        layDlg.AddChild(line);
        var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
        btn = app.CreateButton(yes, 0.47, -1,'filly,html');
        btn.SetBackColor('#00000000');
        btn.SetTextColor(TC[BG]);
        btn.SetOnTouch( YesNoDialog2 );
        btn.result = 'Yes';
        btn.func = callback;
        layButtons.AddChild(btn);
        line = app.CreateText('W', 2/HEIGHT, -1, 'filly');
        line.SetBackColor('#999999');
        layButtons.AddChild(line);
        btn = app.CreateButton(no, 0.47, -1, 'filly,html');
        btn.SetBackColor('#00000000');
        btn.SetTextColor(TC[BG]);
        btn.SetOnTouch( YesNoDialog2 );
        btn.result = 'No';
        btn.func = callback ;
        layButtons.AddChild(btn);
        layDlg.AddChild(layButtons);
        Dialog.func = callback ;
        Dialog.result = 'Cancel';
        Dialog.SetOnCancel( YesNoDialog2 );
        var layScroll = app.CreateLayout('Linear');
        scroll.AddChild(layScroll);
        var qt = app.CreateText(
            '<big>'+format(body)+'</big>', 
            0.92, -1, 'multiline,html' + (left ? ',left' : ''));
        qt.SetTextColor(TC[BG]);
        qt.SetMargins(0.01, 0.02, 0.01, 0.02);
        layScroll.AddChild(qt);
        app.DestroyLayout(L);
        Dialog.Show();

    }
}


// ****************************
function setDate(callback, time, title) {
    var formatDate = function(text) {
        return text.length == 1 ? ('0' + text) : text;
    }
    var lay = app.CreateLayout("Linear", "FillXY");
    lay.SetVisibility('Hide');
    app.AddLayout(lay);
    var tmp = app.CreateTextEdit('00', -1, -1, 'Number,vcenter,singleline');
    lay.AddChild(tmp);
    var tmp2 = app.CreateTextEdit('0000', -1, -1, 'Number,vcenter,singleline');
    lay.AddChild(tmp2);
    app.Wait(0.05);
    var hButton = tmp.GetHeight();
    var wButton2 = tmp.GetWidth();
    var wButton4 = tmp2.GetWidth();
    app.DestroyLayout(lay);

    time = time ? new Date(time) : new Date();
    Dialog = app.CreateDialog(title || "Введите дату и время:");
    Dialog.SetOnCancel(dlgCancel);
    layDlg = app.CreateLayout("linear", "fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    Dialog.AddLayout(layDlg);

    var lh = app.CreateLayout('linear', 'horizontal,fillx');
    layDlg.AddChild(lh);

    setDate.d = time.getDate() + '';
    setDate.day = app.CreateTextEdit('', wButton2, -1, 'Number,vcenter,singleline');
    setDate.day.SetCursorColor('#ff8800');;
    setDate.day.SetTextColor(TC[BG]);
    setDate.day.ID = 'day';
    setDate.day.SetOnChange(edtTimeOnChange);
    setDate.day.SetOnTouch(edtTimeOnTouch);
    setDate.day.SetHint(formatDate(setDate.d));
    lh.AddChild(setDate.day);

    var z = app.CreateText(' - ');
    z.SetTextColor(TC[BG]);
    lh.AddChild(z);

    setDate.m = (time.getMonth() + 1) + '';
    setDate.month = app.CreateTextEdit('', wButton2, -1, 'Number,vcenter,singleline');
    setDate.month.SetCursorColor('#ff8800');;
    setDate.month.SetTextColor(TC[BG]);
    setDate.month.SetOnChange(edtTimeOnChange);
    setDate.month.SetOnTouch(edtTimeOnTouch);
    setDate.month.ID = 'month';
    setDate.month.SetHint(formatDate(setDate.m));
    lh.AddChild(setDate.month);
    
    var z = app.CreateText(' - ');
    z.SetTextColor(TC[BG]);
    lh.AddChild(z);
    
    setDate.y = time.getFullYear() + '';
    setDate.year = app.CreateTextEdit('', wButton4, -1, 'Number,vcenter,singleline');
    setDate.year.SetCursorColor('#ff8800');;
    setDate.year.SetTextColor(TC[BG]);
    setDate.year.SetOnChange(edtTimeOnChange);
    setDate.year.SetOnTouch(edtTimeOnTouch);
    setDate.year.ID = 'year';
    setDate.year.SetHint(setDate.y);
    lh.AddChild(setDate.year);


    var line = app.CreateText('', 0.9, 1.9/HEIGHT);
    line.SetBackColor('#55999999');
    line.SetMargins(0, 0.02, 0, 0);
    layDlg.AddChild(line);
    
    lh = app.CreateLayout('linear', 'horizontal,fillx');
    layDlg.AddChild(lh);

    setDate.H = time.getHours() + '';
    setDate.hours = app.CreateTextEdit('', wButton2, -1, 'Number,vcenter,singleline');
    setDate.hours.SetCursorColor('#ff8800');;
    setDate.hours.SetTextColor(TC[BG]);
    setDate.hours.SetOnChange(edtTimeOnChange);
    setDate.hours.SetOnTouch(edtTimeOnTouch);
    setDate.hours.ID = 'hours';
    setDate.hours.SetHint(formatDate(setDate.H));
    lh.AddChild(setDate.hours);

    var z = app.CreateText(' : ');
    z.SetTextColor(TC[BG]);
    lh.AddChild(z);

    setDate.M = time.getMinutes() + '';
    setDate.minutes = app.CreateTextEdit('', wButton2, -1, 'Number,vcenter,singleline');
    setDate.minutes.SetCursorColor('#ff8800');;
    setDate.minutes.SetTextColor(TC[BG]);
    setDate.minutes.SetOnChange(edtTimeOnChange);
    setDate.minutes.SetOnTouch(edtTimeOnTouch);
    setDate.minutes.ID = 'minutes';
    setDate.minutes.SetHint(formatDate(setDate.M));
    lh.AddChild(setDate.minutes);

    var line = app.CreateText('', 0.95, 1.9/HEIGHT);
    line.SetBackColor('#aaaaaa');
    line.SetMargins(0, 0.02, 0, 0);
    layDlg.AddChild(line);
    var o = app.CreateLayout("linear", 'horizontal');
    layDlg.AddChild(o);
    var b = app.CreateButton("Отмена", 0.475, -1, 'html');
    b.SetBackColor('#00000000')
    b.SetOnTouch(dlgCancel2);
    b.SetTextColor(TC[BG]);
    o.AddChild(b);
    var l = app.CreateText('', 1.5/WIDTH, -1, 'filly');
    l.SetBackColor('#aaaaaa');
    o.AddChild(l);
    setDate.btnOk = app.CreateButton('OK', 0.475, -1,'filly,html');
    setDate.btnOk.SetBackColor('#00000000');
    setDate.btnOk.SetTextColor(TC[BG]);
    setDate.btnOk.SetOnTouch(setDateOnTouch);
    setDate.btnOk.callback = callback;
    o.AddChild(setDate.btnOk);
    Dialog.Show();
}


function _isOkTime() {
    var _time = _getTime();
    if (_time > (new Date).getTime()) setDate.btnOk.SetTextColor('#33' + TC[BG].slice(1));
    else setDate.btnOk.SetTextColor(TC[BG]);
}


function edtTimeOnChange() {
    var text = this.GetText();
    var len = text.length;
    if (!len) return _isOkTime();
    if (/^\d+$/.test(text)) var e = eval(text);
    else return this.Undo();
    _isOkTime();
    var month = eval(setDate.month.GetText() || setDate.m);
    var year = eval(setDate.year.GetText() || setDate.y);
    var day = eval(setDate.day.GetText() || setDate.d);
    var d = {1:31,2:(year % 4 ? 28 : 29), 3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31};
    if (this.ID == 'year') {
        if ((len > 4) || (len == 4 && (e - setDate.y < -1 || e > +(new Date().getFullYear())))) 
            return this.Undo();
        if (len == 4 && month == 2 && day > d[2]) {
            setDate.day.SetText(d[2]) ;
        }
    }
    else if (len > 2) return this.Undo();
    else if (len == 2) {
        if (this.ID == 'hours' && e > 23) return this.Undo();
        if (this.ID == 'minutes' && e > 59) return this.Undo();
        if (this.ID == 'day' && (e > d[month] || e < 1)) return this.Undo();
        if (this.ID == 'month')
            if (e > 12 || e < 1) return this.Undo();
    }
    if (this.ID == 'month') {
        if (day > d[e]) {
            setDate.day.SetText(d[e]) ;
        }
    }
    window.edtTimeOnTouch.apply(this);
}


function edtTimeOnTouch() {
    var id = this.ID;
    var ids = ['day', 'month', 'year', 'hours', 'minutes'];
    for (var x=0; x<5; x++) {
        var i = ids[x];
        if (id == i) continue;
        var obj = eval('setDate.' + i);
        var text = obj.GetText();
        if (i == 'year' && text.length < 4) obj.SetText('');
        if ((i == 'day' || i == 'month' ) && text.length && !eval(text)) obj.SetText('');
    }
}

function setDateOnTouch() {
    var _time = _getTime();
    if (_time > (new Date).getTime()) 
        return app.ShowPopup("Запрещено, это время еще не наступило.", "short");
    setDate.btnOk.SetBackColor('#880088aa');
    Dialog.Dismiss();
    app.DestroyLayout(layDlg);
    this.callback(_time);
}

function _getTime() {
   var y = setDate.year.GetText();
   if (!y.length || y.length < 4) y = setDate.y;
   var m = eval(setDate.month.GetText());
   if (!m || !eval(m)) m = setDate.m
   var d = setDate.day.GetText();
   if (!d  || !eval(d)) d = setDate.d;
   var H = setDate.hours.GetText();
   if (!H) H = setDate.H;
   var M = setDate.minutes.GetText();
   if (!M) M = setDate.M;
   var t = new Date(y, +m-1, d, H, M, 0, 0);
   return t.getTime();
}

// ****************************


function dlgCancel2() {
    this.SetBackColor('#33aacc');
    Dialog.Dismiss();
    dlgCancel();
}



function CreateListDialog(callback, head, list, mode, callbackLong)
{
  if (typeof callback != 'function') {
    Dialog.Dismiss(); 
    app.DestroyLayout(layDlg); 
    this.func(callback);
  }

  else { 
    Dialog = app.CreateDialog('', 'NoTitle');
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    layDlg.SetPadding(0, 0.005, 0, 0.005);
    Dialog.AddLayout(layDlg);
    var titl = app.CreateText('<big><b>'+head
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
        titl.SetTextColor('#3098ba');
        titl.SetMargins(0, 0.02, 0, 0.02);
        layDlg.AddChild(titl);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
    if (!mode)
        var list = String(list).replace(/:/gm, '^c^')
    var lst = app.CreateList(list, 0.9, -1);
    lst.SetTextMargins(0, 0.005, 0, 0.005);
    layDlg.AddChild(lst);
    lst.func = callback;
    lst.SetOnTouch(CreateListDialog);
    lst.SetOnLongTouch(CreateListDialog);
    lst.SetTextColor(TC[BG]);
    lst.SetTextColor2(TC[BG]);
    if (typeof callbackLong == 'function')
        lst.SetOnLongTouch(callbackLong);
    Dialog.SetOnCancel(dlgCancel);
    Dialog.Show();
  }
}






function inputPassword(callback, head, mode){
    Dialog = app.CreateDialog('', 'NoTitle');
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    Dialog.AddLayout(layDlg);
    var titl = app.CreateText('<img src="Img/key_green.png"> <big><b>'+head
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
        titl.SetTextColor('#3098ba');
        titl.SetMargins(0, 0.02, 0, 0.02);
        layDlg.AddChild(titl);
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#3088aa');
        layDlg.AddChild(line);
    var scroll = app.CreateScroller(0.95, -1);
    layDlg.AddChild(scroll);
    var layScroll = app.CreateLayout('Linear')
    scroll.AddChild(layScroll);
    var txt = (mode=='Edit' ? '<big>Введите текущий пароль:</big>' : '<big>Введите пароль:</big>');
    var t = app.CreateText(txt, 0.95, -1, 'html');
    t.SetTextColor(TC[BG]);
    t.SetMargins(0, 0.005, 0, 0.005);
    layScroll.AddChild(t);
    var edt_inputPassword = app.CreateTextEdit('', 0.9, -1, 'singleline');
    edt_inputPassword.SetCursorColor('#ff8800');;
    edt_inputPassword.SetTextColor(TC[BG]);
    layScroll.AddChild(edt_inputPassword);
    if (mode=='Edit')
    {
        var t = app.CreateText('<big>Введите новый пароль:</big>', 0.95, -1, 'html');
        t.SetTextColor(TC[BG]);
        t.SetMargins(0, 0.005, 0, 0.005);
        layScroll.AddChild(t);
        var edt_inputPassword2 = app.CreateTextEdit('', 0.9, -1, 'singleline');
        edt_inputPassword2.SetCursorColor('#ff8800');;
        edt_inputPassword2.SetTextColor(TC[BG]);
        layScroll.AddChild(edt_inputPassword2);
    }
    else if (mode=='Create')
    {
        chk = app.CreateCheckBox('Активировать пароль', 0.9, -1);
        chk.SetTextColor(TC[BG]);
        chk.SetMargins(0.01, 0.007, 0.01, 0.01);
        layScroll.AddChild(chk);
    }
    var line = app.CreateText('', 0.95, 2/HEIGHT);
    line.SetMargins(0, 0.015, 0, 0);
    line.SetBackColor('#aaaaaa');
    var btn = app.CreateButton("OK", 0.475, -1, 'html');
    btn.SetBackColor('#00000000');
    btn.SetOnTouch(callback);
    btn.SetTextColor(TC[BG]);
    btn.obj = [mode, edt_inputPassword];
    if (mode=='Edit') btn.obj.push(edt_inputPassword2);
    else if (mode=='Create') btn.obj.push(chk);
    layScroll.AddChild(line);
    var o = app.CreateLayout("linear", 'horizontal');
    layScroll.AddChild(o);
    var b = app.CreateButton("Отмена", 0.475, -1, 'html');
    b.SetBackColor('#00000000')
    b.SetOnTouch(dlgCancel2);
    b.SetTextColor(TC[BG]);
    o.AddChild(b);
    var l = app.CreateText('', 1.5/WIDTH, -1, 'filly');
    l.SetBackColor('#aaaaaa');
    o.AddChild(l);
    o.AddChild(btn);
    Dialog.Show();
    Dialog.SetOnCancel(dlgCancel);
}

function OnTouchPassword()
{
    if (!this.ID)
    {
        this.SetBackColor('#33aacc');
        app.Wait(0.1);
        Dialog.Dismiss();
        var mode = this.obj[0];
        var p = this.obj[1].GetText();
        if (mode=='Create')
        {
            if (! /\S/.test(p))
                return Alert('Нет текста, пароль не задан.', '<img src="Img/alert.png"> Oops!');
            OnTouchPassword.obj = this.obj;
            YesNoDialog(OnTouchPassword, '<big><b>' + p + '</b></big>\n\nЭто Ваш пароль на вход в раздел учета зарплаты. OK?', '<img src="Img/help.png"> Подтвердите:');
        }
        else if (mode=='Edit')
        {
            var err = [];
            if (! /\S/.test(p))
                err.push('Текущий пароль не введен.');
            else if (p!=Pass[0])
                err.push('Неверный текущий пароль.');
            if (! /\S/.test(this.obj[2].GetText()))
                err.push('Новый пароль не введен.');
            if (err.length)
            {
                Alert(err.join('\n'), '<img src="Img/alert.png"> Oops!'); return;
            }
            else if (p==this.obj[2].GetText())
            {
                Alert('Новый пароль такой-же самый, как и текущий.', '<img src="Img/alert.png"> Oops!'); return;
            }
            OnTouchPassword.obj = this.obj;
            YesNoDialog(OnTouchPassword, '<big><b>' + this.obj[2].GetText() + '</b></big>\n\nЭто Ваш новый пароль на вход в раздел учета зарплаты. OK?', '<img src="Img/help.png"> Подтвердите:');
        }
        else
        {
            var err = '';
            if (! /\S/.test(p))
                err = 'Текущий пароль не введен.';
            else if (p!=Pass[0])
                err = 'Неверный текущий пароль.';
            if (err.length)
            {
                Alert(err, '<img src="Img/alert.png"> Oops!'); return;
            }
            if (mode=='OnOff')
            {
                Pass[1] = !Pass[1];
                app.SaveText('Pass', JSON.stringify(Pass));
                var t = (Pass[1] ? '' : 'де');
                var s = (Pass[1] ? 'Активирован' : 'Не активирован');
                passbutton.SetItem('Пароль на вход в раздел учета зарплаты', 'Пароль на вход в раздел учета зарплаты', s, "Img/key_edit.png");
                app.ShowPopup('Пароль ' + t + 'активирован.', 'Short');
            }
            else return finOnTouch(true) ;
        }
    }
    else 
    {
        Dialog.Dismiss();
        app.DestroyLayout(layDlg);
        if (this.ID=='No') return;
        if (OnTouchPassword.obj[0]=='Create')
        {
            Pass[0] = OnTouchPassword.obj[1].GetText();
            Pass[1] = OnTouchPassword.obj[2].GetChecked();
            var t = (Pass[1] ? '' : 'не ');
                var s = (Pass[1] ? 'Активирован' : 'Не активирован');
                passbutton.SetItem('Пароль на вход в раздел учета зарплаты', 'Пароль на вход в раздел учета зарплаты', s, "Img/key_edit.png");
            app.ShowPopup('Пароль задан, ' + t + 'активирован.', 'Short');
        }
        else if (OnTouchPassword.obj[0]=='Edit')
        {
            Pass[0] = OnTouchPassword.obj[2].GetText();
            app.ShowPopup('Пароль изменен.', 'Short');
        }
        app.SaveText('Pass', JSON.stringify(Pass));
    }
}



function SelectionList(callback, list, title, flag, txt, hint) 
{
    title = title || 'Выбор:';
    function C(t) {
        return (t.replace(/,/g, '‚')
          .replace(/:/g, '^c^')
          .replace(/\s/g, ' ')
          .replace(/\"/g, '″'));
    }
    var L =  app.CreateLayout("linear");
    L.SetVisibility('Hide');
    app.AddLayout(L);
    var titl = app.CreateText('<big><b>'+title
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
    titl.SetMargins(0, 0.02, 0, 0.02);
    L.AddChild(titl);
    if (flag && flag > 0) {
        var edt = app.CreateTextEdit(txt || '', 0.9, -1, 'singleline');
        edt.SetCursorColor('#ff8800');;
        edt.SetMargins(0, 0.01, 0, 0.01);
        L.AddChild(edt); 
        if (flag == 1) {
            var add = app.CreateCheckBox('Сохранить для будущих расчетов?', 0.9, -1);
            add.SetMargins(0, 0.005, 0, 0.005);
            L.AddChild(add);
        }
    }
    var lst = [];
    for (var i=0; i<list.length; i++) {
        lst.push(C(list[i]) + ':' + 'Img/rboff.png');
    }
    ls = app.CreateList(lst, 0.95, -1);
    L.AddChild(ls);
    app.Wait(0.05);
    var H = 0.88 - BTNHEIGHT - titl.GetHeight();
    if (flag && flag > 0) H -= edt.GetHeight();
    if (flag == 1)  H -= add.GetHeight();
    var h = Math.min(ls.GetHeight(), H);
    Dialog = app.CreateDialog(title, 'NoTitle');
    layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
    Dialog.AddLayout(layDlg);
    var titl = app.CreateText('<big><b>'+title
            .replace(/\n/g, '<br>')+'</b></big>', 
            0.9, -1, 'multiline,html,left');
    titl.SetTextColor('#3098ba');
    titl.SetMargins(0, 0.02, 0, 0.02);
    layDlg.AddChild(titl);
    var line = app.CreateText('', 0.95, 3/HEIGHT);
    line.SetBackColor('#3088aa');
    layDlg.AddChild(line);
    if (flag && flag > 0) {
        SelectionList.edt = app.CreateTextEdit(txt || '', 0.9, -1, 'singleline');
        SelectionList.edt.SetCursorColor('#ff8800');;
        SelectionList.edt.SetHint(hint || 'Введите название');
        SelectionList.edt.SetTextColor(TC[BG]);
        SelectionList.edt.SetMargins(0, 0.01, 0, 0.01);
        layDlg.AddChild(SelectionList.edt); 
    }
    SelectionList.objs = [];
    var lst = [], list2 = [];
    for (var i=0; i<list.length; i++) {
        var txt = C(list[i]);
        list2.push(txt);
        lst.push(txt + ':' + (!i ? 'Img/rbon.png' : 'Img/rboff.png'));
    }
    SelectionList.index = 0;
    SelectionList.list = list;
    var List = app.CreateList(lst, 0.95, h);
    List.items = list2;
    List.SetTextColor(TC[BG]);
    List.SetOnTouch(SelectionListOnTouch);
    layDlg.AddChild(List);
    if (flag == 1) {
        var line = app.CreateText('', 0.95, 2/HEIGHT);
        line.SetBackColor('#aaaaaa');
        layDlg.AddChild(line);
        SelectionList.add = app.CreateCheckBox('Сохранить для будущих расчетов?', 0.9, -1);
        SelectionList.add.SetMargins(0, 0.005, 0, 0.005);
        SelectionList.add.SetTextColor(TC[BG]);
        layDlg.AddChild(SelectionList.add);
    }
    var line = app.CreateText('', 0.95, 2/HEIGHT);
    line.SetBackColor('#999999');
    layDlg.AddChild(line);
    var layButtons = app.CreateLayout("linear", "horizontal,fillx" );
    var btn = app.CreateButton('Отмена', 0.475, -1,'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TC[BG]);
    btn.SetOnTouch(SelectionListOnTouch);
    btn.ID = 'No';
    btn.callback = callback;
    layButtons.AddChild(btn);
    var line = app.CreateText('', 2/HEIGHT, -1, 'filly');
    line.SetBackColor('#999999');
    layButtons.AddChild(line);
    var btn = app.CreateButton('OK', 0.475, -1, 'html');
    btn.SetBackColor('#00000000');
    btn.SetTextColor(TC[BG]);
    btn.SetOnTouch(SelectionListOnTouch);
    btn.ID = 'Yes';
    btn.flag = flag;
    btn.callback = callback;
    layButtons.AddChild(btn);
    layDlg.AddChild(layButtons);
    app.DestroyLayout(L);
    Dialog.Show();
}


function SelectionListOnTouch(item, subitem, icon, ind) {
    if (item == undefined) {
        if (this.ID == 'No') {
            this.SetBackColor('#33aacc');
            Dialog.Dismiss();
            app.DestroyLayout(layDlg);
            return;
        }
        if (this.flag == -1) {
            this.SetBackColor('#33aacc');
            Dialog.Dismiss();
            app.DestroyLayout(layDlg);
        }
        if (typeof this.callback == 'function')
            this.callback(SelectionList.list[SelectionList.index]);
        return;
    }
    if (ind == SelectionList.index) return;
    var i = this.items[SelectionList.index].replace(/\^c\^/g, ':');
    this.SetItem(i, i, '', 'Img/rboff.png');
    i = this.items[ind].replace(/\^c\^/g, ':');
    this.SetItem(i, i, '', 'Img/rbon.png');
    SelectionList.index = ind;
}


