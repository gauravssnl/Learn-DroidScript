



var lstSC = [], ListSimplePrices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], simpleScrollY = 0, ListSimplePricesOld = null; 
function SimpleCalculation(slide) {
  Exit = 'simple';
  lay_simple = app.CreateLayout("Linear", "Top,FillXY");
  var title_ = app.CreateTitle('Расчет "light"');
  lay_simple.AddChild(title_);
  lstSC.unshift(lay_simple);
  //lay_simple.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
  lay_simple.SetBackground('Img/bg'+BG+'.png', 'repeat');
  var scroll = app.CreateScroller(1,  1-BTNHEIGHT-app.GetTop()-0.005);
  scroll.SetMargins(0, 0, 0, 0.005); 
  lay_simple.AddChild(scroll);
  var layScroll = app.CreateLayout("Linear", "fillxy,top"); 
  scroll.AddChild( layScroll );
  
  var List = ['Длина помещения‚ м', 'Ширина помещения‚ м', 'Высота помещения‚ м',
      'Вычитаемая площадь от потолка‚ м²', 'Вычитаемая площадь от стен‚ м²', 'Вычитаемая площадь от пола‚ м²', 
      'Расценка за потолок‚ ' + Currency + '/м²', 'Расценка за стены‚ ' + Currency + '/м²', 'Расценка за полы‚ ' + Currency + '/м²',
       'Общая расценка за погонаж по периметру‚ ' + Currency + '/м.п.'];
  for (var i in List) {
      var l = app.CreateLayout("Linear", "Horizontal,FillX,vcenter");
      var item = app.CreateList(List[i], 0.72, -1);
      item.SetFontFile('fonts/DroidSerif-Regular.ttf');
      item.SetMargins(0, 0, 0.018, 0);
      item.SetTextSize(TextSize);
      item.SetTextColor(TC[BG]);
      item.SetTextMargins(0.01, 0.006, 0, 0.006);
      item.SetOnTouch(simpleOnTouch);
      item.SetOnLongTouch(simpleOnTouch);
      l.AddChild(item);
      var btn = app.CreateText(ListSimplePrices[i], 0.23, -1);
      item.obj = [i, btn];
      btn.scale = true;
      btn.SetTextSize(TextSize);
      btn.SetTextColor(TC[BG]);
      btn.obj = [i, btn];
      btn.SetOnTouchUp(simpleOnTouch);
      btn.SetMargins(0, 0, 0.016, 0);
      l.AddChild(btn);
      layScroll.AddChild(l);
      var line = app.CreateText('', 1, 2/HEIGHT);
      line.SetBackColor('#888888');
      layScroll.AddChild(line);
  }  
  SimpleCalculation.text = app.CreateText('\n\n', 0.9, -1, 'multiline,left');
  SimpleCalculation.text.SetBackGradient('#77'+COLORS[BG][0].slice(1), '#77'+COLORS[BG][1].slice(1));
  SimpleCalculation.text.SetFontFile('fonts/DroidSerif-Regular.ttf');
  SimpleCalculation.text.SetTextColor(['#ffffaa', '#aa0000'][BG]);
  SimpleCalculation.text.SetMargins(0, 0.01, 0, 0);
  SimpleCalculation.text.SetPadding(0.01, 0, 0.01, 0);
  SimpleCalculation.text.SetTextSize(TextSize);
  layScroll.AddChild(SimpleCalculation.text);
  if (slide) lay_simple.SetVisibility("Hide");
  var ltit = app.CreateLayout("Linear", "Horizontal,FillX, right");
    var exit = app.CreateButton('[fa-power-off]', 0.25, BTNHEIGHT, "FontAwesome, custom");
    exit.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    exit.SetTextColor('#bb0000');
    exit.SetTextSize(TextButtonsSize, 'px');
    exit.SetOnTouch(_exitOnTouch);
    ltit.AddChild(exit);
  var menuBtn = app.CreateButton('[fa-ellipsis-v]', 0.25, BTNHEIGHT, "FontAwesome, custom");
  menuBtn.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
  menuBtn.SetTextColor(TC2[BG]);
  menuBtn.SetTextSize(TextButtonsSize, 'px')
  menuBtn.SetOnTouch(menuSimpleOnTouch);
  ltit.AddChild(menuBtn);
    var calc = app.CreateButton('[fa-calculator]', 0.25, BTNHEIGHT, "FontAwesome, custom");
    calc.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    calc.SetTextColor(TC2[BG]);
    calc.SetTextSize(TextButtonsSize, 'px');
    calc.SetOnTouch(simpleCalcOnTouchButton);
    ltit.AddChild(calc);
    var isHist = +(app.LoadText('simple', '[]') != '[]');
  arguments.callee.hist = app.CreateButton('[fa-history]', 0.25, BTNHEIGHT, "FontAwesome, custom");
  arguments.callee.hist.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
  arguments.callee.hist.SetTextColor(['#80'+TC2[BG].slice(1), TC2[BG]][isHist]);
  arguments.callee.hist.SetTextSize(TextButtonsSize, 'px');
  arguments.callee.hist.SetOnTouch(onTouchSimpleHist);
  ltit.AddChild(arguments.callee.hist);
  lay_simple.AddChild(ltit);
  app.AddLayout(lay_simple);
  if (slide) lay_simple.Animate('ScaleFromLeft');
  if (lstSC.length>1) {
        var n = lstSC.length;
        for (var i = 1; i < n; i++)
            app.DestroyLayout(lstSC.pop());
  }
  setSimplePrice();
}


function infoSimple() {
    var hlp = '  Этот раздел не предназначен для детального обсчета помещения. Его основное назначение - при ознакомлении с объектом в кратчайшее время получить представление о будущем фронте работ и (если нужно) ориентировочной стоимости работ. Хотя, в некоторых простых ситуациях можно составить смету и из такого расчета <img src="Img/smile.png">\n'
    hlp += '  Назначение кнопок в нижней панели:\n- в главном окне раздела (слева направо) - "Выход", "Опции", "Калькулятор", "История";\n';
    hlp += '- в подразделе История (слева направо) - "Выход", "Удаление", "Вывести расчет главном окне раздела", "Копировать в буфер или отослать на почту".\n  Для того, чтобы не утерять производимый расчет, его необходимо сохранить в Истории, выбрав соответствующий пункт в меню, '
    hlp += '<u>по-умолчанию расчеты не сохраняются!</u>'
    Alert2(hlp, '<img src="Img/about.png"> Info', 'Ясно', 1);
}



function simpleCalcOnTouchButton() {
    Exit = 'simple_calc';
    showCalculator();
}


function simpleOnTouch() {
    Exit = 'simple2';
    if (this.scale) {
        this.SetScale(0.8, 0.8);
        app.Wait(0.05);
        this.SetScale(1.0, 1.0);
    }
    simpleOnTouch.obj = this.obj;
    var List = ['Длина помещения‚ м', 'Ширина помещения‚ м', 'Высота помещения‚ м',
    'Вычитаемая площадь от потолка‚ м²', 'Вычитаемая площадь от стен‚ м²', 'Вычитаемая площадь от пола‚ м²', 
      'Расценка за потолок‚ ' + Currency + '/м²', 'Расценка за стены‚ ' + Currency + '/м²', 'Расценка за полы‚ ' + Currency + '/м²',
      'Общая расценка за погонаж по периметру‚ ' + Currency + '/м.п'];
    var title = List[this.obj[0]];
    var value = this.obj[1].GetText();
    inputDigital(setSimplePrice, 'float', title, value);
}

function menuSimpleOnTouch() {
    var hist = JSON.parse(app.LoadText('simple', '[]'));
    var list = [];
    if (ListSimplePrices.filter(function(x) {if(x) return 1}).length)
        list.push('Обнулить все');
    if (ListSimplePrices[0] && ListSimplePrices[1]) {
        list = list.concat(['Сохранить в истории', 'Копировать в буфер', 'Отослать на e-mail']);
    }
    if (hist.length) {
        list.push('Просмотр истории');
        list.push('Очистить историю');
    }
    list.push('Инфо')
    CreateListDialog(menuSimpleOnTouch2, '<img src="Img/grey.png"> Меню', list, true);
}

function _isHist() {
    var x = -1;
    var hist = JSON.parse(app.LoadText('simple', '[]'));
    var l1 = JSON.stringify(ListSimplePrices);
    for (var i=0; i<hist.length; i++) {
        var l2 = JSON.stringify(hist[i][1]);
        if (l1 == l2) {
            x = i; break;
        }
    }
    return x;
}


function menuSimpleOnTouch2(p) {
    if (p == 'Обнулить все') clearSimple();
    else if (p == 'Копировать в буфер') {
        app.SetClipboardText(SimpleCalculation.text.GetText().slice(1, -1));
        app.ShowPopup('Текст скопирован в буфер обмена.', 'short');
sa    }
    else if (p == 'Инфо') infoSimple() ;
    else if (p == 'Отослать на e-mail') {
        sendTextEmail = SimpleCalculation.text.GetText().slice(1, -1);
        setEmail();
    }
    else if (p == 'Сохранить в истории') {
        var hist = JSON.parse(app.LoadText('simple', '[]'));
        var x = _isHist();
        if (~x) hist.splice(x, 1);
        if (!hist.length)
            SimpleCalculation.hist.SetTextColor(TC2[BG]);
        if (hist.length >= 50) hist.pop();
        var d = new Date();
        var ms = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
        var date =  Format(d.getDate()) + " " + ms[+d.getMonth()] 
            + " " + d.getFullYear() + "; " + Format(d.getHours()) 
            + ":" + Format(d.getMinutes());
        hist.unshift([date, ListSimplePrices]);
        app.SaveText('simple', JSON.stringify(hist));
        simpleScrollY = 0;
        app.ShowPopup('Расчет сохранен', 'short');
    }
    else if (p == 'Просмотр истории') {
        SimpleHistoryShow();
    }
    else if (p == 'Очистить историю') {
        YesNoDialog(clearAllHst, 'Очистить историю?', '<img src="Img/help.png"> Подтвердите:');
        
    }
}


function clearAllHst() {
    var yn = this.ID;
    Dialog.Dismiss();
    app.DestroyLayout(layDlg);
    if (yn == 'Yes') {
        app.SaveText('simple', '[]');
        simpleScrollY = 0;
        app.ShowPopup('История очищена', 'short');
        SimpleCalculation.hist.SetTextColor('#80'+TC2[BG].slice(1));
    }
}


function menuSimpleOnTouchShare(p) {
    var hist = JSON.parse(app.LoadText('simple', '[]'));
    var l = [];
    for (var i=0; i<SimpleHistoryShow.objs.length; i++) {
        if (SimpleHistoryShow.objs[i].GetChecked) {
            var t = hist[i][0];
            t += setSimplePrice(hist[i][1]);
            l.push(t);
        }
    }
    var histSimpleText = l.join('\n------------------\n').slice(0, -1);
    if (p == 'Копировать в буфер') {
        app.SetClipboardText(histSimpleText);
        app.ShowPopup('Текст скопирован в буфер обмена.', 'short');
    }
    else if (p == 'Отослать на e-mail') {
        sendTextEmail = histSimpleText;
        setEmail();
    }
}


function onTouchSimpleShare() {
    if (!SimpleHistoryShow.Check) return app.ShowPopup('Ни один расчет не отмечен');
    var list = ['Копировать в буфер', 'Отослать на e-mail'];
    CreateListDialog(menuSimpleOnTouchShare, '<img src="Img/grey.png"> Расчет' + (SimpleHistoryShow.Check==1 ? '' : 'ы') + ':', list, true);
}

function onTouchSimpleDel() {
    if (!SimpleHistoryShow.Check) return app.ShowPopup('Ни один расчет не отмечен');
    YesNoDialog(menuSimpleOnTouchDel, 'Удалить отмеченны' + (SimpleHistoryShow.Check==1 ? 'й' : 'e') + ' расчет' + (SimpleHistoryShow.Check==1 ? '?' : 'ы?'), '<img src="Img/help.png"> Подтвердите:');
}


function menuSimpleOnTouchDel(p) {
    var yn = this.ID;
    Dialog.Dismiss();
    app.DestroyLayout(layDlg);
    if (yn != 'Yes') return;
    var hist = JSON.parse(app.LoadText('simple', '[]'));
    var l = [];
    for (var i=0; i<hist.length; i++) {
        if (!SimpleHistoryShow.objs[i].GetChecked) {
            l.push(hist[i]);
        }
    }
    app.SaveText('simple', JSON.stringify(l));
    app.ShowPopup('Выполнено.', 'short');
    simpleScrollY = 0;
    SimpleHistoryShow();
    var isHist = +(app.LoadText('simple', '[]') != '[]');
    if (!isHist)
        SimpleCalculation.hist.SetTextColor('#80'+TC2[BG].slice(1));
}


function simpleDialogOnTouch(i) {
    if (i == 'Вернуть первоначальный расчет') {
        ListSimplePrices = JSON.parse(JSON.stringify(ListSimplePricesOld));
        ListSimplePricesOld = null;
        SimpleCalculation.Input = false;
        SimpleCalculation();
        app.ShowPopup('Восстановлен первоначальный расчет.');
    }
    else if (i == 'Закрыть раздел') {
         Exit = 1;
         lay_simple.Animate('ScaleToLeft');
         app.DestroyLayout(lay_simple);
         ListSimplePricesOld = null;
         SimpleCalculation.Input = false;
    }
}



function clearSimple() {
    ListSimplePrices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    SimpleCalculation();
}

function onTouchSimpleOpen() {
    if (!SimpleHistoryShow.Check) return app.ShowPopup('Ни один расчет не отмечен');
    else if (SimpleHistoryShow.Check > 1) return app.ShowPopup('Вывести можно только один расчет.');
    simpleScrollY = SimpleHistoryShow.scroll.GetScrollY();
    var lst = JSON.parse(app.LoadText('simple', '[]'));
    for (var i=0; i<lst.length; i++) {
        if (SimpleHistoryShow.objs[i].GetChecked) {
            if (!ListSimplePricesOld && ListSimplePrices[0] && ListSimplePrices[1] && SimpleCalculation.Input) {
                ListSimplePricesOld = JSON.parse(JSON.stringify(ListSimplePrices));
            }
            ListSimplePrices = lst[i][1];
            SimpleCalculation();
            app.DestroyLayout(LSH.pop());
            app.ShowPopup('Выведен отмеченный расчет');
            break;
        }
    }
}


function setSimplePrice(val) {
    function rnd(t) {
        if (ROUNDING == 1) t = Math.round(t);
        else if (ROUNDING == 2) t = Math.floor(t);
        else if (ROUNDING == 3) t = Math.ceil(t);
        return t;
    }
    if (typeof val != 'object') {
        Exit = 'simple';
        var l = ListSimplePrices;
        if (typeof val == 'number') {
            ListSimplePrices.splice(simpleOnTouch.obj[0], 1, val);
            simpleOnTouch.obj[1].SetText(val);
            if ((ListSimplePrices[0] || ListSimplePrices[1]) && !ListSimplePricesOld) {
                SimpleCalculation.Input = true;
            }
        }
    }
    else {
        var l = val;
    }
    var pt, pl, st, per, ppt, pst, ppl, pper;
    pt = Round(l[0] * l[1]);
    pl = pt;
    per = Round((l[0] + l[1]) * 2);
    st = Round(per * l[2]);
    ppt = rnd(Round((pt - l[3]) * l[6]));
    ppl = rnd(Round((pl - l[5]) * l[8]));
    pst = rnd(Round((st - l[4]) * l[7]));
    pper = rnd(Round(per * l[9]));
    if (!l[0] || !l[1]) 
        var t = '\nНедостаточно данных\n';
    else if (pt < l[3] || st && st < l[4] || pt < l[5]) {
        var t = '\nНекорректные данные (вычитаемый участок не может быть больше подсчитываемой поверхности)\n';
    }
    else {
        var t = '\nПотолок: ' + l[0] +' м × ' + l[1] + ' м = ' + pt + ' м²;\n';
        if (l[3]) {
            t += '  В минус: ' + l[3] + ' м²;\nИтого потолок: ' + Round(pt - l[3]) + ' м²;\n';
            pt = Round(pt - l[3]);
        }
        if (st) {
            t += 'Стены: (' + l[0] +' м + ' + l[1] + ' м) × 2 × ' + l[2] + ' м = ' + st + ' м²;\n';
            if (l[4]) {
                t += '  В минус: ' + l[4] + ' м²;\nИтого стены: ' + Round(st - l[4]) + ' м²;\n';
                st = Round(st - l[4]);
            }
        }
        t += 'Пол: ' + l[0] +' м × ' + l[1] + ' м = ' + pl + ' м²;\n';
        if (l[5]) {
            t += '  В минус: ' + l[5] + ' м²;\nИтого пол: ' + Round(pl - l[5]) + ' м²;\n';
            pl = Round(pl - l[5]); 
        }
        if (per)
            t += 'Периметр: (' + l[0] +' м + ' + l[1] + ' м) × 2 = ' + per + ' м.п.;\n';
        if (ppt || pst || ppl || pper) {
            t += '\n• Стоимость работ:\n'; 
            var x = 0;
            if (ppt > 0) {
                x += 1;
                t += 'Потолок: ' + pt + ' м² × ' + l[6] + ' ' + Currency + '/м² = ' + formatNum(ppt) + ' ' + Currency + ';\n';
            }
            if (pst > 0) {
                x += 1;
                t += 'Стены: ' + st + ' м² × ' + l[7] + ' ' + Currency + '/м² = '+ formatNum(pst) + ' ' + Currency + ';\n';
            }
            if (ppl > 0) {
                x += 1;
                t += 'Полы: '  + pl + ' м² × ' + l[8] + ' ' + Currency + '/м² = '+ formatNum(ppl) + ' ' + Currency + ';\n';
            }
            if (pper) {
                x += 1;
                t += 'Погонаж по периметру: '  + per + ' м.п. × ' + l[9] + ' ' 
                + Currency + '/м.п. = '
                + formatNum(pper) + ' ' + Currency + ';\n';
            }
            if (x > 1) {
                t += '💰 Итого: ' + formatNum(Round(ppl+pst+ppt+pper)) + ' ' + Currency + ';\n';
            }
        }
    }
    if (typeof val == 'object')
        return t;
    SimpleCalculation.text.SetText(t);
}


function onTouchSimpleHist() {
    var lst = JSON.parse(app.LoadText('simple', '[]'));
    if (!lst.length) {
        app.ShowPopup('История пуста.');
        return;
    }
    SimpleHistoryShow() 
}


var LSH = [];
function SimpleHistoryShow() {
    var lst = JSON.parse(app.LoadText('simple', '[]'));
    var len = lst.length;
    if (!len) {
        SimpleCalculation();
        app.DestroyLayout(LSH.pop());
        return;
    }
    if (len >= 10) app.ShowProgress('');
    OldExit = 'simple';
    Exit = 'simple_history';
    var lst = JSON.parse(app.LoadText('simple', '[]'));
    laySimpleHistory = app.CreateLayout('linear', 'fillxy');
    var title_ = app.CreateTitle('История [' + len + ']');
    laySimpleHistory.AddChild(title_);
    LSH.unshift(laySimpleHistory);
   // laySimpleHistory.SetBackGradient(COLORS[BG][0], COLORS[BG][1]);
   laySimpleHistory.SetBackground('Img/bg'+BG+'.png', 'repeat');
    var scroll = app.CreateScroller(1, 1-BTNHEIGHT-app.GetTop()-0.005);
    scroll.SetMargins(0, 0, 0, 0.005);
    arguments.callee.scroll = scroll;
    var layScroll = app.CreateLayout("Linear", "fillxy"); 
    scroll.AddChild( layScroll );
    laySimpleHistory.AddChild(scroll);
    var W = BTNHEIGHT*HEIGHT/WIDTH*0.8;
    arguments.callee.objs = [];
    for (var i=0; i<lst.length; i++) {
        var l = app.CreateLayout('linear');
        l.SetMargins(0, 0.005, 0, 0.005);
        var h = app.CreateLayout('linear', 'horizontal,fillx,vcenter,right');
        l.AddChild(h);
        layScroll.AddChild(l);
        var tm = app.CreateText(lst[i][0].big(), 0.95 - W, -1, 'html, left,multiline');
        tm.SetMargins(0.01, 0, 0.01, 0);
        tm.SetTextColor('#0088bb')//(TC[BG]);
        h.AddChild(tm);
        var fr = app.CreateLayout('Frame');
        var k = app.CreateImage('Img/unselect.png', W, BTNHEIGHT*0.8);
        k.index = i;
        k.SetOnTouchDown(onToucCheckSimpleHistory);
        fr.AddChild(k);
        arguments.callee.Img = app.CreateImage('Img/select.png', W, BTNHEIGHT*0.8);
        arguments.callee.objs.push(arguments.callee.Img);
        arguments.callee.Img.SetOnTouchDown(onToucCheckSimpleHistory);
        arguments.callee.Img.index = i;
        arguments.callee.Img.GetChecked = false;
        arguments.callee.Img.SetVisibility('Gone');
        fr.AddChild(arguments.callee.Img);
        h.AddChild(fr);
        var t = app.CreateText(setSimplePrice(lst[i][1]).slice(1, -1), 0.95, -1, 'multiline,left');
        t.SetMargins(0.01, 0.01, 0.01, 0.01);
        t.SetTextColor(TC[BG]);
        t.SetTextSize(TextSize);
        l.AddChild(t);
        var line = app.CreateText('', 1, 2/HEIGHT);
        line.SetBackColor('#99999999');
        layScroll.AddChild(line);
    }
    var ltit = app.CreateLayout("Linear", "Horizontal,FillX,right");
    var exit = app.CreateButton('[fa-power-off]', 0.25, BTNHEIGHT, "FontAwesome, custom");
    exit.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    exit.SetTextColor('#bb0000');
    exit.SetTextSize(TextButtonsSize, 'px');
    exit.SetOnTouch(_exitOnTouch);
    ltit.AddChild(exit);
    arguments.callee.del = app.CreateButton('[fa-trash]', 0.25, BTNHEIGHT, "FontAwesome, custom");
    arguments.callee.del.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    arguments.callee.del.SetTextSize(TextButtonsSize, 'px');
    arguments.callee.del.SetTextColor('#80' + TC2[BG].slice(1));
    arguments.callee.del.SetOnTouch(onTouchSimpleDel);
    ltit.AddChild(arguments.callee.del);
    arguments.callee.open = app.CreateButton('[fa-edit]', 0.25, BTNHEIGHT, "FontAwesome, custom");
    arguments.callee.open.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    arguments.callee.open.SetTextSize(TextButtonsSize, 'px');
    arguments.callee.open.SetTextColor('#80' + TC2[BG].slice(1));
    arguments.callee.open.SetOnTouch(onTouchSimpleOpen);
    ltit.AddChild(arguments.callee.open);
    arguments.callee.share = app.CreateButton('[fa-share-alt]', 0.25, BTNHEIGHT, "FontAwesome, custom");
    arguments.callee.share.SetStyle(COLORS[BG][1], COLORS[BG][1], 4, '#888888', 1, 0);
    arguments.callee.share.SetTextSize(TextButtonsSize, 'px');
    arguments.callee.share.SetTextColor('#80' + TC2[BG].slice(1));
    arguments.callee.share.SetOnTouch(onTouchSimpleShare);
    ltit.AddChild(arguments.callee.share);
    laySimpleHistory.AddChild(ltit);
    app.AddLayout(laySimpleHistory);
    scroll.ScrollTo(0, simpleScrollY);
    if (len >= 10) app.HideProgress();
    arguments.callee.Check = 0;
    if (LSH.length > 1)  {
        var n = LSH.length;
        for (var i = 1; i < n; i++)
            app.DestroyLayout(LSH.pop());
    }
}


function onToucCheckSimpleHistory() {
    var old = SimpleHistoryShow.Check;
    var obj = SimpleHistoryShow.objs[this.index];
    var p = !obj.GetChecked;
    obj.GetChecked = p;
    obj.SetVisibility(p ? 'Show' : 'Gone');
    if (p) SimpleHistoryShow.Check ++;
    else SimpleHistoryShow.Check --;
    if (!SimpleHistoryShow.Check) {
        SimpleHistoryShow.del.SetTextColor('#80' + TC2[BG].slice(1));
        SimpleHistoryShow.open.SetTextColor('#80' + TC2[BG].slice(1));
        SimpleHistoryShow.share.SetTextColor('#80' + TC2[BG].slice(1));
    }
    else if (SimpleHistoryShow.Check == 1) {
        SimpleHistoryShow.del.SetTextColor(TC2[BG]);
        SimpleHistoryShow.open.SetTextColor(TC2[BG]);
        SimpleHistoryShow.share.SetTextColor(TC2[BG]);
    }
    else if (SimpleHistoryShow.Check == 2 && old == 1) {
        SimpleHistoryShow.open.SetTextColor('#80' + TC2[BG].slice(1));
    }
}


