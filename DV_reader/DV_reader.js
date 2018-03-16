

//app.ClearData();

app.SetOrientation("Portrait");
app.EnableBackKey(false);
var FlagExit;
var WIDTH = app.GetScreenWidth();
var HEIGHT = app.GetScreenHeight();
var WEB = 0;

app.LoadScript('listbox.js');
app.LoadScript('source.js', function() {
    Lang = objLang[app.LoadText('Lang', 'EN')]; 

    for (;;) {
        var lay = app.CreateLayout("Linear");
        lay.SetVisibility('Hide');
        app.AddLayout(lay);
        var b = app.CreateButton();
        lay.AddChild(b);
        app.Wait(0.05);
        HBTN = +b.GetHeight();
        app.RemoveLayout(lay);
        if (HBTN) break;
    }

    Start();
});

app.LoadScript('selection_list.js', function() {
    selList = new SelectionList();
    selList.icon_mark = 'Img/sl_on.png';
    selList.icon_unmark = 'Img/sl_off.png';
});


function SetOnTouch(callback, btn) {
	btn.SetOnTouch(function(p1,p2,p3,p4) {
		btn.SetEnabled(false);
		callback.call(btn, p1, p2, p3, p4);
		setTimeout(function() {
			btn.SetEnabled(true);
		}, 400);
	} );
}



function OnBack() {
        if (!FlagExit) {
            FlagExit = true;
            app.EnableBackKey(true);
            setTimeout(function(){app.EnableBackKey(false);FlagExit = false}, 2000);
            app.ShowPopup(Lang['onExit'], 'short');
        }
}


function Start() {
    lay = app.CreateLayout("Linear", "Vertical, FillXY");
    lay.SetBackColor("#ffffff");
    var layImg = app.CreateLayout("Linear", "Horizontal, FillX,VCenter");
    layImg.SetSize(1, 6/HEIGHT);
    lay.AddChild(layImg);
    webImg0 = app.CreateImage(null, 1/3-0.02, 4/HEIGHT);
    webImg0.SetMargins(0.01, 0, 0.01, 0);
    webImg0.SetBackColor("#ffffff");
    webImg0.SetLineWidth(4);
    webImg0.SetPaintColor('#33aaee');
    layImg.AddChild(webImg0);
    webImg1 = app.CreateImage(null, 1/3-0.02, 4/HEIGHT);
    webImg1.SetMargins(0.01, 0, 0.01, 0);
    webImg1.SetBackColor("#ffffff");
    webImg1.SetLineWidth(4);
    webImg1.SetPaintColor('#33aaee');
    layImg.AddChild(webImg1);
    
    webImg2 = app.CreateImage(null, 1/3-0.02, 4/HEIGHT);
    webImg2.SetMargins(0.01, 0, 0.01, 0);
    webImg2.SetBackColor("#ffffff");
    webImg2.SetLineWidth(4);
    webImg2.SetPaintColor('#33aaee');
    layImg.AddChild(webImg2);

    var layUp = app.CreateLayout("Linear", "Horizontal, FillX");
    layUp.SetBackColor("#dddddd");
    lay.AddChild(layUp);
    tabN = app.CreateButton(Lang['news'], 1/3, HBTN);
    tabN.SetBackground("Img/tabOn.png");
    tabN.num = 0;
    tabN.SetTextColor("#444444");
    layUp.AddChild(tabN);
    tabA = app.CreateButton(Lang['articles'], 1/3-3/WIDTH, HBTN);
    tabA.SetMargins(1.5/WIDTH, 0, 1.5/WIDTH, 0);
    tabA.SetBackground("Img/tabOff.png");
    tabA.num = 1;
    tabA.SetTextColor("#444444");
    layUp.AddChild(tabA);
    tabB = app.CreateButton(Lang['blogs'], 1/3, HBTN);
    tabB.SetBackground("Img/tabOff.png");
    tabB.num = 2;
    tabB.SetTextColor("#444444");
    layUp.AddChild(tabB);
    for (var i=0; i<=2; i++) eval("tab"+["N", "A", "B"][i]+".SetOnTouch(tabOnTouch)"); 
        
    var layweb = app.CreateLayout("Linear");
    layweb.SetSize(1, 1-HBTN*2-6/HEIGHT);
    lay.AddChild(layweb);
 
    webN = app.CreateWebView(1, 1-HBTN*2-6/HEIGHT, "AllowZoom, Wide,AutoZoom,IgnoreErrors", 100);
    webN.flagUpdate = false;
    webN.SetOnProgress( webOnProgessN );
    var hN = app.LoadText("webN", '');
    if (hN) webN.LoadHtml(hN);
    webA = app.CreateWebView(1, 1-HBTN*2-6/HEIGHT, "AllowZoom, Wide,AutoZoom,IgnoreErrors", 100);
    webA.flagUpdate = false;
    webA.SetOnProgress( webOnProgessA );
    var hA = app.LoadText("webA", '');
    if (hA) webA.LoadHtml(hA);
    webA.SetVisibility("Gone");
    webB = app.CreateWebView(1, 1-HBTN*2-6/HEIGHT, "AllowZoom,Wide,AutoZoom,IgnoreErrors", 100);
    webB.flagUpdate = false;
    webB.SetOnProgress(webOnProgessB);
    var hB = app.LoadText("webB", '');
    if (hB) webB.LoadHtml(hB);
    webB.SetVisibility("Gone");
    for (var i=0; i<=2; i++) eval("layweb.AddChild(web"+["N", "A", "B"][i]+")");
    if(hA || hB || hN) app.ShowPopup(Lang['startText']);
    var layBottom = app.CreateLayout("Linear", "Horizontal, FillX");
    lay.AddChild(layBottom);
    var menu = app.CreateButton("[fa-ellipsis-v]", -1, HBTN, "fontawesome,custom");
    SetOnTouch(function() {
    	CreateListDialog(onTouchListDialog, Lang['options'], [
            Lang['settings'], Lang['about'], Lang['exit']
       ], onTouchListDialog)
    }, menu);
    back = app.CreateButton("[fa-reply]", -1,  HBTN, "fontawesome ,custom");
    SetOnTouch(webBack, back);
    forward = app.CreateButton("[fa-share]", -1,  HBTN, "fontawesome, custom");
    SetOnTouch(webForward, forward);
    var update = app.CreateButton("[fa-refresh]", -1, HBTN, "fontawesome,custom");
    SetOnTouch(Update, update);
    var w = HBTN*HEIGHT/WIDTH;
    var m = Math.max(0, (1-w*4)/10);
    for (var i=0; i<4; i++) {
        var obj = [menu, back, forward, update][i];
        obj.SetMargins((!i?m*2:m), 0, (i==3?m*2:m), 0);
        obj.SetSize(w);
        obj.SetTextSize(HBTN/2.5*HEIGHT, 'px');
        obj.SetTextColor("#666666");
        obj.SetStyle('#eeeeee', '#ffffff', 30, '#999999', 1, 0);
        layBottom.AddChild(obj);
    }

    setInterval(
        function() {
            var obj = eval("web" + ["N", "A", "B"][WEB]);
            forward.SetEnabled(obj.CanGoForward());
            back.SetEnabled(obj.CanGoBack());
        }, 100);
        
    app.AddLayout(lay);
}


function onTouchListDialog(item, ind) {
    [Setting, About, app.Exit][ind]();
}


function Update() {
    var obj = eval("web" + ["N", "A", "B"][WEB]);
    var url = "http://api.dimonvideo.ru/smart/files.php?razdel=" 
        + ["usernews", "articles", "blog"][WEB]
        + "&f=1&op=24&d=24&dd=" 
        + app.LoadNumber(["N", "A", "B"][WEB], 10);
    
    obj.LoadUrl(url);
    SendRequest( url );
    obj.flagUpdate = false;
}

function tabOnTouch() {
    if (this.num == WEB) return;
    for (var i=0; i<=2; i++) {
        var obj = [tabN, tabA, tabB][i];
        if (obj == this) obj.SetBackground("Img/tabOn.png");
        else obj.SetBackground("Img/tabOff.png");
    }
    var old_obj = eval("web" + ["N", "A", "B"][WEB]);
    var obj = eval("web" + ["N", "A", "B"][this.num]);
    obj.SetVisibility("Show");
    old_obj.SetVisibility("Gone");
    WEB = this.num;
}


function _update(obj) {
    if (obj.flagUpdate) {
         obj.ClearHistory();
         obj.flagUpdate = false;
     }
}


function webOnProgessN(progress) {
    if (progress <= 10) webImg0.Clear();
    webImg0.DrawLine(0, 0.5, progress/100, 0.5);
    if( progress==100 ) {
        setTimeout(webImg0.Clear, 1000);
        _update(webN);
    }
}

function webOnProgessA(progress) {
    if (progress <= 10) webImg1.Clear();
    webImg1.DrawLine(0, 0.5, progress/100, 0.5);
    if( progress==100 ) {
        setTimeout(webImg1.Clear, 1000);
        _update(webA);
    }
}


function webOnProgessB(progress) {
    if (progress <= 10) webImg2.Clear();
    webImg2.DrawLine(0, 0.5, progress/100, 0.5);
    if( progress==100 ) { 
        setTimeout(webImg2.Clear, 1000);
        _update(webB);
    }
}

function webBack() {
   var web = eval("web" + ["N", "A", "B"][WEB]);
   if(web.CanGoBack()) {
        eval("webImg"+WEB+".Clear()");
        web.Back();
    }
}

function webForward() {
    var web = eval("web" + ["N", "A", "B"][WEB]);
    if (web.CanGoForward()) { 
        eval("webImg"+WEB+".Clear()");
        web.Forward();
    }
}


function SendRequest( url ) { 
    var httpRequest = new XMLHttpRequest(); 
    httpRequest.onreadystatechange = function() { 
        eval('HandleReply'+WEB+'(httpRequest)'); 
    }
    httpRequest.open("GET", url);
    httpRequest.send(null); 
} 


function HandleReply0( httpRequest ) { 
    if( httpRequest.readyState==4 && httpRequest.status==200 )  { 
        var text = httpRequest.responseText;  
        app.SaveText("webN", text);
    } 
} 




function HandleReply1( httpRequest ) { 
    if( httpRequest.readyState==4 && httpRequest.status==200 )  { 
        var text = httpRequest.responseText;  
        app.SaveText("webA", text);
    } 
} 



function HandleReply2( httpRequest ) { 
    if( httpRequest.readyState==4 && httpRequest.status==200 )  { 
        var text = httpRequest.responseText;  
        app.SaveText("webB", text);
    } 
} 


function About() {
    var Dialog = app.CreateDialog(Lang['about']);
    var layDlg = app.CreateLayout("linear", "vertical,fillxy" );
    layDlg.SetBackGradient('#eeeeee', "#ffffff");
    layDlg.SetPadding(0.02, 0, 0.02, 0.02);
    Dialog.AddLayout(layDlg);
    var text = Lang['aboutBody'];
    var lstDlg = app.CreateText(text, 0.9, -1, "Html,link");
    layDlg.AddChild(lstDlg);
    Dialog.Show();
}



function Setting() {
    lay_sett = app.CreateLayout("linear", "FillXY");
    var getTop = app.GetTop();
    var text_size = HEIGHT * getTop * 0.62;
    var layTitle = app.CreateLayout('linear', 'filly,vcenter');
    layTitle.SetSize(1, getTop);
    layTitle.SetBackGradient('#555555', '#666666');
    var text = app.CreateText(Lang['settings'].bold(), 0.98, -1, 'left,html');
    text.SetTextSize(text_size, 'px');
    text.SetTextShadow( 1, 1, 1, "#000000" ); 
    text.SetTextColor('#eeeeee');
    layTitle.AddChild(text);
    lay_sett.AddChild(layTitle);
    lay_sett.SetBackColor("#eeeedd");
    var scroll = app.CreateScroller(1, 1 - HBTN - getTop);
    var sett = app.CreateLayout("linear");
    scroll.AddChild(sett);
    lay_sett.AddChild(scroll);
  
    var tit = app.CreateText(Lang['lang'].big().bold(), -1, -1, "multiline,html");
    tit.SetTextColor('#ee8822');
    tit.SetMargins(0, 0.04, 0, 0.01);
    sett.AddChild(tit);
  
    var langs = ['English', 'Русский'];
    selList.setIndex(['EN', 'RU'].indexOf(app.LoadText('Lang', 'EN')));
    var sl = selList.createSelectionList(langs, 0.96, -1, 'normal, expand');
    sl.SetTextColor('#555544');
    sl.SetDivider(0, '#00000000');
    sett.AddChild(sl);
  
    tit = app.CreateText(Lang['numLoad'].big().bold(), -1, -1, "multiline,html");
    tit.SetTextColor("#ee8822");
    tit.SetMargins(0, 0.04, 0, 0.01);
    sett.AddChild(tit);
  
    Setting.spinnersList = [];
    for (var i=0; i<3; i++) {
        var layHrz = app.CreateLayout("Linear", "Horizontal");
        sett.AddChild(layHrz);
        var t = app.CreateText(Lang[['news', 'articles', 'blogs'][i]].big(), 0.68, -1, "html,left");
        t.SetTextColor("#555544")
        layHrz.AddChild(t);
        var spin = app.CreateSpinner("5,10,15,20,25,30,35,40,45,50", 0.2, -1);
        Setting.spinnersList.push(spin);
        spin.SetText(app.LoadNumber(["N", "A", "B"][i], 10));
        spin.SetTextColor("#ee9933");
        layHrz.SetMargins(0, 0, 0, 0.01);
        layHrz.AddChild(spin);
    }
  
    var l = app.CreateLayout("Linear", "Horizontal");
    lay_sett.AddChild(l);
    var back = app.CreateButton(Lang['cancel'], 0.5, HBTN, "custom");
    back.SetStyle('#eeeeee', '#ffffff', 5, '#888888', 1, 0);
    back.SetTextColor('#555555');
  SetOnTouch(backSet, back);
    var ok = app.CreateButton(Lang['save'], 0.5, HBTN, "custom");
    ok.SetStyle('#eeeeee', '#ffffff', 5, '#888888', 1, 0);
    ok.SetTextColor('#555555');
    SetOnTouch(okSet, ok);
    l.AddChild(back);
    l.AddChild(ok);
    app.AddLayout(lay_sett);
}



function okSet() {
    app.ShowPopup(Lang['saveSet'], 'short');
    var lang = ['EN', 'RU'][selList.getIndex()];
    var old_lang = app.LoadText('Lang', 'EN');
    app.SaveText('Lang', lang);
    Lang = objLang[lang];
    if (old_lang != lang) {
        for (var i=0; i<3; i++) {
            var obj = eval('tab'+['N','A','B'][i]);
            obj.SetText(Lang[['news','articles','blogs'][i]]);
        }
    }
    lay_sett.Animate('FadeOut', function() {
        app.DestroyLayout(lay_sett);
    });
    for (var i=0; i<Setting.spinnersList.length; i++) {[]
        var value = +Setting.spinnersList[i].GetText();
        app.SaveNumber(['N', 'A', 'B'][i], value);
    }
}

function backSet() {
    lay_sett.Animate('FadeOut', function() {
        app.DestroyLayout(lay_sett);
    });
}