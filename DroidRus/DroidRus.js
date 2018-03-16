_AddOptions("NODOM");
app.SetDebugEnabled( false );
th = JSON.parse(app.LoadText( "th", 
'{"bg":"#444444","nav":{"color":"#8BC34A","text":{"color":"#444444","size":24}},'+
'"button":{"color":"#FB8C00","radius":3,"shadow":1,"text":{"color":"white","size":20}},'+
'"text":{"color":"white","size":20}}'));

app.SetBackColor( th.bg );
layload = app.CreateLayout( "Linear", "FillXY,VCenter" );
layload.SetBackColor( th.bg );
w = app.GetDisplayWidth()
h = app.GetDisplayHeight()
loadimg = app.CreateImage("Img/"+ app.GetAppName()+".png", w<=h? 0.3 : -1, h<w? 0.3: -1);
loadtxt = app.CreateText( "   Загрузка..." );
layload.AddChild( loadimg );
layload.AddChild( loadtxt );
app.AddLayout( layload );

var style = "";
var num=0;
var listOfAll="";
var txt = [];
var btn = [];
var img = [];
var lay = [];

function AddTxt(tx, op){
  txt.push(app.CreateText(tx, -1, -1, op));
	return txt[txt.length-1];
}

function AddBtn(tx){
	btn.push(app.CreateButton(tx, -1, -1, "custom"));
	return btn[btn.length-1];
}

function AddImg(path){
	img.push(app.CreateImage( path, 1, 1, "ScaleCenter"));
	img[img.length-1].w="dpx(50)";
	img[img.length-1].h="dpy(50)";
	return img[img.length-1];
}

function OnStart(){
  app.EnableBackKey( false );
  
  app.LoadPlugin( "UIExtras" );
  uix = app.CreateUIExtras();
  picker = uix.CreateColorPickerDialog( "", 0, 0, 0, -1, "NoAlpha" );
  picker.SetOnOk(pickerOn);
  
  layMain = app.CreateLayout( "Linear", "FillXY" );
  layMain.Hide();
  
  layNav = app.CreateLayout( "Linear", "Horizontal,VCenter" );
  layMain.AddChild( layNav );
  
  hImg = AddImg("Img/home.png");
  hImg.SetOnTouchUp( function(){
    Open("");
	});
  layNav.AddChild( hImg );
  
  aImg = AddImg( "Img/arrow.png" );
  aImg.Hide();
  layNav.AddChild( aImg );
  aImg.w="dpx(25)"
  
  title = AddTxt( "", "Left,AutoScale" );
  title.opt="title";
  layNav.AddChild( title );
  
  mImg = AddImg("Img/bars.png");
  mImg.SetOnTouchUp( function(){
    Open("Настройки");
	});
  layNav.AddChild( mImg );
  
	layCont = app.CreateLayout( "Frame", "" );
	layMain.AddChild( layCont );
	
	layAnim= app.CreateLayout( "Frame", "" );
	layCont.AddChild( layAnim );
	
	var l = app.ListFolder( "Texts" ).sort();
  for( var le = 0; le < l.length; le++){
    listOfAll += l[le]+",";
  }
  listOfAll+="Учебник Javascript,Форум DroidScript";
	list = app.CreateList( listOfAll, 1, -1,"menu");
	list.SetOnTouch(function(item){
	  if(item=="Учебник Javascript") app.OpenUrl( "http://learn.javascript.ru" );
	  else if(item=="Форум DroidScript") app.OpenUrl( "http://groups.google.com/forum/m/#!forum/androidscript" );
	  else Open(item);
	});
	list.SetPadding();
	layAnim.AddChild( list );
	
	web = app.CreateWebView(null, null, "ScrollFade");
	web.SetBackColor( "#00000000" );
	layAnim.AddChild( web );
	
	scroll = app.CreateScroller(null, null, "ScrollFade");
	layAnim.AddChild( scroll );
	scroll.Hide();
	
	layOpt = app.CreateLayout( "Linear" );
	scroll.AddChild( layOpt );
	
	dlg = app.CreateDialog();
	dlg.lay = app.CreateLayout( "Linear" );
	dlg.AddLayout( dlg.lay );
	dlg.te = app.CreateTextEdit( "", -1, -1, "fillx,number" );
	dlg.te.SetOnChange(function(){
	  var max = bty.bt.max;
	  var text = this.GetText()
	  if(text>=max)this.SetText(max);
	  if(text<0)this.SetText(0);
	  this.SetCursorPos( this.GetText().length );
	});
	dlg.lay.AddChild( dlg.te );
	dlg.hlay = app.CreateLayout( "Linear", "Horizontal" );
	dlg.lay.AddChild( dlg.hlay );
	bty = AddBtn("Да");
	bty.w="0.5-dpx(25)";
	bty.SetOnTouch(btyOk);
	dlg.hlay.AddChild( bty );
	bt = AddBtn("Нет");
	bt.w="0.5-dpx(25)";
	bt.SetOnTouch(function(){dlg.Dismiss()});
	dlg.hlay.AddChild( bt );
	
	thpm = pm("Тема:");
	layOpt.AddChild( thpm );
  
	NewBtn("Цвет фона", picker, "bg");
	NewBtn("Цвет navbar'а", picker, "nav.color");
	NewBtn("Цвет кнопок", picker, "button.color");
	NewBtn("Радиус кнопок", dlg, "button.radius", 100);
	NewBtn("Цвет текста кнопок", picker, "button.text.color");
	NewBtn("Размер текста кнопок", dlg, "button.text.size", 64);
	NewBtn("Тень кнопок", dlg, "button.shadow", 1);
	NewBtn("Цвет текста", picker, "text.color");
	NewBtn("Размер текста", dlg, "text.size", 64);
	NewBtn("Размер navbar'а", dlg, "nav.text.size", 64);
	
	thpm = pm("О программе:");
	layOpt.AddChild( thpm );
	
  tx = AddTxt("DroidRus<br>"+
    "Версия: "+app.GetVersion()+
    "<br>Создатель <a href='http://vk.com/id144993662'>Vlad Cheater</a><br>"+
    "<a href='http://www.youtube.com/playlist?list=PLB-zJSf_3lb6jahNnQ6usQsGDjc5C6OjA'>Уроки на YouTube</a><br>"+
    "<a href='http://vk.com/droidscript_rus'>Группа вк</a>,"+
    "<a href='https://trello.com/invite/b/tTSFp8Rm/66376fd025d44e3703d4c8a8222647ff/droidscript-rus'>Trello</a>",
    "multiline,html,link");
  tx.opt = "pm"
	thpm.incllay.AddChild( tx );
	
	thpm.bt = AddBtn("Оценить DroidRus");
	thpm.bt.SetOnTouch(function(){
    packageName="com.vladapps.droidscriptrus";
    app.OpenUrl("market://details?id="+packageName);
	});
	thpm.bt.w=1;
	thpm.incllay.AddChild(thpm.bt);
	
	thpm.bt = AddBtn("Политика конфиденциальности");
	thpm.incllay.AddChild(thpm.bt);
	thpm.bt.SetOnTouch(function(){
    app.OpenUrl("http://www.androidscript.org/Privacy/Privacy-Policy.html");
	});
	thpm.bt.w=1;
	
	shad = app.CreateImage( "Img/shadow.png");
	layCont.AddChild( shad );
	
	Open("");
  SetTheme(true);
  OnConfig();
  
  app.AddLayout( layMain );
  layload.Animate( "fadeOut", function(){app.DestroyLayout( layload )});
  layMain.Animate( "fadeIn" );
}

function NewBtn(text, obj, path, max){
  if(num%2==0){
    hlay = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
  	thpm.incllay.AddChild(hlay);
  }
	bt = AddBtn(text);
	bt.SetOnTouch(function(){
    obj.SetTitle(text);
    obj.Show();
    bty.bt=this;
    setTimeout(function(){
      dlg.te.SetHint( text );
      dlg.te.SetText( eval("th"+pars()) );
      dlg.te.SetCursorPos( dlg.te.GetText().length );
	    app.ShowKeyboard( dlg.te );
      dlg.te.Focus();
	  }, 10)
  });
	hlay.AddChild( bt );
	bt.path=path;
	bt.max=max;
	bt.w = .5;
	num++
}

function btyOk(){
  dlg.Dismiss();
  eval("th"+pars()+"=dlg.te.GetText()");
	SetTheme();
}

function pickerOn(r, g, b){
  var hex = picker.RGBtoHex(r, g, b);
  eval("th"+pars()+"=hex");
	SetTheme();
}

function pars(){
  var path = bty.bt.path.split(".");
  for(var i = 0; i<path.length; i++){
    path[i]='["'+path[i]+'"]';
  }
  return path.join("");
}

function pm(tit){
	var _layOpt = app.CreateLayout( "Linear");
	lay.push(_layOpt);
	_layOpt.w = 1;
	
	_layOpt.tit = app.CreateLayout( "Absolute" );
	_layOpt.AddChild( _layOpt.tit );
	
	_txt = AddTxt(tit);
	_txt.w=1;
	_layOpt.tit.AddChild( _txt );
	
	_imgTit = AddImg("Img/dropArrow.png");
	_imgTit.opt="title";
	_layOpt.tit.AddChild( _imgTit );
	_imgTit.SetOnTouchUp(function(){
	  if(_layOpt.lay.GetVisibility()=="Gone"){
	    _layOpt.lay.Show();
	    _layOpt.incllay.Animate("SlideFromTop");
	  }
	  else{
	    _layOpt.incllay.Animate("SlideToTop", function(){
	      _layOpt.lay.Gone();
	    })
	  }
  });
	
	_layOpt.lay = app.CreateLayout( "Linear", "FillX" );
	_layOpt.lay.Gone();
	_layOpt.AddChild( _layOpt.lay );
	
	_layOpt.incllay = app.CreateLayout( "Linear", "FillX" );
	_layOpt.incllay.Hide();
	_layOpt.lay.AddChild( _layOpt.incllay );
	
	return  _layOpt;
}

function Open(tit){
  if(title.GetText()!=tit){
  	list.Hide();
  	web.Hide();
  	scroll.Hide();
  	layAnim.Hide();
  	title.SetText( tit );
  	if(tit==""){
  	  aImg.Hide();
  	  list.Show();
  	  web.LoadHtml("");
  	}
  	else if(tit=="Настройки"){
  	  aImg.Show();
  	  scroll.Show();
  	  web.LoadHtml("");
  	}
  	else{
  	  aImg.Show();
  	  web.Show();
  	  var t="";
  	  if(app.FileExists( "Texts/"+tit+"/img.jpg" ))
  	  t +=
  	  "<div style='"+
  	  "height: 100;"+
  	  "margin-bottom: 10;"+
  	  "background-color: #000;"+
  	  "background-image:url(Texts/"+tit+"/img.jpg);"+
  	  "background-size: auto 100%;"+
  	  "background-repeat: no-repeat;"+
  	  "background-position: center;"+
  	  "'></div>";
  	  t += style+"<div style='padding: 10'>"+app.ReadFile( "Texts/"+tit+"/txt.txt", "utf-8" );
  	  if(app.FileExists( "Texts/"+tit+"/spl.txt" ))
  	  t += "\n\n<div class='sample'><b>Пример:</b>"+app.ReadFile( "Texts/"+tit+"/spl.txt" )+"</div>";
  	  web.LoadHtml( (t+"\n\n\n\n\n</div>").replace(/\n/g,"<br>") );
  	}
  	layAnim.Animate( "FadeIn" );
  }
}

function OnConfig(){
  dens = app.GetScreenDensity();
  scr = {"w":app.GetScreenWidth(),
             "h":app.GetScreenHeight()}
  layNav.SetSize( 1, dpy(50) );
  list.SetSize( 1 );
  web.SetSize( 1, 1-dpy(50) );
  layCont.SetSize( 1, 1-dpy(50) );
  scroll.SetSize( 1, 1-dpy(50) );
  shad.SetSize( 1, dpy(5) );
  for( var i = 0; i < lay.length; i++){
    lay[i].SetSize(lay[i].w);
  }
  for( var i = 0; i < txt.length; i++){
    if(txt[i].opt=="title")txt[i].SetSize(1-dpx(125));
    else{
      txt[i].SetSize(txt[i].w);
      txt[i].SetPadding(dpx(5), 0, 0, dpx(5));
    }
  }
  for( var i = 0; i < btn.length; i++){
    btn[i].SetSize(eval(btn[i].w));
  }
  for( var i = 0; i < img.length; i++){
    if(img[i].opt=="title")img[i].SetPosition(1-dpx(50),0 );
    img[i].SetSize(eval(img[i].w), eval(img[i].h) );
  }
}

function SetTheme(first){
  app.SetBackColor( th.bg );
  layNav.SetBackColor( th.nav.color );
  for( var i = 0; i < txt.length; i++){
    var tt=txt[i]
    if(tt.opt=="title"){
      tt.SetTextSize(th.nav.text.size);
      tt.SetTextColor(th.nav.text.color);
    }
    else{
      tt.SetTextSize(th.text.size);
      if(tt.opt=="pm") tt.SetTextColor(th.nav.text.color);
      else tt.SetTextColor(th.text.color);
    }
  }
  for( var i = 0; i < btn.length; i++){
    var bt = btn[i]
    bt.SetTextSize(th.button.text.size);
    bt.SetTextColor(th.button.text.color);
    bt.SetStyle(th.button.color, th.button.color, th.button.radius, "", 0,  th.button.shadow);
  }
  for( var i = 0; i < img.length; i++){
    if(img[i].opt=="title")img[i].SetBackColor(th.nav.color);
  }
  for( var i = 0; i < lay.length; i++){
    lay[i].incllay.SetBackColor(th.nav.color);
  }
  list.SetTextColor( th.text.color );
  list.SetTextSize( th.text.size );
  dlg.te.SetTextSize( th.text.size );
  dlg.te.SetTextColor( th.text.color );
  style = "<style>"+
  "body{"+
    "margin: 0;"+
  "}"+
  "*{"+
    "word-wrap: break-word;"+
    "color:"+th.text.color+";"+
    "font-size:"+th.text.size+";"+
  "}"+
  "b{"+
    "display: block;"+
    "text-align: center;"+
  "}"+
  ".sample{"+
  "background-color:"+th.nav.color+";"+
  "border-radius:7px;"+
  "padding:10px;"+
  "color:"+th.nav.text.color+";"+
  "}"+
  ".sample>b{"+
    "color: "+th.nav.text.color+
  "}"+
  ".block{"+
  "border: 2px solid "+th.text.color+";"+
  "padding:10px;"+
  "border-radius:7px;"+
  "}"+
  "table{"+
  "width: 100%;"+
  "</style>";
  if(!first)app.SaveText("th", JSON.stringify(th));
}

function OnBack(){
	if(list.GetVisibility()=="Show")app.Exit();
	else(Open(""));
}


function dpy(y){return y*dens/160/scr.h}
function dpx(x){return x*dens/160/scr.w}