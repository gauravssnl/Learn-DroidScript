_AddOptions("Share,NoDom");
  
app.SetBackColor("#333333");

APPNAME = app.GetAppName();
layload = app.CreateLayout("Linear", "FillXY,VCenter");
app.AddLayout(layload);
w = app.GetDisplayWidth();
h = app.GetDisplayHeight();
loadimg = app.CreateImage("Img/"+APPNAME+".png", w<=h? 0.3: -1, h<w? 0.3: -1);
loadtxt = app.CreateText("   Loading...");
loadtxt.SetTextColor("#ffffff");
layload.AddChild(loadimg);
layload.AddChild(loadtxt);

app.EnableBackKey(false);
app.LoadScript("API.js");

VERSION = 0.04
APPPATH = app.GetAppPath();
PROJECTS_PATH = "/sdcard/Plugineer/Projects/";

lay = {};
dlg = {};
txt = {};
img = {};
scr = {};
cache = {};

if(!app.FolderExists(PROJECTS_PATH)) app.MakeFolder(PROJECTS_PATH);

function OnStart(){
  api = new Api();
  var lc = app.GetLanguageCode();
  lang = api.CreateLanguage(lc);
  
  lang.main = lang.LoadLanguage("/main");
  //START MAIN PAGE
  lay.main = app.CreateLayout("Linear", "FillXY");
  lay.main.SetBackColor("#444444");
  lay.main.Hide();
  app.AddLayout(lay.main);
  
  lay.nav = app.CreateLayout("Linear", "Horizontal,FillX");
  lay.nav.SetBackColor("#333333");
  lay.main.AddChild(lay.nav);
  
  txt.header = api.CreateText(APPNAME+" v"+VERSION, "", "dpi(50)", "AutoScale", true);
  txt.header.SetTextSize(1000);
  txt.header.SetTextColor("#ffffff");
  lay.nav.AddChild(txt.header);
  
  lay.content = app.CreateLayout("Frame");
  lay.main.AddChild(lay.content);
  
  //END MAIN PAGE
  //START HOME PAGE
  
  var tmp = {}
  
  lay.home = app.CreateLayout("Linear", "FillXY");
  lay.content.AddChild(lay.home);
  
  tmp.scr = app.CreateScroller(-1, -1, "ScrollFade");
  lay.home.AddChild(tmp.scr);
  
  tmp.lay = app.CreateLayout("Linear", "Horizontal");
  tmp.scr.AddChild(tmp.lay);
  
  var btnSize = api.del("(wh? app.GetScreenHeight(): app.GetScreenWidth())-dpi(110)");
  
  lay.homePadd = api.CreateLayout("Linear", "Horizontal,VCenter", "", "100%-dpi(50)")
  lay.homePadd.SetArray("home");
  lay.homePadd.SetPadding("(100%-"+ btnSize +")/2", 0, "(100%-"+ btnSize +")/2");
  tmp.lay.AddChild(lay.homePadd);
  
  var addBig = function(icon){
    return "<br><big><big><big><big><big>"+icon+"</big></big></big></big></big>";
  }
  
  btn = api.CreateButton(lang.main.editor + addBig("[fa-pencil]"),
  btnSize, "wh", "Custom,FontAwesome,Html", true);
	btn.SetOnTouch(function(){
    api.ShowPage("lay.select", null, 500, null, "SlideFromTop");
  })
  lay.homePadd.AddChild(btn);
  
  btn = api.CreateButton(lang.main.install + addBig("[fa-download]"),
  btnSize, "wh", "Custom,FontAwesome,Html", true);
  btn.SetOnTouch(function(){
    api.ShowPage("lay.install");
  })
  lay.homePadd.AddChild(btn);
  
  btn = api.CreateButton(lang.main.uninstall + addBig("[fa-trash]"),
  btnSize, "wh", "Custom,FontAwesome,Html", true);
  btn.SetOnTouch(function(){
    api.ShowPage("lay.uninstall");
  })
  lay.homePadd.AddChild(btn);
  
  btn = api.CreateButton(lang.main.settings + addBig("[fa-gears]"),
  btnSize, "wh", "Custom,FontAwesome,Html", true);
  btn.SetOnTouch(function(){
    api.ShowPage("lay.settings");
  })
  lay.homePadd.AddChild(btn);
  
  //END HOME PAGE
  //START PROJECT SELECTOR PAGE
  
  lay.select = app.CreateLayout("Linear", "FillXY");
  lay.content.AddChild(lay.select);
  lay.select.Hide();
  
  scr.select = app.CreateScroller(-1, -1, "ScrollFade");
  lay.select.AddChild(scr.select);
  
  //END PROJECT SELECTOR PAGE
  //START SETTINGS PAGE
  
  lay.settings = app.CreateLayout("Linear", "FillXY");
  lay.content.AddChild(lay.settings);
  lay.settings.Hide();
  
  scr.settings = app.CreateScroller(-1, -1, "ScrollFade");
  lay.settings.AddChild(scr.settings);
  
  //END SETTINGS PAGE
  
  var shadow = app.CreateLayout("linear", "fillx");
  shadow.SetSize(-1, 5, "dpi");
  shadow.SetBackGradient("#55000000", "#00000000");
  lay.content.AddChild(shadow)
  
  OnConfig();
  api.page = "/layload"
  api.ShowPage("lay.main", function(){
    app.DestroyLayout(layload);
  }, 500)
  api.page = "/lay.home"
}

function UpdatePluginsList(){
  var projectsList = app.ListFolder(PROJECTS_PATH);
  
  var row;
  var marg = api.dpi(5);
  var tSize = api.sp(15)
  var count = Math.round(api.scr.w/api.dpi(100));
  var colW = api.scr.w/count-marg*2-marg/count;
  
  try{scr.select.DestroyChild(lay.select.list)}catch(e){}
  lay.select.list = app.CreateLayout("Linear", "Left");
  lay.select.list.SetPadding(marg/2, marg/2, marg/2, marg/2, "px");
  scr.select.AddChild(lay.select.list);
  
  projectsList.forEach(function(i, n){
    if(n%count==0){
      row = app.CreateLayout("Linear", "Horizontal");
      row.SetMargins(0, 0, 0, tSize/4, "px");
      lay.select.list.AddChild(row);
    }
    
    var col = app.CreateLayout("Linear", "VCenter");
    row.AddChild(col);
    
    var obj = app.CreateImage(PROJECTS_PATH+i+"/Img/"+i+".png", 
    colW, "",  "px,resize,async");
    obj.SetMargins(marg, marg, marg, marg, "px");
    obj.SetOnLongTouch(function(){
	    alert("long");
	    this.SetAlpha(1);
	  });
    obj.SetOnTouchDown(function(){
      this.SetAlpha(0.5);
	  });
	  obj.SetOnTouchUp(function(ev){
	    tp = {
	      x: ev.x[0],
	      y: ev.y[0]
	    }
	    this.SetAlpha(1);
	    if(tp.x>0&&tp.x<1&&tp.y>0&&tp.y<1){
	      alert("touch")
	    }
	  });
    col.AddChild(obj);
    
    var obj = app.CreateText(i, "", "", "multiline");
    obj.SetSize(colW, -1, "px");
    obj.SetTextSize(tSize, "px");
    col.AddChild(obj);
  });
}

function OnBack(){
  if(api.page == "/lay.home"){
    dlg.exit = app.CreateYesNoDialog(lang.main.exit.message);
    dlg.exit.Show();
    dlg.exit.SetButtonText(lang.main.exit.yes, lang.main.exit.no);
    dlg.exit.SetOnTouch(function(ev){
      if(ev=="Yes")app.Exit()
    });
  }
	else api.ShowPage();
}

function OnConfig(){
  api.scr.w = app.GetDisplayWidth();
  api.scr.h = app.GetDisplayHeight();
  api.scr.wh = api.scr.w>api.scr.h
  api.UpdateList("main", "home", UpdatePluginsList);
}