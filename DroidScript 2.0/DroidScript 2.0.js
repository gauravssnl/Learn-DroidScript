
/*
 DroidScript
 Rewritten from scratch
 by Midnightcoder
*/

// app.SetDebugEnabled(false);
app.SetBackColor("#333333");

APPNAME = app.GetAppName();
layload = app.CreateLayout("Linear", "FillXY,VCenter");
app.AddLayout(layload);
w = app.GetDisplayWidth();
h = app.GetDisplayHeight();
loadimg = app.CreateImage("Img/"+APPNAME+".png", w<=h? 0.3: -1, h<w? 0.3: -1, "resize,async");
loadtxt = app.CreateText("   Loading...");
loadtxt.SetTextColor("#ffffff");
layload.AddChild(loadimg);
layload.AddChild(loadtxt);

app.LoadScript("API/main.js", function(){
  app.Script("API/objects.js");
});

const
  APPPATH = app.GetAppPath(),
  PROJECTS_PATH = "/sdcard/DroidScript/";

var
  api = {},
  lang = {},
  lay = {},
  dlg = {},
  txt = {},
  img = {},
  scr = {},
  tmp = {},
  cache = {};

if(!app.FolderExists(PROJECTS_PATH)) app.MakeFolder(PROJECTS_PATH);

function OnStart(){
  api = new Api;

  ChangeLanguage();

  app.Script("Core/functions.js");
  app.Script("Core/main.js");
  app.Script("Core/home.js");
  app.Script("Core/settings.js");
  app.Script("Core/dialogs.js");

  delete tmp;
  OnConfig();
  app.EnableBackKey(false);
  api.page = "/layload"
  api.ShowPage("lay.main", function(){
    app.DestroyLayout(layload);
  }, 500)
  api.page = "/lay.home"
}

function OnMenu(){

}

function OnBack(){
  if(api.page == "/lay.home"){
    dlg.yesno.Show(lang.dialog.exit);
    dlg.yesno.SetOnYes(function(){
      app.Exit();
    })
  }
  else api.ShowPage();
}

function OnConfig(){
  api.scr.w = app.GetDisplayWidth();
  api.scr.h = app.GetDisplayHeight();
  api.scr.wh = api.scr.w>api.scr.h
  api.UpdateList(
    "main",
    UpdateProjectsList
  );
}

function ChangeLanguage(){
  lang = api.CreateLanguage(app.GetLanguageCode());
  lang.main = lang.LoadStrings("/main");
  lang.dialog = lang.LoadStrings("/dialogs");
  lang.settings = lang.LoadStrings("/settings");
}